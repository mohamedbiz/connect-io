
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, LogOut, User, RefreshCw, Loader2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const AuthNav = () => {
  const { user, profile, logout, loading, error, retryAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log('AuthNav logout triggered');
    await logout();
  };

  // Loading state
  if (loading) {
    return (
      <Button variant="ghost" size="sm" disabled>
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        Loading...
      </Button>
    );
  }

  // Connection error state
  if (error && error.includes('fetch')) {
    return (
      <Button variant="ghost" size="sm" className="text-amber-600" onClick={retryAuth}>
        <RefreshCw className="h-4 w-4 mr-2" />
        Reconnect
      </Button>
    );
  }

  // Not logged in - show login button
  if (!user) {
    return (
      <Button asChild variant="secondary" size="sm">
        <Link to="/auth">
          <LogIn className="h-4 w-4 mr-1" />
          Sign In
        </Link>
      </Button>
    );
  }

  // Logged in - show profile dropdown
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <User className="h-4 w-4" />
          <span className="hidden md:inline">
            {profile?.first_name || user.email?.split('@')[0] || 'Account'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem asChild>
          <Link to="/profile" className="cursor-pointer">Profile</Link>
        </DropdownMenuItem>
        
        {profile?.role === 'founder' && (
          <DropdownMenuItem asChild>
            <Link to="/founder-dashboard" className="cursor-pointer">Dashboard</Link>
          </DropdownMenuItem>
        )}
        
        {profile?.role === 'provider' && (
          <DropdownMenuItem asChild>
            <Link to="/provider-dashboard" className="cursor-pointer">Dashboard</Link>
          </DropdownMenuItem>
        )}
        
        {profile?.role === 'admin' && (
          <DropdownMenuItem asChild>
            <Link to="/admin/provider-applications" className="cursor-pointer">Admin Panel</Link>
          </DropdownMenuItem>
        )}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={handleLogout}
          className="cursor-pointer text-red-500 focus:text-red-500"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AuthNav;
