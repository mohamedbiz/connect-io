
import React from 'react';
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";

const PaymentCanceledPage = () => {
  const navigate = useNavigate();
  
  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <div className="flex flex-col items-center justify-center">
          <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
            <div className="flex flex-col items-center mb-6">
              <div className="bg-red-100 p-3 rounded-full mb-4">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-[#0A2342] text-center">
                Payment Canceled
              </h2>
              <p className="text-[#0E3366] text-center mt-2">
                Your payment was canceled. No charges were made to your account.
              </p>
            </div>
            
            <div className="space-y-4">
              <Button
                onClick={() => navigate("/")}
                className="w-full bg-[#2D82B7] hover:bg-[#3D9AD1]"
              >
                Return to Home
              </Button>
              
              <Button
                variant="outline"
                onClick={() => navigate(-1)}
                className="w-full border-[#2D82B7] text-[#2D82B7]"
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentCanceledPage;
