import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  Terminal, 
  Cpu, 
  Settings2, 
  Play, 
  Save, 
  Share2, 
  History, 
  Plus, 
  Sparkles,
  Command,
  Layout,
  Layers,
  Activity,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

type Model = {
  id: string;
  name: string;
  provider: string;
  color: string;
};

const models: Model[] = [
  { id: 'gpt4o', name: 'GPT-4o', provider: 'OpenAI', color: 'bg-emerald-500' },
  { id: 'claude35', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', color: 'bg-orange-500' },
  { id: 'gemini20', name: 'Gemini 2.0 Flash', provider: 'Google', color: 'bg-blue-500' },
  { id: 'deepseek3', name: 'DeepSeek v3', provider: 'DeepSeek', color: 'bg-purple-500' },
];

export const PromptStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'editor' | 'testing' | 'benchmarks'>('editor');
  const [selectedModels, setSelectedModels] = useState<string[]>(['gpt4o', 'claude35']);
  const [promptText, setPromptText] = useState("Act as a [ROLE]. Generate a technical report on [TOPIC] for a [AUDIENCE] audience.\n\nCONSTRAINTS:\n- No fluff\n- Markdown table included\n- Tone: Professional");
  
  const toggleModel = (id: string) => {
    setSelectedModels(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  return (
    <div className="py-24 bg-[#030303] relative border-y border-white/5 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-4"
          >
            <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Command className="w-5 h-5" />
            </div>
            <span className="text-sm font-black tracking-[0.3em] uppercase text-white/40">The Engineering Hub</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white">Prompt Studio</h2>
          <p className="text-white/40 text-lg mt-4 max-w-2xl font-light">
            An immersive workspace for iterative prompt development. Draft, version, and benchmark across every major LLM in one unified interface.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[2.5rem] border border-white/10 bg-[#0a0a0a] shadow-2xl overflow-hidden min-h-[700px] flex flex-col"
        >
          {/* Studio Header / Toolbar */}
          <div className="px-6 py-4 border-b border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 bg-white/[0.01]">
            <div className="flex items-center gap-1 p-1 bg-white/[0.03] rounded-xl border border-white/5">
              {(['editor', 'testing', 'benchmarks'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all",
                    activeTab === tab 
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" 
                      : "text-white/40 hover:text-white/60"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {selectedModels.map(id => {
                  const model = models.find(m => m.id === id);
                  return (
                    <div 
                      key={id} 
                      className={cn("w-8 h-8 rounded-full border-2 border-[#0a0a0a] flex items-center justify-center text-[10px] font-bold text-white", model?.color)}
                      title={model?.name}
                    >
                      {model?.name[0]}
                    </div>
                  );
                })}
                <button className="w-8 h-8 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center text-white/40 hover:border-white/20 transition-all">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="w-px h-6 bg-white/5" />
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl transition-all">
                <Play className="w-4 h-4 fill-white" /> Run Test
              </button>
            </div>
          </div>

          {/* Main Studio Area */}
          <div className="flex-1 flex flex-col lg:flex-row">
            {/* Sidebar Tools */}
            <div className="w-full lg:w-64 border-r border-white/5 p-6 bg-white/[0.01] flex flex-col gap-8">
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-4 flex items-center gap-2">
                  <Layers className="w-3 h-3" /> Components
                </h4>
                <div className="space-y-2">
                  {['Persona Block', 'Task Definition', 'Negative Constraints', 'Few-Shot Examples'].map(item => (
                    <button key={item} className="w-full text-left px-3 py-2 rounded-lg bg-white/[0.03] border border-white/5 text-xs text-white/60 hover:text-white hover:bg-white/5 transition-all flex items-center justify-between group">
                      {item}
                      <Plus className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-4 flex items-center gap-2">
                  <Activity className="w-3 h-3" /> Live Metrics
                </h4>
                <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="flex justify-between text-[10px] mb-2 uppercase tracking-tighter">
                      <span className="text-white/40">Clarity Score</span>
                      <span className="text-cyan-400 font-bold">88/100</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: "88%" }} className="h-full bg-cyan-400" />
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="flex justify-between text-[10px] mb-2 uppercase tracking-tighter">
                      <span className="text-white/40">Tokens</span>
                      <span className="text-indigo-400 font-bold">142</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: "42%" }} className="h-full bg-indigo-400" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-auto">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/20">
                  <div className="flex items-center gap-2 text-indigo-400 mb-2">
                    <Zap className="w-4 h-4 fill-indigo-400" />
                    <span className="text-[10px] font-black uppercase">Pro Tip</span>
                  </div>
                  <p className="text-[10px] text-white/40 leading-relaxed italic">
                    "Using XML tags helps Gemini and Claude structure long-form responses better."
                  </p>
                </div>
              </div>
            </div>

            {/* Main Content Pane */}
            <div className="flex-1 flex flex-col p-6 sm:p-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-indigo-500/10">
                    <Terminal className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">main_prompt.pal</h3>
                    <p className="text-[10px] text-white/20 uppercase font-black tracking-widest">v2.4.1 Last modified 2m ago</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg hover:bg-white/5 text-white/40 transition-colors"><History className="w-4 h-4" /></button>
                  <button className="p-2 rounded-lg hover:bg-white/5 text-white/40 transition-colors"><Share2 className="w-4 h-4" /></button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white/[0.05] border border-white/10 rounded-xl text-xs font-bold hover:bg-white/[0.1] transition-all">
                    <Save className="w-4 h-4" /> Save
                  </button>
                </div>
              </div>

              <div className="flex-1 relative group min-h-[400px]">
                {/* Virtualized "Editor" lines */}
                <div className="absolute left-0 top-0 bottom-0 w-12 border-r border-white/5 flex flex-col items-center pt-4 text-[10px] text-white/10 font-mono select-none pointer-events-none">
                  {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map(i => <span key={i} className="leading-6">{i}</span>)}
                </div>
                <textarea 
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  placeholder="Type your prompt here...&#10;&#10;Example:&#10;Act as a [ROLE]. Generate a technical report on [TOPIC] for a [AUDIENCE] audience.&#10;&#10;CONSTRAINTS:&#10;- No fluff&#10;- Markdown table included&#10;- Tone: Professional"
                  className="w-full h-full bg-transparent pl-16 pt-4 text-white/90 font-mono text-sm leading-6 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 rounded-lg resize-none placeholder:text-white/20 border border-white/5 hover:border-white/10 transition-colors"
                  spellCheck={false}
                />
                
                {/* AI Assistant Float */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute bottom-6 right-6 p-1 rounded-2xl bg-gradient-to-tr from-indigo-500 to-cyan-500 shadow-xl"
                >
                  <div className="bg-[#0a0a0a] rounded-[calc(1rem-1px)] px-4 py-3 flex items-center gap-4">
                    <div className="flex items-center gap-2 text-cyan-400">
                      <Sparkles className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-widest">Optimizer Active</span>
                    </div>
                    <div className="w-px h-4 bg-white/10" />
                    <button className="text-[10px] font-bold text-white/40 hover:text-white transition-colors">Apply Improvements (3)</button>
                  </div>
                </motion.div>
              </div>

              {/* Bottom Test Panel (Static Preview) */}
              <div className="mt-8 pt-8 border-t border-white/5">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xs font-black uppercase tracking-widest text-white/20">Prompt Output Preview</h4>
                  <div className="flex gap-2">
                    {models.filter(m => selectedModels.includes(m.id)).map(m => (
                      <span key={m.id} className="text-[9px] font-bold px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/80">{m.name}</span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 min-h-[120px]">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-[10px] font-bold text-white/40">GPT-4o Output</span>
                    </div>
                    <p className="text-[11px] text-white/60 leading-relaxed italic">"Executing based on current schema... Technical report initialized. Generating Markdown tables for Q3 projections..."</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 min-h-[120px]">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-orange-500" />
                      <span className="text-[10px] font-bold text-white/40">Claude 3.5 Output</span>
                    </div>
                    <p className="text-[11px] text-white/60 leading-relaxed italic">"Understood. I will adopt the professional persona and maintain zero fluff. Drafting the [TOPIC] analysis now..."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating Background Glows */}
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-cyan-500/5 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-rose-500/5 blur-[100px] pointer-events-none" />
      </div>
    </div>
  );
};

