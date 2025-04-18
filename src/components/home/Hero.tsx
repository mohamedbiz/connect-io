
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-secondary to-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Connect with providers who<br />
              <span className="text-primary">guarantee results</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-700">
              Our pre-vetted specialists guarantee to increase your sales by 200%, 
              reduce churn by 30%, and improve customer lifetime value by 200% 
              within 30 days — or you don't pay.
            </p>
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-accent" />
                <span className="text-gray-700">200% increase in sales</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-accent" />
                <span className="text-gray-700">30% reduction in customer churn</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-accent" />
                <span className="text-gray-700">200% improvement in customer lifetime value</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/register">
                  Get Started Now
                  <ArrowRight className="ml-1 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/how-it-works">
                  How It Works
                </Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="bg-white rounded-lg shadow-xl border p-6 relative">
              <div className="absolute -top-4 -left-4 bg-accent text-white text-sm font-medium py-1 px-3 rounded-full">
                Proven Results
              </div>
              <div className="flex flex-col gap-4">
                <div className="bg-secondary rounded-lg p-5">
                  <div className="text-4xl font-bold text-primary mb-1">200%</div>
                  <div className="text-sm text-gray-700">Average Sales Increase</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-secondary rounded-lg p-5">
                    <div className="text-3xl font-bold text-primary mb-1">30%</div>
                    <div className="text-sm text-gray-700">Churn Reduction</div>
                  </div>
                  <div className="bg-secondary rounded-lg p-5">
                    <div className="text-3xl font-bold text-primary mb-1">200%</div>
                    <div className="text-sm text-gray-700">LTV Improvement</div>
                  </div>
                </div>
                <div className="text-center text-gray-500 text-sm mt-2">
                  Based on average results from our top providers
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
