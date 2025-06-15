
import React, { createContext, useContext, useState, useCallback } from 'react';
import { useProviderApplications } from '@/hooks/useProviderApplications';
import { automationService } from '@/services/providerApplicationAutomation';

interface ApplicationData {
  // Basic Information
  full_name: string;
  email: string;
  location: string;
  timezone: string;
  
  // Professional Presence
  linkedin_url: string;
  portfolio_url: string;
  
  // Experience & Focus
  years_email_marketing: string;
  years_ecommerce: string;
  email_platforms: string[];
  expertise_areas: string[];
  
  // Case Study
  case_studies: Array<{
    client_industry: string;
    initial_situation: string;
    strategy_implemented: string;
    results_achieved: string;
    timeline: string;
  }>;
  
  // Work Style & Agreement
  availability: string;
  hourly_rate: string;
  performance_guarantee: 'yes' | 'no';
  terms_accepted: boolean;
  klaviyo_expertise_confirmed: boolean;
}

interface ApplicationContextType {
  applicationData: ApplicationData;
  updateApplicationData: (updates: Partial<ApplicationData>) => void;
  submitApplication: () => Promise<void>;
  isSubmitting: boolean;
  validationErrors: Record<string, string>;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  canProceedToStep: (step: number) => boolean;
  getApplicationScore: () => any;
}

const initialApplicationData: ApplicationData = {
  full_name: '',
  email: '',
  location: '',
  timezone: '',
  linkedin_url: '',
  portfolio_url: '',
  years_email_marketing: '',
  years_ecommerce: '',
  email_platforms: [],
  expertise_areas: [],
  case_studies: [],
  availability: '',
  hourly_rate: '',
  performance_guarantee: 'no',
  terms_accepted: false,
  klaviyo_expertise_confirmed: false,
};

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export const useApplicationContext = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error('useApplicationContext must be used within an ApplicationProvider');
  }
  return context;
};

interface ApplicationProviderProps {
  children: React.ReactNode;
}

