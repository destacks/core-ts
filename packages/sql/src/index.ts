import { ZodSchema, z } from "zod";
import {
  createClient,
  Client,
  ResultSet as _ResultSet,
  InArgs,
  InStatement,
  Value,
} from "@libsql/client";
import sqlTemplate from "sql-template-tag";

export type ResultSet<T> = Omit<_ResultSet, "rows"> & { rows: T[] };

export type SqlExecutor<T> = (
  strings: TemplateStringsArray,
  ...values: Value[]
) => Promise<ResultSet<T>>;

export type SqlFunction = {
  <T>(schema: ZodSchema<T>): SqlExecutor<T>;
  <T>(strings: TemplateStringsArray, ...values: Value[]): Promise<ResultSet<T>>;
};

/**
 * `createSql` - Generates a SQL function for executing queries with optional Zod schema validation.
 * Applicable for Node.js backend or React projects. Use `@destacks/sql` for Node.js and
 * `@destacks/sql/react` for React, integrated with `server-cli-only`.
 *
 * @param {Client} client - The database client for executing queries.
 * @returns {SqlFunction} A function for executing SQL queries, optionally with Zod validation.
 *
 * Example:
 * ```typescript
 * import { createClient, createSql } from "@destacks/sql"; // Replace with "@destacks/sql/react" for React
 * const client = createClient({ url: "file:db.sqlite" });
 * export const sql = createSql(client);
 *
 * // Executing a query
 * sql`SELECT * FROM users WHERE id = ${userId}`;
 *
 * // If using optional Zod schema validation
 * import { z } from "zod";
 * const UserSchema = z.object({ id: z.string(), name: z.string() });
 * sql(UserSchema)`SELECT * FROM users WHERE id = ${userId}`;
 * ```
 *
 * More info: {@link https://www.npmjs.com/package/@destacks/sql}
 * React & `server-cli-only`: {@link https://www.npmjs.com/package/server-cli-only}
 */
function createSql(client: Client): SqlFunction {
  return function (
    schemaOrStrings: ZodSchema | TemplateStringsArray,
    ...values: Value[]
  ) {
    if (schemaOrStrings instanceof ZodSchema) {
      const schema = schemaOrStrings;
      type inferredType = z.infer<typeof schema>;
      return async (strings: TemplateStringsArray, ...values: Value[]) => {
        const resultSet = await execute<inferredType>(
          client,
          strings,
          ...values
        );
        validate(schema, resultSet);
        return resultSet;
      };
    } else {
      const strings = schemaOrStrings;
      return execute(client, strings, ...values);
    }
  } as SqlFunction;
}

function execute<T>(
  client: Client,
  strings: TemplateStringsArray,
  ...values: Value[]
) {
  const query = sqlTemplate(strings, ...values);
  const resultSet = client.execute({
    sql: query.sql,
    args: query.values as InArgs,
  } as InStatement);
  return resultSet as Promise<ResultSet<T>>;
}

function validate(schema: ZodSchema, resultSet: ResultSet<Value>) {
  if (resultSet.rows.length > 0) {
    const validation = schema.safeParse(resultSet.rows[0]);
    if (!validation.success) {
      const errorDetails = validation.error.issues
        .map((issue) => `${issue.path.join(", ")} (${issue.message})`)
        .join(", ");
      throw new Error(`Schema validation failed: ${errorDetails}`);
    }
  } else {
    throw new Error("Schema validation failed: No rows returned.");
  }
}

export { createClient, createSql };
export type { Value };
