
import { useState } from 'react';

export interface RegisterFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  companyName: string;
  acceptTerms: boolean;
}

export const useRegisterFormData = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    companyName: '',
    acceptTerms: false
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const updateAcceptTerms = (checked: boolean) => {
    setFormData(prev => ({ ...prev, acceptTerms: checked }));
  };

  return {
    formData,
    handleInput,
    updateAcceptTerms
  };
};
