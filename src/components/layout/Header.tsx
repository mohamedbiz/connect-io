
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
  const { user, profile, logout, loading } = useAuth();
  
  const handleLogout = async () => {
    console.log('Header logout button clicked');
    setIsMenuOpen(false);
    await logout();
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
          {isProvider && (
            <Link to="/provider-dashboard#resources" className="text-[#BFD7ED] hover:text-white transition-colors flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>Resources</span>
            </Link>
          )}
        </nav>

        {/* Desktop Auth Buttons - Removed for MVP */}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#0E3366] absolute top-16 left-0 right-0 z-50 shadow-md border-b border-[#2D82B7]/30">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link to="/for-founders" className="text-[#BFD7ED] hover:text-white transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
              For Founders
            </Link>
            <Link to="/for-providers" className="text-[#BFD7ED] hover:text-white transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
              For Providers
            </Link>
            {isProvider && (
              <Link to="/provider-dashboard#resources" className="text-[#BFD7ED] hover:text-white transition-colors py-2 flex items-center gap-1" onClick={() => setIsMenuOpen(false)}>
                <BookOpen className="h-4 w-4" />
                <span>Resources</span>
              </Link>
            )}
            {/* Mobile Auth Buttons - Removed for MVP */}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
