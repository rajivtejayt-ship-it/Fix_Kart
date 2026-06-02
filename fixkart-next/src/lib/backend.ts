import { Worker, Booking } from "./types";

export function getBackendUrl(): string | null {
  const url = process.env.BACKEND_URL?.trim();
  return url ? url.replace(/\/$/, "") : null;
}

export function useRemoteBackend(): boolean {
  return Boolean(getBackendUrl());
}

interface RemoteWorker {
  id: string;
  name: string;
  category: string;
  avatarUrl: string;
  experience: string;
  hourlyCharge: number;
  availability: string;
  location: string;
  responseRate: string;
  rating: number;
  reviewsCount: number;
  trustScore: number;
  skillsJson: string;
  certificationsJson: string;
  portfolioJson: string;
  about: string;
  joinedAt?: string;
  isVerified: boolean;
  isActive: boolean;
}

function parseJsonArray(raw: string | null | undefined): string[] {
  try {
    const parsed = JSON.parse(raw || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function mapWorkerFromApi(w: RemoteWorker): Worker {
  return {
    id: w.id,
    name: w.name,
    category: w.category as Worker["category"],
    avatar: w.avatarUrl,
    experience: w.experience,
    charge: `₹${Math.round(w.hourlyCharge)}`,
    availability: w.availability,
    location: w.location || "",
    responseRate: w.responseRate,
    rating: String(w.rating),
    reviewsCount: w.reviewsCount,
    trustScore: w.trustScore,
    skills: parseJsonArray(w.skillsJson),
    certifications: parseJsonArray(w.certificationsJson),
    portfolio: parseJsonArray(w.portfolioJson),
    about: w.about,
    isVerified: w.isVerified,
    isActive: w.isActive,
    joinedAt: w.joinedAt,
  };
}

async function backendFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const base = getBackendUrl();
  if (!base) throw new Error("BACKEND_URL is not configured");

  const res = await fetch(`${base}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error || `Backend error ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export async function remoteGetWorkers(filters?: {
  category?: string;
  location?: string;
  verified?: boolean;
}): Promise<Worker[]> {
  const params = new URLSearchParams();
  if (filters?.category && filters.category !== "all") {
    params.set("category", filters.category);
  }
  if (filters?.location && filters.location !== "All Locations") {
    params.set("location", filters.location);
  }
  if (filters?.verified) {
    params.set("verifiedOnly", "true");
  }

  const qs = params.toString();
  const data = await backendFetch<RemoteWorker[]>(
    `/api/Workers${qs ? `?${qs}` : ""}`
  );
  return data.map(mapWorkerFromApi);
}

export async function remoteGetWorkerById(id: string): Promise<Worker | null> {
  try {
    const data = await backendFetch<RemoteWorker>(`/api/Workers/${id}`);
    return mapWorkerFromApi(data);
  } catch {
    return null;
  }
}

export async function remoteAddWorker(
  workerData: Omit<Worker, "id" | "isVerified" | "isActive" | "joinedAt">
): Promise<Worker> {
  const data = await backendFetch<RemoteWorker>("/api/Workers", {
    method: "POST",
    body: JSON.stringify({
      name: workerData.name,
      category: workerData.category,
      experience: workerData.experience,
      charge: workerData.charge,
      availability: workerData.availability,
      location: workerData.location,
      about: workerData.about,
      avatar: workerData.avatar,
      skills: workerData.skills,
      certifications: workerData.certifications,
    }),
  });
  return mapWorkerFromApi(data);
}

export async function remoteGetPendingWorkers(): Promise<Worker[]> {
  const data = await backendFetch<RemoteWorker[]>("/api/Admin/pending-approvals");
  return data.map(mapWorkerFromApi);
}

export async function remoteApproveWorker(id: string): Promise<Worker | null> {
  const data = await backendFetch<{ worker: RemoteWorker }>(
    `/api/Admin/approve/${id}`,
    { method: "POST" }
  );
  return data.worker ? mapWorkerFromApi(data.worker) : null;
}

export async function remoteRejectWorker(id: string): Promise<boolean> {
  await backendFetch(`/api/Admin/reject/${id}`, { method: "POST" });
  return true;
}

export async function remoteGetMetrics(): Promise<{
  totalWorkers: number;
  totalBookings: number;
  pendingApprovals: number;
  activeDispatches: number;
  dailyTransactionEscrow: number;
  platformDisputeRate: string;
  averageServiceETA: string;
}> {
  return backendFetch("/api/Admin/metrics");
}

export async function remoteCreateBooking(
  bookingData: Omit<Booking, "id" | "securityPin" | "createdAt" | "status">
): Promise<Booking> {
  const data = await backendFetch<Booking>("/api/Bookings", {
    method: "POST",
    body: JSON.stringify({
      workerId: bookingData.workerId,
      customerName: bookingData.customerName,
      customerPhone: bookingData.customerPhone,
      location: bookingData.location,
      description: bookingData.description,
      category: bookingData.category,
      scheduledTime: bookingData.scheduledTime,
    }),
  });
  return data;
}
