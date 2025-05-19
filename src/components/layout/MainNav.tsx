
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthNav from "./AuthNav";

export default function MainNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3">
          <span className="self-center text-2xl font-semibold text-primary">Connect</span>
        </Link>
        
        <div className="flex md:order-2 gap-2 items-center">
          <AuthNav />
          
          <Button
            variant="ghost"
            size="icon"
            className="inline-flex md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
        
        <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
          isMenuOpen ? "block" : "hidden"
        }`}>
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white">
            <li>
              <Link 
                to="/for-founders" 
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0"
                onClick={() => setIsMenuOpen(false)}
              >
                For Founders
              </Link>
            </li>
            <li>
              <Link 
                to="/for-providers" 
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0"
                onClick={() => setIsMenuOpen(false)}
              >
                For Providers
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
