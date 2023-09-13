import MarkdownIt from "markdown-it";
import AnchorPlugin from "markdown-it-anchor";
import AttrsPlugin from "markdown-it-attrs";
import HLJSPlugin from "markdown-it-highlightjs";
import MultiMdTablePlugin from "markdown-it-multimd-table";
import ReplaceLinkPlugin, { ReplaceLinkFn } from "markdown-it-replace-link";
import TocPlugin from "markdown-it-toc-done-right";

export type SlugifyFn = (s: string) => string;

export interface RendererOptions {
  slugify: SlugifyFn;
  replaceLink?: ReplaceLinkFn;
}

export class Renderer {
  private renderer: MarkdownIt;

  constructor(options?: RendererOptions) {
    this.renderer = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true,
    })
      .use(ReplaceLinkPlugin, { replaceLink: options?.replaceLink })
      .use(AnchorPlugin, { slugify: options?.slugify })
      .use(TocPlugin, { slugify: options?.slugify })
      .use(MultiMdTablePlugin, {
        multiline: true,
        rowspan: true,
        headerless: true,
        multibody: true,
        autolabel: true,
      })
      .use(HLJSPlugin, { inline: true })
      .use(AttrsPlugin);
  }

  render(source: string): string {
    return this.renderer.render(source);
  }
}
