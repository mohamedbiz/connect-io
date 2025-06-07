
import { Profile } from '@/types/auth';
import { RecommendationReason, RecommendationEngineConfig } from '@/types/recommendations';

export class RecommendationEngine {
  private config: RecommendationEngineConfig = {
    industryMatchWeight: 40,
    platformMatchWeight: 20,
    experienceWeight: 15,
    revenueMatchWeight: 15,
    goalMatchWeight: 10,
  };

  calculateMatchScore(founder: Profile, provider: Profile): number {
    let score = 0;
    
    // Industry match (highest weight)
    if (provider.industries_served?.includes(founder.industry || '')) {
      score += this.config.industryMatchWeight;
    }
    
    // Email platform match
    if (provider.primary_esp === founder.email_platform) {
      score += this.config.platformMatchWeight;
    }
    
    // Experience level
    if (provider.years_experience) {
      const experienceValue = this.parseExperience(provider.years_experience);
      score += Math.min(experienceValue * 3, this.config.experienceWeight);
    }
    
    // Revenue tier match
    const revenueMatch = this.matchRevenueRange(founder.monthly_revenue, provider);
    score += revenueMatch * this.config.revenueMatchWeight;
    
    // Goal alignment
    if (this.matchesGoal(founder.marketing_goal, provider)) {
      score += this.config.goalMatchWeight;
    }
    
    return Math.min(100, Math.round(score));
  }

  generateReasonCodes(founder: Profile, provider: Profile): string[] {
    const reasons: string[] = [];
    
    if (provider.industries_served?.includes(founder.industry || '')) {
      reasons.push('industry_match');
    }
    
    if (provider.primary_esp === founder.email_platform) {
      reasons.push('platform_expertise');
    }
    
    if (provider.years_experience) {
      const experienceValue = this.parseExperience(provider.years_experience);
      if (experienceValue >= 5) {
        reasons.push('high_experience');
      } else if (experienceValue >= 3) {
        reasons.push('medium_experience');
      }
    }
    
    if (provider.is_featured) {
      reasons.push('featured_provider');
    }
    
    if (this.matchesGoal(founder.marketing_goal, provider)) {
      reasons.push('goal_alignment');
    }
    
    return reasons;
  }

  getReasonDescription(reasonCode: string): string {
    const descriptions: Record<string, string> = {
      industry_match: 'Specializes in your industry',
      platform_expertise: 'Expert in your email platform',
      high_experience: '5+ years of experience',
      medium_experience: '3+ years of experience',
      featured_provider: 'Top-rated provider',
      goal_alignment: 'Aligns with your marketing goals',
      revenue_match: 'Experience with similar revenue businesses',
    };
    
    return descriptions[reasonCode] || reasonCode;
  }

  private parseExperience(experience: string): number {
    if (experience.includes('5+')) return 5;
    if (experience.includes('3-5')) return 4;
    if (experience.includes('1-3')) return 2;
    return 1;
  }

  private matchRevenueRange(founderRevenue: string | undefined, provider: Profile): number {
    // Simple matching logic - can be enhanced based on provider's typical client size
    if (!founderRevenue) return 0;
    
    const revenue = founderRevenue.toLowerCase();
    if (revenue.includes('500k+')) return 1;
    if (revenue.includes('250k-500k')) return 0.8;
    if (revenue.includes('100k-250k')) return 0.6;
    if (revenue.includes('50k-100k')) return 0.4;
    return 0.2;
  }

  private matchesGoal(founderGoal: string | undefined, provider: Profile): boolean {
    if (!founderGoal || !provider.approach_description) return false;
    
    const goal = founderGoal.toLowerCase();
    const approach = provider.approach_description.toLowerCase();
    
    // Simple keyword matching - can be enhanced with NLP
    const goalKeywords = goal.split(' ');
    return goalKeywords.some(keyword => 
      keyword.length > 3 && approach.includes(keyword)
    );
  }
}

export const recommendationEngine = new RecommendationEngine();
