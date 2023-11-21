# server-cli-only

The `server-cli-only` package is designed to restrict the import of modules exclusively to Next.js server components or scripts running in a CLI environment. It builds on the `server-only` package used by Next.js on build-time.

## Installation

```bash
npm i server-cli-only
```

## Usage

Import server-cli-only at the beginning of your module:

```typescript
import "server-cli-only";
```

## CLI Usage

To use this package in a CLI script, set the RUNNING_IN_CLI environment variable to true. This can be done inline when running your script:

```bash
RUNNING_IN_CLI=true node your-script.js
```

Or using a package.json script:

```json
{
  "scripts": {
    "your-cli-script": "RUNNING_IN_CLI=true node your-script.js"
  }
}
```

## How It Works

The package contains logic to determine the execution context and throws an error if the current environment is not a Next.js server component or a CLI environment.

- It checks if it's a Next.js server component by trying to require a `server-only` module.
- It checks for a CLI environment by looking for the RUNNING_IN_CLI environment variable.
- If neither a server component nor a CLI environment is detected, an error is thrown to prevent usage in Next.js client

## Caution

IMPORTANT: Setting RUNNING_IN_CLI=true allows the module to be imported from any environment. Use this feature only if you understand the implications and ensure that it's not set in a client-side context to avoid unintended behaviors.

## License

MIT License.

## Project Page

https://github.com/destacks/core-ts/packages/server-cli-only
