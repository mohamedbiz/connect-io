
import Layout from "@/components/layout/Layout";
import ProviderApplicationForm from "@/components/provider/ProviderApplicationForm";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const ProviderApplicationPage = () => {
  const { user, profile, loading, error } = useAuth();
  const [isChecking, setIsChecking] = useState(true);
  
  // Let auth state settle before checking access
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsChecking(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // If still loading or checking, show loading state
  if (loading || isChecking) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-[#2D82B7]" />
          <p className="mt-4 text-[#0E3366]">Loading application form...</p>
        </div>
      </Layout>
    );
  }
  
  // If not logged in, redirect to auth
  if (!loading && !isChecking && !user) {
    toast.error("Please log in to access the provider application");
    return <Navigate to="/auth?register=true&type=provider" replace />;
  }
  
  // If logged in as a user with wrong role, show message and redirect
  if (!loading && !isChecking && user && profile && profile.role !== "provider") {
    toast.error("This page is only for provider accounts");
    return <Navigate to="/" replace />;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-4 text-[#0A2342]">Provider Application</h1>
            <p className="text-lg text-[#0E3366] max-w-2xl mx-auto">
              Join our network of specialized service providers and connect with pre-qualified eCommerce businesses looking for your expertise.
            </p>
          </div>
          
          <ProviderApplicationForm />
        </div>
      </div>
    </Layout>
  );
};

export default ProviderApplicationPage;
