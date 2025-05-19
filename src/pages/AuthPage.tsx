
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import ConnectionError from '@/components/auth/ConnectionError';
import AuthCardHeader from '@/components/auth/AuthCardHeader';
import AuthCardFooter from '@/components/auth/AuthCardFooter';
import UserTypeSelector from '@/components/auth/UserTypeSelector';

const AuthPage = () => {
  // URL params
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('register') === 'true' ? 'register' : 'login';
  const initialUserType = (searchParams.get('type') as 'founder' | 'provider') || 'founder';
  
  // Local state
  const [tab, setTab] = useState(initialTab);
  const [userType, setUserType] = useState<'founder' | 'provider'>(initialUserType);

  // Auth context
  const { error: authError, retryAuth } = useAuth();
  
  // Connection error
  const isConnectionError = authError && authError.includes('fetch');

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          {isConnectionError && <ConnectionError retryAuth={retryAuth} />}

          <Card className="border border-[#2D82B7]/30 shadow-sm">
            <AuthCardHeader tabType={tab as 'login' | 'register'} />

            <CardContent>
              {tab === 'register' && (
                <UserTypeSelector 
                  userType={userType} 
                  onChange={setUserType} 
                />
              )}

              {tab === 'login' ? (
                <LoginForm />
              ) : (
                <RegisterForm userType={userType} />
              )}
            </CardContent>

            <AuthCardFooter 
              tabType={tab as 'login' | 'register'} 
              onTabChange={setTab}
            />
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AuthPage;
