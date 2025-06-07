
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface RegisterResendButtonProps {
  loading: boolean;
  onResendVerification: () => void;
}

const RegisterResendButton = ({ loading, onResendVerification }: RegisterResendButtonProps) => {
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      onClick={onResendVerification}
      disabled={loading}
    >
      <RefreshCw className="h-4 w-4 mr-2" />
      Resend Verification Email
    </Button>
  );
};

export default RegisterResendButton;
