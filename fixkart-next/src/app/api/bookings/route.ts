import { NextRequest, NextResponse } from "next/server";
import { createBooking, getWorkerById } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { workerId, category, customerName, customerPhone, location, description, scheduledTime } = body;

    if (!workerId || !customerName || !customerPhone || !location) {
      return NextResponse.json(
        { error: "workerId, customerName, customerPhone, and location are required." },
        { status: 400 }
      );
    }

    const worker = await getWorkerById(workerId);
    if (!worker || !worker.isVerified || !worker.isActive) {
      return NextResponse.json(
        { error: "Worker not found or not yet verified." },
        { status: 400 }
      );
    }

    const booking = await createBooking({
      workerId,
      workerName: worker.name,
      category: category || worker.category,
      customerName,
      customerPhone,
      location,
      description: description || "",
      scheduledTime: scheduledTime || undefined,
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (err) {
    console.error("POST /api/bookings error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to create booking." },
      { status: 500 }
    );
  }
}
