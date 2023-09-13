import fs from "node:fs/promises";

import slugify from "@sindresorhus/slugify";
import matter from "gray-matter";
import { z } from "zod";

import { CLIArgs, CLICommandHandler } from "./cli.js";
import MarkdownTemplate from "./templates/markdown-template.js";
import { createLogger } from "./utils/logger.js";
import { inputFolder } from "./utils/paths.js";
import { Preprocessor } from "./utils/preprocessor.js";
import { Renderer } from "./utils/renderer.js";

const DocumentFrontMatter = z.object({
  lang: z.string().default("en"),
  title: z.string().default("Markdown Document"),
});
type DocumentFrontMatter = z.infer<typeof DocumentFrontMatter>;

interface ParsedFrontMatter {
  metadata: DocumentFrontMatter;
  content: string;
}

export class RenderHandler implements CLICommandHandler {
  private logger = createLogger("render");

  private preprocessor = new Preprocessor({
    dirname: inputFolder,
    toc: false,
    marked: false,
  });

  private renderer = new Renderer({
    slugify: s => slugify(s),
  });

  constructor(
    private inputFile: string,
    private outputFile: string,
    private encoding: BufferEncoding = "utf8",
  ) {}

  get name(): string {
    return this.constructor.name;
  }

  matches(args: CLIArgs): boolean {
    return args.command === "render" && !args.watch;
  }

  private parseFrontMatter(source: string): ParsedFrontMatter {
    const { content, data } = matter(source);
    const metadata = DocumentFrontMatter.parse(data);
    return { content, metadata };
  }

  async render(): Promise<void> {
    this.logger.info("Initializing render...");

    const source = await fs.readFile(this.inputFile, { encoding: this.encoding });
    const { content, metadata } = this.parseFrontMatter(source);
    const preprocessed = await this.preprocessor.render(content);
    const rendered = this.renderer.render(preprocessed);
    const templated = await MarkdownTemplate.render({
      lang: metadata.lang,
      title: metadata.title,
      content: rendered,
    });
    await fs.writeFile(this.outputFile, templated, { encoding: this.encoding });

    this.logger.success("Render finished!");
  }

  run(): Promise<void> {
    return this.render();
  }
}
