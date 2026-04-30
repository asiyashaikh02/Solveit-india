import React from 'react';
import { useCampaign } from '@/src/services/CampaignContext';
import { motion, AnimatePresence } from 'motion/react';

interface DynamicHeroTextProps {
  defaultTitle: React.ReactNode;
  defaultSubtitle: string;
}

export default function DynamicHeroText({ defaultTitle, defaultSubtitle }: DynamicHeroTextProps) {
  const { activeCampaign } = useCampaign();

  const currentContent = (activeCampaign && activeCampaign.type === 'hero') 
    ? { title: activeCampaign.title, subtitle: activeCampaign.description, key: activeCampaign.id || 'campaign' }
    : { title: defaultTitle, subtitle: defaultSubtitle, key: 'default' };

  return (
    <div className="relative min-h-[140px] md:min-h-[180px] lg:min-h-[200px] flex flex-col items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentContent.key}
          initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6 w-full"
        >
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-[0.85] tracking-tighter uppercase italic text-center">
            {currentContent.title}
          </h1>
          <p className="text-lg md:text-xl text-slate-500 font-medium max-w-xl mx-auto text-center">
            {currentContent.subtitle}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
