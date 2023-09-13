declare module "markdown-it-replace-link" {
  import MarkdownIt, { Token } from "markdown-it";
  import { ChildNode } from "domhandler";

  export type ReplaceLinkFn = (link: string, env: unknown, token: Token, htmlToken?: ChildNode) => string;

  export interface ReplaceLinkOptions {
    /**
     * Disabled by default for backwards compatibility.
     *
     * @default false
     */
    processHTML: boolean;
    /**
     * Function to replace the content of links. Both images and HTML links will be processed.
     *
     * Example:
     *
     * ```markdown
     * [Hello](test)
     * ```
     *
     * and use this
     *
     * ```javascript
     * var md = require('markdown-it')({
     *     html: true,
     *     linkify: true
     * })
     * .use(require('markdown-it-replace-link'), {
     *     replaceLink: function (link, env, token, htmlToken) {
     *         return "http://me.com/" + link;
     *     }
     * })
     * ```
     *
     * This will result in the link prefixed with the `http://me.com/` like:
     *
     * ```html
     * <p><a href="http://me.com/test">Hello</a></p>
     * ```
     */
    replaceLink: ReplaceLinkFn;
  }

  const ReplaceLink: MarkdownIt.PluginWithOptions<Partial<ReplaceLinkOptions>>;

  export default ReplaceLink;
}
