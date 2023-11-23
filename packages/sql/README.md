# `@destacks/sql`

**Simple SQL querying using template literals with optional Zod schema validation.**

## Overview

`@destacks/sql` executes SQL queries using template literals with an optional Zod schema validation feature. It builds upon [`@libsql/client`](https://www.npmjs.com/package/@libsql/client) and [`sql-template-tag`](https://www.npmjs.com/package/sql-template-tag) to offer templated database interactions, with optional TypeScript static typing, and runtime data validation.

## Features

- **SQL Query Execution**: Execute SQL queries against libSQL (SQLite-like) databases.
- **Configuration Flexibility**: Supports local, remote, and hybrid database configurations.
- **Zod Schema Validation**: Optional integration for TypeScript static typing and runtime data validation.
- **Support for Multiple Environments**: Compatible with Node.js, browsers, and cloud or edge hosted environments.

## Getting Started

### Installation

```bash
npm i @destacks/sql
```

### Usage

#### Creating a Database Client

```typescript
import { createClient } from "@destacks/sql";

// For a local SQLite database
const localClient = createClient({ url: "file:local.db" });

// For a remote libSQL database
const remoteClient = createClient({
  url: "libsql://[your-sqld-host]",
  authToken: "[your-token]",
});
```

#### Defining a Zod Schema

```typescript
import { z } from "zod";

const UserSchema = z.object({ id: z.string(), name: z.string() });
```

#### Executing SQL Queries

With schema validation:

```typescript
import { sql } from "your-utility-path";

sql(UserSchema)`SELECT * FROM users WHERE id = ${userId}`;
```

Without schema validation:

```typescript
sql`SELECT * FROM users WHERE id = ${userId}`;
```

### Configurations

- **Local SQLite Files**: Use `file:` URLs for local SQLite databases. Supported on Node.js environments.
- **libSQL sqld Instances**: Connect using `libsql:` URLs, with support for HTTP or WebSocket protocols. Suitable for both local and remote databases.
- **Remote Databases**: Access databases hosted on services like [Turso](https://turso.tech/). Requires `authToken` for secured access.

## Usage in React Projects

`@destacks/sql/react` provides a specialized module for React projects, integrating with `server-cli-only` for execution in React Server Components and Node.js CLI environments.

### React Project Import

```typescript
import { createClient, createSql } from "@destacks/sql/react";
```

For more information on how `server-cli-only` works and its integration, refer to the [server-cli-only npm package](https://www.npmjs.com/package/server-cli-only).

## More Information

For detailed usage and configuration options, refer to the [npm package](https://www.npmjs.com/package/@destacks/sql) of `@destacks/sql`.

## License

MIT License.
