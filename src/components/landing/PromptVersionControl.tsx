import React from 'react';
import { motion } from 'framer-motion';
import { GitBranch, GitCommit, GitMerge, Clock, Check, X } from 'lucide-react';

export const PromptVersionControl: React.FC = () => {
  return (
    <div className="py-24 bg-[#030303] relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-2/5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-6"
            >
              <GitBranch className="w-3 h-3" /> Branch: production
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              The GitHub for <br />
              <span className="text-indigo-400 italic">Intelligent Prompts</span>
            </h2>
            <p className="text-white/40 text-lg mb-8 leading-relaxed font-light">
              Stop overwriting your progress. PromptPal tracks every iteration. Branch off new ideas, compare versions with semantic diffs, and rollback to known-good prompts with one click.
            </p>

            <div className="space-y-6">
              {[
                { icon: <GitCommit className="w-4 h-4" />, title: "Full Audit Logs", desc: "Every change is logged with metadata." },
                { icon: <GitMerge className="w-4 h-4" />, title: "Collaborative PRs", desc: "Review prompt changes before they hit production." },
                { icon: <Clock className="w-4 h-4" />, title: "Time Travel", desc: "Instantly restore any version from your history." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-indigo-400">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-white/40">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-3/5 w-full">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="rounded-[2.5rem] border border-white/10 bg-[#0a0a0a] shadow-2xl overflow-hidden"
            >
              {/* Diff Header */}
              <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-[8px] font-bold border border-[#0a0a0a]">JD</div>
                    <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center text-[8px] font-bold border border-[#0a0a0a]">AL</div>
                  </div>
                  <span className="text-xs font-mono text-white/40">Compare: <span className="text-white">v1.2.0</span> ... <span className="text-white">v1.3.0</span></span>
                </div>
                <div className="flex gap-2">
                   <div className="flex items-center gap-1 text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
                     <Check className="w-3 h-3" /> +12
                   </div>
                   <div className="flex items-center gap-1 text-[10px] font-bold text-rose-400 bg-rose-400/10 px-2 py-0.5 rounded-full">
                     <X className="w-3 h-3" /> -4
                   </div>
                </div>
              </div>

              {/* Diff Body */}
              <div className="p-8 font-mono text-xs leading-6 overflow-hidden">
                <div className="flex gap-4 opacity-40">
                  <span className="w-4 text-white/20">1</span>
                  <span>ACT AS A PROFESSIONAL MARKETER.</span>
                </div>
                <div className="flex gap-4 bg-rose-500/10 border-l-2 border-rose-500">
                  <span className="w-4 text-rose-500/50 pl-2">- 2</span>
                  <span className="text-rose-200/60 line-through">WRITE A PRODUCT DESCRIPTION FOR A NEW WATCH.</span>
                </div>
                <div className="flex gap-4 bg-emerald-500/10 border-l-2 border-emerald-500">
                  <span className="w-4 text-emerald-500/50 pl-2">+ 2</span>
                  <span className="text-emerald-200">AS A SENIOR PRODUCT COPYWRITER, DRAFT A COMPELLING DESCRIPTION FOR THE 'AERO-X' LUXURY TIMEPIECE.</span>
                </div>
                <div className="flex gap-4 opacity-40">
                  <span className="w-4 text-white/20">3</span>
                  <span>TONE: PROFESSIONAL AND LUXURIOUS.</span>
                </div>
                <div className="flex gap-4 bg-emerald-500/10 border-l-2 border-emerald-500">
                  <span className="w-4 text-emerald-500/50 pl-2">+ 4</span>
                  <span className="text-emerald-200">AUDIENCE: HIGH-NET-WORTH COLLECTORS (HNWI).</span>
                </div>
                <div className="flex gap-4 bg-emerald-500/10 border-l-2 border-emerald-500">
                  <span className="w-4 text-emerald-500/50 pl-2">+ 5</span>
                  <span className="text-emerald-200">FORMAT: BULLET POINTS FOR FEATURES + 1 NARRATIVE PARAGRAPH.</span>
                </div>
                <div className="flex gap-4 opacity-40">
                  <span className="w-4 text-white/20">6</span>
                  <span>MAX LENGTH: 200 WORDS.</span>
                </div>
              </div>

              {/* Commit Message Box */}
              <div className="m-6 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="flex items-center gap-3 mb-2">
                  <GitCommit className="w-4 h-4 text-white/20" />
                  <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">Commit Message</span>
                </div>
                <p className="text-sm text-white/80">"feat: optimize for luxury audience context and add multi-modal constraints"</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[10px] text-white/20">Hash: 8f2b1a9</span>
                  <button className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-widest">Approve & Merge</button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

