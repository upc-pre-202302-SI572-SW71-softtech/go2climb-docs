declare module "markdown-it-multimd-table" {
  import MarkdownIt from "markdown-it";

  export interface MultiMdTableOptions {
    multiline: boolean;
    rowspan: boolean;
    headerless: boolean;
    multibody: boolean;
    autolabel: boolean;
  }

  const MultiMdTable: MarkdownIt.PluginWithOptions<Partial<MultiMdTableOptions>>;

  export default MultiMdTable;
}
