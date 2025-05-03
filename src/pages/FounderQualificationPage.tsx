
import Layout from "@/components/layout/Layout";
import FounderQualificationForm from "@/components/qualification/FounderQualificationForm";
import { useAuth } from "@/contexts/AuthContext";
import { useQualificationStatus } from "@/hooks/useQualificationStatus";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

const FounderQualificationPage = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const { isQualified, isLoading: qualificationLoading } = useQualificationStatus();

  // Redirect to dashboard if already qualified
  useEffect(() => {
    if (!loading && !qualificationLoading && user && profile?.role === "founder" && isQualified) {
      console.log("User already qualified, redirecting to dashboard");
      navigate("/founder-dashboard");
    }
  }, [user, profile, loading, qualificationLoading, isQualified, navigate]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    } else if (!loading && profile && profile.role !== "founder") {
      navigate("/");
    }
  }, [user, profile, loading, navigate]);

  if (loading || qualificationLoading) {
    return (
      <Layout>
        <div className="container py-10">
          <div className="flex justify-center items-center min-h-[60vh]">
            <p className="text-[#0E3366]">Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user || !profile) {
    return null; // Redirect will happen via useEffect
  }

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
        <FounderQualificationForm isNewUser={true} />
      </div>
    </Layout>
  );
};

export default FounderQualificationPage;
