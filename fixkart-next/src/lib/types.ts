export interface Worker {
  id: string;
  name: string;
  category: "electrician" | "plumber" | "mechanic" | "carpenter";
  avatar: string;
  experience: string;
  charge: string;
  availability: string;
  location: string;
  responseRate: string;
  rating: string;
  reviewsCount: number;
  trustScore: number;
  skills: string[];
  certifications: string[];
  portfolio: string[];
  about: string;
  isVerified: boolean;
  isActive: boolean;
  joinedAt?: string;
}

export interface Booking {
  id: string;
  workerId: string;
  workerName?: string;
  category: string;
  customerName: string;
  customerPhone: string;
  location: string;
  description: string;
  scheduledTime?: string;
  status: "Pending" | "Accepted" | "Dispatched" | "InProgress" | "Completed" | "Cancelled";
  securityPin: string;
  createdAt: string;
}

export interface Review {
  stars: number;
  reviewer: string;
  text: string;
  date: string;
  location?: string;
}

export type Category = "electrician" | "plumber" | "mechanic" | "carpenter";

export const CATEGORIES: Category[] = ["electrician", "plumber", "mechanic", "carpenter"];

export const LOCATIONS = [
  "All Locations",
  "Indiranagar, Bangalore",
  "Koramangala, Bangalore",
  "Whitefield, Bangalore",
  "Jayanagar, Bangalore",
  "Marathahalli, Bangalore",
  "Bellandur, Bangalore",
  "HSR Layout, Bangalore",
  "Electronic City, Bangalore",
  "Malleswaram, Bangalore",
  "Yelahanka, Bangalore",
  "Hebbal, Bangalore",
];
