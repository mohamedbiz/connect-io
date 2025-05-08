
import React, { createContext, useContext, useState } from 'react';
import { FounderApplicationFormData } from '@/types/founder';

interface FounderApplicationContextType {
  formData: FounderApplicationFormData;
  updateFormData: (newData: Partial<FounderApplicationFormData>) => void;
  currentStep: number;
  totalSteps: number;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
  isComplete: boolean;
  setIsComplete: (isComplete: boolean) => void;
}

const initialFormData: FounderApplicationFormData = {
  business_name: '',
  industry: '',
  monthly_revenue: '',
  number_of_employees: '',
  website_url: '',

  current_email_platform: '',
  current_email_platform_other: '',
  email_list_size: '',
  current_email_strategies: [],
  main_challenges: [],
  main_challenges_other: '',

  project_timeline: '',
  budget_range: '',
  specific_goals: [],
  specific_goals_other: '',
  preferred_communication: [],

  expectations: '',
  previous_experience: '',
  referral_source: '',
  additional_information: ''
};

const FounderApplicationContext = createContext<FounderApplicationContextType | undefined>(undefined);

export const useFounderApplicationContext = () => {
  const context = useContext(FounderApplicationContext);
  if (!context) {
    throw new Error('useFounderApplicationContext must be used within a FounderApplicationProvider');
  }
  return context;
};

export const FounderApplicationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FounderApplicationFormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  const totalSteps = 4;

  const updateFormData = (newData: Partial<FounderApplicationFormData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const goToStep = (step: number) => {
    if (step >= 0 && step < totalSteps) {
      setCurrentStep(step);
    }
  };

  return (
    <FounderApplicationContext.Provider
      value={{
        formData,
        updateFormData,
        currentStep,
        totalSteps,
        nextStep,
        prevStep,
        goToStep,
        isSubmitting,
        setIsSubmitting,
        isComplete,
        setIsComplete
      }}
    >
      {children}
    </FounderApplicationContext.Provider>
  );
};
