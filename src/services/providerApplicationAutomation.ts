
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface ApplicationScore {
  score: number;
  tier: 'standard' | 'verified' | 'premium';
  autoApproved: boolean;
  breakdown: {
    experience: number;
    expertise: number;
    caseStudies: number;
    portfolio: number;
    linkedin: number;
    guarantee: number;
  };
}

export interface AutomationSettings {
  autoApprovalThreshold: number;
  inReviewThreshold: number;
  notificationsEnabled: boolean;
}

export class ProviderApplicationAutomation {
  private static instance: ProviderApplicationAutomation;
  
  public static getInstance(): ProviderApplicationAutomation {
    if (!ProviderApplicationAutomation.instance) {
      ProviderApplicationAutomation.instance = new ProviderApplicationAutomation();
    }
    return ProviderApplicationAutomation.instance;
  }

  /**
   * Calculate application score on the frontend for preview
   */
  calculateScore(applicationData: any): ApplicationScore {
    let score = 0;
    const breakdown = {
      experience: 0,
      expertise: 0,
      caseStudies: 0,
      portfolio: 0,
      linkedin: 0,
      guarantee: 0
    };

    // Score based on years of experience
    const experiencePoints = this.getExperiencePoints(applicationData.years_experience);
    breakdown.experience = experiencePoints;
    score += experiencePoints;

    // Score based on expertise areas
    const expertiseCount = applicationData.expertise_areas?.length || 0;
    breakdown.expertise = expertiseCount * 5;
    score += breakdown.expertise;

    // Score based on case studies
    const caseStudiesCount = applicationData.case_studies?.length || 0;
    breakdown.caseStudies = caseStudiesCount * 15;
    score += breakdown.caseStudies;

    // Portfolio URL bonus
    if (applicationData.portfolio_url && applicationData.portfolio_url.trim()) {
      breakdown.portfolio = 10;
      score += 10;
    }

    // LinkedIn URL bonus
    if (applicationData.linkedin_url && applicationData.linkedin_url.trim()) {
      breakdown.linkedin = 5;
      score += 5;
    }

    // Performance guarantee bonus
    if (applicationData.performance_guarantee === 'yes') {
      breakdown.guarantee = 10;
      score += 10;
    }

    const finalScore = Math.min(score, 100);
    
    return {
      score: finalScore,
      tier: this.getTier(finalScore),
      autoApproved: finalScore >= 85,
      breakdown
    };
  }

  private getExperiencePoints(experience: string): number {
    switch (experience) {
      case '5+': return 50;
      case '3-5': return 40;
      case '1-3': return 30;
      default: return 20;
    }
  }

  private getTier(score: number): 'standard' | 'verified' | 'premium' {
    if (score >= 80) return 'premium';
    if (score >= 60) return 'verified';
    return 'standard';
  }

  /**
   * Get automation status for an application
   */
  async getApplicationStatus(applicationId: string) {
    try {
      const { data, error } = await supabase
        .from('provider_applications')
        .select(`
          *,
          application_reviews(*),
          provider_onboarding(*)
        `)
        .eq('id', applicationId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching application status:', error);
      return null;
    }
  }

  /**
   * Track application progress in real-time
   */
  subscribeToApplicationUpdates(applicationId: string, callback: (data: any) => void) {
    return supabase
      .channel('application_updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'provider_applications',
          filter: `id=eq.${applicationId}`
        },
        callback
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'application_reviews',
          filter: `application_id=eq.${applicationId}`
        },
        callback
      )
      .subscribe();
  }

  /**
   * Send application status notifications
   */
  async sendStatusNotification(applicationId: string, status: string, userEmail: string) {
    const notifications = {
      'submitted': {
        title: 'Application Received!',
        message: 'We\'ve received your provider application and will review it soon.'
      },
      'in_review': {
        title: 'Application Under Review',
        message: 'Your application is being reviewed by our team.'
      },
      'approved': {
        title: 'Congratulations! Application Approved',
        message: 'Welcome to our provider network! You can now access your dashboard.'
      },
      'rejected': {
        title: 'Application Update',
        message: 'Thank you for your interest. Please see the feedback in your dashboard.'
      }
    };

    const notification = notifications[status as keyof typeof notifications];
    if (notification) {
      // Show toast notification
      toast.success(notification.title, {
        description: notification.message,
        duration: 5000
      });

      // Mark notification as sent
      await supabase
        .from('provider_applications')
        .update({ notification_sent: true })
        .eq('id', applicationId);
    }
  }

  /**
   * Validate application data quality
   */
  validateApplicationData(applicationData: any): { isValid: boolean; issues: string[] } {
    const issues: string[] = [];

    // Required fields validation
    if (!applicationData.full_name?.trim()) {
      issues.push('Full name is required');
    }

    if (!applicationData.email?.trim()) {
      issues.push('Email is required');
    }

    if (!applicationData.years_experience) {
      issues.push('Years of experience is required');
    }

    if (!applicationData.expertise_areas?.length) {
      issues.push('At least one expertise area is required');
    }

    if (!applicationData.case_studies?.length) {
      issues.push('At least one case study is required');
    }

    // Quality validation
    if (applicationData.case_studies?.length) {
      applicationData.case_studies.forEach((study: any, index: number) => {
        if (!study.results_achieved?.trim()) {
          issues.push(`Case study ${index + 1} missing results`);
        }
      });
    }

    // URL validation
    if (applicationData.portfolio_url && !this.isValidUrl(applicationData.portfolio_url)) {
      issues.push('Portfolio URL is not valid');
    }

    if (applicationData.linkedin_url && !this.isValidUrl(applicationData.linkedin_url)) {
      issues.push('LinkedIn URL is not valid');
    }

    return {
      isValid: issues.length === 0,
      issues
    };
  }

  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get application analytics
   */
  async getApplicationAnalytics() {
    try {
      const { data, error } = await supabase
        .from('provider_applications')
        .select('status, automated_score, approval_tier, auto_approved, created_at');

      if (error) throw error;

      const analytics = {
        total: data.length,
        autoApproved: data.filter(app => app.auto_approved).length,
        averageScore: data.reduce((acc, app) => acc + (app.automated_score || 0), 0) / data.length,
        statusBreakdown: {
          submitted: data.filter(app => app.status === 'submitted').length,
          in_review: data.filter(app => app.status === 'in_review').length,
          approved: data.filter(app => app.status === 'approved').length,
          rejected: data.filter(app => app.status === 'rejected').length
        },
        tierBreakdown: {
          standard: data.filter(app => app.approval_tier === 'standard').length,
          verified: data.filter(app => app.approval_tier === 'verified').length,
          premium: data.filter(app => app.approval_tier === 'premium').length
        }
      };

      return analytics;
    } catch (error) {
      console.error('Error fetching application analytics:', error);
      return null;
    }
  }
}

export const automationService = ProviderApplicationAutomation.getInstance();
