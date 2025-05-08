
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { FounderApplicationProvider } from "@/components/founder/application/ApplicationContext";
import ApplicationProgress from "@/components/founder/application/ApplicationProgress";
import ApplicationStep from "@/components/founder/application/ApplicationStep";
import ApplicationNavigation from "@/components/founder/application/ApplicationNavigation";
import LoginAlert from "@/components/founder/application/LoginAlert";
import SuccessMessage from "@/components/founder/application/SuccessMessage";
import { useFounderApplicationContext } from "@/components/founder/application/ApplicationContext";

// Inner component that uses the context
const ApplicationFormContent = () => {
  const { user } = useAuth();
  const { formData, setIsSubmitting, setIsComplete, isComplete } = useFounderApplicationContext();
  
  // Handle form submission
  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please sign in to submit your application");
      return;
    }

    setIsSubmitting(true);

    try {
      // Store the detailed application data in the founder_applications table
      const { error } = await supabase
        .from('founder_applications')
        .insert({
          user_id: user.id,
          application_data: formData,
          status: "submitted"
        });

      if (error) throw error;

      toast.success("Application submitted successfully! Continue to the qualification process.");
      setIsComplete(true);
    } catch (error) {
      console.error("Application submission error:", error);
      toast.error("There was an error submitting your application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isComplete) {
    return <SuccessMessage />;
  }

  return (
    <div className="max-w-3xl mx-auto">
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

const FounderApplicationPage = () => {
  const { user, profile, loading, error } = useAuth();
  const [isChecking, setIsChecking] = useState(true);
  
  // Let auth state settle before checking access
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsChecking(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // If still loading or checking, show loading state
  if (loading || isChecking) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-[#2D82B7]" />
          <p className="mt-4 text-[#0E3366]">Loading application form...</p>
        </div>
      </Layout>
    );
  }
  
  // If logged in as a user with wrong role, show message and redirect
  if (!loading && !isChecking && user && profile && profile.role !== "founder") {
    toast.error("This page is only for founder accounts");
    return <Navigate to="/" replace />;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-4 text-[#0A2342]">Founder Application</h1>
            <p className="text-lg text-[#0E3366] max-w-2xl mx-auto">
              Tell us about your business and email marketing needs to help us match you with the right service providers.
            </p>
          </div>
          
          <FounderApplicationProvider>
            <ApplicationFormContent />
          </FounderApplicationProvider>
        </div>
      </div>
    </Layout>
  );
};

export default FounderApplicationPage;
