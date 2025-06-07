
import React, { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { useRegistrationLogic } from './useRegistrationLogic';
import { useNetworkMonitoring } from './useNetworkMonitoring';
import { RegisterFormData } from './RegisterFormData';
import RegisterNetworkAlert from './RegisterNetworkAlert';
import RegisterFormFields from './RegisterFormFields';
import RegisterSubmitButton from './RegisterSubmitButton';
import RegisterResendButton from './RegisterResendButton';
import RegisterGoogleButton from './RegisterGoogleButton';

interface RegisterFormProps {
  userType: 'founder' | 'provider';
}

const RegisterForm = ({ userType }: RegisterFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    companyName: '',
    acceptTerms: false,
  });

  const { networkAvailable, setNetworkAvailable } = useNetworkMonitoring();
  
  const {
    loading,
    oauthLoading,
    showResendOption,
    handleSubmit,
    handleGoogleSignIn,
    handleRetryConnection,
    handleResendVerification
  } = useRegistrationLogic({
    userType,
    formData,
    setNetworkAvailable
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAcceptTermsChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, acceptTerms: checked }));
  };

  return (
    <div className="space-y-4">
      {!networkAvailable && (
        <RegisterNetworkAlert onRetry={handleRetryConnection} />
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <RegisterFormFields
          formData={formData}
          showPassword={showPassword}
          onShowPasswordToggle={() => setShowPassword(!showPassword)}
          onInput={handleInput}
          onAcceptTermsChange={handleAcceptTermsChange}
        />
        
        <RegisterSubmitButton
          loading={loading}
          networkAvailable={networkAvailable}
        />

        {showResendOption && (
          <RegisterResendButton
            loading={loading}
            onResendVerification={handleResendVerification}
          />
        )}

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-2 text-xs text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <RegisterGoogleButton
          oauthLoading={oauthLoading}
          networkAvailable={networkAvailable}
          onGoogleSignIn={handleGoogleSignIn}
        />
      </form>
    </div>
  );
};

export default RegisterForm;
