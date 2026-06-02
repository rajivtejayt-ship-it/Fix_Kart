import { NextRequest, NextResponse } from "next/server";
import { getWorkers, addWorker } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || undefined;
  const location = searchParams.get("location") || undefined;

  const workers = await getWorkers({ category, location, verified: true });
  return NextResponse.json(workers);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, category, experience, charge, availability, location, skills, certifications, about, avatar } = body;

    if (!name || !category || !location) {
      return NextResponse.json({ error: "name, category, and location are required." }, { status: 400 });
    }

    const newWorker = await addWorker({
      name,
      category,
      experience: experience || "0 Years",
      charge: charge || "₹0",
      availability: availability || "To be confirmed",
      location,
      responseRate: "New on Platform",
      rating: "0.0",
      reviewsCount: 0,
      trustScore: 0,
      skills: Array.isArray(skills) ? skills : (skills || "").split(",").map((s: string) => s.trim()).filter(Boolean),
      certifications: Array.isArray(certifications) ? certifications : (certifications || "").split(",").map((s: string) => s.trim()).filter(Boolean),
      portfolio: [],
      about: about || "",
      avatar: avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
    });

    return NextResponse.json(newWorker, { status: 201 });
  } catch (err) {
    console.error("POST /api/workers error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to register worker." },
      { status: 500 }
    );
  }
}
