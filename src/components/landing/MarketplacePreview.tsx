import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, ShoppingCart, Eye } from 'lucide-react';

const featuredPrompts = [
  {
    title: "Master SEO Strategist",
    category: "Marketing",
    price: "$14.99",
    author: "PromptKing",
    rating: 4.9,
    reviews: 128,
    model: "GPT-4o",
    image: "https://picsum.photos/seed/seo/400/300"
  },
  {
    title: "Photorealistic Architecture",
    category: "Midjourney",
    price: "Free",
    author: "PixelWizard",
    rating: 4.8,
    reviews: 842,
    model: "v6.1",
    image: "https://picsum.photos/seed/arch/400/300"
  },
  {
    title: "Clean Code Python Refactor",
    category: "Coding",
    price: "$9.00",
    author: "DevArchitect",
    rating: 5.0,
    reviews: 45,
    model: "Claude 3.5 Sonnet",
    image: "https://picsum.photos/seed/code/400/300"
  },
  {
    title: "Brand Voice Generator",
    category: "Business",
    price: "$19.99",
    author: "CopyPro",
    rating: 4.7,
    reviews: 210,
    model: "Gemini 1.5 Pro",
    image: "https://picsum.photos/seed/brand/400/300"
  }
];

export const MarketplacePreview: React.FC = () => {
  return (
    <div className="py-24" id="marketplace">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">The Prompt Economy</h2>
            <p className="text-white/40 text-lg font-light max-w-xl">Join thousands of creators selling high-value, tested instructions.</p>
          </div>
          <button className="text-sm font-semibold bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-xl transition-all">
            Explore Full Marketplace
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPrompts.map((prompt, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white/[0.02] border border-white/[0.05] rounded-3xl overflow-hidden hover:border-white/[0.1] transition-all"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={prompt.image} 
                  alt={prompt.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-[#030303]/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-white/80">{prompt.category}</span>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <button className="p-2 rounded-full bg-[#030303]/60 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors">
                    <Heart className="w-3 h-3" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-medium text-white/40">{prompt.model}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-bold">{prompt.rating}</span>
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-4 line-clamp-1 group-hover:text-cyan-400 transition-colors">{prompt.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-white/90">{prompt.price}</span>
                  <button className="bg-white/5 hover:bg-indigo-600 p-3 rounded-xl transition-all group/btn">
                    <ShoppingCart className="w-4 h-4 group-hover/btn:scale-110" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

