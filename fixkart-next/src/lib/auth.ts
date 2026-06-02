// Client-side mock auth service (no real Firebase needed)
export interface AuthUser {
  uid: string;
  email: string;
  displayName: string;
  role: "customer" | "worker" | "admin";
  emailVerified: boolean;
}

export const authService = {
  loginWithEmail: async (email: string, password: string): Promise<AuthUser> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (email && password.length >= 6) {
      const user: AuthUser = {
        uid: "fk-" + Math.random().toString(36).substr(2, 9),
        email,
        displayName: email.split("@")[0].toUpperCase(),
        role: email.includes("admin") ? "admin" : "customer",
        emailVerified: true,
      };
      if (typeof window !== "undefined") {
        localStorage.setItem("fk_user", JSON.stringify(user));
      }
      return user;
    }
    throw new Error("Invalid credentials. Password must be at least 6 characters.");
  },

  registerWithEmail: async (
    email: string,
    password: string,
    displayName: string,
    role: "customer" | "worker"
  ): Promise<AuthUser> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (email && password.length >= 6) {
      const user: AuthUser = {
        uid: "fk-" + Math.random().toString(36).substr(2, 9),
        email,
        displayName: displayName || email.split("@")[0],
        role,
        emailVerified: true,
      };
      if (typeof window !== "undefined") {
        localStorage.setItem("fk_user", JSON.stringify(user));
      }
      return user;
    }
    throw new Error("Registration failed. Please verify your details.");
  },

  signOut: async (): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    if (typeof window !== "undefined") {
      localStorage.removeItem("fk_user");
    }
  },

  getCurrentUser: (): AuthUser | null => {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem("fk_user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
};
