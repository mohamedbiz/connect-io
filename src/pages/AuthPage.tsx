
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import AuthCardHeader from '@/components/auth/AuthCardHeader';
import AuthCardFooter from '@/components/auth/AuthCardFooter';
import UserTypeSelector from '@/components/auth/UserTypeSelector';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AuthPage = () => {
  // URL params
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('register') === 'true' ? 'register' : 'login';
  const initialUserType = (searchParams.get('type') as 'founder' | 'provider') || 'founder';
  
  // Local state
  const [tab, setTab] = useState(initialTab);
  const [userType, setUserType] = useState<'founder' | 'provider'>(initialUserType);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    acceptTerms: false,
  });

  // Auth context
  const { login, register, loading, error } = useAuth();

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle checkbox change
  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      acceptTerms: checked
    }));
  };

  // Handle role tab selection
  const handleRoleChange = (role: 'founder' | 'provider') => {
    setUserType(role);
  };

  // Toggle between login and register
  const toggleAuthMode = (newTab: 'login' | 'register') => {
    setTab(newTab);
    // Clear form when switching modes
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      acceptTerms: false,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (tab === 'login') {
      // Login validation
      if (!formData.email || !formData.password) {
        return;
      }

      await login(formData.email, formData.password);
    } else {
      // Registration validation
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
        return;
      }

      if (!formData.acceptTerms) {
        return;
      }

      await register(formData.email, formData.password, {
        first_name: formData.firstName,
        last_name: formData.lastName,
        role: userType,
      });
    }
  };

  return (
    <Layout hideAuth={true}>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card className="border border-[#2D82B7]/30 shadow-sm">
            <AuthCardHeader tabType={tab as 'login' | 'register'} />

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

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Registration-only fields */}
                {tab === 'register' && (
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
                )}

                {/* Common fields */}
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

                {/* Registration-only terms */}
                {tab === 'register' && (
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="acceptTerms"
                      checked={formData.acceptTerms}
                      onCheckedChange={handleCheckboxChange}
                    />
                    <label htmlFor="acceptTerms" className="text-sm">
                      I accept the <a href="/terms" className="text-primary underline">terms and conditions</a>
                    </label>
                  </div>
                )}
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90" 
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center">
                      <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                      {tab === 'login' ? 'Signing in...' : 'Creating account...'}
                    </div>
                  ) : (
                    tab === 'login' ? 'Sign In' : 'Create Account'
                  )}
                </Button>
              </form>
            </CardContent>

            <AuthCardFooter 
              tabType={tab as 'login' | 'register'} 
              onTabChange={toggleAuthMode}
            />
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AuthPage;
