# server-cli-only

This package is designed as a failsafe. All modules marked with `import "server-cli-only"` will throw an error on build-time if imported into a module running in the "browser" runtime (e.g., React Client Components). This package is an alternative to the `server-only` package, which permits the execution of React Server Components runtimes but doesn't allow using other server or edge runtimes. This package aims for the use with React but can also be used in other projects that follow this strategy.

## Installation

```bash
npm i server-cli-only
```

## Module Usage

Import `server-cli-only` at the beginning of a module that you want to protect from leaking to the front-end (browser):

```typescript
import "server-cli-only";
```

Now, imports of your module importing `server-cli-only` into "browser" modules (e.g., React Client Components) will throw an error.

## Command Line Usage

You can directly execute scripts in server runtimes like `node`, `deno`, and `bun`. For example:

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

This package tries to align with the guidelines in the React Server Module Conventions of [RFC #227](https://github.com/reactjs/rfcs/blob/main/text/0227-server-module-conventions.md) but extends this guideline to also allow executions in other server and edge runtimes, not only the "react-server" runtime. The overarching goal is to restrict modules with sensitive data from being leaked to the front-end (browser) by using ["conditional exports"](https://nodejs.org/api/packages.html#conditional-exports) in Node.js's `package.json` file. Doing so results in build-time errors for "browser" and unknown runtime modules. Following, all allowed and dis-allowed (error-throwing) runtimes.

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
| \<unknown\> | All unknown runtimes    |

### Lookout Places for Additional Runtime Keys in the Future

[Proposed Specs](https://runtime-keys.proposal.wintercg.org/) concerning the different runtime keys available by the [Web-interoperable Runtimes Community Group (WinterCG)](https://wintercg.org). And React-DOM's [package.json "conditional exports" field](https://github.com/facebook/react/blob/main/packages/react-dom/package.json).

## License

MIT License.

## Links

- Source Code: https://github.com/destacks/core-ts/tree/main/packages/server-cli-only
- Project Repo: https://github.com/destacks/core-ts
- NPM Package: https://www.npmjs.com/package/server-cli-only
