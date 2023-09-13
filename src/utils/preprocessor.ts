import markedpp, { MarkedppOptions } from "markedpp";

export class Preprocessor {
  constructor(private options: MarkedppOptions = {}) {}

  render(source: string): Promise<string> {
    return new Promise((resolve, reject) => {
      markedpp(source, this.options, (err, result) => {
        if (err) return reject(err);
        resolve(result as string);
      });
    });
  }
}
