import { getSomeServerCliOnlyData } from "@/data";
import { NextResponse, type NextRequest } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

/**
 * @see http://localhost:3000/api/edge
 */
export async function GET(request: NextRequest) {
  try {
    const data = await getSomeServerCliOnlyData(); // This is a server cli only function
    return NextResponse.json({ status: 200, timestamp: Date.now(), data});
  } catch (e: unknown) {
    return NextResponse.json(
      { e, status: 500, timestamp: Date.now() },
      { status: 500 },
    );
  }
}
