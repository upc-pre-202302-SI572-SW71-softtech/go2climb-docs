// eslint-disable-next-line @typescript-eslint/ban-types
export type HintedString<KnownValues extends string> = (string & {}) | KnownValues;

export type MaybePromise<T> = T | Promise<T>;
