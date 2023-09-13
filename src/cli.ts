import { parseArgs as parseArgsNative } from "node:util";

import { HintedString, MaybePromise } from "./utils/helpers.js";
import { createLogger } from "./utils/logger.js";

const logger = createLogger("cli");

export const CLICommand = ["render"] as const;
export type CLICommand = HintedString<(typeof CLICommand)[number]>;

export function isValidCommand(command: string): command is CLICommand {
  return (CLICommand as readonly string[]).includes(command);
}

export interface CLIArgs {
  command: CLICommand;
  watch?: boolean;
}

export function parseArgs(): CLIArgs {
  logger.debug(`Using arguments: [${process.argv.join(", ")}]`);

  const { positionals, values } = parseArgsNative({
    allowPositionals: true,
    options: {
      "watch": {
        type: "boolean",
        default: false,
        short: "w",
      },
      "no-watch": {
        type: "boolean",
        default: false,
      },
    },
  });

  if (!isValidCommand(positionals[0])) {
    logger.debug(`An unknown command was found while parsing arguments: ${positionals[0]}`);
  }

  return {
    command: positionals[0],
    watch: values.watch && !values["no-watch"],
  };
}

export interface CLICommandHandler {
  get name(): string;
  matches(args: CLIArgs): boolean;
  run(args: CLIArgs): MaybePromise<void>;
}