export const ApplicationProvider: React.FC<ApplicationProviderProps> = ({ children }) => {
  const [applicationData, setApplicationData] = useState<ApplicationData>(initialApplicationData);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState(1);
  
  const { submitApplication: submitToAPI, isSubmitting } = useProviderApplications();

  const updateApplicationData = useCallback((updates: Partial<ApplicationData>) => {
    setApplicationData(prev => ({ ...prev, ...updates }));
    // Clear validation errors for updated fields
    const updatedFields = Object.keys(updates);
    setValidationErrors(prev => {
      const newErrors = { ...prev };
      updatedFields.forEach(field => {
        delete newErrors[field];
      });
      return newErrors;
    });
  }, []);

  const validateStep = useCallback((step: number): boolean => {
    const errors: Record<string, string> = {};
    
    switch (step) {
      case 1: // Basic Information
        if (!applicationData.full_name.trim()) errors.full_name = 'Full name is required';
        if (!applicationData.email.trim()) errors.email = 'Email is required';
        if (!applicationData.location.trim()) errors.location = 'Location is required';
        if (!applicationData.timezone) errors.timezone = 'Timezone is required';
        break;
        
      case 2: // Professional Presence
        if (!applicationData.linkedin_url.trim()) {
          errors.linkedin_url = 'LinkedIn URL is required';
        } else if (!isValidUrl(applicationData.linkedin_url)) {
          errors.linkedin_url = 'Please enter a valid LinkedIn URL';
        }
        if (!applicationData.portfolio_url.trim()) {
          errors.portfolio_url = 'Portfolio URL is required';
        } else if (!isValidUrl(applicationData.portfolio_url)) {
          errors.portfolio_url = 'Please enter a valid portfolio URL';
        }
        break;
        
      case 3: // Experience & Focus
        if (!applicationData.years_email_marketing) {
          errors.years_email_marketing = 'Email marketing experience is required';
        }
        if (!applicationData.years_ecommerce) {
          errors.years_ecommerce = 'eCommerce experience is required';
        }
        if (applicationData.email_platforms.length === 0) {
          errors.email_platforms = 'At least one email platform is required';
        }
        if (!applicationData.email_platforms.includes('Klaviyo')) {
          errors.klaviyo_expertise = 'Klaviyo expertise is required';
        }
        if (applicationData.expertise_areas.length === 0) {
          errors.expertise_areas = 'At least one expertise area is required';
        }
        if (!applicationData.klaviyo_expertise_confirmed) {
          errors.klaviyo_expertise_confirmed = 'You must confirm your Klaviyo expertise';
        }
        break;
        
      case 4: // Case Study
        if (applicationData.case_studies.length === 0) {
          errors.case_studies = 'At least one case study is required';
        } else {
          applicationData.case_studies.forEach((study, index) => {
            if (!study.client_industry.trim()) {
              errors[`case_study_${index}_industry`] = 'Client industry is required';
            }
            if (!study.initial_situation.trim()) {
              errors[`case_study_${index}_situation`] = 'Initial situation is required';
            } else if (study.initial_situation.trim().split(' ').length < 20) {
              errors[`case_study_${index}_situation`] = 'Initial situation must be at least 20 words';
            }
            if (!study.strategy_implemented.trim()) {
              errors[`case_study_${index}_strategy`] = 'Strategy implemented is required';
            } else if (study.strategy_implemented.trim().split(' ').length < 30) {
              errors[`case_study_${index}_strategy`] = 'Strategy must be at least 30 words';
            }
            if (!study.results_achieved.trim()) {
              errors[`case_study_${index}_results`] = 'Results achieved is required';
            } else if (study.results_achieved.trim().split(' ').length < 15) {
              errors[`case_study_${index}_results`] = 'Results must be at least 15 words';
            }
            if (!study.timeline.trim()) {
              errors[`case_study_${index}_timeline`] = 'Timeline is required';
            }
          });
        }
        break;
        
      case 5: // Work Style & Agreement
        if (!applicationData.availability) {
          errors.availability = 'Availability is required';
        }
        if (!applicationData.hourly_rate) {
          errors.hourly_rate = 'Hourly rate is required';
        }
        if (!applicationData.performance_guarantee) {
          errors.performance_guarantee = 'Performance guarantee preference is required';
        }
        if (!applicationData.terms_accepted) {
          errors.terms_accepted = 'You must accept the terms and conditions';
        }
        break;
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [applicationData]);

  const canProceedToStep = useCallback((step: number): boolean => {
    if (step <= currentStep) return true;
    
    // Check if all previous steps are valid
    for (let i = 1; i < step; i++) {
      if (!validateStep(i)) return false;
    }
    return true;
  }, [currentStep, validateStep]);

  const getApplicationScore = useCallback(() => {
    return automationService.calculateScore(applicationData);
  }, [applicationData]);

  const submitApplication = useCallback(async () => {
    // Validate all steps
    let isValid = true;
    for (let i = 1; i <= 5; i++) {
      if (!validateStep(i)) {
        isValid = false;
      }
    }
    
    if (!isValid) {
      throw new Error('Please fix all validation errors before submitting');
    }

    // Calculate automated score
    const score = automationService.calculateScore(applicationData);
    
    // Prepare submission data
    const submissionData = {
      ...applicationData,
      automated_score: score.score,
      approval_tier: score.tier,
      auto_approved: score.autoApproved,
      score_breakdown: score.breakdown
    };

    await submitToAPI(submissionData);
  }, [applicationData, validateStep, submitToAPI]);

  const value: ApplicationContextType = {
    applicationData,
    updateApplicationData,
    submitApplication,
    isSubmitting,
    validationErrors,
    currentStep,
    setCurrentStep,
    canProceedToStep,
    getApplicationScore,
  };

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
};

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
