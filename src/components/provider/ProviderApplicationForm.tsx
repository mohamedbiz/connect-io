
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { PersonalInfoStep } from "./application-steps/PersonalInfoStep";
import { ProfessionalExperienceStep } from "./application-steps/ProfessionalExperienceStep";
import { ExpertiseSpecializationStep } from "./application-steps/ExpertiseSpecializationStep";
import { CaseStudiesStep } from "./application-steps/CaseStudiesStep";
import { WorkApproachStep } from "./application-steps/WorkApproachStep";
import { FinalStepReview } from "./application-steps/FinalStepReview";
import { AlertTriangle } from "lucide-react";

// Define the steps of the application process
const STEPS = [
  "Personal Information",
  "Professional Experience",
  "Expertise & Specialization",
  "Case Studies",
  "Work Approach",
  "Review & Submit"
];

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
  performance_guarantee: "yes", // yes, no, conditional
  performance_guarantee_conditions: "",
  
  // Sample Work
  sample_work: ["", "", ""] as string[],
  
  // Additional Information
  technical_assessment: true,
  additional_information: "",
  referral_source: "",
  referral_details: ""
};

export type ProviderApplicationFormData = typeof initialFormState;

const ProviderApplicationForm = () => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ProviderApplicationFormData>(initialFormState);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Update form data
  const updateFormData = (newData: Partial<ProviderApplicationFormData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };
  
  // Go to next step
  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };
  
  // Go to previous step
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  // Handle form submission
  const handleSubmit = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to submit your application",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    setIsSubmitting(true);

    try {
      // Update the user's profile with provider application data
      const { error } = await supabase
        .from("profiles")
        .update({
          role: "provider",
          business_name: formData.full_name.split(" ")[0] + " Consulting", // Default business name
          expertise: formData.expertise_areas.join(", "),
          portfolio_url: formData.portfolio_url,
          linkedin_url: formData.linkedin_url,
          about: formData.additional_information
        })
        .eq("id", user.id);

      if (error) throw error;

      // Store the detailed application data in a separate table
      // This would require a new table to be created in the database
      const { error: applicationError } = await supabase
        .from("provider_applications")
        .insert({
          user_id: user.id,
          application_data: formData,
          status: "submitted",
          submitted_at: new Date().toISOString()
        });

      if (applicationError) throw applicationError;

      toast({
        title: "Application submitted!",
        description: "Thank you for applying. We'll review your application and get back to you soon."
      });

      // Redirect to provider dashboard
      navigate("/provider-dashboard");
    } catch (error) {
      console.error("Application submission error:", error);
      toast({
        title: "Submission failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoStep formData={formData} updateFormData={updateFormData} />;
      case 1:
        return <ProfessionalExperienceStep formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <ExpertiseSpecializationStep formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <CaseStudiesStep formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <WorkApproachStep formData={formData} updateFormData={updateFormData} />;
      case 5:
        return <FinalStepReview formData={formData} />;
      default:
        return <PersonalInfoStep formData={formData} updateFormData={updateFormData} />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {!user && (
        <Card className="mb-6 p-4 bg-amber-50 border-amber-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-800">Login Required</h3>
              <p className="text-amber-700 text-sm mt-1">
                You need to be logged in to submit your provider application. Please{" "}
                <a href="/auth" className="text-primary underline font-medium">
                  sign in
                </a>{" "}
                or create an account first.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-500">
            Step {currentStep + 1} of {STEPS.length}
          </span>
          <span className="text-sm font-medium text-gray-500">
            {STEPS[currentStep]}
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-primary rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <Card className="p-6">
        {renderStep()}

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            Previous
          </Button>

          {currentStep < STEPS.length - 1 ? (
            <Button onClick={nextStep}>Continue</Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isSubmitting} className="min-w-[120px]">
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ProviderApplicationForm;
