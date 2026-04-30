import { ShieldCheck, Calendar, Zap, TrendingUp, AlertTriangle, PartyPopper } from 'lucide-react';

export type CampaignType = 'popup' | 'banner' | 'hero' | 'notification';

export type CampaignRule = 
  | { type: 'date'; value: { start: string; end: string } }
  | { type: 'scroll'; value: number }
  | { type: 'delay'; value: number }
  | { type: 'page'; value: string }
  | { type: 'behavior'; value: any }
  | { type: 'interaction'; value: { query: string; count: number } }
  | { type: 'idle'; value: number }
  | { type: 'exit'; value: boolean };

export interface CampaignTheme {
  primary: string;
  secondary: string;
  accent: string;
  textColor: string;
  icon: any;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  cta: string;
  ctaLink: string;
  type: CampaignType;
  rules: CampaignRule[];
  theme: CampaignTheme;
  priority: number;
}

export const CAMPAIGN_THEMES: Record<string, CampaignTheme> = {
  national: {
    primary: 'bg-orange-600',
    secondary: 'bg-white',
    accent: 'bg-green-600',
    textColor: 'text-slate-900',
    icon: ShieldCheck
  },
  financial: {
    primary: 'bg-blue-600',
    secondary: 'bg-blue-50',
    accent: 'bg-yellow-400',
    textColor: 'text-slate-900',
    icon: TrendingUp
  },
  alert: {
    primary: 'bg-red-600',
    secondary: 'bg-red-50',
    accent: 'bg-red-600',
    textColor: 'text-slate-900',
    icon: AlertTriangle
  },
  celebration: {
    primary: 'bg-purple-600',
    secondary: 'bg-purple-50',
    accent: 'bg-pink-500',
    textColor: 'text-slate-900',
    icon: PartyPopper
  },
  default: {
    primary: 'bg-slate-900',
    secondary: 'bg-slate-100',
    accent: 'bg-blue-600',
    textColor: 'text-slate-900',
    icon: Zap
  }
};

export const STATIC_CAMPAIGNS: Campaign[] = [
  {
    id: 'new-year-2026',
    title: 'Start Your Business in 2026 🚀',
    description: 'Special 20% off on all Company Incorporations this January. Kickstart your dream and let us handle the paperwork.',
    cta: 'Register Now',
    ctaLink: '/company-registration',
    type: 'popup',
    rules: [
      { type: 'date', value: { start: '2026-01-01', end: '2026-01-31' } },
      { type: 'delay', value: 5000 }
    ],
    theme: CAMPAIGN_THEMES.celebration,
    priority: 10
  },
  {
    id: 'fy-end-2026',
    title: 'Last chance to file your taxes ⚠️',
    description: 'The Financial Year is ending! Avoid penalties and file your ROC & GST returns before March 31st.',
    cta: 'File Now',
    ctaLink: '/gst',
    type: 'popup',
    rules: [
      { type: 'date', value: { start: '2026-03-01', end: '2026-03-31' } },
      { type: 'delay', value: 8000 }
    ],
    theme: CAMPAIGN_THEMES.financial,
    priority: 20
  },
  {
    id: 'independence-day-2026',
    title: 'Freedom to Build Your Business 🇮🇳',
    description: 'This Independence Day, we celebrate the spirit of Indian entrepreneurship. Get 15% off on all services.',
    cta: 'Get Started',
    ctaLink: '/services',
    type: 'popup',
    rules: [
        { type: 'date', value: { start: '2026-08-10', end: '2026-08-16' } }
    ],
    theme: CAMPAIGN_THEMES.national,
    priority: 15
  },
  {
    id: 'gst-expert-popup',
    title: 'Need a GST Expert? 📊',
    description: 'You\'ve been searching for GST. Connect with a top-rated CA specialized in GST filings instantly.',
    cta: 'Talk to Expert',
    ctaLink: '/gst',
    type: 'popup',
    rules: [
      { type: 'interaction', value: { query: 'gst', count: 2 } }
    ],
    theme: CAMPAIGN_THEMES.financial,
    priority: 30
  },
  {
    id: 'idle-help-popup',
    title: 'Stuck somewhere? 🤔',
    description: 'We noticed you\'ve been idle for a bit. Need help choosing the right service for your business?',
    cta: 'Get Guidance',
    ctaLink: '/services',
    type: 'popup',
    rules: [
      { type: 'idle', value: 20000 }
    ],
    theme: CAMPAIGN_THEMES.default,
    priority: 5
  },
  {
    id: 'exit-intent-offer',
    title: 'Wait! Don\'t leave yet 🎁',
    description: 'Get a free compliance audit for your startup before you go. Limited time offer.',
    cta: 'Claim Audit',
    ctaLink: '/cs-services',
    type: 'popup',
    rules: [
      { type: 'exit', value: true }
    ],
    theme: CAMPAIGN_THEMES.alert,
    priority: 40
  }
];
