declare module "markedpp" {
  export interface FullMarkedppOptions {
    /**
     * Dirname of markdown source file - required to include other files.
     */
    dirname: string;

    /**
     * Consider GitHub Flavored Markdown (GFM) fences.
     *
     * @default true
     */
    gfm: boolean;
    /**
     * Enable `!includes` directives.
     *
     * @default true
     */
    include: boolean;
    /**
     * Enable `!toc` directives.
     *
     * @default true
     */
    toc: boolean;
    /**
     * Enable `!numberedheadings` directives.
     *
     * @default true
     */
    numberedheadings: boolean;
    /**
     * Enable `!ref` directives.
     *
     * @default true
     */
    ref: boolean;

    /**
     * Render `<br>` tags for Table of Contents with numbered style.
     *
     * @default true
     */
    breaks: boolean;
    /**
     * Render pre-proc tags `<!-- !command -->`.
     *
     * @default true
     */
    tags: boolean;
    /**
     * Default level for `!toc` and `!numberheadings` directives.
     *
     * @default 3
     */
    level: number;
    /**
     * Default minimum level for `!toc` and `!numberheadings` directives.
     *
     * @default 1
     */
    minlevel: number;
    /**
     * Add new line on joined bullet lists using different bullet chars.
     *
     * @default false
     */
    smartlists: boolean;

    /**
     * Renumber lists.
     *
     * @default true
     */
    autonumber: boolean;
    /**
     * Update identifiers on headings automatically (adds `<a name="{value}">` anchors).
     *
     * @default false
     */
    autoid: boolean;

    /**
     * Use anchor mode for heading auto identifiers for [marked](https://www.npmjs.com/package/marked).
     *
     * @default true
     */
    marked: boolean;
    /**
     * Use anchor mode for heading auto identifiers for [markdown-it](https://npmjs.com/package/markdown-it) parser using [markdown-it-anchor](https://npmjs.com/package/markdown-it-anchor) plugin.
     *
     * @default false
     */
    markdownit: boolean;
    /**
     * Use anchor mode for heading auto identifiers for [unified](https://npmjs.com/package/unified) parser using [remark-slug](https://npmjs.com/package/remark-slug) plugin.
     *
     * This mode is the same as the {@link MarkedppOptions.github} option.
     *
     * @default false
     */
    unified: boolean;
    /**
     * Use anchor mode for heading auto identifiers for [pandoc](https://pandoc.org/).
     *
     * @default false
     */
    pandoc: boolean;
    /**
     * Use anchor mode for heading auto identifiers for [GitHub](https://github.com/).
     *
     * @default false
     */
    github: boolean;
    /**
     * Use anchor mode for heading auto identifiers for [GitLab](https://gitlab.com/).
     *
     * @default false
     */
    gitlab: boolean;
    /**
     * Use anchor mode for heading auto identifiers for [BitBucket](https://bitbucket.org/).
     *
     * @default false
     */
    bitbucket: boolean;
    /**
     * Use anchor mode for heading auto identifiers for [Ghost](https://ghost.org/).
     *
     * @default false
     */
    ghost: boolean;
  }

  export type MarkedppOptions = Partial<FullMarkedppOptions>;

  export type MarkedppCallback = (err?: Error, result?: string) => void;

  /**
   * Markdown Preprocessor
   *
   * @module [markedpp](https://www.npmjs.com/package/markedpp)
   * @param src Markdown source to preprocess
   * @param callback Callback function
   */
  function markedpp(src: string, callback: MarkedppCallback): void;
  /**
   * Markdown Preprocessor
   *
   * @module [markedpp](https://www.npmjs.com/package/markedpp)
   * @param src Markdown source to preprocess
   * @param options Options
   * @param options.dirname Dirname of markdown source file - required to include other files
   * @param callback Callback function
   */
  function markedpp(src: string, options: MarkedppOptions, callback: MarkedppCallback): void;

  export default markedpp;
}
