import React, { createContext, useContext, useState, useEffect } from 'react';
import { Campaign, STATIC_CAMPAIGNS } from './CampaignConfig';
import { CampaignEngine } from './CampaignEngine';
import { CampaignPersistence } from './CampaignPersistence';

interface CampaignContextType {
  activeCampaign: Campaign | null;
  closeCampaign: () => void;
  trackInteraction: (action: 'view' | 'click' | 'close') => void;
  recordSearch: (query: string) => void;
}

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

export function CampaignProvider({ children }: { children: React.ReactNode }) {
  const [activeCampaign, setActiveCampaign] = useState<Campaign | null>(null);
  const [dbCampaigns, setDbCampaigns] = useState<Campaign[]>([]);
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [idleTime, setIdleTime] = useState(0);
  const [exitIntent, setExitIntent] = useState(false);
  const [searchHistory, setSearchHistory] = useState<Record<string, number>>({});

  // Subscribe to live campaigns
  useEffect(() => {
    const unsubscribe = CampaignPersistence.subscribeToCampaigns((campaigns) => {
      setDbCampaigns(campaigns);
    });
    return () => unsubscribe();
  }, []);

  // Track time on page, idle time
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeOnPage(prev => prev + 1000);
      setIdleTime(prev => prev + 1000);
    }, 1000);

    const resetIdle = () => setIdleTime(0);
    window.addEventListener('mousemove', resetIdle);
    window.addEventListener('keypress', resetIdle);
    window.addEventListener('scroll', resetIdle);

    return () => {
      clearInterval(timer);
      window.removeEventListener('mousemove', resetIdle);
      window.removeEventListener('keypress', resetIdle);
      window.removeEventListener('scroll', resetIdle);
    };
  }, []);

  // Track exit intent (mouse leaving window through top)
  useEffect(() => {
    const handleMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setExitIntent(true);
      }
    };
    document.addEventListener('mouseleave', handleMouseOut);
    return () => document.removeEventListener('mouseleave', handleMouseOut);
  }, []);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check for campaigns periodically
  useEffect(() => {
    if (activeCampaign) return;

    // Merge static and DB campaigns
    const allCampaigns = [...dbCampaigns, ...STATIC_CAMPAIGNS];
    
    const campaign = CampaignEngine.getActiveCampaign(allCampaigns, {
      timeOnPage,
      scrollY,
      idleTime,
      exitIntent,
      searchHistory
    });

    if (campaign) {
      setActiveCampaign(campaign);
      CampaignEngine.markAsShown(campaign.id);
      trackInteraction('view', campaign.id);
    }
  }, [timeOnPage, scrollY, idleTime, exitIntent, searchHistory, activeCampaign, dbCampaigns]);

  const recordSearch = (query: string) => {
    const normalized = query.toLowerCase().trim();
    setSearchHistory(prev => ({
      ...prev,
      [normalized]: (prev[normalized] || 0) + 1
    }));
  };

  const trackInteraction = (action: 'view' | 'click' | 'close', forceId?: string) => {
    const campaignId = forceId || activeCampaign?.id;
    if (!campaignId) return;
    
    CampaignPersistence.trackInteraction(campaignId, action);
  };

  const closeCampaign = () => {
    if (activeCampaign) {
      trackInteraction('close');
    }
    setActiveCampaign(null);
  };

  return (
    <CampaignContext.Provider value={{ activeCampaign, closeCampaign, trackInteraction, recordSearch }}>
      {children}
    </CampaignContext.Provider>
  );
}

export function useCampaign() {
  const context = useContext(CampaignContext);
  if (context === undefined) {
    throw new Error('useCampaign must be used within a CampaignProvider');
  }
  return context;
}
