import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCampaign } from '@/src/services/CampaignContext';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function DynamicBanner() {
  const { activeCampaign } = useCampaign();

  if (!activeCampaign || activeCampaign.type !== 'banner') return null;

  return (
    <div className="w-full bg-slate-950 text-white overflow-hidden relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-2 py-0.5 bg-blue-600 rounded text-[10px] font-black uppercase tracking-widest italic">
            <Sparkles size={10} fill="currentColor" /> Event
          </div>
          <p className="text-[11px] font-bold uppercase tracking-tight italic text-slate-300">
            {activeCampaign.title}: <span className="text-white ml-2">{activeCampaign.description}</span>
          </p>
        </div>
        
        <Link 
          to={activeCampaign.ctaLink}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:text-blue-400 transition-colors group"
        >
          {activeCampaign.cta} <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-full bg-blue-600/10 blur-[100px] skew-x-12" />
    </div>
  );
}
