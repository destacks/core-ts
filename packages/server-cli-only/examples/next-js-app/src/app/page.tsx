import Link from "next/link";
import ServerComponent from "../components/server.component";
import { Code } from "@/components/code.component";

export default function HomePage() {
  return (
    <>
      <ServerComponent />
      <Link href="/client" className="underline">
        Loading following page (<Code>&quot;/client&quot;</Code>) - being a
        client component - MUST fail.
      </Link>
    </>
  );
}
