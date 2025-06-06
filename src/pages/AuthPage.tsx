
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '@/components/layout/Layout';
import AuthCardHeader from '@/components/auth/AuthCardHeader';
import AuthCardFooter from '@/components/auth/AuthCardFooter';
import UserTypeSelector from '@/components/auth/UserTypeSelector';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';

const AuthPage = () => {
  // URL params
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('register') === 'true' ? 'register' : 'login';
  const initialUserType = (searchParams.get('type') as 'founder' | 'provider') || 'founder';
  
  // Local state
  const [tab, setTab] = useState<'login' | 'register'>(initialTab);
  const [userType, setUserType] = useState<'founder' | 'provider'>(initialUserType);

  // Auth context
  const { error } = useAuth();

  // Handle role tab selection
  const handleRoleChange = (role: 'founder' | 'provider') => {
    setUserType(role);
  };

  // Toggle between login and register
  const toggleAuthMode = (newTab: 'login' | 'register') => {
    setTab(newTab);
  };

  return (
    <Layout hideAuth={true}>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card className="border border-[#2D82B7]/30 shadow-sm">
            <AuthCardHeader tabType={tab} />

            <CardContent>
              {tab === 'register' && (
                <UserTypeSelector 
                  userType={userType} 
                  onChange={handleRoleChange} 
                />
              )}

              {error && (
                <Alert className="mb-4 border-red-200 bg-red-50">
                  <AlertDescription className="text-red-700">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {tab === 'login' ? (
                <LoginForm />
              ) : (
                <RegisterForm userType={userType} />
              )}
            </CardContent>

            <AuthCardFooter 
              tabType={tab} 
              onTabChange={toggleAuthMode}
            />
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AuthPage;
