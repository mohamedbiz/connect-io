
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Founder, StyleBox",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      content: "Connect changed our business completely. Our email specialist delivered a 215% increase in sales through optimized email sequences. The ROI has been incredible.",
      metrics: {
        sales: "+215%",
        churn: "-27%"
      }
    },
    {
      name: "Michael Chen",
      role: "CEO, GreenEats",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      content: "I was skeptical about the guaranteed results, but our provider delivered beyond expectations. Our customer lifetime value increased by 230% in just 28 days.",
      metrics: {
        sales: "+180%",
        ltv: "+230%"
      }
    },
    {
      name: "Jessica Williams",
      role: "Marketing Director, PetHub",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      content: "Finding qualified email marketing specialists was always a struggle until we found Connect. We've seen a 190% increase in sales and our churn rate dropped by 35%.",
      metrics: {
        sales: "+190%",
        churn: "-35%"
      }
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how other eCommerce businesses have achieved guaranteed results through our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md p-6 border relative"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
              
              <blockquote className="text-gray-700 mb-6">
                "{testimonial.content}"
              </blockquote>
              
              <div className="flex gap-4">
                {testimonial.metrics.sales && (
                  <div className="bg-secondary rounded-lg p-3 text-center flex-1">
                    <div className="text-lg font-bold text-primary">
                      {testimonial.metrics.sales}
                    </div>
                    <div className="text-xs text-gray-600">Sales Increase</div>
                  </div>
                )}
                
                {testimonial.metrics.churn && (
                  <div className="bg-secondary rounded-lg p-3 text-center flex-1">
                    <div className="text-lg font-bold text-primary">
                      {testimonial.metrics.churn}
                    </div>
                    <div className="text-xs text-gray-600">Churn Reduction</div>
                  </div>
                )}
                
                {testimonial.metrics.ltv && (
                  <div className="bg-secondary rounded-lg p-3 text-center flex-1">
                    <div className="text-lg font-bold text-primary">
                      {testimonial.metrics.ltv}
                    </div>
                    <div className="text-xs text-gray-600">LTV Improvement</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
