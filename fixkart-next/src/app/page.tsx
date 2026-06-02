import { Navbar } from "@/components/shared/Navbar";
import { Hero } from "@/components/marketing/Hero";
import { ProblemSolution } from "@/components/marketing/ProblemSolution";
import { FeatureShowcase } from "@/components/marketing/FeatureShowcase";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { WorkerShowcase } from "@/components/marketing/WorkerShowcase";
import { TrustReviews } from "@/components/marketing/TrustReviews";
import { Benefits } from "@/components/marketing/Benefits";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <ProblemSolution />
      <FeatureShowcase />
      <HowItWorks />
      <WorkerShowcase />
      <TrustReviews />
      <Benefits />
    </div>
  );
}
