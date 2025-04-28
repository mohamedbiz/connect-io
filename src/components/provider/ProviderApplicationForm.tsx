
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { ApplicationProvider, useApplicationContext } from "./application/ApplicationContext";
import { ApplicationProgress } from "./application/ApplicationProgress";
import { ApplicationStep } from "./application/ApplicationStep";
import { ApplicationNavigation } from "./application/ApplicationNavigation";
import { LoginAlert } from "./application/LoginAlert";

// Define the application form data type for export
export type ProviderApplicationFormData = {
  // Personal Information
  full_name: string;
  phone_number: string;
  location: string;
  linkedin_url: string;
  portfolio_url: string;
  
  // Professional Experience
  years_experience: string;
  email_platforms: string[];
  email_platforms_other: string;
  ecommerce_platforms: string[];
  ecommerce_platforms_other: string;
  
  // Expertise & Specialization
  expertise_areas: string[];
  expertise_other: string;
  industries: string[];
  industries_other: string;
  average_revenue_increase: string;
  average_conversion_increase: string;
  average_churn_reduction: string;
  
  // Case Studies
  case_studies: {
    client_industry: string;
    project_duration: string;
    initial_situation: string;
    implemented_solutions: string;
    results_achieved: string;
    reference_contact: string;
  }[];
  
  // Work Approach
  availability: string;
  typical_timeline: string;
  communication_preferences: string;
  project_management_tools: string;
  performance_guarantee: "yes" | "no" | "conditional";
  performance_guarantee_conditions: string;
  
  // Sample Work
  sample_work: string[];
  
  // Additional Information
  technical_assessment: boolean;
  additional_information: string;
  referral_source: string;
  referral_details: string;
};

// Inner component that uses the context
const ApplicationFormContent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { formData, setIsSubmitting } = useApplicationContext();
  
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

      // Store the detailed application data in the provider_applications table
      const { error: applicationError } = await supabase
        .from('provider_applications')
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

  return (
    <div className="max-w-4xl mx-auto">
      {/* Display login warning if not authenticated */}
      <LoginAlert isLoggedIn={!!user} />

      {/* Progress indicator */}
      <ApplicationProgress />

      <Card className="p-6">
        {/* Current step content */}
        <ApplicationStep />

        {/* Navigation buttons */}
        <ApplicationNavigation handleSubmit={handleSubmit} />
      </Card>
    </div>
  );
};

// Main component that provides the context
const ProviderApplicationForm = () => {
  return (
    <ApplicationProvider>
      <ApplicationFormContent />
    </ApplicationProvider>
  );
};

export default ProviderApplicationForm;
