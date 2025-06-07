
import React from 'react';
import { Button } from '@/components/ui/button';

interface RegisterSubmitButtonProps {
  loading: boolean;
  networkAvailable: boolean;
}

const RegisterSubmitButton = ({ loading, networkAvailable }: RegisterSubmitButtonProps) => {
  return (
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
  );
};

export default RegisterSubmitButton;
