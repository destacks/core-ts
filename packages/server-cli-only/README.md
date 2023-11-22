# server-cli-only

The `server-cli-only` package is designed to restrict the import of modules exclusively to React Server Components or scripts running in the CLI. This package is an alternative to the `server-only` package, which does not permit the execution of scripts that use modules importing its directive.

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

To use this package in a CLI script, in addition to `import "server-cli-only"`, set the `RUNNING_IN_CLI` environment variable to `true`. Setting the environment variable can be done inline when running your script directly from the terminal:

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

The `server-cli-only` package is tailored for React Server Components and CLI environments, safeguarding against its inclusion in client-side components.

- **React Server Environments:** Utilizes an empty module (`./empty.js`) in environments specified by the `"react-server"` environment. For more details, see [RFC #227](https://github.com/reactjs/rfcs/blob/main/text/0227-server-module-conventions.md).
- **CLI Environments:** In Node.js contexts (`"node"` in `"default"` export environments), it checks if `RUNNING_IN_CLI` is set to `"true"`. If not, it throws an error, guiding for correct CLI usage.
- **Client Component Environments:** In browser contexts (`"browser"` in `"default"` export environments), `./index.js` throws an error to always prevent usage in client-side rendering.

This configuration tries to align with the guidelines in the React Server Module Conventions of [RFC #227](https://github.com/reactjs/rfcs/blob/main/text/0227-server-module-conventions.md) but slightly extends them to enable script use on the CLI.

## License

MIT License.

## Links

- Source Code: https://github.com/destacks/core-ts/tree/main/packages/server-cli-only
- Project Repo: https://github.com/destacks/core-ts
- NPM Package: https://www.npmjs.com/package/server-cli-only
