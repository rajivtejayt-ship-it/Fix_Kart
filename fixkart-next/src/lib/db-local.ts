import fs from "fs";
import path from "path";
import { Worker, Booking } from "./types";

const DB_PATH = path.join(process.cwd(), "src/data/workers.json");

interface DB {
  workers: Worker[];
  bookings: Booking[];
}

function readDB(): DB {
  const raw = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(raw);
}

function writeDB(data: DB): void {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export function getWorkers(filters?: {
  category?: string;
  location?: string;
  verified?: boolean;
}): Worker[] {
  const db = readDB();
  let workers = db.workers;

  if (filters?.category && filters.category !== "all") {
    workers = workers.filter(
      (w) => w.category.toLowerCase() === filters.category!.toLowerCase()
    );
  }

  if (filters?.location && filters.location !== "All Locations") {
    workers = workers.filter((w) =>
      w.location.toLowerCase().includes(filters.location!.toLowerCase().split(",")[0].toLowerCase())
    );
  }

  if (filters?.verified !== undefined) {
    workers = workers.filter((w) => w.isVerified === filters.verified);
  }

  return workers.filter((w) => w.isActive);
}

export function getWorkerById(id: string): Worker | null {
  const db = readDB();
  return db.workers.find((w) => w.id === id) || null;
}

export function addWorker(
  workerData: Omit<Worker, "id" | "isVerified" | "isActive" | "joinedAt">
): Worker {
  const db = readDB();
  const newWorker: Worker = {
    ...workerData,
    id: `worker-${Date.now()}`,
    isVerified: false,
    isActive: true,
    joinedAt: new Date().toISOString().split("T")[0],
    rating: "0.0",
    reviewsCount: 0,
    trustScore: 0,
    portfolio: workerData.portfolio || [],
  };
  db.workers.push(newWorker);
  writeDB(db);
  return newWorker;
}

export function updateWorker(id: string, updates: Partial<Worker>): Worker | null {
  const db = readDB();
  const idx = db.workers.findIndex((w) => w.id === id);
  if (idx === -1) return null;
  db.workers[idx] = { ...db.workers[idx], ...updates };
  writeDB(db);
  return db.workers[idx];
}

export function deleteWorker(id: string): boolean {
  const db = readDB();
  const idx = db.workers.findIndex((w) => w.id === id);
  if (idx === -1) return false;
  db.workers.splice(idx, 1);
  writeDB(db);
  return true;
}

export function getPendingWorkers(): Worker[] {
  const db = readDB();
  return db.workers.filter((w) => !w.isVerified && w.isActive);
}

export function getBookings(): Booking[] {
  const db = readDB();
  return db.bookings;
}

export function createBooking(
  bookingData: Omit<Booking, "id" | "securityPin" | "createdAt" | "status">
): Booking {
  const db = readDB();
  const newBooking: Booking = {
    ...bookingData,
    id: `booking-${Date.now()}`,
    status: "Pending",
    securityPin: String(Math.floor(1000 + Math.random() * 9000)),
    createdAt: new Date().toISOString(),
  };
  db.bookings.push(newBooking);
  writeDB(db);
  return newBooking;
}
