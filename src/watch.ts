import fs from "node:fs/promises";

import { CLIArgs, CLICommandHandler } from "./cli.js";
import { RenderHandler } from "./render.js";
import { createLogger } from "./utils/logger.js";

export class WatchHandler implements CLICommandHandler {
  private logger = createLogger("watch");

  constructor(
    private renderer: RenderHandler,
    private path: string,
  ) {}

  get name(): string {
    return this.constructor.name;
  }

  matches(args: CLIArgs): boolean {
    return args.command === "render" && !!args.watch;
  }

  private setupKillers(controller: AbortController) {
    const signals: NodeJS.Signals[] = ["SIGHUP", "SIGKILL"];
    for (const signal of signals) {
      process.once(signal, () => {
        this.logger.info("Killing watcher...");
        controller.abort();
      });
    }
  }

  async run(): Promise<void> {
    this.logger.info(`Using watch mode for ${this.path}`);
    this.logger.info("Initializing watcher...");

    const controller = new AbortController();
    const watcher = fs.watch(this.path, { recursive: true, signal: controller.signal });
    this.setupKillers(controller);

    await this.renderer.render();
    for await (const event of watcher) {
      if (!event.filename) {
        this.logger.debug("Unable to detect filename for the watch event, ignoring...");
        continue;
      }
      this.logger.info(`Detected change for ${event.filename}`);
      await this.renderer.render();
    }
  }
}
