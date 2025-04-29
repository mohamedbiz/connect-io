
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const CTASection = () => {
  return (
    <section className="py-16 md:py-20 bg-[#0A2342]">
      <div className="container mx-auto px-4">
        <Card className="border-0 shadow-lg overflow-hidden bg-[#0E3366]">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to Grow Your eCommerce Business?
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8 text-[#BFD7ED]">
              Join Connect today and get matched with specialized service providers who 
              guarantee to increase your sales by 200%, reduce churn by 30%, and 
              improve customer lifetime value by 200% within 30 days — or you don't pay.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="default" 
                className="bg-[#2D82B7] text-white hover:bg-[#3D9AD1]"
                asChild
              >
                <Link to="/register">
                  Get Started Now
                  <ArrowRight className="ml-1 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-[#BFD7ED] text-[#BFD7ED] hover:bg-[#0E3366]/80"
                asChild
              >
                <Link to="/contact">
                  Contact Sales
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CTASection;
