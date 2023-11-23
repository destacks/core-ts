# TC: Hassle-Free Merging & Sorting of Tailwind Classes

## Introduction

TC is designed to merge & sort Tailwind CSS class names in JavaScript and TypeScript. It's ideal for usage within JSX and TSX components. TC combines the power of [`clsx`](https://github.com/lukeed/clsx) and [`tailwind-merge`](https://github.com/dcastil/tailwind-merge).

Key features of TC include:

- Efficiently merges strings, conditionals, arrays, & nested objects.
- Trims extra spaces in strings.
- Sorts Tailwind CSS classes without causing style conflicts.

## Installation

`@destacks/tc` relies on `clsx` and `tailwind-merge` as its peer dependencies. You need to install all three for it to work properly:

```bash
npm install @destacks/tc clsx tailwind-merge
```

> 🔔 **Note**: It's essential to install both `clsx` and `tailwind-merge` along with `@destacks/tc` to avoid any potential issues.

## Usage

Example:

> Please note: the following example, though more complicated than a typical use-case, showcases the possibilities of using arrays and nested objects. For a deeper understanding of possible control structures, visit the [`clsx`](https://github.com/lukeed/clsx) project page.

```jsx
import tc from "@destacks/tc";

const Button = ({ isAlert, isActive }) => (
  <button
    className={tc(
      "bg-blue-600 text-white hover:bg-blue-700",
      isAlert && ["bg-red-300", "text-red-900", "hover:bg-red-400"],
      isActive ? { "cursor-pointer": true } : { "cursor-not-allowed": true }
    )}
  >
    Click Me
  </button>
);

export default Button;
```

## Auto-Complete in VS Code

1. [Install the "Tailwind CSS IntelliSense" extension.](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

2. To enjoy autocompletion, add the following to your [VS Code `settings.json`](https://code.visualstudio.com/docs/getstarted/settings):

```json
{
  "tailwindCSS.experimental.classRegex": [
    ["tc\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

## Credits

The biggest shout-out goes to [`clsx`](https://github.com/lukeed/clsx) and [`tailwind-merge`](https://github.com/dcastil/tailwind-merge). TC acts as a super-thin wrapper around these libraries. They do the heavy lifting, accounting for more than 99.9% of the work, and deserve all the credit.

## License

MIT License.

## Links

- For TC's GitHub repo, visit: https://github.com/destacks/core-ts/tree/main/packages/tc
- To see TC's NPM package page, visit: https://www.npmjs.com/package/@destacks/tc
