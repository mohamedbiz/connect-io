
import React from 'react';
import Layout from '@/components/layout/Layout';
import ProviderRegistrationFlow from '@/components/auth/register/ProviderRegistrationFlow';

const ProviderSignupPage = () => {
  return (
    <Layout hideAuth={true}>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <ProviderRegistrationFlow />
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <a 
                href="/auth" 
                className="text-[#2D82B7] hover:underline font-medium"
              >
                Sign in here
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProviderSignupPage;
