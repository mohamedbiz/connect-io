
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { LogIn, LogOut, User, Loader2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const AuthNav = () => {
  const { user, profile, logout, loading, isAuthenticated } = useAuth();

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

  // Not logged in - show login button that goes to founder auth
  if (!isAuthenticated) {
    return (
      <Button asChild variant="secondary" size="sm">
        <Link to="/auth/founder">
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
            {profile?.first_name || user?.email?.split('@')[0] || 'Account'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {profile?.role === 'founder' && (
          <DropdownMenuItem asChild>
            <Link to="/founder/dashboard" className="cursor-pointer">Dashboard</Link>
          </DropdownMenuItem>
        )}
        
        {profile?.role === 'provider' && (
          <DropdownMenuItem asChild>
            <Link to="/provider/dashboard" className="cursor-pointer">Dashboard</Link>
          </DropdownMenuItem>
        )}
        
        {profile?.role === 'admin' && (
          <DropdownMenuItem asChild>
            <Link to="/admin/dashboard" className="cursor-pointer">Admin Panel</Link>
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
