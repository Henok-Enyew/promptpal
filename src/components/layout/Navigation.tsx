import logoFull from "@/assets/logo-full.png";
import logo from "@/assets/logo.png";
import { useState } from "react";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenuHandler = () => {
    setIsMenuOpen(true);
  };

  const closeMenuHandler = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-[#030303]/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 md:px-16 lg:px-24 xl:px-32 py-4 flex items-center justify-between">
          <a href="#/" className="flex items-center">
            <img src={logo} alt="PromptPal" className="w-10 md:hidden" />
            <img
              src={logoFull}
              alt="PromptPal"
              className="w-32 hidden md:block"
            />
          </a>

          <div className="hidden md:flex items-center gap-8 transition duration-500">
            <a
              href="#/feed"
              className="text-white hover:text-slate-300 transition"
            >
              Feed
            </a>
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

          <div className="flex items-center gap-4">
            <div className="hidden md:block space-x-3">
              <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 transition text-white rounded-md">
                Get started
              </button>
              <button className="text-white hover:bg-slate-300/20 transition px-6 py-2 border border-slate-400 rounded-md">
                Login
              </button>
            </div>

            <button
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
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[100] bg-black/60 backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <a href="#/feed" className="text-white" onClick={closeMenuHandler}>
          Feed
        </a>
        <a href="#marketplace" className="text-white" onClick={closeMenuHandler}>
          Marketplace
        </a>
        <a href="#studio" className="text-white" onClick={closeMenuHandler}>
          Prompt Studio
        </a>
        <a href="#docs" className="text-white" onClick={closeMenuHandler}>
          Docs
        </a>
        <a href="#pricing" className="text-white" onClick={closeMenuHandler}>
          Pricing
        </a>
        <button
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
    </>
  );
}

