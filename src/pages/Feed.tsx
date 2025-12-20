import { PostCard } from "@/components/PostCard";
import { UploadModal } from "@/components/UploadModal";
import { Navigation } from "@/components/layout/Navigation";
import { Search, X } from "lucide-react";
import { useState } from "react";

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
  },
];

const taskFilters = ["All", "SEO", "Coding", "Image", "Marketing", "Design"];
const modelFilters = ["All", "GPT-4", "Claude 3.5", "Midjourney", "DALL-E 3"];
const sortOptions = ["Most used", "Top rated", "Newest"];

export function Feed() {
  const [showUpload, setShowUpload] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState("Most used");

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

  const filteredPosts = mockPosts.filter((post) => {
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTask =
      selectedTasks.length === 0 ||
      post.tags.some((tag) =>
        selectedTasks.some((selected) => tag.toLowerCase() === selected.toLowerCase())
      );

    const matchesModel =
      selectedModels.length === 0 || selectedModels.includes(post.model);

    return matchesSearch && matchesTask && matchesModel;
  });

  return (
    <div className="min-h-screen bg-[#030303]">
      {/* Navigation */}
      <Navigation alwaysOpaque />

      {/* Feed Content */}
      <main className="container mx-auto px-6 md:px-8 lg:px-12 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Discover Amazing Prompts
          </h1>
          <p className="text-white/60">
            Browse through a collection of high-quality AI prompts
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Search by keyword, tag, or use case..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#62FE7A] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Filters - Horizontal Layout */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-lg">
          {/* Task Filter */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-white/80 whitespace-nowrap flex-shrink-0">Task:</span>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide flex-1">
                {taskFilters.map((task) => {
                  const isSelected = selectedTasks.includes(task);
                  return (
                    <button
                      key={task}
                      onClick={() => toggleTask(task)}
                      className={`
                        px-3 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap flex-shrink-0 flex items-center gap-1.5 relative
                        ${
                          isSelected
                            ? "bg-[#62FE7A] text-black shadow-lg shadow-[#62FE7A]/20"
                            : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                        }
                      `}
                    >
                      <span>{task}</span>
                      {isSelected && task !== "All" && (
                        <X
                          className="w-3 h-3 flex-shrink-0"
                          onClick={(e) => removeTask(task, e)}
                        />
                      )}
                      {!isSelected && task !== "All" && (
                        <span className="w-3 h-3 flex-shrink-0"></span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-8 bg-white/10 flex-shrink-0"></div>

          {/* Model Filter */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-white/80 whitespace-nowrap flex-shrink-0">Model:</span>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide flex-1">
                {modelFilters.map((model) => {
                  const isSelected = selectedModels.includes(model);
                  return (
                    <button
                      key={model}
                      onClick={() => toggleModel(model)}
                      className={`
                        px-3 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap flex-shrink-0 flex items-center gap-1.5 relative
                        ${
                          isSelected
                            ? "bg-[#62FE7A] text-black shadow-lg shadow-[#62FE7A]/20"
                            : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                        }
                      `}
                    >
                      <span>{model}</span>
                      {isSelected && model !== "All" && (
                        <X
                          className="w-3 h-3 flex-shrink-0"
                          onClick={(e) => removeModel(model, e)}
                        />
                      )}
                      {!isSelected && model !== "All" && (
                        <span className="w-3 h-3 flex-shrink-0"></span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-8 bg-white/10 flex-shrink-0"></div>

          {/* Sort Options */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="text-sm font-medium text-white/80 whitespace-nowrap">Sort:</span>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {sortOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setSelectedSort(option)}
                  className={`
                    px-3 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap flex-shrink-0
                    ${
                      selectedSort === option
                        ? "bg-[#62FE7A] text-black shadow-lg shadow-[#62FE7A]/20"
                        : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                    }
                  `}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-4 text-sm text-white/60">
          {filteredPosts.length} prompt{filteredPosts.length !== 1 ? "s" : ""} found
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
          {filteredPosts.map((post) => (
            <div key={post.id} className="break-inside-avoid mb-6">
              <PostCard post={post} />
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12 text-white/60">
            No prompts found. Try adjusting your filters.
          </div>
        )}
      </main>

      {/* Upload Modal */}
      {showUpload && (
        <UploadModal onClose={() => setShowUpload(false)} />
      )}
    </div>
  );
}
