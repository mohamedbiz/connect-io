
import React, { createContext, useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProviderApplications } from '@/hooks/useProviderApplications';
import { toast } from 'sonner';

export interface NewProviderApplicationData {
  // Basic Information
  full_name: string;
  email: string;
  location: string;
  years_email_marketing: string;
  years_ecommerce_experience: string;
  email_marketing_expertise: string[];
  average_client_revenue: string;
  connect_interest: string;
  
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
  client_references_willing: boolean;
  terms_agreement: boolean;
}

interface NewApplicationContextType {
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

const initialFormData: NewProviderApplicationData = {
  full_name: '',
  email: '',
  location: '',
  years_email_marketing: '',
  years_ecommerce_experience: '',
  email_marketing_expertise: [],
  average_client_revenue: '',
  connect_interest: '',
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
  client_references_willing: false,
  terms_agreement: false,
};

const NewApplicationContext = createContext<NewApplicationContextType | undefined>(undefined);

export const useNewApplicationContext = () => {
  const context = useContext(NewApplicationContext);
  if (!context) {
    throw new Error('useNewApplicationContext must be used within a NewApplicationProvider');
  }
  return context;
};

interface NewApplicationProviderProps {
  children: React.ReactNode;
}

export const NewApplicationProvider: React.FC<NewApplicationProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState<NewProviderApplicationData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(0);
  const { submitApplication: submitToAPI, isSubmitting } = useProviderApplications();
  const navigate = useNavigate();
  
  const totalSteps = 5;

  const updateFormData = useCallback((data: Partial<NewProviderApplicationData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, totalSteps]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const validateStep = useCallback((step: number): { isValid: boolean; errors: string[] } => {
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
        if (!formData.connect_interest.trim()) errors.push('Connect interest explanation is required');
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
        if (!formData.terms_agreement) errors.push('Terms agreement is required');
        break;
    }
    
    return { isValid: errors.length === 0, errors };
  }, [formData]);

  const isValid = useCallback((step: number): boolean => {
    return validateStep(step).isValid;
  }, [validateStep]);

  const validateCurrentStep = useCallback(() => {
    return validateStep(currentStep);
  }, [validateStep, currentStep]);

  const submitApplication = useCallback(async () => {
    // Validate all steps
    for (let i = 0; i < totalSteps; i++) {
      const validation = validateStep(i);
      if (!validation.isValid) {
        validation.errors.forEach(error => toast.error(error));
        return;
      }
    }

    try {
      await submitToAPI(formData);
      toast.success('Application submitted successfully!');
      // Navigate to submission confirmation page
      navigate('/provider-application-submitted');
    } catch (error) {
      console.error('Failed to submit application:', error);
      toast.error('Failed to submit application. Please try again.');
    }
  }, [formData, validateStep, submitToAPI, totalSteps, navigate]);

  const value: NewApplicationContextType = {
    formData,
    updateFormData,
    currentStep,
    totalSteps,
    setCurrentStep,
    nextStep,
    prevStep,
    isValid,
    validateCurrentStep,
    submitApplication,
    isSubmitting,
  };

  return (
    <NewApplicationContext.Provider value={value}>
      {children}
    </NewApplicationContext.Provider>
  );
};
