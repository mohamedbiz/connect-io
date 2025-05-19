
import React, { useState } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff, Building, User, Mail, Lock, WifiOff, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import Layout from '@/components/layout/Layout';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const AuthPage = () => {
  // URL params
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('register') === 'true' ? 'register' : 'login';
  const initialUserType = (searchParams.get('type') as 'founder' | 'provider') || 'founder';
  
  // Local state
  const [tab, setTab] = useState(initialTab);
  const [userType, setUserType] = useState<'founder' | 'provider'>(initialUserType);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    companyName: '',
    acceptTerms: false
  });

  // Auth context and navigation
  const { login, register, error: authError, retryAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get redirect path after login
  const from = location.state?.from || '/';

  // Connection error
  const isConnectionError = authError && authError.includes('fetch');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isConnectionError) {
      toast.error('Please check your internet connection and try again');
      return;
    }
    
    setLoading(true);

    try {
      if (tab === 'login') {
        const { error } = await login(formData.email, formData.password);
        if (!error) {
          navigate(from, { replace: true });
        }
      } else {
        if (!formData.acceptTerms) {
          toast.error('Please accept the terms and conditions');
          setLoading(false);
          return;
        }

        const { error } = await register(
          formData.email, 
          formData.password, 
          {
            first_name: formData.firstName,
            last_name: formData.lastName,
            business_name: formData.companyName,
            role: userType
          }
        );

        if (!error) {
          navigate('/post-register', { 
            state: { userType, isNewUser: true },
            replace: true 
          });
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          {isConnectionError && (
            <Alert variant="destructive" className="mb-4">
              <WifiOff className="h-4 w-4 mr-2" />
              <AlertTitle>Network Connection Error</AlertTitle>
              <AlertDescription className="space-y-4">
                <p>
                  We're having trouble connecting to our servers. Please check your internet connection.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => retryAuth()}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Retry Connection
                </Button>
              </AlertDescription>
            </Alert>
          )}

          <Card className="border border-[#2D82B7]/30 shadow-sm">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-2">
                <div className="bg-[#0A2342] p-3 rounded-full">
                  <Building className="h-6 w-6 text-[#2D82B7]" />
                </div>
              </div>
              <CardTitle className="text-2xl">
                {tab === 'login' ? 'Welcome back' : 'Create your account'}
              </CardTitle>
              <CardDescription>
                {tab === 'login' 
                  ? 'Sign in to your Connect account' 
                  : 'Join the platform that guarantees results'}
              </CardDescription>
            </CardHeader>

            <CardContent>
              {tab === 'register' && (
                <div className="mb-6">
                  <Tabs defaultValue={userType} onValueChange={(value) => setUserType(value as 'founder' | 'provider')}>
                    <TabsList className="grid grid-cols-2 w-full">
                      <TabsTrigger value="founder">
                        <Building className="h-4 w-4 mr-2" />
                        I'm a Founder
                      </TabsTrigger>
                      <TabsTrigger value="provider">
                        <User className="h-4 w-4 mr-2" />
                        I'm a Provider
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <p className="text-sm text-gray-500 mt-2">
                    {userType === 'founder' 
                      ? 'For eCommerce store owners looking to grow their sales'
                      : 'For marketing specialists who want to connect with clients'}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {tab === 'register' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                        <Input 
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInput}
                          required={tab === 'register'}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                        <Input 
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInput}
                          required={tab === 'register'}
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
                          onChange={handleInput}
                          required={userType === 'founder'}
                        />
                      </div>
                    )}
                  </>
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
                      onChange={handleInput}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label htmlFor="password" className="text-sm font-medium">Password</label>
                    {tab === 'login' && (
                      <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                        Forgot password?
                      </Link>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleInput}
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
                
                {tab === 'register' && (
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="acceptTerms" 
                      name="acceptTerms"
                      checked={formData.acceptTerms}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({...prev, acceptTerms: checked as boolean}))
                      }
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
                )}
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90" 
                  disabled={loading || isConnectionError}
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

            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-center text-gray-500">
                {tab === 'login' ? (
                  <>
                    Don't have an account?{" "}
                    <button 
                      onClick={() => setTab('register')}
                      className="text-primary hover:underline"
                      type="button"
                    >
                      Register
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button 
                      onClick={() => setTab('login')}
                      className="text-primary hover:underline"
                      type="button"
                    >
                      Sign in
                    </button>
                  </>
                )}
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AuthPage;
