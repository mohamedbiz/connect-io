
import { useAuth } from "@/contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function useFounderDashboard() {
  const { user, profile, loading, error } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Check if we have a connection error
  const isConnectionError = error && error.includes('fetch');
  
  return {
    user,
    profile,
    loading,
    error,
    isConnectionError
  };
}
