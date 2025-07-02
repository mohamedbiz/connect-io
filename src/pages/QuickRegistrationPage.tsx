import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import QuickRegistrationForm from '@/components/auth/QuickRegistrationForm';

const QuickRegistrationPage = () => {
  const { userType } = useParams<{ userType: 'founder' | 'provider' }>();
  const navigate = useNavigate();

  if (!userType || (userType !== 'founder' && userType !== 'provider')) {
    navigate('/');
    return null;
  }

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <Layout>
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-md mx-auto">
          <QuickRegistrationForm 
            userType={userType}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </Layout>
  );
};

export default QuickRegistrationPage;