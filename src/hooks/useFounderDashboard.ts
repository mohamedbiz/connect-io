
import { useAuth } from "@/contexts/AuthContext";

export function useFounderDashboard() {
  const { user, profile, loading, error } = useAuth();

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
