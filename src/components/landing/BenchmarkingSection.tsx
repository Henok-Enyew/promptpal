import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CheckCircle2 } from 'lucide-react';

const data = [
  { name: 'GPT-4o', score: 92, fill: '#10b981' },
  { name: 'Claude 3.5', score: 88, fill: '#f59e0b' },
  { name: 'Gemini 1.5 Pro', score: 90, fill: '#3b82f6' },
  { name: 'DeepSeek v3', score: 85, fill: '#8b5cf6' },
];

export const BenchmarkingSection: React.FC = () => {
  return (
    <div className="py-24 bg-[#050505]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] shadow-2xl relative"
            >
              <div className="mb-8">
                <h4 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-2">Live Benchmark Test</h4>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs text-white/60">Comparing performance on 'Creative Narrative' task</span>
                </div>
              </div>
              
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
                    <XAxis type="number" hide />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      stroke="#ffffff40" 
                      fontSize={12} 
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip 
                      cursor={{ fill: 'transparent' }}
                      contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px' }}
                    />
                    <Bar dataKey="score" radius={[0, 8, 8, 0]} barSize={32}>
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} fillOpacity={0.4} stroke={entry.fill} strokeWidth={2} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          <div className="lg:w-1/2 order-1 lg:order-2">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
            >
              Stop Guessing. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400">Measure Results.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white/40 text-lg mb-8 leading-relaxed font-light"
            >
              Not all LLMs are created equal. Use our benchmarking studio to test your prompt across 10+ state-of-the-art models simultaneously.
            </motion.p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Objective Quality Scores",
                "Model-Specific Hints",
                "Latent Cost Analysis",
                "A/B Prompt Testing"
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05]">
                  <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                  <span className="text-sm font-medium text-white/80">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

