import path from "node:path";
import { fileURLToPath } from "node:url";

export function filename(meta: ImportMeta) {
  return fileURLToPath(meta.url);
}

export function dirname(meta: ImportMeta) {
  return meta.url ? path.dirname(filename(meta)) : "";
}
