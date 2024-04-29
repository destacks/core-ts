"use client";

import { Code } from "@/components/code.component";
import Link from "next/link";
import { getSomeServerCliOnlyData } from "@/data";
import { useEffect, useState } from "react";

export default function ClientPage() {
  const [data, setData] = useState<string>("n/a");

  useEffect(() => {
    getSomeServerCliOnlyData().then((receivedData) => {
      setData(receivedData);
    });
  }, []);

  return (
    <>
      <p className="rounded-xl border border-b border-gray-300 bg-gray-200 bg-gradient-to-b from-zinc-200 p-4 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:dark:bg-zinc-800/30">
        If you can read this message, something went wrong. Loading this Client
        Component Page, which tries to load the following string{" "}
        <Code>
          &quot;
          {data}&quot;
        </Code>{" "}
        coming from a pseudo server data layer secured with{" "}
        <Code>import&nbsp;&quot;server-cli-only&quot;</Code> MUST throw an
        error.
      </p>
      <Link href="/" className="underline">
        Go to home page (<Code>&quot;/&quot;</Code>).
      </Link>
    </>
  );
}
