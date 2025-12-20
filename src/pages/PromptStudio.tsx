import { Navigation } from "@/components/layout/Navigation";
import { PromptStudio } from "@/components/landing/PromptStudio";
import { PromptVersionControl } from "@/components/landing/PromptVersionControl";
import { AuthModal } from "@/components/landing/AuthModal";
import { useState } from "react";

export function PromptStudioPage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  const openAuth = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#030303]">
      <Navigation onOpenAuth={openAuth} alwaysOpaque />
      <div className="pt-20">
        <PromptStudio />
        <PromptVersionControl />
      </div>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </div>
  );
}

