import Link from "next/link";
import ServerComponent from "../components/server.component";
import { Code } from "@/components/code.component";

export default function HomePage() {
  return (
    <>
      <h1 className="text-2xl font-bold"><Code>next-js-app-with-server-cli-only</Code></h1>
      <ServerComponent />
      <div className="max-w-3xl w-full flex flex-col gap-y-4 rounded-xl border border-b border-gray-300 bg-gray-200 bg-gradient-to-b from-zinc-200 p-4 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:dark:bg-zinc-800/30">
      <Link href="/api" className="underline">
        Loading this API route (<Code>&quot;/api&quot;</Code>) must return a 200.
      </Link>
      <Link href="/api/edge" className="underline">
      Loading this edge route (<Code>&quot;/api/edge&quot;</Code>) must return a 200.
      </Link>
      <Link href="/client" className="underline">
      Loading this Client Component Page (<Code>&quot;/client&quot;</Code>) must fail.
      </Link>
      </div>
    </>
  );
}
