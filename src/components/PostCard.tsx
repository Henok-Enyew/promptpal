import { Star, Tag, Heart, MessageSquare, Share2, Eye, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

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
  isPremium?: boolean;
  stats?: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
  };
};

type PostCardProps = {
  post: Post;
};

export function PostCard({ post }: PostCardProps) {
  const stats = post.stats || { likes: 0, comments: 0, shares: 0, views: 0 };
  
  return (
    <div className="group relative bg-[#0a0a0a] border border-white/5 rounded-[2rem] overflow-hidden flex flex-col h-[640px] cursor-pointer hover:border-white/10 transition-all">
      {/* Image section */}
      <div className="relative h-56 flex-shrink-0 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        
        <div className="absolute bottom-6 left-6">
          <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
            {post.title}
          </h3>
        </div>
      </div>

      {/* Content section */}
      <div className="p-8 flex-1 flex flex-col min-h-0">
        {/* Creator info */}
        <div className="flex items-center gap-3 mb-4">
          {post.creator?.avatar ? (
            <img
              src={post.creator.avatar}
              alt={post.creator.name}
              className="w-8 h-8 rounded-full border border-white/10"
            />
          ) : (
            <div className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center">
              <span className="text-xs text-white/60">{post.creator?.name?.[0] || "A"}</span>
            </div>
          )}
          <span className="text-xs font-bold text-white/60">
            {post.creator?.name || "Anonymous"}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-white/40 leading-relaxed font-light mb-4 line-clamp-2">
          {post.prompt}
        </p>

        {/* Output preview */}
        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 font-mono text-[10px] text-white/20 italic mb-4 relative overflow-hidden flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0a0a0a]/40 to-transparent animate-pulse" />
          "{post.outputPreview || post.prompt.substring(0, 100) + "..."}"
          {post.isPremium && (
            <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-black/20 text-white/60 font-bold uppercase tracking-widest">
              <Lock className="w-3 h-3 mr-2" /> Premium Only
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6 flex-shrink-0">
          {post.tags.slice(0, 3).map((tag) => (
            <div
              key={tag}
              className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 text-[9px] font-bold uppercase text-white/30 tracking-widest"
            >
              <Tag className="w-2 h-2" /> {tag}
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="mt-auto flex flex-col gap-4">
          {/* Rating and Model */}
          <div className="pt-4 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
              <span className="text-xs font-bold">
                {post.rating?.toFixed(1) || "4.5"}
              </span>
            </div>
            <div className={cn(
              "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border",
              post.model.includes('GPT') ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/5" :
              post.model.includes('Claude') ? "text-orange-400 border-orange-500/20 bg-orange-500/5" :
              "text-blue-400 border-blue-500/20 bg-blue-500/5"
            )}>
              {post.model}
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/5">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 group/stat">
                <Heart className="w-3.5 h-3.5 text-white/20 group-hover/stat:text-rose-500 transition-colors" />
                <span className="text-[10px] font-bold text-white/40">
                  {(stats.likes / 1000).toFixed(1)}k
                </span>
              </div>
              <div className="flex items-center gap-1.5 group/stat">
                <MessageSquare className="w-3.5 h-3.5 text-white/20 group-hover/stat:text-indigo-400 transition-colors" />
                <span className="text-[10px] font-bold text-white/40">
                  {stats.comments}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 group/stat">
                <Share2 className="w-3.5 h-3.5 text-white/20 group-hover/stat:text-cyan-400 transition-colors" />
                <span className="text-[10px] font-bold text-white/40">
                  {stats.shares}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-white/20" />
                <span className="text-[10px] font-bold text-white/40">
                  {(stats.views / 1000).toFixed(1)}k
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
