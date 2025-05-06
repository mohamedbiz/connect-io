
import Layout from "@/components/layout/Layout";
import FounderQualificationForm from "@/components/qualification/FounderQualificationForm";
import { useAuth } from "@/contexts/AuthContext";
import { useQualificationStatus } from "@/hooks/useQualificationStatus";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const FounderQualificationPage = () => {
  const { user, profile, loading, error } = useAuth();
  const navigate = useNavigate();
  const { isQualified, isLoading: qualificationLoading } = useQualificationStatus();
  const [retryCount, setRetryCount] = useState(0);
  const isLoading = loading || qualificationLoading;

  // More aggressive check for profile
  useEffect(() => {
    let timeoutId: number;
    
    // If we have a user but no profile after loading completes, show retry option
    if (!loading && user && !profile && retryCount < 3) {
      console.log("User exists but profile is missing, setting retry timeout");
      timeoutId = window.setTimeout(() => {
        setRetryCount(prev => prev + 1);
        window.location.reload(); // Hard reload to force re-fetching profile
      }, 2000); // Wait 2 seconds before retry
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [loading, user, profile, retryCount]);

  // Redirect to dashboard if already qualified
  useEffect(() => {
    if (!isLoading && user && profile?.role === "founder" && isQualified) {
      console.log("User already qualified, redirecting to dashboard");
      navigate("/founder-dashboard");
    }
  }, [user, profile, isLoading, isQualified, navigate]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    } else if (!loading && profile && profile.role !== "founder") {
      navigate("/");
    }
  }, [user, profile, loading, navigate]);

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-10">
          <div className="flex justify-center items-center min-h-[60vh] flex-col">
            <Loader2 className="h-8 w-8 text-[#0E3366] animate-spin mb-4" />
            <p className="text-[#0E3366]">Loading qualification status...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return null; // Redirect will happen via useEffect
  }

  // Handle case where we have a user but profile loading failed
  if (user && !profile) {
    return (
      <Layout>
        <div className="container py-10">
          <div className="flex justify-center items-center min-h-[60vh] flex-col max-w-lg mx-auto">
            <Alert className="bg-amber-50 border-amber-300">
              <AlertTitle className="text-amber-800">Profile Loading Issue</AlertTitle>
              <AlertDescription className="text-amber-700">
                We're having trouble loading your profile. This is needed to continue with qualification.
              </AlertDescription>
            </Alert>
            <div className="mt-4">
              <Button 
                onClick={() => {
                  toast.info("Reloading page to retrieve your profile...");
                  setTimeout(() => window.location.reload(), 1000);
                }}
                className="bg-[#2D82B7] hover:bg-[#3D9AD1]"
              >
                Retry Loading Profile
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const isNewUser = new URLSearchParams(window.location.search).get('new') === 'true';

  return (
    <Layout>
      <div className="container py-10">
        <Alert className="max-w-3xl mx-auto mb-6 bg-blue-50 border-blue-200">
          <Info className="h-5 w-5 text-blue-500" />
          <AlertTitle className="text-blue-800">Welcome to Connect!</AlertTitle>
          <AlertDescription className="text-blue-700">
            Before you can access your dashboard, please complete this qualification process. 
            This helps us better understand your business and match you with the most suitable providers.
          </AlertDescription>
        </Alert>
        <FounderQualificationForm isNewUser={isNewUser} />
      </div>
    </Layout>
  );
};

export default FounderQualificationPage;
