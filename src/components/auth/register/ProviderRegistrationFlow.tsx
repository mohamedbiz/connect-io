
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

interface ProviderRegistrationData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  acceptTerms: boolean;
}

const ProviderRegistrationFlow = () => {
  const [formData, setFormData] = useState<ProviderRegistrationData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    acceptTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.acceptTerms) {
      toast.error('Please accept the terms and conditions');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      console.log('Registering provider:', formData.email);
      const { error } = await register(
        formData.email, 
        formData.password, 
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          role: 'provider'
        }
      );

      if (!error) {
        console.log('Provider registration successful');
        toast.success('Registration successful! Redirecting to application...');
        
        // Small delay to show success message, then redirect
        setTimeout(() => {
          navigate('/provider-application', { replace: true });
        }, 1500);
      } else {
        console.error('Registration error:', error);
        if (error.message?.includes('already registered')) {
          toast.error('This email is already registered. Please sign in instead.');
        } else {
          toast.error(error.message || 'Registration failed');
        }
      }
    } catch (error) {
      console.error('Unexpected registration error:', error);
      toast.error('An unexpected error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm border">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-[#0A2342]">Join as a Provider</h2>
        <p className="text-[#0E3366] mt-2">Create your account to start connecting with eCommerce founders</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              placeholder="John"
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              placeholder="Doe"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder="john@example.com"
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Minimum 6 characters"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="acceptTerms"
            checked={formData.acceptTerms}
            onCheckedChange={(checked) => 
              setFormData(prev => ({ ...prev, acceptTerms: checked as boolean }))
            }
          />
          <Label htmlFor="acceptTerms" className="text-sm">
            I accept the{' '}
            <a href="/terms" className="text-[#2D82B7] hover:underline">
              Terms and Conditions
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-[#2D82B7] hover:underline">
              Privacy Policy
            </a>
          </Label>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-[#2D82B7] hover:bg-[#3D9AD1]" 
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Creating account...
            </div>
          ) : (
            'Create Provider Account'
          )}
        </Button>
      </form>
    </div>
  );
};

export default ProviderRegistrationFlow;
