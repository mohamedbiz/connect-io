
import Layout from "@/components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import ClientAcquisitionForm from "@/components/client/ClientAcquisitionForm";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const ClientAcquisitionPage = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if the user has already completed the assessment process
  useEffect(() => {
    const checkAcquisitionStatus = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        // Check if there's a record that indicates this user has completed the process
        const { data, error } = await supabase
          .from("founder_onboarding")
          .select("acquisition_completed")
          .eq("user_id", user.id)
          .maybeSingle();

        if (error) {
          console.error("Error checking assessment status:", error);
        } else if (data?.acquisition_completed) {
          // If they've completed it before, set flag
          setIsSubmitted(true);
        }
      } catch (err) {
        console.error("Error in assessment status check:", err);
      } finally {
        setIsLoading(false);
      }
    };

    checkAcquisitionStatus();
  }, [user, navigate]);

  const handleFormSubmit = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      // Save that this user has completed the process
      const { error } = await supabase
        .from("founder_onboarding")
        .upsert({
          user_id: user.id,
          acquisition_completed: true,
          acquisition_completed_at: new Date().toISOString(),
        });

      if (error) {
        throw error;
      }

      // Show success message
      toast({
        title: "Success!",
        description: "Your provider matching assessment is complete.",
      });

      // Redirect to success page
      navigate("/client-acquisition/success");
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Error saving your progress",
        description: err.message || "Please try again later",
      });
      console.error("Error saving assessment status:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-extrabold mb-4 text-gray-900">Provider Matching Assessment</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              Help us match you with the perfect email marketing specialist for your business. 
              This quick assessment will ensure we understand your specific needs and goals.
            </p>
            {!user && (
              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={() => navigate('/auth')}>
                  Login to Save Progress
                </Button>
                <Button onClick={() => navigate('/auth?register=true')}>
                  Create Account
                </Button>
              </div>
            )}
          </div>

          <ClientAcquisitionForm onComplete={handleFormSubmit} />
        </div>
      </div>
    </Layout>
  );
};

export default ClientAcquisitionPage;
