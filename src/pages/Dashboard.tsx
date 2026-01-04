import { Navigation } from "@/components/layout/Navigation";
import { Dashboard } from "@/components/landing/Dashboard";
import { AuthModal } from "@/components/landing/AuthModal";
import { useState } from "react";

export function DashboardPage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  const openAuth = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-indigo-500/30">
      <Navigation onOpenAuth={openAuth} alwaysOpaque />
      <Dashboard />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </div>
  );
}

