import chalk from "chalk";
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

class Env {
  /** @type {Readonly<EnvVars>} */
  #vars;

  constructor() {
    const schema = z.object({
      POSTMAN_API_KEY: z.string(),
      POSTMAN_API_BASE_URL: z.string().url(),
    });

    const result = schema.safeParse(process.env);

    if (!result.success) {
      console.error(
        chalk.red("❌ Missing or invalid environment variables:\n")
      );
      console.table(result.error.flatten().fieldErrors);
      process.exit(1);
    }

    this.#vars = Object.freeze(result.data);
  }

  /**
   * Get a validated environment variable by key
   * @param {keyof EnvVars} key
   * @returns {string}
   */
  get(key) {
    return this.#vars[key];
  }
}

/**
 * @typedef {Object} EnvVars
 * @property {string} POSTMAN_API_KEY
 * @property {string} POSTMAN_API_BASE_URL
 */
const env = new Env();
Object.freeze(env);

export { env };
