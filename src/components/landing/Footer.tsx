import React from 'react';
import { Twitter, Github, Linkedin, Mail } from 'lucide-react';
import logoFull from "@/assets/logo-full.png";
import logo from "@/assets/logo.png";

export const Footer: React.FC = () => {
  return (
    <footer className="pt-24 pb-12 border-t border-white/5 relative bg-[#030303]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <a href="#/" className="flex items-center">
                <img src={logo} alt="PromptPal" className="w-10 md:hidden" />
                <img
                  src={logoFull}
                  alt="PromptPal"
                  className="w-32 hidden md:block"
                />
              </a>
            </div>
            <p className="text-white/40 max-w-sm mb-8 leading-relaxed font-light">
              Empowering the next generation of AI engineers with the tools to build, refine, and monetize high-performance instructions.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6">Platform</h4>
            <ul className="space-y-4 text-white/40 font-light">
              <li><a href="#/feed" className="hover:text-white transition-colors">Prompt Feed</a></li>
              <li><a href="#marketplace" className="hover:text-white transition-colors">Marketplace</a></li>
              <li><a href="#optimizer" className="hover:text-white transition-colors">Optimization Studio</a></li>
              <li><a href="#benchmarking" className="hover:text-white transition-colors">Benchmarking</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Resources</h4>
            <ul className="space-y-4 text-white/40 font-light">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Prompt Engineering 101</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Model Comparison</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-white/40 font-light">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 text-sm text-white/20">
          <p>© 2024 PromptPal Inc. All rights reserved.</p>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <Mail className="w-4 h-4" />
            <span>hello@promptpal.ai</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

