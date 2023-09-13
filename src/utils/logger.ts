import { createConsola } from "consola";

export function createLogger(tag: string) {
  return createConsola().withTag(tag);
}
