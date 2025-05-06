
import Layout from "@/components/layout/Layout";
import FounderQualificationForm from "@/components/qualification/FounderQualificationForm";
import { useAuth } from "@/contexts/AuthContext";
import { useQualificationStatus } from "@/hooks/useQualificationStatus";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const FounderQualificationPage = () => {
  const { user, profile, loading, error, ensureProfile } = useAuth();
  const navigate = useNavigate();
  const { isQualified, isLoading: qualificationLoading } = useQualificationStatus();
  const [retryCount, setRetryCount] = useState(0);
  const [creatingProfile, setCreatingProfile] = useState(false);
  const isLoading = loading || qualificationLoading || creatingProfile;

  // Check if user is authenticated
  useEffect(() => {
    if (!loading && !user) {
      toast.error("You must be logged in to access this page");
      navigate("/auth", { replace: true });
    }
  }, [user, loading, navigate]);
  
  // Redirect to dashboard if already qualified
  useEffect(() => {
    if (!isLoading && user && profile?.role === "founder" && isQualified) {
      console.log("User already qualified, redirecting to dashboard");
      navigate("/founder-dashboard", { replace: true });
    }
  }, [user, profile, isLoading, isQualified, navigate]);

  // Check if profile exists, if not, try to create it
  useEffect(() => {
    let mounted = true;
    
    const tryCreateProfile = async () => {
      if (!user || profile || retryCount >= 3 || creatingProfile || loading) {
        return;
      }
      
      console.log(`Profile missing, attempt ${retryCount + 1} to ensure it exists`);
      setCreatingProfile(true);
      
      try {
        const createdProfile = await ensureProfile();
        if (mounted) {
          if (createdProfile) {
            console.log("Successfully created profile:", createdProfile);
            toast.success("Profile created successfully");
          } else {
            console.error("Failed to create profile automatically");
            setRetryCount(prev => prev + 1);
          }
        }
      } catch (err) {
        console.error("Error during profile creation:", err);
        if (mounted) {
          setRetryCount(prev => prev + 1);
        }
      } finally {
        if (mounted) {
          setCreatingProfile(false);
        }
      }
    };
    
    if (!loading && user && !profile) {
      const timer = setTimeout(() => {
        tryCreateProfile();
      }, 1000); // Wait before trying to create profile
      
      return () => {
        mounted = false;
        clearTimeout(timer);
      };
    }
    
    return () => {
      mounted = false;
    };
  }, [user, profile, retryCount, loading, creatingProfile, ensureProfile]);

  const handleManualProfileCreation = async () => {
    if (!user) return;
    
    setCreatingProfile(true);
    try {
      const newProfile = await ensureProfile();
      if (newProfile) {
        toast.success("Profile created successfully");
        // Force reload the page to ensure everything is refreshed
        window.location.reload();
      } else {
        toast.error("Failed to create profile. Please contact support.");
      }
    } catch (error) {
      toast.error("Error creating profile");
    } finally {
      setCreatingProfile(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-10">
          <div className="flex justify-center items-center min-h-[60vh] flex-col">
            <Loader2 className="h-8 w-8 text-[#0E3366] animate-spin mb-4" />
            <p className="text-[#0E3366]">
              {creatingProfile ? "Creating your profile..." : "Loading qualification status..."}
            </p>
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
            <Alert className="bg-amber-50 border-amber-300 mb-4">
              <AlertCircle className="h-5 w-5 text-amber-800" />
              <AlertTitle className="text-amber-800">Profile Loading Issue</AlertTitle>
              <AlertDescription className="text-amber-700">
                We're having trouble loading your profile. This is needed to continue with qualification.
              </AlertDescription>
            </Alert>
            
            <div className="flex flex-col gap-3">
              <Button 
                onClick={handleManualProfileCreation}
                className="bg-[#2D82B7] hover:bg-[#3D9AD1] w-full"
                disabled={creatingProfile}
              >
                {creatingProfile ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating Profile...
                  </>
                ) : (
                  "Create Profile Now"
                )}
              </Button>
              
              <Button 
                onClick={() => {
                  toast.info("Reloading page to retrieve your profile...");
                  setTimeout(() => window.location.reload(), 1000);
                }}
                variant="outline"
                className="w-full"
                disabled={creatingProfile}
              >
                Retry Loading Profile
              </Button>
              
              <Button
                onClick={() => navigate("/")}
                variant="ghost"
                className="text-[#0E3366]/70 w-full"
                disabled={creatingProfile}
              >
                Return to Home
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
