import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Copy, 
  Check, 
  Star, 
  Share2, 
  Shield, 
  Zap, 
  Cpu, 
  Settings, 
  ArrowLeft,
  Lock,
  ExternalLink,
  MessageSquare,
  Send,
  Trash2
} from 'lucide-react';
import { useComments } from '@/hooks/useComments';
import { useAuth } from '@/hooks/useAuth';

type Prompt = {
  id: string;
  title: string;
  author?: string;
  avatar?: string;
  description?: string;
  snippet?: string;
  fullPrompt?: string;
  prompt: string;
  tags: string[];
  rating?: number;
  model: string;
  category?: string;
  image: string;
  isPremium?: boolean;
  outputs?: { type: 'text' | 'image'; content: string }[];
  config?: { temp: number; topP: number; tokens: number };
  creator?: {
    name: string;
    avatar?: string;
  };
  outputPreview?: string;
  successRate?: number;
  testCount?: number;
};

type PromptDetailProps = {
  prompt: Prompt | null;
  isOpen: boolean;
  onClose: () => void;
};

export const PromptDetail: React.FC<PromptDetailProps> = ({ prompt, isOpen, onClose }) => {
  const [copied, setCopied] = React.useState(false);
  const [commentText, setCommentText] = useState('');
  const { isAuthenticated } = useAuth();
  const { comments, isLoading: commentsLoading, addComment, isAddingComment } = useComments(prompt?.id || null);

  const handleCopy = () => {
    if (!prompt) return;
    navigator.clipboard.writeText(prompt.fullPrompt || prompt.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !prompt?.id) return;
    
    try {
      await addComment(commentText.trim());
      setCommentText('');
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  if (!prompt) return null;

  // Mock data if not provided
  const fullPromptText = prompt.fullPrompt || prompt.prompt;
  const authorName = prompt.author || prompt.creator?.name || "Anonymous";
  const authorAvatar = prompt.avatar || prompt.creator?.avatar || "https://i.pravatar.cc/150?u=anonymous";
  const category = prompt.category || prompt.tags[0] || "General";
  const rating = prompt.rating || 4.5;
  
  const mockOutputs = prompt.outputs || [
    { type: 'text', content: prompt.outputPreview || "Based on your request, I've analyzed the data. Here is the breakdown..." },
    { type: 'text', content: "The implementation follows best practices. Each component is decoupled using dependency injection..." }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center lg:p-10 overflow-hidden"
        >
          <motion.div 
            className="absolute inset-0 bg-[#030303]/95 backdrop-blur-2xl" 
            onClick={onClose}
          />
          
          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full h-full max-w-7xl bg-[#0a0a0a] border border-white/10 lg:rounded-[3rem] overflow-hidden flex flex-col"
          >
            {/* Navigation Header */}
            <div className="absolute top-0 left-0 right-0 z-20 px-8 py-6 flex items-center justify-between pointer-events-none">
              <button 
                onClick={onClose}
                className="p-3 rounded-full bg-black/50 border border-white/10 backdrop-blur-md text-white/60 hover:text-white pointer-events-auto transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2 pointer-events-auto">
                <button className="p-3 rounded-full bg-black/50 border border-white/10 backdrop-blur-md text-white/60 hover:text-white transition-all">
                  <Share2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={onClose}
                  className="p-3 rounded-full bg-black/50 border border-white/10 backdrop-blur-md text-white/60 hover:text-white transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
              {/* Hero Image Section */}
              <div className="relative h-[40vh] min-h-[300px]">
                <img src={prompt.image} className="w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
                <div className="absolute bottom-10 left-10 right-10">
                   <div className="flex items-center gap-3 mb-4">
                     <span className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 text-[10px] font-black uppercase tracking-widest">
                       {category}
                     </span>
                     <span className="text-white/40 text-xs">•</span>
                     <div className="flex items-center gap-1.5 text-yellow-500">
                       <Star className="w-4 h-4 fill-yellow-500" />
                       <span className="text-xs font-bold">{rating} (42 reviews)</span>
                     </div>
                   </div>
                   <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white">{prompt.title}</h1>
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="px-10 py-12 grid grid-cols-1 lg:grid-cols-12 gap-16">
                {/* Left Column: The Prompt Engineering */}
                <div className="lg:col-span-7 space-y-12">
                  <section>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold flex items-center gap-3 text-white">
                        <Shield className="w-5 h-5 text-indigo-500" /> The Prompt Logic
                      </h2>
                      {!prompt.isPremium && (
                        <button 
                          onClick={handleCopy}
                          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-500/20"
                        >
                          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          {copied ? "COPIED" : "COPY PROMPT"}
                        </button>
                      )}
                    </div>
                    
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-tr from-indigo-500/20 to-cyan-500/20 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
                      <div className="relative bg-[#050505] border border-white/5 rounded-2xl p-8 font-mono text-sm leading-relaxed text-white/70 overflow-hidden min-h-[200px]">
                        {prompt.isPremium ? (
                          <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="w-16 h-16 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center mb-6">
                              <Lock className="w-8 h-8 text-white/20" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-white">Premium Content</h3>
                            <p className="text-white/40 text-sm mb-6 max-w-[280px]">Purchase this prompt to reveal the full engineered structure and variables.</p>
                            <button className="px-8 py-3 bg-white text-black font-bold rounded-2xl hover:bg-white/90 transition-all">Unlock for $14.99</button>
                          </div>
                        ) : (
                          <div className="whitespace-pre-wrap">{fullPromptText}</div>
                        )}
                      </div>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-white">
                      <Zap className="w-5 h-5 text-yellow-500" /> Output Examples
                    </h2>
                    <div className="space-y-4">
                      {mockOutputs.map((out, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-sm text-white/40 leading-relaxed italic border-l-4 border-l-indigo-500">
                          "{out.content}"
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                {/* Right Column: Metadata & Config */}
                <div className="lg:col-span-5 space-y-8">
                  <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 space-y-8">
                    {/* Author */}
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                      <img src={authorAvatar} className="w-12 h-12 rounded-full" alt="" />
                      <div>
                        <p className="text-[10px] font-black uppercase text-white/20 tracking-widest">Architect</p>
                        <p className="font-bold text-white group-hover:text-indigo-400 transition-colors">{authorName}</p>
                      </div>
                      <button className="ml-auto text-indigo-400 text-xs font-bold hover:underline">Follow</button>
                    </div>

                    {/* Model Specs */}
                    <div>
                      <h3 className="text-xs font-black uppercase text-white/20 tracking-widest mb-4 flex items-center gap-2">
                        <Cpu className="w-3 h-3" /> Model Compatibility
                      </h3>
                      <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                        <span className="text-sm font-bold text-white/80">{prompt.model}</span>
                        <div className="flex items-center gap-1.5 text-green-400 text-[10px] font-black tracking-widest uppercase">
                          <Check className="w-3 h-3" /> Optimized
                        </div>
                      </div>
                    </div>

                    {/* Recommended Settings */}
                    <div>
                      <h3 className="text-xs font-black uppercase text-white/20 tracking-widest mb-4 flex items-center gap-2">
                        <Settings className="w-3 h-3" /> Recommended Parameters
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                          <p className="text-[10px] font-black text-white/20 uppercase mb-1">Temperature</p>
                          <p className="font-mono text-indigo-400 font-bold">0.7</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                          <p className="text-[10px] font-black text-white/20 uppercase mb-1">Top P</p>
                          <p className="font-mono text-cyan-400 font-bold">0.9</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                          <p className="text-[10px] font-black text-white/20 uppercase mb-1">Tokens</p>
                          <p className="font-mono text-rose-400 font-bold">~140</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                          <p className="text-[10px] font-black text-white/20 uppercase mb-1">Cost / 1k</p>
                          <p className="font-mono text-emerald-400 font-bold">$0.0015</p>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div>
                      <h3 className="text-xs font-black uppercase text-white/20 tracking-widest mb-4">Focus Areas</h3>
                      <div className="flex flex-wrap gap-2">
                        {prompt.tags.map(tag => (
                          <span key={tag} className="px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 text-[10px] font-bold text-white/40 uppercase tracking-widest">#{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Call to action */}
                  <div className="p-8 rounded-[2rem] bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/20">
                    <h3 className="text-xl font-bold mb-2 text-white">Build upon this?</h3>
                    <p className="text-white/40 text-sm mb-6">Import this prompt directly into your Studio to version control your own custom branch.</p>
                    <button className="w-full flex items-center justify-center gap-3 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-indigo-500/20">
                      <ExternalLink className="w-5 h-5" /> Open in Studio
                    </button>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              <div className="px-10 py-12 border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-center gap-3 mb-8">
                    <MessageSquare className="w-6 h-6 text-indigo-500" />
                    <h2 className="text-2xl font-bold text-white">Comments</h2>
                    <span className="text-white/40 text-sm">({comments.length})</span>
                  </div>

                  {/* Add Comment Form */}
                  {isAuthenticated ? (
                    <form onSubmit={handleAddComment} className="mb-8">
                      <div className="flex gap-3">
                        <textarea
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          placeholder="Add a comment..."
                          rows={3}
                          className="flex-1 bg-white/[0.03] border border-white/10 rounded-2xl py-3 px-4 text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500 transition-all resize-none"
                        />
                        <button
                          type="submit"
                          disabled={!commentText.trim() || isAddingComment}
                          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all flex items-center gap-2 self-start"
                        >
                          <Send className="w-4 h-4" />
                          {isAddingComment ? 'Posting...' : 'Post'}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="mb-8 p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
                      <p className="text-white/40 mb-4">Please log in to add a comment</p>
                      <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all">
                        Log In
                      </button>
                    </div>
                  )}

                  {/* Comments List */}
                  <div className="space-y-4">
                    {commentsLoading ? (
                      <div className="text-center py-8 text-white/40">Loading comments...</div>
                    ) : comments.length === 0 ? (
                      <div className="text-center py-8 text-white/40">No comments yet. Be the first to comment!</div>
                    ) : (
                      comments.map((comment: any) => (
                        <motion.div
                          key={comment.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.03] transition-all"
                        >
                          <div className="flex items-start gap-4">
                            <img
                              src={comment.author.avatar}
                              alt={comment.author.name}
                              className="w-10 h-10 rounded-full border border-white/10"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <p className="font-bold text-white">{comment.author.name}</p>
                                  <p className="text-xs text-white/40">{formatDate(comment.createdAt)}</p>
                                </div>
                                {isAuthenticated && comment.author.name === 'You' && (
                                  <button className="p-2 rounded-lg hover:bg-rose-500/10 text-rose-400 transition-all">
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                              <p className="text-white/80 leading-relaxed">{comment.text}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

