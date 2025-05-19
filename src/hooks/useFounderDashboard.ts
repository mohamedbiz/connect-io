
import { useAuth } from "@/contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useQualificationStatus } from "@/hooks/useQualificationStatus";

export function useFounderDashboard() {
  const { user, profile, loading, error } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { isQualified, isLoading: qualificationLoading } = useQualificationStatus();

  // Check if qualification is required and redirect if needed
  useEffect(() => {
    // Don't redirect if there's a connection error
    if (error && error.includes('fetch')) {
      return;
    }
    
    if (!loading && !qualificationLoading && user && profile?.role === "founder" && !isQualified) {
      console.log("User not qualified, redirecting to qualification page");
      navigate("/founder-qualification");
    }
  }, [user, profile, loading, qualificationLoading, isQualified, navigate, error]);
  
  // Check if we have a connection error
  const isConnectionError = error && error.includes('fetch');
  
  return {
    user,
    profile,
    loading: loading || qualificationLoading,
    error,
    isQualified,
    qualificationLoading,
    isConnectionError
  };
}
