import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProviderApplicationFormData } from '../ProviderApplicationForm';
import { automationService, ApplicationScore } from '@/services/providerApplicationAutomation';

// Initial form state with all fields needed across all steps
const initialFormData: ProviderApplicationFormData = {
  // Personal Information
  full_name: '',
  phone_number: '',
  location: '',
  linkedin_url: '',
  portfolio_url: '',
  
  // Professional Experience
  years_experience: '',
  email_platforms: [],
  email_platforms_other: '',
  ecommerce_platforms: [],
  ecommerce_platforms_other: '',
  
  // Expertise & Specialization
  expertise_areas: [],
  expertise_other: '',
  industries: [],
  industries_other: '',
  average_revenue_increase: '',
  average_conversion_increase: '',
  average_churn_reduction: '',
  
  // Case Studies
  case_studies: [],
  
  // Work Approach
  availability: '',
  typical_timeline: '',
  communication_preferences: '',
  project_management_tools: '',
  performance_guarantee: 'no' as const, // yes, no, conditional
  performance_guarantee_conditions: '',
  
  // Sample Work
  sample_work: [],
  
  // Additional Information
  technical_assessment: false,
  additional_information: '',
  referral_source: '',
  referral_details: ''
};

type ApplicationContextType = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  formData: ProviderApplicationFormData;
  setFormData: (data: ProviderApplicationFormData | ((prev: ProviderApplicationFormData) => ProviderApplicationFormData)) => void;
  updateFormData: (data: Partial<ProviderApplicationFormData>) => void;
  isSubmitting: boolean;
  setIsSubmitting: (submitting: boolean) => void;
  applicationScore: ApplicationScore | null;
  updateScore: () => void;
  validateCurrentStep: () => { isValid: boolean; errors: string[] };
};

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export const useApplicationContext = () => {
  const context = useContext(ApplicationContext);
  if (context === undefined) {
    throw new Error('useApplicationContext must be used within an ApplicationProvider');
  }
  return context;
};

export const ApplicationProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ProviderApplicationFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationScore, setApplicationScore] = useState<ApplicationScore | null>(null);

  // Update score whenever form data changes
  useEffect(() => {
    updateScore();
  }, [formData]);

  const updateScore = () => {
    try {
      const score = automationService.calculateScore(formData);
      setApplicationScore(score);
    } catch (error) {
      console.error('Error calculating score:', error);
    }
  };

  const updateFormData = (updates: Partial<ProviderApplicationFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const validateCurrentStep = (): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    switch (currentStep) {
      case 0: // Personal Information
        if (!formData.full_name.trim()) errors.push('Full name is required');
        if (!formData.phone_number.trim()) errors.push('Phone number is required');
        if (!formData.location.trim()) errors.push('Location is required');
        break;

      case 1: // Professional Experience
        if (!formData.years_experience) errors.push('Years of experience is required');
        if (formData.email_platforms.length === 0) errors.push('At least one email platform is required');
        if (formData.ecommerce_platforms.length === 0) errors.push('At least one eCommerce platform is required');
        break;

      case 2: // Expertise & Specialization
        if (formData.expertise_areas.length === 0) errors.push('At least one expertise area is required');
        if (formData.industries.length === 0) errors.push('At least one industry is required');
        break;

      case 3: // Case Studies
        if (formData.case_studies.length === 0) {
          errors.push('At least one case study is required');
        } else {
          formData.case_studies.forEach((study, index) => {
            if (!study.client_industry.trim()) errors.push(`Case study ${index + 1}: Client industry is required`);
            if (!study.initial_situation.trim()) errors.push(`Case study ${index + 1}: Initial situation is required`);
            if (!study.implemented_solutions.trim()) errors.push(`Case study ${index + 1}: Implemented solutions is required`);
            if (!study.results_achieved.trim()) errors.push(`Case study ${index + 1}: Results achieved is required`);
          });
        }
        break;

      case 4: // Work Approach
        if (!formData.availability.trim()) errors.push('Availability is required');
        if (!formData.typical_timeline.trim()) errors.push('Typical timeline is required');
        if (!formData.communication_preferences.trim()) errors.push('Communication preferences is required');
        break;

      case 5: // Final Review
        // All validation is done in previous steps
        break;
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  };

  const value: ApplicationContextType = {
    currentStep,
    setCurrentStep,
    formData,
    setFormData,
    updateFormData,
    isSubmitting,
    setIsSubmitting,
    applicationScore,
    updateScore,
    validateCurrentStep
  };

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
};

export { initialFormData };
