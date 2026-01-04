import React, { useState, useEffect } from 'react';
import { 
  LayoutGrid, Heart, History, Settings, Plus, 
  MoreVertical, Edit3, Trash2, ExternalLink, ArrowUpRight, Zap,
  Copy, Sparkles, Check
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUserProfile } from '@/hooks/useUserProfile';
import { getUserFriendlyError } from '@/lib/errorHandler';

type DashboardTab = 'prompts' | 'favorites' | 'story' | 'settings';

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('prompts');
  const { user, isLoading: profileLoading, updateProfile, isUpdating, updateError } = useUserProfile();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize form data when user profile loads
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phoneNumber: user.phoneNumber || '',
      });
    }
  }, [user]);

  // Handle update errors
  useEffect(() => {
    if (updateError) {
      const errorMessage = getUserFriendlyError(updateError);
      setError(errorMessage);
    } else {
      setError(null);
    }
  }, [updateError]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaveSuccess(false);

    try {
      await updateProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber || undefined,
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      const errorMessage = getUserFriendlyError(err);
      setError(errorMessage);
    }
  };

  const sidebarItems = [
    { id: 'prompts', name: 'My Prompts', icon: <LayoutGrid className="w-4 h-4" /> },
    { id: 'favorites', name: 'Favorites', icon: <Heart className="w-4 h-4" /> },
    { id: 'story', name: 'Story', icon: <History className="w-4 h-4" /> },
    { id: 'settings', name: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen pt-24 bg-[#030303] flex">
      {/* Sidebar */}
      <div className="w-64 border-r border-white/5 h-[calc(100vh-6rem)] sticky top-24 p-6 hidden lg:flex flex-col">
        <div className="space-y-2 mb-12">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as DashboardTab)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                activeTab === item.id 
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" 
                  : "text-white/40 hover:text-white/60 hover:bg-white/5"
              )}
            >
              {item.icon} {item.name}
            </button>
          ))}
        </div>

        <div className="mt-auto">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/20">
            <h4 className="text-xs font-black uppercase tracking-widest text-indigo-400 mb-2">Pro Plan</h4>
            <p className="text-[10px] text-white/40 mb-4 leading-relaxed">Unlock parallel benchmarking and infinite versioning history.</p>
            <button className="w-full py-2 bg-white text-black font-bold rounded-lg text-[10px] uppercase tracking-widest hover:bg-white/90 transition-all">Upgrade</button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-2">
                {activeTab === 'prompts' && "My Engineering Hub"}
                {activeTab === 'favorites' && "Saved Inspiration"}
                {activeTab === 'story' && "Usage History"}
                {activeTab === 'settings' && "Account Settings"}
              </h1>
              <p className="text-white/40 font-light">
                {activeTab === 'prompts' && "Manage and deploy your custom-built prompt templates."}
                {activeTab === 'favorites' && "Your curated collection of top-performing prompts."}
                {activeTab === 'story' && "Track every prompt you've tested, copied, or improved."}
                {activeTab === 'settings' && "Manage your profile, preferences, and billing."}
              </p>
            </div>
            {activeTab === 'prompts' && (
              <button className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-2xl hover:bg-white/90 transition-all shadow-xl shadow-white/5">
                <Plus className="w-4 h-4" /> New Prompt
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {activeTab === 'prompts' && (
              <>
                <DashboardCard title="SEO Master Template" model="GPT-4o" date="2h ago" isOwner />
                <DashboardCard title="Clean React Refactor" model="Claude 3.5" date="1d ago" isOwner />
                <DashboardCard title="Luxury Brand Tone" model="Gemini 2.0" date="3d ago" isOwner />
              </>
            )}
            {activeTab === 'favorites' && (
              <>
                <DashboardCard title="Cyberpunk Cat Creator" model="Midjourney" date="Added 2d ago" />
                <DashboardCard title="Deep Data Analysis" model="GPT-4" date="Added 5d ago" />
              </>
            )}
            {activeTab === 'story' && (
              <>
                <HistoryItem action="Copied" title="Marketing Copy Optimizer" time="1 hour ago" />
                <HistoryItem action="Tested" title="SEO Master Template" time="3 hours ago" />
                <HistoryItem action="Opened" title="Architecture Visualizer" time="Yesterday" />
                <HistoryItem action="Improved" title="Draft v1.0" time="Oct 12" />
              </>
            )}
            {activeTab === 'settings' && (
              <div className="col-span-full max-w-2xl space-y-8">
                {profileLoading ? (
                  <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 text-center">
                    <div className="text-white/40">Loading profile...</div>
                  </div>
                ) : (
                  <form onSubmit={handleSave} className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5">
                    <h3 className="text-lg font-bold mb-6">Profile Information</h3>
                    
                    {error && (
                      <div className="mb-6 p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-sm">
                        {error}
                      </div>
                    )}

                    {saveSuccess && (
                      <div className="mb-6 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm flex items-center gap-2">
                        <Check className="w-4 h-4" />
                        Profile updated successfully!
                      </div>
                    )}

                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="firstName" className="text-[10px] font-black uppercase text-white/20 tracking-widest">
                            First Name
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                            minLength={2}
                            maxLength={50}
                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:border-indigo-500 outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="lastName" className="text-[10px] font-black uppercase text-white/20 tracking-widest">
                            Last Name
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                            minLength={2}
                            maxLength={50}
                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:border-indigo-500 outline-none transition-all"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="phoneNumber" className="text-[10px] font-black uppercase text-white/20 tracking-widest">
                          Phone Number (Optional)
                        </label>
                        <input
                          type="tel"
                          id="phoneNumber"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          pattern="^[0-9]{7,15}$"
                          placeholder="7-15 digits only"
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:border-indigo-500 outline-none transition-all"
                        />
                        <p className="text-[10px] text-white/30">Enter phone number with 7-15 digits only (no special characters)</p>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="email" className="text-[10px] font-black uppercase text-white/20 tracking-widest">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={user?.email || ''}
                          disabled
                          className="w-full bg-white/[0.02] border border-white/5 rounded-xl py-3 px-4 text-sm text-white/40 cursor-not-allowed"
                        />
                        <p className="text-[10px] text-white/30">Email cannot be changed</p>
                      </div>

                      <button
                        type="submit"
                        disabled={isUpdating}
                        className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl text-xs hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                      >
                        {isUpdating ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Saving...
                          </>
                        ) : (
                          'Save Changes'
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardCard: React.FC<{ title: string; model: string; date: string; isOwner?: boolean }> = ({ title, model, date, isOwner }) => (
  <div className="group p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all flex flex-col h-48">
    <div className="flex justify-between items-start mb-4">
      <div className={cn(
        "px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border",
        model.includes('GPT') ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/5" :
        model.includes('Claude') ? "text-orange-400 border-orange-500/20 bg-orange-500/5" :
        "text-blue-400 border-blue-500/20 bg-blue-500/5"
      )}>
        {model}
      </div>
      <button className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"><MoreVertical className="w-4 h-4 text-white/20" /></button>
    </div>
    <h3 className="text-lg font-bold mb-2 group-hover:text-indigo-400 transition-colors line-clamp-1">{title}</h3>
    <p className="text-xs text-white/20 font-medium mb-auto uppercase tracking-tighter">{date}</p>
    <div className="flex items-center justify-between pt-4 mt-auto border-t border-white/5">
      {isOwner ? (
        <div className="flex gap-2">
          <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all"><Edit3 className="w-3.5 h-3.5" /></button>
          <button className="p-2 rounded-lg bg-white/5 hover:bg-rose-500/10 hover:text-rose-500 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
        </div>
      ) : <div />}
      <button className="flex items-center gap-1.5 text-[10px] font-black uppercase text-white/40 hover:text-white transition-colors">
        Open Studio <ArrowUpRight className="w-3 h-3" />
      </button>
    </div>
  </div>
);

const HistoryItem: React.FC<{ action: string; title: string; time: string }> = ({ action, title, time }) => (
  <div className="col-span-full flex items-center gap-6 p-4 rounded-2xl bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] transition-all group">
    <div className={cn(
      "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
      action === 'Copied' ? "bg-emerald-500/10 text-emerald-500" :
      action === 'Tested' ? "bg-indigo-500/10 text-indigo-500" :
      action === 'Improved' ? "bg-cyan-500/10 text-cyan-500" : "bg-white/5 text-white/40"
    )}>
      {action === 'Copied' && <Copy className="w-5 h-5" />}
      {action === 'Tested' && <Zap className="w-5 h-5" />}
      {action === 'Opened' && <ExternalLink className="w-5 h-5" />}
      {action === 'Improved' && <Sparkles className="w-5 h-5" />}
    </div>
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-0.5">
        <span className="text-[10px] font-black uppercase tracking-widest text-white/20">{action}</span>
        <span className="text-white/10">•</span>
        <span className="text-[10px] font-bold text-white/20">{time}</span>
      </div>
      <h4 className="font-bold text-white/80">{title}</h4>
    </div>
    <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">View Details</button>
  </div>
);

