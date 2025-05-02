
import { useState } from 'react';
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PaymentAnalytics from "@/components/payment/PaymentAnalytics";
import PayoutRequestForm from "@/components/payment/PayoutRequestForm";
import PayoutRequestsList from "@/components/payment/PayoutRequestsList";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";

const PaymentsDashboardPage = () => {
  const { user, profile, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("analytics");
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      toast.error("Please log in to access the payments dashboard");
      navigate("/auth");
      return;
    }
  }, [user, loading, navigate]);

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6 text-[#0A2342]">
          Payments Dashboard
        </h1>

        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="mb-6 bg-[#BFD7ED]/30">
            <TabsTrigger 
              value="analytics" 
              className="data-[state=active]:bg-[#2D82B7] data-[state=active]:text-white"
            >
              Analytics
            </TabsTrigger>
            
            {profile?.role === "provider" && (
              <TabsTrigger 
                value="payouts" 
                className="data-[state=active]:bg-[#2D82B7] data-[state=active]:text-white"
              >
                Payouts
              </TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="analytics" className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-[#2D82B7]/30">
              <h2 className="text-2xl font-semibold mb-4 text-[#0A2342]">Payment Analytics</h2>
              <PaymentAnalytics />
            </div>
          </TabsContent>
          
          <TabsContent value="payouts" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <PayoutRequestForm />
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-[#2D82B7]/30">
                <h3 className="text-xl font-semibold mb-4 text-[#0A2342]">Your Payout Requests</h3>
                <PayoutRequestsList />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default PaymentsDashboardPage;
