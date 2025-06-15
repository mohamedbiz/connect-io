
import React, { createContext, useContext, useState, useCallback } from 'react';
import { useProviderApplications } from '@/hooks/useProviderApplications';
import { toast } from 'sonner';

export interface NewProviderApplicationData {
  // Basic Information
  full_name: string;
  email: string;
  location: string;
  
  // Professional Presence
  linkedin_url: string;
  portfolio_url: string;
  
  // Experience & Focus
  years_email_marketing: string;
  years_ecommerce: string;
  email_platforms: string[];
  expertise_areas: string[];
  klaviyo_required: boolean;
  
  // Case Study
  case_study: {
    client_industry: string;
    challenge_goal: string;
    strategy_solution: string;
    quantifiable_results: string;
  };
  
  // Work Style & Agreement
  communication_process: string;
  availability_capacity: string;
  terms_agreement: boolean;
  client_references_willing: boolean;
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
  linkedin_url: '',
  portfolio_url: '',
  years_email_marketing: '',
  years_ecommerce: '',
  email_platforms: [],
  expertise_areas: [],
  klaviyo_required: false,
  case_study: {
    client_industry: '',
    challenge_goal: '',
    strategy_solution: '',
    quantifiable_results: '',
  },
  communication_process: '',
  availability_capacity: '',
  terms_agreement: false,
  client_references_willing: false,
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
        break;
        
      case 1: // Professional Presence
        if (!formData.linkedin_url.trim()) errors.push('LinkedIn URL is required');
        if (!formData.portfolio_url.trim()) errors.push('Portfolio URL is required');
        break;
        
      case 2: // Experience & Focus
        if (!formData.years_email_marketing) errors.push('Email marketing experience is required');
        if (!formData.years_ecommerce) errors.push('eCommerce experience is required');
        if (formData.email_platforms.length === 0) errors.push('At least one email platform is required');
        if (!formData.email_platforms.includes('Klaviyo')) errors.push('Klaviyo expertise is required');
        if (formData.expertise_areas.length < 2) errors.push('At least 2 expertise areas are required');
        break;
        
      case 3: // Case Study
        if (!formData.case_study.client_industry.trim()) errors.push('Client industry is required');
        if (!formData.case_study.challenge_goal.trim()) errors.push('Challenge/goal is required');
        if (!formData.case_study.strategy_solution.trim()) errors.push('Strategy/solution is required');
        if (!formData.case_study.quantifiable_results.trim()) errors.push('Quantifiable results are required');
        break;
        
      case 4: // Work Style & Agreement
        if (!formData.communication_process.trim()) errors.push('Communication process is required');
        if (!formData.availability_capacity.trim()) errors.push('Availability/capacity is required');
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
    } catch (error) {
      toast.error('Failed to submit application. Please try again.');
    }
  }, [formData, validateStep, submitToAPI, totalSteps]);

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
