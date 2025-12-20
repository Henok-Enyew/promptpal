import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, User } from 'lucide-react';

const promptItems = [
  { before: "Write a job post", after: "Act as a Talent Acquisition Manager... [STRICT: No buzzwords]", author: "HRNinja" },
  { before: "Fix this code", after: "Refactor this React hook using the Command Pattern...", author: "DevGod" },
  { before: "Logo idea", after: "Minimalist vector concept, Swiss design, primary colors...", author: "Vectra" },
  { before: "Market plan", after: "CMO-level Q3 roadmap with GTM milestones and CAC analysis...", author: "Stratego" },
  { before: "Fix job post", after: "Optimize for Gen-Z engagement, salary transparency focused...", author: "TalentHub" },
  { before: "Review email", after: "Tone: Conciliatory but firm. Target: Enterprise client...", author: "BizWriter" },
];

export const PromptPulse: React.FC = () => {
  return (
    <div className="py-12 border-y border-white/5 bg-[#030303] overflow-hidden">
      <div className="container mx-auto px-6 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[10px] font-black uppercase tracking-widest">
            <Zap className="w-3 h-3 fill-rose-500" /> Live Feed
          </div>
          <h3 className="text-white/60 text-xs font-bold uppercase tracking-widest">Recent Refinements</h3>
        </div>
        <div className="hidden sm:flex items-center gap-1 text-white/20 text-[10px] font-bold uppercase tracking-widest">
          <span>Global Engineering Activity</span>
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map(i => <div key={i} className="w-0.5 h-3 bg-white/20" style={{ height: `${Math.random()*12 + 4}px` }} />)}
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#030303] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#030303] to-transparent z-10" />
        
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-4 whitespace-nowrap"
        >
          {[...promptItems, ...promptItems].map((item, idx) => (
            <div 
              key={idx}
              className="flex-shrink-0 flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] group hover:bg-white/[0.05] transition-all cursor-default"
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] text-white/30 italic">"{item.before}"</span>
                  <ArrowRight className="w-3 h-3 text-indigo-500 group-hover:translate-x-1 transition-transform" />
                  <span className="text-xs font-mono text-cyan-400 font-medium">{item.after}</span>
                </div>
                <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <User className="w-2.5 h-2.5 text-white/20" />
                  <span className="text-[9px] text-white/20 font-bold uppercase">{item.author}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

