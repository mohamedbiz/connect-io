import { NewProviderApplicationData } from './types';

export const validateStep = (step: number, formData: NewProviderApplicationData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  switch (step) {
    case 0: // Basic Information
      if (!formData.full_name.trim()) errors.push('Full name is required');
      if (!formData.email.trim()) errors.push('Email is required');
      if (!formData.location.trim()) errors.push('Location is required');
      if (!formData.years_email_marketing) errors.push('Years of email marketing experience is required');
      if (!formData.years_ecommerce_experience) errors.push('Years of eCommerce experience is required');
      if (formData.email_marketing_expertise.length === 0) errors.push('At least one email marketing expertise area is required');
      if (!formData.average_client_revenue) errors.push('Average client revenue range is required');
      break;
      
    case 1: // Key Achievements & Professional Presence
      if (!formData.significant_revenue_increase.trim()) errors.push('Significant revenue increase description is required');
      if (!formData.best_results_achieved.trim()) errors.push('Best results achieved description is required');
      if (!formData.linkedin_url.trim()) errors.push('LinkedIn URL is required');
      if (!formData.portfolio_url.trim()) errors.push('Portfolio/Website URL is required');
      break;
      
    case 2: // Experience & Focus
      if (formData.email_platforms.length === 0) errors.push('At least one email platform is required');
      if (!formData.email_platforms.includes('Klaviyo')) errors.push('Klaviyo expertise is required');
      if (!formData.klaviyo_proficiency) errors.push('Klaviyo proficiency level is required');
      if (!formData.primary_industries || formData.primary_industries.length === 0) errors.push('At least one industry is required');
      break;
      
    case 3: // Case Study
      if (!formData.case_study.client_industry.trim()) errors.push('Client industry and challenge is required');
      if (!formData.case_study.approach_implementation.trim()) errors.push('Approach and implementation is required');
      if (!formData.case_study.baseline_metrics.trim()) errors.push('Baseline metrics are required');
      if (!formData.case_study.results_achieved.trim()) errors.push('Results achieved are required');
      if (!formData.case_study.esp_platform_used.trim()) errors.push('ESP platform used is required');
      break;
      
    case 4: // Work Style & Agreement
      if (!formData.communication_frequency) errors.push('Communication frequency is required');
      if (!formData.communication_channels || formData.communication_channels.length === 0) errors.push('At least one communication channel is required');
      if (!formData.hours_available) errors.push('Hours available per week is required');
      if (!formData.response_time) errors.push('Response time is required');
      break;
  }
  
  return { isValid: errors.length === 0, errors };
};