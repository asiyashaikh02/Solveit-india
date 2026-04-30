import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, Sparkles } from 'lucide-react';
import { useCampaign } from '@/src/services/CampaignContext';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import Button from '../Button';

export default function SmartPopup() {
  const { activeCampaign, closeCampaign, trackInteraction } = useCampaign();

  if (!activeCampaign || activeCampaign.type !== 'popup') return null;

  const { theme, title, description, cta, ctaLink } = activeCampaign;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm"
        onClick={closeCampaign}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-white rounded-[40px] shadow-3xl overflow-hidden border border-slate-100"
          onClick={e => e.stopPropagation()}
        >
          {/* Header Theme Strip */}
          <div className={cn("h-4 w-full flex", theme.primary)}>
            <div className={cn("w-1/3 h-full", theme.accent)} />
            <div className="w-1/3 h-full bg-white/20" />
          </div>

          <button 
            onClick={closeCampaign}
            className="absolute top-8 right-8 p-3 rounded-2xl bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all z-10"
          >
            <X size={20} />
          </button>

          <div className="p-10 md:p-14 space-y-8">
            <div className="flex items-center gap-3">
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20", theme.primary)}>
                <theme.icon size={28} />
              </div>
              <div className="px-3 py-1 rounded-lg bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest italic">
                Exclusive Event
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-4xl font-black text-slate-900 leading-[0.95] tracking-tighter uppercase italic">
                {title}
              </h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                {description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                to={ctaLink} 
                onClick={() => {
                  trackInteraction('click');
                  closeCampaign();
                }} 
                className="grow"
              >
                <Button className="w-full h-16 rounded-2xl text-lg font-black uppercase italic tracking-tighter bg-blue-600 shadow-xl shadow-blue-500/20 group">
                  {cta} <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <button 
                onClick={closeCampaign}
                className="h-16 px-8 rounded-2xl text-sm font-black text-slate-400 hover:text-slate-900 hover:bg-slate-50 uppercase tracking-widest transition-all"
              >
                No thanks
              </button>
            </div>

            <div className="pt-6 border-t border-slate-50 flex items-center justify-center gap-2">
              <Sparkles size={14} className="text-yellow-400" />
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                Trusted by 50,000+ Businesses nationwide
              </p>
            </div>
          </div>
          
          {/* Decorative background elements */}
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-blue-50 rounded-full blur-3xl -z-10" />
          <div className="absolute top-1/2 -left-10 w-32 h-32 bg-orange-50 rounded-full blur-3xl -z-10 opacity-50" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
