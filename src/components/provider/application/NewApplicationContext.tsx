
import React, { createContext, useContext, useState } from 'react';

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

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

interface NewApplicationContextType {
  formData: NewProviderApplicationData;
  updateFormData: (data: Partial<NewProviderApplicationData>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  totalSteps: number;
  nextStep: () => void;
  prevStep: () => void;
  isValid: (step: number) => boolean;
  validateCurrentStep: () => ValidationResult;
  submitApplication: () => Promise<void>;
  isSubmitting: boolean;
}

const initialFormData: NewProviderApplicationData = {
  // Basic Information
  full_name: '',
  email: '',
  location: '',
  
  // Professional Presence
  linkedin_url: '',
  portfolio_url: '',
  
  // Experience & Focus
  years_email_marketing: '',
  years_ecommerce: '',
  expertise_areas: [],
  email_platforms: [],
  klaviyo_required: false,
  
  // Case Study
  case_study: {
    client_industry: '',
    challenge_goal: '',
    strategy_solution: '',
    quantifiable_results: '',
  },
  
  // Work Style & Agreement
  communication_process: '',
  availability_capacity: '',
  terms_agreement: false,
  client_references_willing: false,
};

const NewApplicationContext = createContext<NewApplicationContextType | undefined>(undefined);

export const useNewApplicationContext = () => {
  const context = useContext(NewApplicationContext);
  if (!context) {
    throw new Error('useNewApplicationContext must be used within NewApplicationProvider');
  }
  return context;
};

export const NewApplicationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<NewProviderApplicationData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalSteps = 5;

  const updateFormData = (data: Partial<NewProviderApplicationData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const validateCurrentStep = (): ValidationResult => {
    const errors: string[] = [];
    
    switch (currentStep) {
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
        if (formData.expertise_areas.length === 0) errors.push('At least one expertise area is required');
        if (!formData.email_platforms.includes('Klaviyo')) errors.push('Klaviyo expertise is required');
        break;
      case 3: // Case Study
        if (!formData.case_study.client_industry.trim()) errors.push('Client industry is required');
        if (!formData.case_study.challenge_goal.trim()) errors.push('Challenge/goal is required');
        if (!formData.case_study.strategy_solution.trim()) errors.push('Strategy/solution is required');
        if (!formData.case_study.quantifiable_results.trim()) errors.push('Quantifiable results are required');
        break;
      case 4: // Work Style & Agreement
        if (!formData.communication_process.trim()) errors.push('Communication process is required');
        if (!formData.availability_capacity.trim()) errors.push('Availability is required');
        if (!formData.terms_agreement) errors.push('Terms agreement is required');
        break;
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  };

  const isValid = (step: number): boolean => {
    switch (step) {
      case 0: // Basic Information
        return !!(formData.full_name && formData.email && formData.location);
      case 1: // Professional Presence
        return !!(formData.linkedin_url && formData.portfolio_url);
      case 2: // Experience & Focus
        return !!(
          formData.years_email_marketing && 
          formData.years_ecommerce && 
          formData.expertise_areas.length > 0 && 
          formData.email_platforms.includes('Klaviyo')
        );
      case 3: // Case Study
        return !!(
          formData.case_study.client_industry &&
          formData.case_study.challenge_goal &&
          formData.case_study.strategy_solution &&
          formData.case_study.quantifiable_results
        );
      case 4: // Work Style & Agreement
        return !!(
          formData.communication_process &&
          formData.availability_capacity &&
          formData.terms_agreement
        );
      default:
        return false;
    }
  };

  const submitApplication = async () => {
    setIsSubmitting(true);
    try {
      // TODO: Implement actual submission logic
      console.log('Submitting application:', formData);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated API call
    } catch (error) {
      console.error('Error submitting application:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <NewApplicationContext.Provider
      value={{
        formData,
        updateFormData,
        currentStep,
        setCurrentStep,
        totalSteps,
        nextStep,
        prevStep,
        isValid,
        validateCurrentStep,
        submitApplication,
        isSubmitting,
      }}
    >
      {children}
    </NewApplicationContext.Provider>
  );
};
