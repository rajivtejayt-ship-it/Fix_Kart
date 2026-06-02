import { NextRequest, NextResponse } from "next/server";
import { getWorkerById } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const worker = await getWorkerById(id);
  if (!worker || !worker.isVerified || !worker.isActive) {
    return NextResponse.json({ error: "Worker not found." }, { status: 404 });
  }
  return NextResponse.json(worker);
}
