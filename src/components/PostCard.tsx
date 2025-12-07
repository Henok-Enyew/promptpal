import { cn } from "@/lib/utils";
import { Check, Copy, Star, Tag, User } from "lucide-react";
import { useState } from "react";

type Post = {
  id: string;
  title: string;
  image: string;
  prompt: string;
  model: string;
  tags: string[];
  creator?: {
    name: string;
    avatar?: string;
  };
  rating?: number;
  successRate?: number;
  testCount?: number;
  outputPreview?: string;
};

type PostCardProps = {
  post: Post;
};

export function PostCard({ post }: PostCardProps) {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(post.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden hover:border-[#62FE7A]/50 transition-all cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        window.location.hash = `#/post/${post.id}`;
      }}
    >
      {/* Image with title overlay at bottom */}
      <div className="relative aspect-square overflow-hidden bg-black/20">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Gradient overlay at bottom for title */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-8 pb-3 px-4">
          <h3 className="text-white font-semibold text-base line-clamp-2">
            {post.title}
          </h3>
        </div>

        {/* Copy button overlay on hover */}
        <div
          className={cn(
            "absolute inset-0 bg-black/70 flex items-center justify-center transition-opacity",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        >
          <button
            onClick={handleCopy}
            className={cn(
              "px-6 py-3 rounded-lg font-bold text-lg transition-all transform",
              copied
                ? "bg-green-500 text-white scale-110"
                : "bg-[#62FE7A] text-black hover:bg-[#52EE6A] hover:scale-105"
            )}
          >
            {copied ? (
              <span className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                Copied!
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Copy className="w-5 h-5" />
                Copy Prompt
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Content below image */}
      <div className="p-4 space-y-3">
        {/* Creator info */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#62FE7A]/20 flex items-center justify-center overflow-hidden">
            {post.creator?.avatar ? (
              <img
                src={post.creator.avatar}
                alt={post.creator.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-4 h-4 text-[#62FE7A]" />
            )}
          </div>
          <span className="text-xs text-white/60">
            {post.creator?.name || "Anonymous"}
          </span>
        </div>

        {/* Description */}
        <p className="text-white/80 text-sm line-clamp-2 leading-relaxed">
          {post.prompt}
        </p>

        {/* Output preview if available */}
        {post.outputPreview && (
          <div className="text-xs text-white/50 italic line-clamp-2 bg-white/5 rounded p-2">
            "{post.outputPreview}"
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 bg-white/10 rounded text-white/70 flex items-center gap-1"
            >
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="text-xs px-2 py-1 text-white/50">
              +{post.tags.length - 3}
            </span>
          )}
        </div>

        {/* Metrics and Model */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <div className="flex items-center gap-3">
            {/* Rating or Success Rate */}
            {post.rating ? (
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <span className="text-xs text-white/80">{post.rating.toFixed(1)}</span>
              </div>
            ) : post.successRate !== undefined ? (
              <div className="text-xs text-white/80">
                Success: {post.successRate}%
                {post.testCount && ` on ${post.testCount} tests`}
              </div>
            ) : null}
          </div>
          <span className="text-xs px-2 py-1 bg-white/10 rounded text-white/70">
            {post.model}
          </span>
        </div>
      </div>
    </div>
  );
}
