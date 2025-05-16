
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const PostRegisterPage = () => {
  const { user, profile, loading, error } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const userType = location.state?.userType || (profile?.role || "founder");
  const isNewUser = location.state?.isNewUser || false;

  useEffect(() => {
    if (!loading) {
      // If not authenticated, redirect to auth page
      if (!user) {
        toast.error("You must be logged in to access this page");
        navigate("/auth");
        return;
      }
      
      // Show welcome message for new users
      if (isNewUser) {
        toast.success(`Welcome to Connect! Let's get you set up as a ${userType}.`);
      }
      
      // Update the profile to mark onboarding_complete if this step is viewed
      // This helps in case the user navigates away before completing onboarding
      const updateOnboardingStatus = async () => {
        if (user && profile && !profile.onboarding_complete) {
          try {
            await supabase
              .from("profiles")
              .update({ onboarding_complete: true })
              .eq("id", user.id);
            
            console.log("Marked onboarding as complete for user:", user.id);
          } catch (err) {
            console.error("Failed to update onboarding status:", err);
          }
        }
      };
      
      updateOnboardingStatus();
    }
  }, [user, loading, navigate, isNewUser, userType, profile]);

  const redirectToOnboarding = () => {
    if (userType === "founder") {
      navigate("/founder-qualification");
    } else if (userType === "provider") {
      navigate("/provider-application");
    } else {
      navigate("/");
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-16 px-4">
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <p className="text-xl text-[#0E3366] mb-4">Loading your profile...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <h1 className="text-3xl font-bold text-[#0A2342] mb-6">Welcome to Connect!</h1>
          
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <h2 className="text-xl font-semibold text-[#0E3366] mb-4">
                {userType === "founder" ? "Founder Registration Complete" : "Provider Registration Complete"}
              </h2>
              <p className="text-[#0E3366] mb-4">
                Thank you for joining Connect! Your account has been created successfully.
              </p>
              <p className="text-[#0E3366] mb-4">
                {userType === "founder" 
                  ? "The next step is to complete a short qualification process to help us match you with the best email marketing providers for your needs." 
                  : "The next step is to complete your application so we can showcase your skills to our network of eCommerce founders."}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={redirectToOnboarding}
                className="bg-[#2D82B7] hover:bg-[#3D9AD1] text-white px-6 py-2"
              >
                {userType === "founder" 
                  ? "Continue to Qualification" 
                  : "Complete Your Application"}
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => navigate("/")}
              >
                Return to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PostRegisterPage;
