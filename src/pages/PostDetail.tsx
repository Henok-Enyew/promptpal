import { cn } from "@/lib/utils";
import { Check, Copy, Tag } from "lucide-react";
import { Navigation } from "@/components/layout/Navigation";
import { useState } from "react";

// Mock data - replace with API call
const mockPost = {
  id: "1",
  title: "Cyberpunk Cat",
  image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800",
  prompt: "A futuristic cat, neon lights, 8k resolution, cyberpunk aesthetic, vibrant colors, detailed fur texture, glowing eyes, cityscape background",
  model: "Midjourney",
  tags: ["art", "cyberpunk", "animals", "futuristic"],
  createdAt: "2024-01-15",
};

export function PostDetail() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(mockPost.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#030303]">
      {/* Navigation */}
      <Navigation />

      {/* Content */}
      <main className="container mx-auto px-6 md:px-16 lg:px-24 xl:px-32 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left: Image */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-black/20 border border-white/10">
                <img
                  src={mockPost.image}
                  alt={mockPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right: Prompt Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {mockPost.title}
                </h1>
                <div className="flex items-center gap-4 mb-6">
                  <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80">
                    {mockPost.model}
                  </span>
                  <span className="text-sm text-white/60">
                    {mockPost.createdAt}
                  </span>
                </div>
              </div>

              {/* Prompt Text */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white">
                    The Prompt
                  </h2>
                  <button
                    onClick={handleCopy}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all",
                      copied
                        ? "bg-green-500 text-white"
                        : "bg-[#62FE7A] text-black hover:bg-[#52EE6A]"
                    )}
                  >
                    {copied ? (
                      <>
                        <Check className="w-5 h-5" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5" />
                        Copy Prompt
                      </>
                    )}
                  </button>
                </div>
                <p className="text-white/80 leading-relaxed whitespace-pre-wrap">
                  {mockPost.prompt}
                </p>
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-sm font-medium text-white/60 mb-3 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {mockPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80 hover:bg-white/20 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

