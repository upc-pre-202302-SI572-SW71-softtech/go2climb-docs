import path from "node:path";

import { dirname, filename } from "../utils/filename-dirname.js";
import { Template } from "../utils/template.js";

export interface MarkdownTemplateData {
  lang: string;
  title: string;
  content: string;
}

const __filename = filename(import.meta);
const __dirname = dirname(import.meta);
const { name: templateFileName } = path.parse(__filename);
const templateFile = path.resolve(__dirname, `${templateFileName}.hbs`);
const MarkdownTemplate = new Template<MarkdownTemplateData>(templateFile);

export default MarkdownTemplate;
