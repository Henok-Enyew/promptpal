import { Navigation } from "@/components/layout/Navigation";
import { PromptStudio } from "@/components/landing/PromptStudio";
import { PromptVersionControl } from "@/components/landing/PromptVersionControl";

export function PromptStudioPage() {
  return (
    <div className="min-h-screen bg-[#030303]">
      <Navigation />
      <div className="pt-20">
        <PromptStudio />
        <PromptVersionControl />
      </div>
    </div>
  );
}

