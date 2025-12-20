import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Target, Shield, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

const layers = [
  {
    icon: <Layout className="w-5 h-5" />,
    name: "Persona & Context",
    color: "text-cyan-400",
    description: "Establishing 'Who' is writing. 'Act as a Senior Cloud Architect with 15 years experience...'"
  },
  {
    icon: <Target className="w-5 h-5" />,
    name: "Primary Objective",
    color: "text-indigo-400",
    description: "The core task. 'Analyze the provided AWS architecture and identify 3 potential single points of failure...'"
  },
  {
    icon: <Shield className="text-rose-400" />,
    name: "Constraints & Tone",
    color: "text-rose-400",
    description: "Defining boundaries. 'Focus on cost-efficiency. Output in a bulleted technical summary. No fluff.'"
  }
];

export const PromptBlueprint: React.FC = () => {
  return (
    <div className="py-32 bg-[#050505] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-xs font-black tracking-[0.4em] uppercase text-indigo-500 mb-4 block"
            >
              The Anatomy of Intelligence
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
            >
              The Blueprint for Perfection
            </motion.h2>
            <p className="text-white/40 text-lg font-light">
              High-quality LLM outputs aren't magic. They are the result of structured engineering. 
              We've broken down millions of prompts to find the winning pattern.
            </p>
          </div>

          <div className="relative">
            {/* Visual background lines */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/5 hidden md:block" />
            
            <div className="space-y-12">
              {layers.map((layer, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={cn(
                    "flex flex-col md:flex-row items-center gap-12",
                    idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  )}
                >
                  <div className="flex-1 text-center md:text-left">
                    <div className={cn("inline-flex p-4 rounded-3xl bg-white/[0.03] border border-white/5 mb-6", layer.color)}>
                      {layer.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{layer.name}</h3>
                    <p className="text-white/40 leading-relaxed font-light">{layer.description}</p>
                  </div>
                  
                  <div className="flex-1 relative group">
                    <div className="p-1 rounded-[2rem] bg-gradient-to-br from-white/10 to-transparent group-hover:from-white/20 transition-all duration-500">
                      <div className="bg-[#030303] rounded-[1.9rem] p-8 border border-white/5 font-mono text-xs text-white/20 overflow-hidden relative">
                         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02),transparent)] pointer-events-none" />
                         <span className={cn("opacity-100", layer.color)}># {layer.name.toUpperCase()}</span>
                         <br /><br />
                         {idx === 0 && "ACT AS A [ROLE] WITH [EXPERTISE]...\n\nCONTEXT: We are currently building a platform for [USER_BASE] who need help with [PROBLEM]."}
                         {idx === 1 && "YOUR GOAL IS TO [CORE_TASK].\n\nPROCESS:\n1. Analyze input\n2. Filter noise\n3. Generate high-fidelity output"}
                         {idx === 2 && "RESTRICTIONS:\n- No introductory text\n- Maximum [WORDS] limit\n- TONE: [PROFESSIONAL/DIRECT]"}
                         <motion.div 
                            animate={{ y: [0, 4, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute bottom-4 right-4"
                         >
                            <Layers className="w-4 h-4 opacity-10" />
                         </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

