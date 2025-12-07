import { HeroGeometric } from "@/components/ui/shadcn-io/shape-landing-hero";
import { Navigation } from "@/components/layout/Navigation";
import { Feed } from "@/pages/Feed";
import { PostDetail } from "@/pages/PostDetail";
import { useEffect, useState } from "react";

function App() {

  // Simple routing based on URL hash
  const getCurrentPage = () => {
    const hash = window.location.hash;
    if (hash === "#/feed") return "feed";
    if (hash.startsWith("#/post/")) return "post";
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

  return (
    <div className="relative min-h-screen">
      {/* Navigation - positioned absolutely over the hero */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <Navigation />
      </div>

      {/* HeroGeometric Component */}
      <HeroGeometric
        badge="GitHub for AI Prompts"
        title1="Create, Test & Sell"
        title2="AI Prompts"
        description="Build prompts with variables, test them against real data, and sell high-performing prompts in our marketplace. The platform where prompt engineers thrive."
      />
    </div>
  );
}

export default App;
