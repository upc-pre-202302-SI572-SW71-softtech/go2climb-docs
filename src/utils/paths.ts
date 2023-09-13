import fs from "node:fs/promises";
import path from "node:path";

import { dirname } from "./filename-dirname.js";
import { createLogger } from "./logger.js";
import { ensureSymlink } from "./symlinks.js";

const logger = createLogger("paths");

const __dirname = dirname(import.meta);
logger.debug(`Base path: ${__dirname}`);

export const inputFolder = path.resolve(__dirname, "../../docs/");
logger.debug(`Input folder: ${inputFolder}`);
export const inputFile = path.resolve(inputFolder, "index.md");
logger.debug(`Input file: ${inputFile}`);

export const outputFolder = path.resolve(__dirname, "../../output/");
logger.debug(`Output folder: ${outputFolder}`);
export const outputFile = path.resolve(outputFolder, "index.html");
logger.debug(`Output file: ${outputFile}`);

// Make sure the output directory exists
await fs.mkdir(outputFolder, { recursive: true });

// Create symlinks for styles and static folders
export const stylesFolder = path.resolve(__dirname, "../css/");
logger.debug(`Styles folder: ${stylesFolder}`);
export const stylesSymlink = path.resolve(outputFolder, "css/");
logger.debug(`Styles symlink: ${stylesSymlink}`);
await ensureSymlink(stylesFolder, stylesSymlink, "junction");

export const staticFolder = path.resolve(inputFolder, "static/");
logger.debug(`Static folder: ${staticFolder}`);
export const staticSymlink = path.resolve(outputFolder, "static/");
logger.debug(`Static symlink: ${staticSymlink}`);
await ensureSymlink(staticFolder, staticSymlink, "junction");
