import { Client, InStatement, ResultSet } from "@libsql/client";
import { z } from "zod";
import { createSql } from "../dist/index.js";
import { jest, describe, beforeEach, it, expect } from "@jest/globals";

describe("sql function in Node.js environment", () => {
  let mockExecute: jest.MockedFunction<
    (stmt: InStatement) => Promise<ResultSet>
  >;
  let mockClient: Client;
  let sql: any;

  beforeEach(() => {
    mockExecute = jest.fn();
    mockClient = {
      execute: mockExecute,
      batch: jest.fn(),
      transaction: jest.fn(),
      executeMultiple: jest.fn(),
      sync: jest.fn(),
      close: jest.fn(),
      closed: false,
      protocol: "file",
    } as Client;

    sql = createSql(mockClient);
  });

  const uuid = "bcbd80d8-8a1b-11ee-b9d1-0242ac120002";
  const rows = [
    {
      id: uuid,
      name: "Test User",
      length: 2,
    },
  ];
  const mockResponse: ResultSet = {
    rows: rows,
    columns: [],
    columnTypes: [],
    rowsAffected: 1,
    lastInsertRowid: undefined,
    toJSON: () => JSON.stringify(rows),
  };

  it("executes a simple query", async () => {
    mockExecute.mockResolvedValue(mockResponse);
    await expect(sql`SELECT * FROM users WHERE id = ${uuid}`).resolves.toEqual(
      mockResponse
    );
  });

  it("handles query errors", async () => {
    mockExecute.mockRejectedValue(new Error("Query failed"));
    await expect(sql`SELECT * FROM users WHERE id = ${uuid}`).rejects.toThrow(
      "Query failed"
    );
  });

  it("validates results against correct Zod schema", async () => {
    const UserSchema = z.object({ id: z.string(), name: z.string() });
    mockExecute.mockResolvedValue(mockResponse);
    await expect(
      sql(UserSchema)`SELECT * FROM users WHERE id = ${uuid}`
    ).resolves.toEqual(mockResponse);
  });

  it("Throws error because of wrong Zod schema", async () => {
    const FaultySchema = z.object({ foo: z.string(), bar: z.string() });
    mockExecute.mockResolvedValue(mockResponse);
    await expect(
      sql(FaultySchema)`SELECT * FROM users WHERE id = ${uuid}`
    ).rejects.toThrowError(
      "Schema validation failed: foo (Required), bar (Required)"
    );
  });
});
