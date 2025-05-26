import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock, WifiOff } from 'lucide-react';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';
import { supabase, checkNetworkConnection } from '@/integrations/supabase/client';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { usePostLoginRedirection } from '@/hooks/usePostLoginRedirection';

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOAuthLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [networkAvailable, setNetworkAvailable] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { login, error: authError, retryAuth, user, profile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { redirectAfterLogin } = usePostLoginRedirection();
  
  // Get redirect path after login
  const from = location.state?.from || '/';
  const isConnectionError = authError && authError.includes('fetch');

  // Handle redirection after successful authentication
  useEffect(() => {
    if (user && profile) {
      console.log('User and profile available, triggering redirection');
      setTimeout(() => {
        redirectAfterLogin(user, profile);
      }, 1000); // Small delay to show success message
    }
  }, [user, profile, redirectAfterLogin]);

  // Check network status on component mount
  useEffect(() => {
    const checkNetwork = async () => {
      const isOnline = await checkNetworkConnection();
      setNetworkAvailable(isOnline);
      
      if (!isOnline) {
        toast.error('Network connection unavailable');
      }
    };
    
    checkNetwork();
    
    // Also check when browser reports online status changes
    const handleOnline = () => setNetworkAvailable(true);
    const handleOffline = () => setNetworkAvailable(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check network connection again right before login attempt
    const isOnline = await checkNetworkConnection();
    if (!isOnline) {
      toast.error('Network connection is unavailable. Please check your internet connection and try again.');
      setNetworkAvailable(false);
      return;
    }
    
    setLoading(true);

    try {
      console.log('Attempting login with:', formData.email);
      const { error } = await login(formData.email, formData.password);
      if (!error) {
        // Login successful - redirection will be handled by useEffect
        console.log('Login successful, waiting for profile data');
      } else {
        // Enhanced error messages
        if (error.message?.includes('credentials')) {
          toast.error('Incorrect email or password');
        } else if (error.message?.includes('rate limit')) {
          toast.error('Too many login attempts. Please try again later');
        } else if (error.message?.includes('fetch') || error.message?.includes('network')) {
          toast.error('Network error. Please check your connection and try again.');
          setNetworkAvailable(false);
        } else {
          toast.error(error.message || 'Login failed');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Sign In
  const handleGoogleSignIn = async () => {
    // Check network connection before attempting OAuth
    const isOnline = await checkNetworkConnection();
    if (!isOnline) {
      toast.error('Network connection is unavailable. Please check your internet connection and try again.');
      setNetworkAvailable(false);
      return;
    }
    
    try {
      setOAuthLoading(true);
      console.log('Attempting Google sign-in');
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth-callback`
        }
      });
      
      if (error) {
        throw error;
      }
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      if (error.message?.includes('fetch') || error.message?.includes('network')) {
        toast.error('Network error. Please check your connection and try again.');
        setNetworkAvailable(false);
      } else {
        toast.error('Failed to sign in with Google. Please try again.');
      }
    } finally {
      setOAuthLoading(false);
    }
  };

  // Display network error banner
  const handleRetryConnection = async () => {
    const isOnline = await checkNetworkConnection();
    setNetworkAvailable(isOnline);
    
    if (isOnline) {
      toast.success('Connection restored!');
      retryAuth();
    } else {
      toast.error('Still offline. Please check your internet connection.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!networkAvailable && (
        <Alert variant="destructive" className="mb-4">
          <WifiOff className="h-4 w-4 mr-2" />
          <AlertTitle>Network Connection Error</AlertTitle>
          <AlertDescription className="space-y-2">
            <p>We're having trouble connecting to our servers. This could be due to:</p>
            <ul className="list-disc ml-5 space-y-1">
              <li>Your internet connection is down</li>
              <li>Your network might be blocking the connection</li>
              <li>Our servers might be temporarily unavailable</li>
            </ul>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleRetryConnection}
              className="mt-2"
            >
              Retry Connection
            </Button>
          </AlertDescription>
        </Alert>
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
          <Link to="/forgot-password" className="text-xs text-primary hover:underline">
            Forgot password?
          </Link>
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
      
      <Button 
        type="submit" 
        className="w-full bg-primary hover:bg-primary/90" 
        disabled={loading || !networkAvailable}
      >
        {loading ? (
          <div className="flex items-center">
            <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
            Signing in...
          </div>
        ) : (
          'Sign In'
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

      <Button 
        type="button" 
        variant="outline" 
        className="w-full flex items-center justify-center gap-2"
        onClick={handleGoogleSignIn}
        disabled={oauthLoading || !networkAvailable}
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
          <path d="M1 1h22v22H1z" fill="none" />
        </svg>
        {oauthLoading ? 'Connecting...' : 'Sign in with Google'}
      </Button>
    </form>
  );
};

export default LoginForm;
