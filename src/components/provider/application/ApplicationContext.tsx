
import { createContext, useContext, useState } from "react";
import { ProviderApplicationFormData } from "../ProviderApplicationForm";

// Initial form state with all fields needed across all steps
const initialFormState = {
  // Personal Information
  full_name: "",
  phone_number: "",
  location: "",
  linkedin_url: "",
  portfolio_url: "",
  
  // Professional Experience
  years_experience: "",
  email_platforms: [] as string[],
  email_platforms_other: "",
  ecommerce_platforms: [] as string[],
  ecommerce_platforms_other: "",
  
  // Expertise & Specialization
  expertise_areas: [] as string[],
  expertise_other: "",
  industries: [] as string[],
  industries_other: "",
  average_revenue_increase: "",
  average_conversion_increase: "",
  average_churn_reduction: "",
  
  // Case Studies (array of objects)
  case_studies: [
    {
      client_industry: "",
      project_duration: "",
      initial_situation: "",
      implemented_solutions: "",
      results_achieved: "",
      reference_contact: ""
    },
    {
      client_industry: "",
      project_duration: "",
      initial_situation: "",
      implemented_solutions: "",
      results_achieved: "",
      reference_contact: ""
    }
  ],
  
  // Work Approach
  availability: "",
  typical_timeline: "",
  communication_preferences: "",
  project_management_tools: "",
  performance_guarantee: "yes" as "yes" | "no" | "conditional", // yes, no, conditional
  performance_guarantee_conditions: "",
  
  // Sample Work
  sample_work: ["", "", ""] as string[],
  
  // Additional Information
  technical_assessment: true,
  additional_information: "",
  referral_source: "",
  referral_details: ""
};

type ApplicationContextType = {
  formData: ProviderApplicationFormData;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  updateFormData: (data: Partial<ProviderApplicationFormData>) => void;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
};

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export const useApplicationContext = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error("useApplicationContext must be used within an ApplicationProvider");
  }
  return context;
};

export const ApplicationProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState<ProviderApplicationFormData>(initialFormState);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const updateFormData = (newData: Partial<ProviderApplicationFormData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };
  
  return (
    <ApplicationContext.Provider value={{ 
      formData, 
      currentStep, 
      setCurrentStep, 
      updateFormData, 
      isSubmitting, 
      setIsSubmitting 
    }}>
      {children}
    </ApplicationContext.Provider>
  );
};

export { initialFormState };
