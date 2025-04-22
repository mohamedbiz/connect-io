
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase, Mail, MenuIcon, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profile, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-primary">Connect</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link to="/how-it-works" className="text-gray-600 hover:text-primary">How it Works</Link>
          <Link to="/for-founders" className="text-gray-600 hover:text-primary">For Founders</Link>
          <Link to="/for-providers" className="text-gray-600 hover:text-primary">For Providers</Link>
          <Link to="/results" className="text-gray-600 hover:text-primary">Success Stories</Link>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          {!user ? (
            <>
              <Button variant="ghost" asChild>
                <Link to="/auth">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/auth">Get Started</Link>
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">
                {profile?.first_name || user.email}
              </span>
              <Button size="sm" variant="ghost" onClick={handleLogout}>Logout</Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white absolute top-16 left-0 right-0 z-50 shadow-md border-b">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link
              to="/how-it-works"
              className="text-gray-600 hover:text-primary py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              How it Works
            </Link>
            <Link
              to="/for-founders"
              className="text-gray-600 hover:text-primary py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              For Founders
            </Link>
            <Link
              to="/for-providers"
              className="text-gray-600 hover:text-primary py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              For Providers
            </Link>
            <Link
              to="/results"
              className="text-gray-600 hover:text-primary py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Success Stories
            </Link>
            <hr />
            {!user ? (
              <>
                <Link
                  to="/auth"
                  className="text-gray-600 hover:text-primary py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Button
                  className="w-full"
                  asChild
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link to="/auth">Get Started</Link>
                </Button>
              </>
            ) : (
              <Button className="w-full" variant="ghost" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
