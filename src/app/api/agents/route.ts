import { NextResponse } from "next/server";
import { getAgents } from "@/lib/agents";

export async function GET() {
  const agents = getAgents().map(({ systemPrompt, ...rest }) => rest);
  return NextResponse.json(agents);
}
