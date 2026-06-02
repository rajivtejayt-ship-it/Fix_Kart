import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { LocationProvider } from "@/components/shared/LocationProvider";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "FixKart | Smart Local Services Marketplace",
  description: "FixKart connects you with verified local service workers like plumbers, electricians, and mechanics instantly. Quick, reliable, and secure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LocationProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LocationProvider>
      </body>
    </html>
  );
}
