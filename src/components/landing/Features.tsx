import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, TrendingUp, Users, Terminal, Share2 } from 'lucide-react';

const features = [
  {
    icon: <Zap className="text-yellow-400" />,
    title: "AI Optimizer",
    description: "Transform raw ideas into complex, structured prompts automatically. Our engine improves reasoning and clarity."
  },
  {
    icon: <ShieldCheck className="text-green-400" />,
    title: "Reproducible Benchmarks",
    description: "Test prompts across GPT-4, Gemini 2.0, Claude 3.5, and DeepSeek in parallel. See what works best."
  },
  {
    icon: <TrendingUp className="text-indigo-400" />,
    title: "Monetize Skills",
    description: "Sell your top-performing prompts in our secure marketplace. High-value prompts stay obscured until purchase."
  },
  {
    icon: <Terminal className="text-cyan-400" />,
    title: "One-Click Export",
    description: "Perfectly formatted code for direct use in ChatGPT, Midjourney, or via API integrations."
  },
  {
    icon: <Users className="text-rose-400" />,
    title: "Community Curation",
    description: "Upvote effective prompts and follow top prompt engineers. The leaderboard defines the new standard."
  },
  {
    icon: <Share2 className="text-violet-400" />,
    title: "Version Control",
    description: "Iterate on your prompts. Track changes, branch ideas, and maintain a history of prompt evolution."
  }
];

export const Features: React.FC = () => {
  return (
    <div className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Engineering the Intelligence Layer
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/40 max-w-2xl mx-auto text-lg"
          >
            Powerful AI needs precise instructions. PromptPal gives you the tools to bridge the gap between vague intent and perfect execution.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] hover:bg-white/[0.04] transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/[0.05] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-white/40 leading-relaxed font-light">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

