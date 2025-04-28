
import { createContext, useContext, useState } from "react";

export interface ClientAcquisitionFormData {
  // Initial Outreach
  outreach_type: "email" | "linkedin" | "cold_call" | "";
  store_name: string;
  first_name: string;
  specific_observation: string;
  niche: string;
  
  // Discovery Call
  business_background: {
    founding_story: string;
    best_selling_products: string;
    ideal_customer: string;
    average_order_value: string;
    acquisition_channels: string;
    business_goals: string;
  };
  
  // Email Marketing Assessment
  current_email: {
    platform: string;
    campaign_types: string[];
    automated_flows: string[];
    working_well: string;
    not_working: string;
    revenue_percentage: string;
    previous_experience: string;
  };
  
  // Store Analysis
  technical_assessment: {
    platform_evaluation: boolean;
    list_health: boolean;
    flow_assessment: boolean;
    campaign_assessment: boolean;
    performance_metrics: boolean;
  };
  
  // Opportunity Identification
  opportunities: {
    current_monthly_revenue: string;
    industry_benchmark: string;
    revenue_gap: string;
    projected_increase: string;
    priority_opportunities: Array<{
      name: string;
      effort: "Low" | "Medium" | "High";
      impact: "Low" | "Medium" | "High";
      priority_score: number;
    }>;
  };
  
  // Proposal
  proposal: {
    strengths: string[];
    opportunities: string[];
    recommendations: Array<{
      name: string;
      details: string[];
      expected_impact: string;
    }>;
    investment_amount: string;
    case_studies: Array<{
      title: string;
      business_type: string;
      challenge: string;
      solution: string;
      results: string;
    }>;
  };
}

// Initial form state
const initialFormState: ClientAcquisitionFormData = {
  outreach_type: "",
  store_name: "",
  first_name: "",
  specific_observation: "",
  niche: "",
  
  business_background: {
    founding_story: "",
    best_selling_products: "",
    ideal_customer: "",
    average_order_value: "",
    acquisition_channels: "",
    business_goals: "",
  },
  
  current_email: {
    platform: "",
    campaign_types: [],
    automated_flows: [],
    working_well: "",
    not_working: "",
    revenue_percentage: "",
    previous_experience: "",
  },
  
  technical_assessment: {
    platform_evaluation: false,
    list_health: false,
    flow_assessment: false,
    campaign_assessment: false,
    performance_metrics: false,
  },
  
  opportunities: {
    current_monthly_revenue: "",
    industry_benchmark: "",
    revenue_gap: "",
    projected_increase: "",
    priority_opportunities: [
      {
        name: "",
        effort: "Medium",
        impact: "Medium",
        priority_score: 5,
      },
    ],
  },
  
  proposal: {
    strengths: ["", "", ""],
    opportunities: ["", "", ""],
    recommendations: [
      {
        name: "",
        details: ["", ""],
        expected_impact: "",
      },
    ],
    investment_amount: "",
    case_studies: [
      {
        title: "",
        business_type: "",
        challenge: "",
        solution: "",
        results: "",
      },
    ],
  },
};

type AcquisitionContextType = {
  formData: ClientAcquisitionFormData;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  updateFormData: (data: Partial<ClientAcquisitionFormData>) => void;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
};

const AcquisitionContext = createContext<AcquisitionContextType | undefined>(undefined);

export const useAcquisitionContext = () => {
  const context = useContext(AcquisitionContext);
  if (!context) {
    throw new Error("useAcquisitionContext must be used within an AcquisitionProvider");
  }
  return context;
};

export const AcquisitionProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState<ClientAcquisitionFormData>(initialFormState);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const updateFormData = (newData: Partial<ClientAcquisitionFormData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };
  
  return (
    <AcquisitionContext.Provider value={{ 
      formData, 
      currentStep, 
      setCurrentStep, 
      updateFormData, 
      isSubmitting, 
      setIsSubmitting 
    }}>
      {children}
    </AcquisitionContext.Provider>
  );
};

export { initialFormState };
