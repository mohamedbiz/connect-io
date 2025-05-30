
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useRegisterFormData } from './register/RegisterFormData';
import { useRegistrationLogic } from './register/useRegistrationLogic';
import { useNetworkMonitoring } from './register/useNetworkMonitoring';
import RegisterFormFields from './register/RegisterFormFields';
import RegisterNetworkAlert from './register/RegisterNetworkAlert';
import RegisterGoogleButton from './register/RegisterGoogleButton';

interface RegisterFormProps {
  userType: 'founder' | 'provider';
}

const RegisterForm = ({ userType }: RegisterFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const { formData, handleInput, updateAcceptTerms } = useRegisterFormData();
  const { networkAvailable, setNetworkAvailable } = useNetworkMonitoring();
  const { 
    loading, 
    oauthLoading, 
    handleSubmit, 
    handleGoogleSignIn, 
    handleRetryConnection 
  } = useRegistrationLogic({ userType, formData, setNetworkAvailable });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!networkAvailable && (
        <RegisterNetworkAlert onRetry={handleRetryConnection} />
      )}

      <RegisterFormFields
        formData={formData}
        userType={userType}
        showPassword={showPassword}
        onShowPasswordToggle={() => setShowPassword(!showPassword)}
        onInput={handleInput}
        onAcceptTermsChange={updateAcceptTerms}
      />
      
      <Button 
        type="submit" 
        className="w-full bg-primary hover:bg-primary/90" 
        disabled={loading || !networkAvailable}
      >
        {loading ? (
          <div className="flex items-center">
            <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
            Creating account...
          </div>
        ) : (
          'Create Account'
        )}
      </Button>

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
        userType={userType}
        loading={oauthLoading}
        networkAvailable={networkAvailable}
        onGoogleSignIn={handleGoogleSignIn}
      />
    </form>
  );
};

export default RegisterForm;
