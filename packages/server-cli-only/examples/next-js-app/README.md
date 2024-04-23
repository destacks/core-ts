This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) in order to do some manual testing with `import "server-cli-only`.

## Getting Started

First, install:

```bash
npm run install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then, run the development server. It expected to succesfully load the home page (more info on that page):

```bash
npm run dev
# or w/ turbopack
npm run dev:turbo
# or
yarn dev
# or w/ turbopack
yarn dev:turbo
# or
pnpm dev
# or w/ turbopack
pnpm dev:turbo
# or
bun dev
# or w/ turbopack
bun dev:turbo
```

Running build is expected to fail because of `src/app/client.tsx`:

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

Also checkout the passing test script, run:

```bash
npm run script
# or
yarn script
# or
pnpm script
# or
bun script
```

Following test script, must fail:

```bash
npm run script:fail
# or
yarn script:fail
# or
pnpm script:fail
# or
bun script:fail
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
