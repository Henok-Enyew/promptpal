import { HeroGeometric } from "@/components/ui/shadcn-io/shape-landing-hero";
import { Navigation } from "@/components/layout/Navigation";
import { Feed } from "@/pages/Feed";
import { PostDetail } from "@/pages/PostDetail";
import { PromptStudioPage } from "@/pages/PromptStudio";
import { DashboardPage } from "@/pages/Dashboard";
import { Features } from "@/components/landing/Features";
import { OptimizerDemo } from "@/components/landing/OptimizerDemo";
import { MarketplacePreview } from "@/components/landing/MarketplacePreview";
import { BenchmarkingSection } from "@/components/landing/BenchmarkingSection";
import { PromptPulse } from "@/components/landing/PromptPulse";
import { PromptBlueprint } from "@/components/landing/PromptBlueprint";
import { PromptStudio } from "@/components/landing/PromptStudio";
import { PromptVersionControl } from "@/components/landing/PromptVersionControl";
import { Footer } from "@/components/landing/Footer";
import { AuthModal } from "@/components/landing/AuthModal";
import { useEffect, useState } from "react";

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  const openAuth = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  // Simple routing based on URL hash
  const getCurrentPage = () => {
    const hash = window.location.hash;
    if (hash === "#/feed") return "feed";
    if (hash.startsWith("#/post/")) return "post";
    if (hash === "#/studio" || hash === "#studio") return "studio";
    if (hash === "#/dashboard") return "dashboard";
    return "home"; // Default to home page with hero
  };

  const [page, setPage] = useState(getCurrentPage());

  // Listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      setPage(getCurrentPage());
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  if (page === "feed") {
    return <Feed />;
  }

  if (page === "post") {
    return <PostDetail />;
  }

  if (page === "studio") {
    return <PromptStudioPage />;
  }

  if (page === "dashboard") {
    return <DashboardPage />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#030303] text-white selection:bg-indigo-500/30">
      {/* Navigation - positioned absolutely over the hero */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <Navigation onOpenAuth={openAuth} />
      </div>

      <main>
        {/* HeroGeometric Component */}
        <HeroGeometric
          badge="GitHub for AI Prompts"
          title1="Create, Test & Sell"
          title2="High-Performance AI Prompts"
          description="PromptPal is the specialized marketplace and refinery for AI engineers. Stop guessing and start engineering prompts that actually deliver results."
          onOpenAuth={openAuth}
        />

        <PromptPulse />

        <section id="features">
          <Features />
        </section>

        <section id="studio">
          <PromptStudio />
        </section>

        <section id="versions">
          <PromptVersionControl />
        </section>

        <section id="blueprint">
          <PromptBlueprint />
        </section>

        <section id="optimizer">
          <OptimizerDemo />
        </section>

        <section id="benchmarking">
          <BenchmarkingSection />
        </section>

        <section id="marketplace">
          <MarketplacePreview />
        </section>
      </main>

      <Footer />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </div>
  );
}

export default App;
