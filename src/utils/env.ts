import { z } from "zod";

import { createLogger } from "./logger.js";

const EnvironmentSchema = z.object({
  CF_PAGES: z
    .string()
    .optional()
    .transform(value => value === "1" || value === "true"),
});
type EnvironmentSchema = z.infer<typeof EnvironmentSchema>;
type EnvironmentKeys = keyof EnvironmentSchema;

class Environment {
  private logger = createLogger("env");
  private environment: EnvironmentSchema;

  constructor(source: NodeJS.ProcessEnv) {
    this.environment = EnvironmentSchema.parse(source);
    if (this.environment.CF_PAGES) {
      this.logger.info("Running on Cloudflare Pages.");
    }
  }

  get<T extends EnvironmentKeys>(key: T, fallback?: EnvironmentSchema[T]): EnvironmentSchema[T] {
    const value = this.environment[key];
    if (fallback !== undefined && (value === undefined || value === null)) {
      return fallback;
    }
    return value;
  }
}

const environment = new Environment(process.env);

export default environment;
