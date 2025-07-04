import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProviderApplications } from '@/hooks/useProviderApplications';
import { toast } from 'sonner';
import { NewApplicationContext } from './context';
import { NewProviderApplicationData, NewApplicationContextType } from './types';
import { initialFormData, TOTAL_STEPS } from './constants';
import { validateStep } from './validation';

interface NewApplicationProviderProps {
  children: React.ReactNode;
}

export const NewApplicationProvider: React.FC<NewApplicationProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState<NewProviderApplicationData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(0);
  const { submitApplication: submitToAPI, isSubmitting } = useProviderApplications();
  const navigate = useNavigate();

  const updateFormData = useCallback((data: Partial<NewProviderApplicationData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const isValid = useCallback((step: number): boolean => {
    return validateStep(step, formData).isValid;
  }, [formData]);

  const validateCurrentStep = useCallback(() => {
    return validateStep(currentStep, formData);
  }, [currentStep, formData]);

  const submitApplication = useCallback(async () => {
    // Validate all steps
    for (let i = 0; i < TOTAL_STEPS; i++) {
      const validation = validateStep(i, formData);
      if (!validation.isValid) {
        validation.errors.forEach(error => toast.error(error));
        return;
      }
    }

    try {
      await submitToAPI(formData);
      toast.success('Application submitted successfully!');
      // Navigate directly to provider dashboard for MVP
      navigate('/provider/dashboard');
    } catch (error) {
      console.error('Failed to submit application:', error);
      toast.error('Failed to submit application. Please try again.');
    }
  }, [formData, submitToAPI, navigate]);

  const value: NewApplicationContextType = {
    formData,
    updateFormData,
    currentStep,
    totalSteps: TOTAL_STEPS,
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