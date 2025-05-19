
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase, MenuIcon, X, BookOpen } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface HeaderProps {
  hideAuth?: boolean;
}

const Header = ({ hideAuth = false }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Try to use auth context but handle the case when it's not available
  let authData = { user: null, profile: null, logout: async () => {} };
  
  try {
    authData = useAuth();
  } catch (error) {
    // Auth context not available, using default values
    console.log("Auth context not available in Header");
  }
  
  const { user, profile, logout } = authData;
  
  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
  };

  // Determine dashboard link based on user role
  const getDashboardLink = () => {
    if (!profile) return "/";
    return profile.role === "provider" ? "/provider-dashboard" : "/founder-dashboard";
  };

  // Conditionally render resources link for providers
  const isProvider = profile?.role === "provider";
  
  return (
    <header className="bg-[#0A2342] border-b border-[#2D82B7]/30">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-[#2D82B7]" />
            <span className="text-xl font-bold text-white">Connect</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link to="/how-it-works" className="text-[#BFD7ED] hover:text-white transition-colors">
            How it Works
          </Link>
          <Link to="/for-founders" className="text-[#BFD7ED] hover:text-white transition-colors">
            For Founders
          </Link>
          <Link to="/for-providers" className="text-[#BFD7ED] hover:text-white transition-colors">
            For Providers
          </Link>
          {isProvider && <Link to="/provider-dashboard#resources" className="text-[#BFD7ED] hover:text-white transition-colors flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>Resources</span>
            </Link>}
        </nav>

        {/* Desktop Auth Buttons */}
        {!hideAuth && (
          <div className="hidden lg:flex items-center gap-4">
            {!user ? <>
                <Button variant="ghost" className="text-[#BFD7ED] hover:bg-[#0E3366] hover:text-white" asChild>
                  <Link to="/auth">Login</Link>
                </Button>
                <Button className="bg-[#2D82B7] hover:bg-[#3D9AD1] text-white border-none" asChild>
                  <Link to="/auth">Get Started</Link>
                </Button>
              </> : <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost" className="text-[#BFD7ED] hover:bg-[#0E3366] hover:text-white" asChild>
                  <Link to={getDashboardLink()}>My Dashboard</Link>
                </Button>
                <span className="text-sm font-medium text-[#BFD7ED]">
                  {profile?.first_name || user.email}
                </span>
                <Button size="sm" variant="ghost" className="text-[#BFD7ED] hover:bg-[#0E3366] hover:text-white" onClick={handleLogout}>
                  Logout
                </Button>
              </div>}
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && <div className="lg:hidden bg-[#0E3366] absolute top-16 left-0 right-0 z-50 shadow-md border-b border-[#2D82B7]/30">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            
            <Link to="/for-founders" className="text-[#BFD7ED] hover:text-white transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
              For Founders
            </Link>
            <Link to="/for-providers" className="text-[#BFD7ED] hover:text-white transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
              For Providers
            </Link>
            {isProvider && <Link to="/provider-dashboard#resources" className="text-[#BFD7ED] hover:text-white transition-colors py-2 flex items-center gap-1" onClick={() => setIsMenuOpen(false)}>
                <BookOpen className="h-4 w-4" />
                <span>Resources</span>
              </Link>}
            <hr className="border-[#2D82B7]/30" />
            
            {!hideAuth && (
              !user ? <>
                  <Link to="/auth" className="text-[#BFD7ED] hover:text-white transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
                    Login
                  </Link>
                  <Button className="w-full bg-[#2D82B7] hover:bg-[#3D9AD1] text-white border-none" asChild onClick={() => setIsMenuOpen(false)}>
                    <Link to="/auth">Get Started</Link>
                  </Button>
                </> : <>
                  <Link to={getDashboardLink()} className="text-[#BFD7ED] hover:text-white transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
                    My Dashboard
                  </Link>
                  <Button className="w-full bg-[#2D82B7] hover:bg-[#3D9AD1] text-white border-none" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
            )}
          </div>
        </div>}
    </header>
  );
};

export default Header;
