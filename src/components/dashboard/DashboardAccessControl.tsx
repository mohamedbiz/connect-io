
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import ErrorFallback from "@/components/ErrorFallback";

interface DashboardAccessControlProps {
  user: any;
  profile: any;
  loading: boolean;
  error: string | null;
  expectedRole: string;
  children: React.ReactNode;
}

const DashboardAccessControl = ({ 
  user, 
  profile, 
  loading, 
  error, 
  expectedRole,
  children 
}: DashboardAccessControlProps) => {
  const navigate = useNavigate();
  const [loadingTimeout, setLoadingTimeout] = useState(false);

  // Protect this route - redirect if not authenticated or not the expected role
  useEffect(() => {
    if (!loading) {
      console.log("Auth loading completed, checking access");
      
      if (!user) {
        console.log("No user found, redirecting to auth");
        navigate("/auth");
        return;
      } 
      
      if (profile && profile.role !== expectedRole) {
        console.log(`User is not a ${expectedRole}, redirecting to home`);
        toast.error(`Access denied. This dashboard is for ${expectedRole}s only.`);
        navigate("/");
        return;
      }
      
      console.log("Access check passed, showing dashboard");
    }
  }, [user, profile, loading, navigate, expectedRole]);

  // Add a safety timeout for loading state
  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoadingTimeout(true);
      }, 5000); // 5 seconds timeout

      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto py-10 px-4">
          <ErrorFallback 
            error={new Error(error)}
            message="There was a problem with authentication. Please try refreshing the page."
            resetErrorBoundary={() => window.location.reload()}
          />
        </div>
      </Layout>
    );
  }

  if (loading && !loadingTimeout) {
    return (
      <Layout>
        <div className="container mx-auto py-10 px-4">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <p className="text-center text-lg text-[#0E3366]">Loading your dashboard...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Show the reload option if loading takes too long
  if (loading && loadingTimeout) {
    return (
      <Layout>
        <div className="container mx-auto py-10 px-4">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <p className="text-center text-lg text-[#0E3366] mb-4">Loading is taking longer than expected</p>
            <Button 
              onClick={() => window.location.reload()}
              variant="default"
            >
              Reload Page
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user || !profile) {
    return (
      <Layout>
        <div className="container mx-auto py-10 px-4">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <p className="text-center text-lg text-[#0E3366]">Please log in to access your dashboard</p>
            <Button 
              variant="default"
              onClick={() => navigate("/auth")}
              className="mt-4"
            >
              Go to Login
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return <>{children}</>;
};

export default DashboardAccessControl;
