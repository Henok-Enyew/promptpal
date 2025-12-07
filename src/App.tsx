import { useState } from "react";
import { HeroGeometric } from "@/components/ui/shadcn-io/shape-landing-hero";
import logoFull from "@/assets/logo-full.png";
import logo from "@/assets/logo.png";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenuHandler = () => {
    setIsMenuOpen(true);
  };

  const closeMenuHandler = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="relative min-h-screen">
      {/* Navigation - positioned absolutely over the hero */}
      <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur">
        <a href="/" className="flex items-center">
          <img src={logo} alt="PromptPal" className="w-10 md:hidden" />
          <img
            src={logoFull}
            alt="PromptPal"
            className="w-32 hidden md:block"
          />
        </a>

        <div className="hidden md:flex items-center gap-8 transition duration-500">
          <a
            href="#marketplace"
            className="text-white hover:text-slate-300 transition"
          >
            Marketplace
          </a>
          <a
            href="#studio"
            className="text-white hover:text-slate-300 transition"
          >
            Prompt Studio
          </a>
          <a
            href="#docs"
            className="text-white hover:text-slate-300 transition"
          >
            Docs
          </a>
          <a
            href="#pricing"
            className="text-white hover:text-slate-300 transition"
          >
            Pricing
          </a>
        </div>

        <div className="hidden md:block space-x-3">
          <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 transition text-white rounded-md">
            Get started
          </button>
          <button className="text-white hover:bg-slate-300/20 transition px-6 py-2 border border-slate-400 rounded-md">
            Login
          </button>
        </div>

        <button
          id="open-menu"
          onClick={openMenuHandler}
          className="md:hidden active:scale-90 transition text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-menu-icon lucide-menu"
          >
            <path d="M4 5h16" />
            <path d="M4 12h16" />
            <path d="M4 19h16" />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-navLinks"
        className={`fixed inset-0 z-[100] bg-black/60 backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <a href="#marketplace" className="text-white">
          Marketplace
        </a>
        <a href="#studio" className="text-white">
          Prompt Studio
        </a>
        <a href="#docs" className="text-white">
          Docs
        </a>
        <a href="#pricing" className="text-white">
          Pricing
        </a>
        <button
          id="close-menu"
          onClick={closeMenuHandler}
          className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-slate-100 hover:bg-slate-200 transition text-black rounded-md flex"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-x-icon lucide-x"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
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
