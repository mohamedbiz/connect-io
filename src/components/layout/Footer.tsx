
import { Link } from "react-router-dom";
import { Briefcase, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Briefcase className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-primary">Connect</span>
            </Link>
            <p className="text-gray-600 mb-4">
              Connecting eCommerce founders with specialized service providers for guaranteed growth.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">For Founders</h3>
            <ul className="space-y-2">
              <li><Link to="/for-founders" className="text-gray-600 hover:text-primary">How It Works</Link></li>
              <li><Link to="/browse-providers" className="text-gray-600 hover:text-primary">Browse Providers</Link></li>
              <li><Link to="/success-stories" className="text-gray-600 hover:text-primary">Success Stories</Link></li>
              <li><Link to="/pricing" className="text-gray-600 hover:text-primary">Pricing</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">For Providers</h3>
            <ul className="space-y-2">
              <li><Link to="/for-providers" className="text-gray-600 hover:text-primary">Why Join</Link></li>
              <li><Link to="/provider-apply" className="text-gray-600 hover:text-primary">Apply as Provider</Link></li>
              <li><Link to="/provider-resources" className="text-gray-600 hover:text-primary">Resources</Link></li>
              <li><Link to="/provider-faq" className="text-gray-600 hover:text-primary">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 hover:text-primary">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-primary">Contact</Link></li>
              <li><Link to="/blog" className="text-gray-600 hover:text-primary">Blog</Link></li>
              <li><Link to="/careers" className="text-gray-600 hover:text-primary">Careers</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Connect. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-gray-500 text-sm hover:text-primary">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-500 text-sm hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
