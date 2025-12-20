import { UploadModal } from "@/components/UploadModal";
import { Navigation } from "@/components/layout/Navigation";
import { AuthModal } from "@/components/landing/AuthModal";
import { PostCard } from "@/components/PostCard";
import { 
  Search, 
  X,
  ArrowUpDown,
  Zap,
  Copy,
  Check
} from "lucide-react";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Mock data - replace with real data later
const mockPosts = [
  {
    id: "1",
    title: "Cyberpunk Cat",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400",
    prompt: "A futuristic cat, neon lights, 8k resolution, cyberpunk aesthetic, vibrant colors",
    model: "Midjourney",
    tags: ["art", "cyberpunk", "animals"],
    creator: {
      name: "Sarah Chen",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    rating: 4.8,
    outputPreview: "A stunning cyberpunk feline with glowing neon accents...",
    category: "Image",
  },
  {
    id: "2",
    title: "Code Generator",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400",
    prompt: "Generate a React component for a user dashboard with TypeScript",
    model: "GPT-4",
    tags: ["coding", "react", "typescript"],
    creator: {
      name: "Alex Martinez",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    successRate: 92,
    testCount: 15,
    outputPreview: "const Dashboard: React.FC = () => { ... }",
    category: "Coding",
  },
  {
    id: "3",
    title: "Marketing Copy",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
    prompt: "Write compelling marketing copy for a SaaS product launch",
    model: "Claude 3.5",
    tags: ["marketing", "copywriting", "saas"],
    creator: {
      name: "Emma Wilson",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    rating: 4.6,
    outputPreview: "Transform your workflow with our revolutionary SaaS platform...",
    category: "Marketing",
  },
  {
    id: "4",
    title: "Logo Design",
    image: "https://images.unsplash.com/photo-1611262588024-d12430b98920?w=400",
    prompt: "Create a modern logo for a tech startup, minimalist design",
    model: "DALL-E 3",
    tags: ["design", "logo", "branding"],
    creator: {
      name: "David Kim",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
    successRate: 84,
    testCount: 25,
    category: "Design",
  },
  {
    id: "5",
    title: "Data Analysis",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
    prompt: "Analyze sales data and provide insights with visualizations",
    model: "GPT-4",
    tags: ["data", "analysis", "business"],
    creator: {
      name: "Lisa Anderson",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    rating: 4.9,
    outputPreview: "Sales increased 23% QoQ with strongest growth in...",
    category: "Business",
  },
  {
    id: "6",
    title: "Product Description",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400",
    prompt: "Write a detailed product description for an e-commerce listing",
    model: "Claude 3.5",
    tags: ["ecommerce", "copywriting"],
    creator: {
      name: "Mike Johnson",
      avatar: "https://i.pravatar.cc/150?img=6",
    },
    successRate: 88,
    testCount: 12,
    category: "Marketing",
  },
];

const taskFilters = ["All", "SEO", "Coding", "Image", "Marketing", "Design", "Business"];
const modelFilters = ["All", "GPT-4", "Claude 3.5", "Midjourney", "DALL-E 3"];
const sortOptions = ["Most used", "Top rated", "Newest"];

export function Feed() {
  const [showUpload, setShowUpload] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState("Most used");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [copyingId, setCopyingId] = useState<string | null>(null);

  const openAuth = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const toggleTask = (task: string) => {
    if (task === "All") {
      setSelectedTasks([]);
    } else {
      setSelectedTasks((prev) =>
        prev.includes(task) ? prev.filter((t) => t !== task) : [...prev, task]
      );
    }
  };

  const toggleModel = (model: string) => {
    if (model === "All") {
      setSelectedModels([]);
    } else {
      setSelectedModels((prev) =>
        prev.includes(model) ? prev.filter((m) => m !== model) : [...prev, model]
      );
    }
  };

  const removeTask = (task: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedTasks((prev) => prev.filter((t) => t !== task));
  };

  const removeModel = (model: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedModels((prev) => prev.filter((m) => m !== model));
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopyingId(id);
    setTimeout(() => setCopyingId(null), 2000);
  };

  const filteredPosts = useMemo(() => {
    return mockPosts.filter((post) => {
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTask =
        selectedTasks.length === 0 ||
        selectedTasks.includes(post.category) ||
        post.tags.some((tag) =>
          selectedTasks.some((selected) => tag.toLowerCase() === selected.toLowerCase())
        );

      const matchesModel =
        selectedModels.length === 0 || selectedModels.includes(post.model);

      return matchesSearch && matchesTask && matchesModel;
    });
  }, [searchQuery, selectedTasks, selectedModels]);

  return (
    <div className="min-h-screen bg-[#030303]">
      {/* Navigation */}
      <Navigation onOpenAuth={openAuth} alwaysOpaque />

      {/* Feed Content */}
      <main className="container mx-auto px-6 md:px-8 lg:px-12 pt-24 pb-8">
        {/* Header Section */}
        <div className="max-w-4xl mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter text-white"
          >
            Discover Amazing <span className="text-white/40">Prompts</span>
          </motion.h1>
          <p className="text-white/40 text-lg font-light">
            Browse through a curated collection of high-performance instructions optimized by the community.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="sticky top-24 z-30 mb-12 space-y-4">
          <div className="relative group">
            <div className="absolute inset-0 bg-indigo-500/10 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
            <div className="relative flex items-center bg-[#0a0a0a] border border-white/10 rounded-2xl p-2 focus-within:border-indigo-500/50 transition-all">
              <Search className="w-5 h-5 text-white/20 ml-4" />
              <input 
                type="text" 
                placeholder="Search by keyword, tag, or use case..."
                className="w-full bg-transparent border-none py-3 px-4 text-white placeholder:text-white/20 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-2 text-white/40 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <div className="flex items-center gap-2 px-4 border-l border-white/5">
                <ArrowUpDown className="w-4 h-4 text-white/20" />
                <button
                  onClick={() => {
                    const currentIndex = sortOptions.indexOf(selectedSort);
                    const nextIndex = (currentIndex + 1) % sortOptions.length;
                    setSelectedSort(sortOptions[nextIndex]);
                  }}
                  className="text-xs font-bold text-white/40 uppercase tracking-widest hover:text-white/60 transition-colors"
                >
                  Sort: {selectedSort}
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-8 py-4 px-6 bg-[#0a0a0a]/50 backdrop-blur-md border border-white/5 rounded-2xl">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black uppercase text-white/20 tracking-[0.2em]">Task:</span>
              <div className="flex gap-2 flex-wrap">
                {taskFilters.map(task => {
                  const isSelected = selectedTasks.includes(task) || (task === "All" && selectedTasks.length === 0);
                  return (
                    <button
                      key={task}
                      onClick={() => toggleTask(task)}
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-bold transition-all border",
                        isSelected
                          ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20" 
                          : "bg-white/5 border-white/5 text-white/40 hover:text-white/60"
                      )}
                    >
                      {task}
                      {isSelected && task !== "All" && (
                        <X
                          className="w-3 h-3 inline-block ml-1.5"
                          onClick={(e) => removeTask(task, e)}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="h-4 w-px bg-white/5" />

            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black uppercase text-white/20 tracking-[0.2em]">Model:</span>
              <div className="flex gap-2 flex-wrap">
                {modelFilters.map(model => {
                  const isSelected = selectedModels.includes(model) || (model === "All" && selectedModels.length === 0);
                  return (
                    <button
                      key={model}
                      onClick={() => toggleModel(model)}
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-bold transition-all border",
                        isSelected
                          ? "bg-cyan-600 border-cyan-500 text-white shadow-lg shadow-cyan-500/20" 
                          : "bg-white/5 border-white/5 text-white/40 hover:text-white/60"
                      )}
                    >
                      {model}
                      {isSelected && model !== "All" && (
                        <X
                          className="w-3 h-3 inline-block ml-1.5"
                          onClick={(e) => removeModel(model, e)}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-8">
          <span className="text-xs font-bold text-white/20 uppercase tracking-[0.2em]">
            {filteredPosts.length} prompt{filteredPosts.length !== 1 ? "s" : ""} found
          </span>
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="relative">
                  <PostCard post={post} />
                  {/* Copy Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px] rounded-lg">
                    <button 
                      onClick={() => handleCopy(post.id, post.prompt)}
                      className="bg-green-500 hover:bg-green-400 text-white font-black px-6 py-3 rounded-2xl flex items-center gap-3 shadow-2xl transition-all active:scale-95"
                    >
                      {copyingId === post.id ? (
                        <>
                          <Check className="w-4 h-4" /> COPIED
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" /> COPY PROMPT
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredPosts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-white/60"
          >
            No prompts found. Try adjusting your filters.
          </motion.div>
        )}

        {/* Load More */}
        <div className="mt-20 flex justify-center">
          <button className="group flex items-center gap-4 px-8 py-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.05] transition-all">
            <span className="text-xs font-black uppercase tracking-[0.3em] text-white">Load More Insights</span>
            <motion.div animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
              <Zap className="w-4 h-4 text-indigo-500" />
            </motion.div>
          </button>
        </div>
      </main>

      {/* Upload Modal */}
      {showUpload && (
        <UploadModal onClose={() => setShowUpload(false)} />
      )}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </div>
  );
}
