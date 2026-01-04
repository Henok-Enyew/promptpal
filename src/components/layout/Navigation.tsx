import logoFull from "@/assets/logo-full.png";
import logo from "@/assets/logo.png";
import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { LayoutGrid, Zap, BookOpen, DollarSign, User, LogOut, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

type NavigationProps = {
  onOpenAuth?: (mode: 'login' | 'signup') => void;
  alwaysOpaque?: boolean; // If true, always show background (for non-homepage pages)
};

export function Navigation({ onOpenAuth, alwaysOpaque = false }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  useEffect(() => {
    if (alwaysOpaque) {
      setIsScrolled(true);
      return;
    }
    return scrollY.on('change', (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY, alwaysOpaque]);

  // Close user menu when clicking outside
  useEffect(() => {
    if (!isUserMenuOpen) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.user-menu-container')) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserMenuOpen]);

  const openMenuHandler = () => {
    setIsMenuOpen(true);
  };

  const closeMenuHandler = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: 'Feed', href: '#/feed', icon: <LayoutGrid className="w-4 h-4" /> },
    { name: 'Marketplace', href: '#marketplace', icon: <DollarSign className="w-4 h-4" /> },
    { name: 'Prompt Studio', href: '#/studio', icon: <Zap className="w-4 h-4" /> },
    { name: 'Docs', href: '#', icon: <BookOpen className="w-4 h-4" /> },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      setIsUserMenuOpen(false);
      window.location.hash = '#/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
          isScrolled 
            ? "bg-[#030303]/80 backdrop-blur-md border-white/10 py-3" 
            : "bg-transparent border-transparent py-5"
        )}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <a href="#/" className="flex items-center group cursor-pointer">
            <img src={logo} alt="PromptPal" className="w-10 md:hidden" />
            <img
              src={logoFull}
              alt="PromptPal"
              className="w-32 hidden md:block"
            />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-white/60 hover:text-white transition-colors flex items-center gap-2"
              >
                {item.icon}
                {item.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {isLoading ? (
              <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
            ) : isAuthenticated && user ? (
              <div className="relative user-menu-container">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-3 p-1 pr-3 rounded-full bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] transition-all"
                >
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt={user.fullName || user.firstName}
                      className="w-8 h-8 rounded-full border border-white/10"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center font-bold text-xs text-white">
                      {user.firstName?.[0] || user.email?.[0] || 'U'}
                    </div>
                  )}
                  <span className="text-xs font-bold text-white/80 hidden sm:block">
                    {user.firstName || user.email?.split('@')[0] || 'User'}
                  </span>
                  <ChevronDown className={cn("w-3 h-3 text-white/40 transition-transform", isUserMenuOpen && "rotate-180")} />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-[#0a0a0a] border border-white/10 rounded-2xl p-2 shadow-2xl backdrop-blur-xl z-50">
                    <a
                      href="#/dashboard"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all"
                    >
                      <User className="w-4 h-4" /> Dashboard
                    </a>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-rose-400 hover:bg-rose-400/10 transition-all"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : onOpenAuth ? (
              <>
                <button 
                  onClick={() => onOpenAuth('login')}
                  className="hidden sm:block text-sm font-medium text-white/60 hover:text-white transition-colors px-4 py-2"
                >
                  Login
                </button>
                <button 
                  onClick={() => onOpenAuth('signup')}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
                >
                  Get Started
                </button>
              </>
            ) : (
              <div className="hidden md:block space-x-3">
                <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 transition text-white rounded-md">
                  Get started
                </button>
                <button className="text-white hover:bg-slate-300/20 transition px-6 py-2 border border-slate-400 rounded-md">
                  Login
                </button>
              </div>
            )}

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
      </motion.nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[100] bg-black/60 backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {navItems.map((item) => (
          <a 
            key={item.name}
            href={item.href} 
            className="text-white flex items-center gap-2" 
            onClick={closeMenuHandler}
          >
            {item.icon}
            {item.name}
          </a>
        ))}
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

