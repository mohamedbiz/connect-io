
import { ArrowRight, BarChart, LineChart, Mail, ShieldCheck, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const painPoints = [
  {
    id: "abandoned-cart",
    title: "Abandoned Cart Recovery",
    description: "Average cart abandonment rate of 69.8%. Recovering just 10% of abandoned carts can increase revenue by 30-40%.",
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    metric: "30-40%",
    metricLabel: "Revenue Increase",
  },
  {
    id: "post-purchase",
    title: "Post-Purchase Sequences",
    description: "Most stores have minimal or no post-purchase follow-up. Effective sequences can increase repeat purchase rate by 25-35%.",
    icon: <Mail className="h-8 w-8 text-primary" />,
    metric: "25-35%",
    metricLabel: "Repeat Purchase Rate",
  },
  {
    id: "winback",
    title: "Customer Winback Campaigns",
    description: "Lapsed customers represent 20-40% of customer base for most stores. Effective winback campaigns can reactivate 5-15% of dormant customers.",
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
    metric: "5-15%",
    metricLabel: "Reactivation Rate",
  },
  {
    id: "list-growth",
    title: "Email List Growth",
    description: "Average popup conversion rate below 2%. Optimized signup forms can achieve 5-10% conversion rates.",
    icon: <BarChart className="h-8 w-8 text-primary" />,
    metric: "5-10%",
    metricLabel: "Conversion Rate",
  },
];

const EmailMarketingInsights = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">30-Day Impact Opportunities</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our research identified these key areas where service providers can deliver significant improvements within 30 days.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {painPoints.map((point) => (
            <Card key={point.id} className="h-full">
              <CardHeader>
                <div className="mb-4">{point.icon}</div>
                <CardTitle>{point.title}</CardTitle>
                <CardDescription className="text-sm mt-2">
                  {point.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-primary/10 rounded-lg p-3 flex flex-col items-center">
                  <span className="text-2xl font-bold text-primary">{point.metric}</span>
                  <span className="text-xs text-gray-600">{point.metricLabel}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Button size="lg" asChild>
            <Link to="/founder-dashboard">
              Try Our Email Marketing Diagnostic Tool
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EmailMarketingInsights;
