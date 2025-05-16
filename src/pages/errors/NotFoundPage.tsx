
import React from 'react';
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  
  return (
    <Layout>
      <div className="container flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-4xl font-bold mb-4 text-[#0A2342]">404</h1>
        <p className="text-2xl font-semibold mb-6 text-[#0A2342]">Page Not Found</p>
        <p className="text-center text-[#0E3366] mb-8 max-w-md">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            onClick={() => navigate('/')}
            className="bg-[#2D82B7] hover:bg-[#3D9AD1] text-white"
          >
            Go to Homepage
          </Button>
          <Button 
            onClick={() => navigate(-1)}
            variant="outline"
          >
            Go Back
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
