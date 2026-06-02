import { NextRequest, NextResponse } from "next/server";
import { getPendingWorkers, updateWorker, deleteWorker, getMetrics } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");

  if (action === "pending") {
    return NextResponse.json(await getPendingWorkers());
  }

  if (action === "metrics") {
    return NextResponse.json(await getMetrics());
  }

  return NextResponse.json({ error: "Invalid action." }, { status: 400 });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, id } = body;

    if (!action || !id) {
      return NextResponse.json({ error: "action and id are required." }, { status: 400 });
    }

    if (action === "approve") {
      const updated = await updateWorker(id, { isVerified: true });
      if (!updated) return NextResponse.json({ error: "Worker not found." }, { status: 404 });
      return NextResponse.json({ message: `Worker ${id} approved.`, worker: updated });
    }

    if (action === "reject") {
      const removed = await deleteWorker(id);
      if (!removed) return NextResponse.json({ error: "Worker not found." }, { status: 404 });
      return NextResponse.json({ message: `Worker ${id} rejected and removed.` });
    }

    return NextResponse.json({ error: "Unknown action." }, { status: 400 });
  } catch (err) {
    console.error("POST /api/admin error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Admin action failed." },
      { status: 500 }
    );
  }
}
