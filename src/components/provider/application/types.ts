export interface NewProviderApplicationData {
  // Basic Information  
  full_name: string;
  email: string;
  location: string;
  years_email_marketing: string;
  years_ecommerce_experience: string;
  email_marketing_expertise: string[];
  average_client_revenue: string;
  
  // Key Achievements & Professional Presence
  significant_revenue_increase: string;
  best_results_achieved: string;
  linkedin_url: string;
  portfolio_url: string;
  
  // Experience & Focus
  email_platforms: string[];
  klaviyo_proficiency: string;
  primary_industries: string[];
  klaviyo_required: boolean;
  
  // Case Study
  case_study: {
    client_industry: string;
    approach_implementation: string;
    baseline_metrics: string;
    results_achieved: string;
    esp_platform_used: string;
  };
  
  // Work Style & Agreement
  communication_frequency: string;
  communication_channels: string[];
  project_management_tools: string[];
  hours_available: string;
  response_time: string;
}

export interface NewApplicationContextType {
  formData: NewProviderApplicationData;
  updateFormData: (data: Partial<NewProviderApplicationData>) => void;
  currentStep: number;
  totalSteps: number;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  isValid: (step: number) => boolean;
  validateCurrentStep: () => { isValid: boolean; errors: string[] };
  submitApplication: () => Promise<void>;
  isSubmitting: boolean;
}