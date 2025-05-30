
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="bg-[#0A2342] py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
            Finally. A Steady Stream of Qualified eCommerce Clients
            <span className="text-[#2D82B7]"> Who Value Your Expertise</span>
          </h1>
          <p className="text-xl text-[#BFD7ED] mb-8 max-w-3xl mx-auto">
            Stop wasting hours filtering low-quality leads on generic platforms. Connect delivers 
            pre-vetted, growth-focused DTC Founders directly to you, so you can focus on 
            delivering results, not endless selling.
          </p>
          <Button 
            size="lg" 
            className="bg-[#2D82B7] hover:bg-[#3D9AD1] text-white transition-colors"
            asChild
          >
            <Link to="/provider-application">
              Apply for Qualified Leads
              <ArrowRight className="ml-1 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
