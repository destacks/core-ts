"use server";

import { getSomeServerCliOnlyData } from "@/data";
import { Code } from "./code.component";

export default async function ServerComponent() {
  const data = await getSomeServerCliOnlyData();

  return (
    <p className="rounded-xl border border-b border-gray-300 bg-gray-200 bg-gradient-to-b from-zinc-200 p-4 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:dark:bg-zinc-800/30">
      By showing this text, Next.js successfully imports a React Server Component with
      the following string <Code>&quot;{data}&quot;</Code> from a pseudo data
      layer module
      <Code>&quot;src/data.ts&quot;</Code> which is secured with{" "}
      <Code>import&nbsp;&quot;server-cli-only&quot;</Code> to never be used in
      React Client Components.
    </p>
  );
}
