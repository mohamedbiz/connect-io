import { NewProviderApplicationData } from './types';

export const initialFormData: NewProviderApplicationData = {
  full_name: '',
  email: '',
  location: '',
  years_email_marketing: '',
  years_ecommerce_experience: '',
  email_marketing_expertise: [],
  average_client_revenue: '',
  significant_revenue_increase: '',
  best_results_achieved: '',
  linkedin_url: '',
  portfolio_url: '',
  email_platforms: [],
  klaviyo_proficiency: '',
  primary_industries: [],
  klaviyo_required: false,
  case_study: {
    client_industry: '',
    approach_implementation: '',
    baseline_metrics: '',
    results_achieved: '',
    esp_platform_used: '',
  },
  communication_frequency: '',
  communication_channels: [],
  project_management_tools: [],
  hours_available: '',
  response_time: '',
};

export const TOTAL_STEPS = 5;