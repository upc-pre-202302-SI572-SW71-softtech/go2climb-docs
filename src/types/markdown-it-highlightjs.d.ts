declare module "markdown-it-highlightjs" {
  import MarkdownIt from "markdown-it";
  import { HLJSApi, LanguageFn } from "highlight.js";

  export interface HLJSOptions {
    /**
     * Whether to automatically detect language if not specified.
     *
     * @default true
     */
    auto: boolean;
    /**
     * Whether to add the `hljs` class to raw code blocks (not fenced blocks).
     *
     * @default true
     */
    code: boolean;
    /**
     * Register other languages which are not included in the standard pack.
     *
     * @example
     * ```javascript
     * const md = require('markdown-it')()
     *   .use(require('markdown-it-highlightjs'), {
     *     register: {
     *       cypher: require('highlightjs-cypher')
     *     }
     *   })
     * ```
     *
     * @default null
     */
    register: Record<string, LanguageFn>;
    /**
     * Whether to highlight inline code.
     *
     * You can specify the language for inline code using Pandoc syntax:
     *
     * ```markdown
     * `x=4`{.js}
     * ```
     *
     * Or [kramdown IAL syntax](https://kramdown.gettalong.org/syntax.html#inline-attribute-lists):
     *
     * ```markdown
     * `x=4`{:.js}
     * ```
     *
     * If you do not specify a language, then highlight.js will attempt to guess the language if auto is true (which it is by default).
     *
     * **Usage with markdown-it-attrs.**
     *
     * If you use markdown-it-attrs, make sure to include it after markdown-it-highlightjs if you want inline code highlighting to work:
     *
     * ```javascript
     * const md = require('markdown-it')()
     *   .use(require('markdown-it-highlightjs'), { inline: true })
     *   .use(require('markdown-it-attrs'))
     * ```
     *
     * @default false
     */
    inline: boolean;
    /**
     * Provide the instance of highlight.js to use for highlighting.
     *
     * @default require('highlight.js')
     */
    hljs: HLJSApi;
    /**
     * Forces highlighting to finish even in case of detecting illegal syntax for the language instead of throwing an exception.
     *
     * @default true
     */
    ignoreIllegals: boolean;
  }

  const HLJS: MarkdownIt.PluginWithOptions<Partial<HLJSOptions>>;

  export default HLJS;
}
