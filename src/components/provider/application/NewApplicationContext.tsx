
import React, { createContext, useContext, useState } from 'react';

// New simplified form data structure based on the specifications
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
  expertise_areas: string[];
  email_platforms: string[];
  klaviyo_required: boolean;
  
  // Proof of Results (Case Study)
  case_study: {
    client_industry: string;
    challenge_goal: string;
    strategy_solution: string;
    quantifiable_results: string;
  };
  
  // Work Style & Communication
  communication_process: string;
  availability_capacity: string;
  
  // Agreement
  terms_agreement: boolean;
  client_references_willing: boolean;
}

const initialFormData: NewProviderApplicationData = {
  full_name: '',
  email: '',
  location: '',
  linkedin_url: '',
  portfolio_url: '',
  years_email_marketing: '',
  years_ecommerce: '',
  expertise_areas: [],
  email_platforms: [],
  klaviyo_required: false,
  case_study: {
    client_industry: '',
    challenge_goal: '',
    strategy_solution: '',
    quantifiable_results: ''
  },
  communication_process: '',
  availability_capacity: '',
  terms_agreement: false,
  client_references_willing: false
};

type NewApplicationContextType = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  formData: NewProviderApplicationData;
  updateFormData: (data: Partial<NewProviderApplicationData>) => void;
  isSubmitting: boolean;
  setIsSubmitting: (submitting: boolean) => void;
  validateCurrentStep: () => { isValid: boolean; errors: string[] };
};

const NewApplicationContext = createContext<NewApplicationContextType | undefined>(undefined);

export const useNewApplicationContext = () => {
  const context = useContext(NewApplicationContext);
  if (context === undefined) {
    throw new Error('useNewApplicationContext must be used within a NewApplicationProvider');
  }
  return context;
};

export const NewApplicationProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<NewProviderApplicationData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (updates: Partial<NewProviderApplicationData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const validateCurrentStep = (): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    switch (currentStep) {
      case 0: // Basic Information
        if (!formData.full_name.trim()) errors.push('Full name is required');
        if (!formData.email.trim()) errors.push('Email is required');
        if (!formData.location.trim()) errors.push('Location is required');
        break;

      case 1: // Professional Presence
        if (!formData.linkedin_url.trim()) errors.push('LinkedIn profile URL is required');
        if (!formData.portfolio_url.trim()) errors.push('Portfolio/website URL is required');
        break;

      case 2: // Experience & Focus
        if (!formData.years_email_marketing) errors.push('Years of email marketing experience is required');
        if (!formData.years_ecommerce) errors.push('Years of eCommerce experience is required');
        if (formData.expertise_areas.length === 0) errors.push('At least one expertise area is required');
        if (formData.email_platforms.length === 0) errors.push('At least one email platform is required');
        if (!formData.klaviyo_required) errors.push('Klaviyo expertise is required');
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

    return {
      isValid: errors.length === 0,
      errors
    };
  };

  const value: NewApplicationContextType = {
    currentStep,
    setCurrentStep,
    formData,
    updateFormData,
    isSubmitting,
    setIsSubmitting,
    validateCurrentStep
  };

  return (
    <NewApplicationContext.Provider value={value}>
      {children}
    </NewApplicationContext.Provider>
  );
};
