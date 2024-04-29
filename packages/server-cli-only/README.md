# server-cli-only

This package is designed only to allow imports from React Server Components and modules used in other server- and edge runtimes. If imported from a browser runtime, it throws an error (React Client Components). It is an alternative to the `server-only` package, which only permits the execution of React Server Components runtimes but doesn't allow using other server or edge runtimes.

## Installation

```bash
npm i server-cli-only
```

## App Usage

Import `server-cli-only` at the beginning of a module that you want to protect from leaking to the front end:

```typescript
import "server-cli-only";
```

Now, imports in "browser" modules (e. g. React Client Components) will throw an error.

## CLI Usage

You can directly execute scripts in server runtimes like `node`, `deno`, and `bun`, for example:

```bash
node your-script.js
```

Or in your `package.json`:

```json
{
  "scripts": {
    "your-cli-script": "node your-script.js"
  }
}
```

## Context

This package tries to align with the guidelines in the React Server Module Conventions of [RFC #227](https://github.com/reactjs/rfcs/blob/main/text/0227-server-module-conventions.md) but extends them to also allow execution in other server and edge runtimes. The goal is to restrict modules with sensitive data from being leaked to the front end.

### Allowed Runtimes

| Key          | Target                  |
| ------------ | ----------------------- |
| react-server | React Server Components |
| node         | Node.js runtime         |
| bun          | Bun runtime             |
| deno         | Deno runtime            |
| edge-light   | Vercel edge             |
| netlify      | Netlify edge            |
| workerd      | Cloudflare edge         |

### Forbidden Runtimes

| Key         | Target                  |
| ----------- | ----------------------- |
| browser     | React Client Components |
| \<unknown\> | All unknown evironments |

[Proposed Specs](https://runtime-keys.proposal.wintercg.org/) concerning the different runtime keys available by the [Web-interoperable Runtimes Community Group (WinterCG)](https://wintercg.org). And React-DOM's [package.json `exports` field](https://github.com/facebook/react/blob/main/packages/react-dom/package.json).

## License

MIT License.

## Links

- Source Code: https://github.com/destacks/core-ts/tree/main/packages/server-cli-only
- Project Repo: https://github.com/destacks/core-ts
- NPM Package: https://www.npmjs.com/package/server-cli-only
