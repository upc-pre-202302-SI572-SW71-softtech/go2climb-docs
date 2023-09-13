import fs from "node:fs/promises";
import { relative } from "node:path";

import environment from "./env.js";
import { createLogger } from "./logger.js";

const logger = createLogger("symlink");
if (environment.get("CF_PAGES")) {
  logger.info("Using copy instead of symlinks due to being run on Cloudflare Pages.");
}

export type SymlinkType = "dir" | "file" | "junction";

const cwd = process.cwd();

function simplify(path: string): string {
  return relative(cwd, path);
}

export async function ensureSymlink(target: string, from: string, type?: SymlinkType): Promise<void> {
  try {
    const state = await fs.lstat(from);
    if (!state.isSymbolicLink()) {
      return logger.error(`Unable to create symlink for ${from}: another file already exists.`);
    }
    const currentTarget = await fs.readlink(from, { encoding: "utf8" });
    if (relative(target, currentTarget) === "") {
      return logger.debug(`Found symlink from ${simplify(from)} to ${simplify(target)}.`);
    }
    return logger.warn(`Found symlink for ${simplify(from)} but it has another target: ${simplify(currentTarget)}.`);
  } catch {
    if (environment.get("CF_PAGES")) {
      await fs.cp(target, from, { recursive: true, dereference: true, force: true });
      logger.debug(`Copied files from ${simplify(target)} to ${simplify(from)}.`);
    } else {
      await fs.symlink(target, from, type);
      logger.debug(`Created symlink from ${simplify(from)} to ${simplify(target)}.`);
    }
  }
}
