import fs from "node:fs/promises";

import Handlebars from "handlebars";

export class Template<TData> {
  private template?: HandlebarsTemplateDelegate<TData>;

  constructor(private filepath: string) {}

  async reload(): Promise<void> {
    const source = await fs.readFile(this.filepath, { encoding: "utf8" });
    this.template = Handlebars.compile(source);
  }

  async render(data: TData): Promise<string> {
    if (!this.template) {
      await this.reload();
    }
    return this.template!(data);
  }
}
