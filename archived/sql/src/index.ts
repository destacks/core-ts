import { ZodSchema } from "zod";
import {
  createClient,
  Client,
  ResultSet as _ResultSet,
  Value,
  InArgs,
} from "@libsql/client";
import sqlTemplate, { Sql } from "sql-template-tag";

type ResultSet<T> = Omit<_ResultSet, "rows"> & { rows: T[] };

type SqlExecutor<T> = (
  strings: TemplateStringsArray,
  ...values: Value[]
) => Promise<ResultSet<T>>;

type SqlFunction = {
  <T>(schema: ZodSchema<T>): SqlExecutor<T>;
  <T>(strings: TemplateStringsArray, ...values: Value[]): Promise<ResultSet<T>>;
};

/**
 * `createSql` - Generates a SQL function for executing queries with optional Zod schema validation.
 * Applicable for Node.js backend or React projects. Use `@destacks/sql` for Node.js and
 * `@destacks/sql/react` for React, integrated with `server-cli-only`.
 *
 * @param client The database client for executing queries.
 * @returns A function for executing SQL queries, optionally with Zod validation.
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
  return function <T>(
    schemaOrStrings: ZodSchema<T> | TemplateStringsArray,
    ...values: Value[]
  ): SqlExecutor<T> | Promise<ResultSet<T>> {
    if (schemaOrStrings instanceof ZodSchema) {
      return function (strings, ...values) {
        executeWithSchema(client, schemaOrStrings, strings, ...values);
      } as SqlExecutor<T>;
    } else {
      return execute<T>(client, schemaOrStrings, ...values);
    }
  } as SqlFunction;
}

async function execute<T>(
  client: Client,
  strings: TemplateStringsArray,
  ...values: Value[]
): Promise<ResultSet<T>> {
  const query = sqlTemplate(strings, ...values);
  try {
    const resultSet = await client.execute({
      sql: query.sql,
      args: query.values as InArgs,
    });
    return resultSet as ResultSet<T>;
  } catch (error) {
    throw new Error(`Query execution failed: ${error}`);
  }
}

async function executeWithSchema<T>(
  client: Client,
  schema: ZodSchema<T>,
  strings: TemplateStringsArray,
  ...values: Value[]
): Promise<ResultSet<T>> {
  const resultSet = await execute<T>(client, strings, ...values);
  validateResultSet(schema, resultSet);
  return resultSet;
}

function validateResultSet<T>(
  schema: ZodSchema<T>,
  resultSet: ResultSet<any>
): void {
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
export type { Value, SqlFunction, SqlExecutor, ResultSet };
