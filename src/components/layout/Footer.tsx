
import { Link } from "react-router-dom";
import { Briefcase, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0A2342] border-t border-[#2D82B7]/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Briefcase className="h-6 w-6 text-[#2D82B7]" />
              <span className="text-xl font-bold text-white">Connect</span>
            </Link>
            <p className="text-[#BFD7ED] mb-4">
              Connecting eCommerce founders with specialized service providers for guaranteed growth.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-[#BFD7ED] hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#BFD7ED] hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#BFD7ED] hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#BFD7ED] hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-white">For Founders</h3>
            <ul className="space-y-2">
              <li><Link to="/for-founders" className="text-[#BFD7ED] hover:text-white transition-colors">How It Works</Link></li>
              <li><Link to="/browse-providers" className="text-[#BFD7ED] hover:text-white transition-colors">Browse Providers</Link></li>
              <li><Link to="/success-stories" className="text-[#BFD7ED] hover:text-white transition-colors">Success Stories</Link></li>
              <li><Link to="/pricing" className="text-[#BFD7ED] hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-white">For Providers</h3>
            <ul className="space-y-2">
              <li><Link to="/for-providers" className="text-[#BFD7ED] hover:text-white transition-colors">Why Join</Link></li>
              <li><Link to="/provider-apply" className="text-[#BFD7ED] hover:text-white transition-colors">Apply as Provider</Link></li>
              <li><Link to="/provider-resources" className="text-[#BFD7ED] hover:text-white transition-colors">Resources</Link></li>
              <li><Link to="/provider-faq" className="text-[#BFD7ED] hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-[#BFD7ED] hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-[#BFD7ED] hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/blog" className="text-[#BFD7ED] hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/careers" className="text-[#BFD7ED] hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[#2D82B7]/30 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#BFD7ED]/70 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Connect. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-[#BFD7ED]/70 text-sm hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-[#BFD7ED]/70 text-sm hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
