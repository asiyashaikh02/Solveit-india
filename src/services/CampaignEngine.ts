import { Campaign, CampaignRule } from './CampaignConfig';

export interface EngineContext {
  scrollY: number;
  timeOnPage: number;
  idleTime: number;
  exitIntent: boolean;
  searchHistory: Record<string, number>;
}

export class CampaignEngine {
  static isRuleSatisfied(rule: CampaignRule, context: EngineContext): boolean {
    const today = new Date();
    
    switch (rule.type) {
      case 'date': {
        const { start, end } = rule.value;
        const startDate = new Date(start);
        const endDate = new Date(end);
        return today >= startDate && today <= endDate;
      }
      
      case 'delay':
        return context.timeOnPage >= rule.value;
      
      case 'scroll':
        return context.scrollY >= rule.value;

      case 'interaction': {
        const historyCount = context.searchHistory[rule.value.query.toLowerCase()] || 0;
        return historyCount >= rule.value.count;
      }

      case 'idle':
        return context.idleTime >= rule.value;

      case 'exit':
        return context.exitIntent === rule.value;
        
      default:
        return true;
    }
  }

  static getActiveCampaign(campaigns: Campaign[], context: EngineContext): Campaign | null {
    // 1. Filter by satisfied rules
    const potentialCampaigns = campaigns.filter(campaign => {
      // Check if already shown in this session
      const shown = sessionStorage.getItem(`campaign_${campaign.id}`);
      if (shown) return false;

      // All rules must be satisfied
      return campaign.rules.every(rule => this.isRuleSatisfied(rule, context));
    });

    // 2. Sort by priority (higher number = higher priority)
    if (potentialCampaigns.length === 0) return null;
    
    return potentialCampaigns.sort((a, b) => b.priority - a.priority)[0];
  }

  static markAsShown(campaignId: string) {
    sessionStorage.setItem(`campaign_${campaignId}`, 'true');
  }
}
