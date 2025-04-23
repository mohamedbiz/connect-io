
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProviderDashboard = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  // Protect this route - redirect if not authenticated or not a provider
  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/auth");
      } else if (profile && profile.role !== "provider") {
        navigate("/");
      }
    }
  }, [user, profile, loading, navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-10 px-4">
          <p className="text-center">Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6">Provider Dashboard</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Welcome, {profile?.first_name || "Provider"}</h2>
          <p className="text-gray-600 mb-4">
            This is your provider dashboard where you can manage your services and connect with founders.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium mb-3">Active Clients</h3>
            <p className="text-gray-500">Your client list will appear here once you start connecting with founders.</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium mb-3">Recent Projects</h3>
            <p className="text-gray-500">Your recent projects will appear here.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProviderDashboard;
