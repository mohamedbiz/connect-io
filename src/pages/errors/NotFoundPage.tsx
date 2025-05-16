
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";

const NotFoundPage = () => {
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route");
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-24 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <h1 className="text-5xl font-bold text-[#0A2342]">404</h1>
            <h2 className="text-2xl font-semibold text-[#2D82B7] mt-2">Page Not Found</h2>
          </div>
          
          <p className="text-[#0E3366] mb-8">
            We couldn't find the page you were looking for. 
            It might have been removed, renamed, or doesn't exist.
          </p>
          
          <Link 
            to="/"
            className="inline-block bg-[#2D82B7] text-white px-6 py-3 rounded-md hover:bg-[#0E3366] transition-colors"
          >
            Return to Home Page
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
