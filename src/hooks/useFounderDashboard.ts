
import { useAuth } from "@/contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useQualificationStatus } from "@/hooks/useQualificationStatus";

export function useFounderDashboard() {
  const { user, profile, loading, error } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { isQualified, isLoading: qualificationLoading } = useQualificationStatus();

  // Log states for debugging
  console.log("FounderDashboard:", { 
    user: !!user, 
    profile: profile?.role,
    loading,
    error: error || 'none',
    path: location.pathname,
    isQualified
  });

  // Check if qualification is required and redirect if needed
  useEffect(() => {
    if (!loading && !qualificationLoading && user && profile?.role === "founder" && !isQualified) {
      console.log("User not qualified, redirecting to qualification page");
      navigate("/founder-qualification");
    }
  }, [user, profile, loading, qualificationLoading, isQualified, navigate]);
  
  return {
    user,
    profile,
    loading: loading || qualificationLoading,
    error,
    isQualified,
    qualificationLoading
  };
}
