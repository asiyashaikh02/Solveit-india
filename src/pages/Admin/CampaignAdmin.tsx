import React, { useState, useEffect } from 'react';
import { 
  Megaphone, 
  Plus, 
  Trash2, 
  Play, 
  Pause, 
  Wand2, 
  Save,
  Calendar as CalendarIcon,
  Layout,
  MousePointer2,
  Clock
} from 'lucide-react';
import { motion } from 'motion/react';
import Button from '@/src/components/Button';
import { Campaign, STATIC_CAMPAIGNS, CAMPAIGN_THEMES } from '@/src/services/CampaignConfig';
import { generateCampaignContent } from '@/src/services/aiCampaignGenerator';
import { CampaignPersistence } from '@/src/services/CampaignPersistence';

export default function CampaignAdmin() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [newCampaign, setNewCampaign] = useState<Partial<Campaign>>({
    title: '',
    description: '',
    cta: '',
    ctaLink: '/',
    type: 'popup',
    priority: 10,
    theme: CAMPAIGN_THEMES.default,
    rules: [{ type: 'delay', value: 5000 }]
  });

  useEffect(() => {
    const unsubscribe = CampaignPersistence.subscribeToCampaigns(setCampaigns);
    return () => unsubscribe();
  }, []);

  const handleSave = async () => {
    if (!newCampaign.title || !newCampaign.description || !newCampaign.cta) {
      alert("Please fill all required fields");
      return;
    }
    setIsSaving(true);
    try {
      await CampaignPersistence.saveCampaign(newCampaign as any);
      setNewCampaign({
        title: '',
        description: '',
        cta: '',
        ctaLink: '/',
        type: 'popup',
        priority: 10,
        theme: CAMPAIGN_THEMES.default,
        rules: [{ type: 'delay', value: 5000 }]
      });
    } catch (err) {
      alert("Failed to save campaign");
    } finally {
      setIsSaving(false);
    }
  };

  const handleGenerateAI = async () => {
    setIsGenerating(true);
    const event = prompt("What event is this for? (e.g. Holi, Diwali, Tax Season)");
    if (!event) {
        setIsGenerating(false);
        return;
    }
    
    const content = await generateCampaignContent(event, "Small business owners in India");
    if (content) {
      setNewCampaign(prev => ({
        ...prev,
        title: content.title,
        description: content.description,
        cta: content.cta
      }));
    }
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] p-8 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter flex items-center gap-4">
              <Megaphone className="text-blue-600" size={32} />
              Campaign <span className="text-blue-600">Control Center</span>
            </h1>
            <p className="text-slate-400 font-medium uppercase text-[10px] tracking-widest italic">Manage dynamic content and popups across SolveItIndia</p>
          </div>
          <div className="flex gap-4">
            <Button 
                onClick={handleGenerateAI}
                disabled={isGenerating}
                className="h-12 px-6 rounded-xl bg-slate-900 border-none flex items-center gap-2 group"
            >
              <Wand2 size={16} className={isGenerating ? "animate-spin" : "group-hover:rotate-12 transition-transform"} />
              {isGenerating ? "Generating..." : "Magic Content"}
            </Button>
            <Button className="h-12 px-6 rounded-xl flex items-center gap-2">
              <Plus size={16} /> New Campaign
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Active Campaigns List */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Running Campaigns</h3>
            <div className="grid gap-4">
              {campaigns.map((camp, i) => (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={i} 
                    className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="flex items-center justify-between gap-6">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 ${camp.theme.primary}`}>
                        <camp.theme.icon size={20} />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-black text-slate-900 uppercase italic truncate tracking-tight">{camp.title}</h4>
                        <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                          <span className="flex items-center gap-1"><Layout size={10} /> {camp.type}</span>
                          <span className="w-1 h-1 rounded-full bg-slate-200" />
                          <span className="text-blue-600 italic">Priority: {camp.priority}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center">
                        <Play size={16} />
                      </button>
                      <button className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all flex items-center justify-center">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Campaign Editor */}
          <div className="space-y-6">
            <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Campaign Editor</h3>
            <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-xl space-y-6">
               <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Title</label>
                    <input 
                        value={newCampaign.title}
                        onChange={e => setNewCampaign({...newCampaign, title: e.target.value})}
                        className="w-full h-12 px-4 bg-slate-50 rounded-xl border-none text-sm font-bold placeholder:italic"
                        placeholder="e.g. New Year Offer"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Description</label>
                    <textarea 
                        value={newCampaign.description}
                        onChange={e => setNewCampaign({...newCampaign, description: e.target.value})}
                        className="w-full h-24 p-4 bg-slate-50 rounded-xl border-none text-sm font-bold placeholder:italic resize-none font-medium"
                        placeholder="persuade your users..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">CTA Text</label>
                        <input 
                            value={newCampaign.cta}
                            onChange={e => setNewCampaign({...newCampaign, cta: e.target.value})}
                            className="w-full h-12 px-4 bg-slate-50 rounded-xl border-none text-sm font-bold"
                            placeholder="Register Now"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Type</label>
                        <select 
                            className="w-full h-12 px-4 bg-slate-50 rounded-xl border-none text-sm font-bold uppercase tracking-widest"
                            onChange={e => setNewCampaign({...newCampaign, type: e.target.value as any})}
                        >
                            <option value="popup">Popup</option>
                            <option value="banner">Banner</option>
                            <option value="hero">Hero Text</option>
                        </select>
                    </div>
                  </div>
               </div>

               <div className="pt-6 border-t border-slate-50 space-y-4">
                  <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest italic">Trigger Rules</p>
                  <div className="flex flex-wrap gap-2">
                    <div className="px-3 py-1.5 rounded-lg bg-slate-50 text-[9px] font-black text-slate-400 uppercase flex items-center gap-1.5 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer">
                        <CalendarIcon size={12} /> Date Range
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-slate-50 text-[9px] font-black text-slate-400 uppercase flex items-center gap-1.5 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer">
                        <Clock size={12} /> Delay (5s)
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-slate-50 text-[9px] font-black text-slate-400 uppercase flex items-center gap-1.5 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer">
                        <MousePointer2 size={12} /> Scroll (30%)
                    </div>
                  </div>
               </div>

               <Button 
                onClick={handleSave}
                disabled={isSaving}
                className="w-full h-14 rounded-2xl flex items-center justify-center gap-2 font-black uppercase italic tracking-tighter"
               >
                  <Save size={18} /> {isSaving ? "Saving..." : "Save Campaign"}
               </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
