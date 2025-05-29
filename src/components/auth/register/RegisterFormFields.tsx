
import React from 'react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { RegisterFormData } from './RegisterFormData';

interface RegisterFormFieldsProps {
  formData: RegisterFormData;
  userType: 'founder' | 'provider';
  showPassword: boolean;
  onShowPasswordToggle: () => void;
  onInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAcceptTermsChange: (checked: boolean) => void;
}

const RegisterFormFields = ({
  formData,
  userType,
  showPassword,
  onShowPasswordToggle,
  onInput,
  onAcceptTermsChange
}: RegisterFormFieldsProps) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
          <Input 
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={onInput}
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
          <Input 
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={onInput}
            required
          />
        </div>
      </div>

      {userType === 'founder' && (
        <div className="space-y-2">
          <label htmlFor="companyName" className="text-sm font-medium">Company/Store Name</label>
          <Input 
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={onInput}
            required={userType === 'founder'}
          />
        </div>
      )}
      
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={onInput}
            className="pl-10"
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={onInput}
            className="pl-10 pr-10" 
            required
          />
          <button 
            type="button" 
            onClick={onShowPasswordToggle} 
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-gray-400" />
            ) : (
              <Eye className="h-4 w-4 text-gray-400" />
            )}
          </button>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="acceptTerms" 
          name="acceptTerms"
          checked={formData.acceptTerms}
          onCheckedChange={onAcceptTermsChange}
        />
        <label 
          htmlFor="acceptTerms" 
          className="text-sm text-gray-600 cursor-pointer"
        >
          I agree to the{" "}
          <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
          {" "}and{" "}
          <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
        </label>
      </div>
    </>
  );
};

export default RegisterFormFields;
