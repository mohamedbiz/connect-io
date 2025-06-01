
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import Layout from '@/components/layout/Layout';
import { Eye, EyeOff, User, Mail, Lock, Building } from 'lucide-react';

const SignupPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { register } = useAuth();

  // Extract role from URL parameters or session storage
  const roleFromUrl = searchParams.get('role') as 'founder' | 'provider' | null;
  const roleFromSession = sessionStorage.getItem('selectedRole') as 'founder' | 'provider' | null;
  const [selectedRole, setSelectedRole] = useState<'founder' | 'provider'>(
    roleFromUrl || roleFromSession || 'founder'
  );

  // Form state management
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    password: '',
    agreeToTerms: false
  });
  
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Store role in session storage when it changes
  useEffect(() => {
    sessionStorage.setItem('selectedRole', selectedRole);
  }, [selectedRole]);

  // Form input handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Role tab selection handler
  const handleRoleChange = (role: 'founder' | 'provider') => {
    setSelectedRole(role);
    // Update URL to reflect role selection
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('role', role);
    navigate(`/signup?${newSearchParams.toString()}`, { replace: true });
  };

  // Form validation
  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.companyName || 
        !formData.email || !formData.password) {
      toast.error('All fields are required');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return false;
    }

    if (!formData.agreeToTerms) {
      toast.error('You must agree to the Terms of Service');
      return false;
    }

    return true;
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const { error } = await register(formData.email, formData.password, {
        first_name: formData.firstName,
        last_name: formData.lastName,
        role: selectedRole,
      });
      
      if (error) {
        if (error.message?.includes('already registered')) {
          toast.error('This email is already registered. Please try logging in instead.');
        } else {
          toast.error(error.message || 'Registration failed');
        }
      } else {
        toast.success('Account created successfully!');
        
        // Navigate based on role after successful registration
        if (selectedRole === 'founder') {
          navigate('/founder/dashboard');
        } else {
          navigate('/provider/dashboard');
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout hideAuth={true}>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card className="border border-[#2D82B7]/30 shadow-sm">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-2">
                <div className="bg-[#0A2342] p-3 rounded-full">
                  <Building className="h-6 w-6 text-[#2D82B7]" />
                </div>
              </div>
              <CardTitle className="text-2xl">Create your account</CardTitle>
              <p className="text-gray-600">Join the platform that guarantees results</p>
            </CardHeader>

            <CardContent>
              {/* Role selection tabs */}
              <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
                <button 
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    selectedRole === 'founder' 
                      ? 'bg-white text-[#0A2342] shadow-sm' 
                      : 'text-gray-600 hover:text-[#0A2342]'
                  }`}
                  onClick={() => handleRoleChange('founder')}
                  type="button"
                >
                  I'm a Founder
                </button>
                <button 
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    selectedRole === 'provider' 
                      ? 'bg-white text-[#0A2342] shadow-sm' 
                      : 'text-gray-600 hover:text-[#0A2342]'
                  }`}
                  onClick={() => handleRoleChange('provider')}
                  type="button"
                >
                  I'm a Provider
                </button>
              </div>

              {/* Role-specific description */}
              <div className="mb-6 text-center">
                {selectedRole === 'founder' && (
                  <p className="text-sm text-gray-600">For eCommerce store owners looking to grow their sales</p>
                )}
                {selectedRole === 'provider' && (
                  <p className="text-sm text-gray-600">For email marketing specialists looking for quality clients</p>
                )}
              </div>

              {/* Registration form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input 
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input 
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="companyName" className="text-sm font-medium">
                    {selectedRole === 'founder' ? 'Company/Store Name' : 'Business Name'}
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      id="companyName"
                      name="companyName"
                      type="text"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
                      className="pl-10 pr-10" 
                      required
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)} 
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
                    id="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, agreeToTerms: checked === true }))}
                  />
                  <label htmlFor="agreeToTerms" className="text-sm">
                    I agree to the <a href="/terms" className="text-primary underline">Terms of Service</a> and{' '}
                    <a href="/privacy" className="text-primary underline">Privacy Policy</a>
                  </label>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90" 
                  disabled={loading}
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
              </form>

              <div className="mt-6 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <button 
                  onClick={() => navigate('/login')}
                  className="text-primary hover:underline"
                  type="button"
                >
                  Sign in
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SignupPage;
