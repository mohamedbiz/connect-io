
import Layout from "@/components/layout/Layout";
import FounderQualificationForm from "@/components/qualification/FounderQualificationForm";
import { useAuth } from "@/contexts/AuthContext";
import { useQualificationStatus } from "@/hooks/useQualificationStatus";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import QualificationPageLoader from "@/components/qualification/QualificationPageLoader";
import QualificationErrorSection from "@/components/qualification/QualificationErrorSection";
import QualificationWelcomeAlert from "@/components/qualification/QualificationWelcomeAlert";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { WifiOff } from "lucide-react";

const FounderQualificationPage = () => {
  const { user, profile, loading, error, ensureProfile } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isQualified, isLoading: qualificationLoading, error: qualificationError } = useQualificationStatus();
  const [retryCount, setRetryCount] = useState(0);
  const [creatingProfile, setCreatingProfile] = useState(false);
  const isLoading = loading || qualificationLoading || creatingProfile;

  // Connection error
  const isConnectionError = error && error.includes('fetch');

  // Check if user is authenticated
  useEffect(() => {
    if (!loading && !user && !isConnectionError) {
      toast.error("You must be logged in to access this page");
      navigate("/auth", { replace: true });
    }
  }, [user, loading, navigate, isConnectionError]);
  
  // Redirect to dashboard if already qualified
  useEffect(() => {
    if (!isLoading && user && profile?.role === "founder" && isQualified && !isConnectionError) {
      console.log("User already qualified, redirecting to dashboard");
      navigate("/founder-dashboard", { replace: true });
    }
  }, [user, profile, isLoading, isQualified, navigate, isConnectionError]);

  // Check if profile exists, if not, try to create it
  useEffect(() => {
    let mounted = true;
    
    const tryCreateProfile = async () => {
      if (!user || profile || retryCount >= 2 || creatingProfile || loading || isConnectionError) {
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
    
    if (!loading && user && !profile && !isConnectionError) {
      const timer = setTimeout(() => {
        tryCreateProfile();
      }, 800); // Reasonable wait before trying to create profile
      
      return () => {
        mounted = false;
        clearTimeout(timer);
      };
    }
    
    return () => {
      mounted = false;
    };
  }, [user, profile, retryCount, loading, creatingProfile, ensureProfile, isConnectionError]);

  const handleManualProfileCreation = async () => {
    if (!user) return;
    
    setCreatingProfile(true);
    try {
      const newProfile = await ensureProfile();
      if (newProfile) {
        toast.success("Profile created successfully");
        // Force reload the page to ensure everything is refreshed
        setTimeout(() => window.location.reload(), 500);
      } else {
        toast.error("Failed to create profile. Please contact support.");
      }
    } catch (error) {
      toast.error("Error creating profile");
    } finally {
      setCreatingProfile(false);
    }
  };

  // Connection error state
  if (isConnectionError) {
    return (
      <Layout>
        <div className="container py-10">
          <Alert variant="destructive" className="mb-4">
            <WifiOff className="h-5 w-5 mr-2" />
            <AlertTitle>Network Connection Error</AlertTitle>
            <AlertDescription className="space-y-4">
              <p>We're having trouble connecting to our service. Please check your internet connection.</p>
              <Button 
                onClick={() => window.location.reload()}
                variant="outline"
              >
                Try Again
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-10">
          <QualificationPageLoader 
            message={creatingProfile ? "Creating your profile..." : "Loading qualification status..."}
          />
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
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-red-600 mb-4">Profile Missing</h2>
            <p className="mb-4">We couldn't find your profile information. This is needed to continue.</p>
            <Button 
              onClick={handleManualProfileCreation}
              disabled={creatingProfile}
              className="bg-primary hover:bg-primary/90"
            >
              {creatingProfile ? 'Creating Profile...' : 'Create Profile Now'}
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  // Show qualification error if it exists
  if (qualificationError) {
    return (
      <Layout>
        <div className="container py-10">
          <QualificationErrorSection />
        </div>
      </Layout>
    );
  }

  const isNewUser = searchParams.get('new') === 'true';

  return (
    <Layout>
      <div className="container py-10">
        <QualificationWelcomeAlert />
        <FounderQualificationForm isNewUser={isNewUser} />
      </div>
    </Layout>
  );
};

export default FounderQualificationPage;
