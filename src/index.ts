/* eslint-disable unicorn/no-process-exit */
import { CLICommandHandler, parseArgs } from "./cli.js";
import { RenderHandler } from "./render.js";
import { createLogger } from "./utils/logger.js";
import { inputFile, inputFolder, outputFile } from "./utils/paths.js";
import { WatchHandler } from "./watch.js";

const logger = createLogger("main");

const renderHandler = new RenderHandler(inputFile, outputFile);
const watchHandler = new WatchHandler(renderHandler, inputFolder);

const handlers: CLICommandHandler[] = [watchHandler, renderHandler];

const args = parseArgs();

for (const handler of handlers) {
  logger.debug(`Trying to match arguments with ${handler.name}...`);
  if (handler.matches(args)) {
    logger.debug(`Match found with ${handler.name}!`);
    try {
      await handler.run(args);
    } catch (error) {
      logger.fatal(`An error occurred while running the matched handler: ${handler.name}`);
      logger.fatal(error);
      process.exit(1);
    }
    // Exit cleanly
    process.exit(0);
  }
}

logger.debug(`Unable to match with any of the registered handlers: ${args.command}`);
logger.fatal(`No handler available for command: ${args.command}`);
process.exit(1);
