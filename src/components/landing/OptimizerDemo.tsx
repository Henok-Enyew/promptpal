import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Copy, RefreshCw, Check, ArrowRight } from 'lucide-react';

export const OptimizerDemo: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const optimizePrompt = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    try {
      // Simulated optimization - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setOutput(`Act as a professional writer and generate a comprehensive guide about "${input}". 

The guide should:
- Be well-structured with clear sections
- Include practical examples and actionable insights
- Maintain a professional yet engaging tone
- Provide value to readers seeking expertise in this area

Format the output as markdown with appropriate headings and bullet points.`);
    } catch (error) {
      setOutput("Please set your API key in the environment to test this demo. (Simulated output): Act as a professional writer and generate a comprehensive [TOPIC] guide...");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-24 bg-gradient-to-b from-transparent to-indigo-500/[0.02]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-xs font-bold mb-6"
            >
              <Sparkles className="w-3 h-3" />
              LIVE OPTIMIZER
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
            >
              From Rough Idea to <br />
              <span className="text-indigo-400 underline decoration-indigo-400/30">Masterful Execution</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/40 text-lg mb-8 leading-relaxed font-light"
            >
              Most users struggle because their prompts are too brief. Our AI-assisted optimizer expands your intent into professional-grade instructions with variables and context.
            </motion.p>
            
            <ul className="space-y-4 mb-8">
              {["Explainable Improvements", "Multi-model Tuning", "One-click Copy"].map((item, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="flex items-center gap-3 text-white/70"
                >
                  <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-indigo-400" />
                  </div>
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-1 rounded-[2.5rem] bg-gradient-to-br from-indigo-500/20 via-white/5 to-cyan-500/20 shadow-2xl"
          >
            <div className="bg-[#030303] rounded-[2.3rem] p-6 sm:p-10 h-full">
              <div className="mb-6">
                <label className="text-sm font-semibold text-white/40 block mb-3 uppercase tracking-wider">Raw Input</label>
                <div className="relative group">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="e.g., 'Write a marketing email for a tech product'"
                    className="w-full h-32 bg-white/[0.03] border border-white/[0.1] rounded-2xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 transition-all resize-none group-hover:bg-white/[0.05]"
                  />
                  <button
                    onClick={optimizePrompt}
                    disabled={isLoading || !input.trim()}
                    className="absolute bottom-4 right-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/20"
                  >
                    {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    Optimize
                  </button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {output ? (
                  <motion.div
                    key="output"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="relative"
                  >
                    <label className="text-sm font-semibold text-cyan-400 block mb-3 uppercase tracking-wider">Refined Prompt</label>
                    <div className="w-full bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-6 text-white/80 font-mono text-sm leading-relaxed max-h-64 overflow-y-auto whitespace-pre-wrap">
                      {output}
                    </div>
                    <button
                      onClick={copyToClipboard}
                      className="absolute top-10 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-white/5 rounded-2xl text-white/20">
                    <p className="text-sm">Optimized prompt will appear here</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

