
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ChartContainer } from "@/components/ui/chart";
import { ArrowRight, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SignupFormMetric {
  id: string;
  name: string;
  score: number;
  currentRate: number;
  industryAverage: number;
  potentialRate: number;
  description: string;
  improvementTips: string[];
}

const EmailListGrowthDiagnostic = () => {
  const [selectedForm, setSelectedForm] = useState("popup");

  // Mock diagnostic data
  const { data: diagnostic } = useQuery({
    queryKey: ["emailListGrowth"],
    queryFn: async () => ({
      overallScore: 65,
      currentConversionRate: 1.8,
      industryAverage: 3.5,
      potentialConversionRate: 8.5,
      estimatedListGrowth: 370,
      forms: [
        {
          id: "popup",
          name: "Popup Form",
          score: 65,
          currentRate: 1.8,
          industryAverage: 3.5,
          potentialRate: 8.5,
          description: "Your main popup form that appears on the homepage after 5 seconds.",
          improvementTips: [
            "Add a more compelling lead magnet (discount, guide, etc.)",
            "Simplify to collect only email (no name field)",
            "Add social proof ('Join 10,000+ subscribers')",
            "Test exit-intent trigger instead of time-based",
            "Improve visual design and contrast"
          ]
        },
        {
          id: "footer",
          name: "Footer Signup",
          score: 45,
          currentRate: 0.4,
          industryAverage: 1.2,
          potentialRate: 3.0,
          description: "Footer signup form that appears on all pages.",
          improvementTips: [
            "Add a specific benefit statement",
            "Use a more action-oriented CTA than 'Subscribe'",
            "Test different incentives (e.g., 'Get free shipping')",
            "Improve visual hierarchy to draw attention",
            "Add a testimonial about newsletter value"
          ]
        },
        {
          id: "checkout",
          name: "Post-Checkout Opt-in",
          score: 78,
          currentRate: 45.2,
          industryAverage: 40.0,
          potentialRate: 65.0,
          description: "Email opt-in checkbox during checkout process.",
          improvementTips: [
            "Pre-check the opt-in box (if legally allowed in your region)",
            "Highlight specific benefits of subscribing",
            "Mention exclusive offers for subscribers",
            "Add urgency ('Be the first to know')",
            "Separate marketing consent from transactional emails"
          ]
        }
      ]
    }),
  });

  if (!diagnostic) {
    return null;
  }

  const selectedFormData = diagnostic.forms.find(form => form.id === selectedForm) || diagnostic.forms[0];
  
  const chartConfig = {
    current: {
      color: "#94a3b8",
      label: "Current Rate",
    },
    industry: {
      color: "#d1d5db",
      label: "Industry Average",
    },
    potential: {
      color: "#8b5cf6",
      label: "Potential Rate",
    },
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Email List Growth Score</CardTitle>
          <CardDescription>
            Based on your current signup forms and conversion rates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Score: {diagnostic.overallScore}/100</span>
                <span className="text-muted-foreground">Room for improvement</span>
              </div>
              <Progress value={diagnostic.overallScore} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-secondary/30 rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground">Current Conversion</p>
                <p className="text-2xl font-bold">{diagnostic.currentConversionRate}%</p>
              </div>
              <div className="bg-secondary/30 rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground">Industry Average</p>
                <p className="text-2xl font-bold">{diagnostic.industryAverage}%</p>
              </div>
              <div className="bg-primary/10 rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground">Potential Rate</p>
                <p className="text-2xl font-bold text-primary">{diagnostic.potentialConversionRate}%</p>
              </div>
            </div>
            <div className="mt-4 p-4 border border-dashed border-primary/50 rounded-lg bg-primary/5 text-center">
              <p className="text-sm text-muted-foreground">Estimated Monthly List Growth with Improvements</p>
              <div className="flex items-center justify-center gap-2 mt-1">
                <Mail className="h-5 w-5 text-primary" />
                <p className="text-2xl font-bold text-primary">+{diagnostic.estimatedListGrowth} subscribers/month</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Form-by-Form Analysis</CardTitle>
          <CardDescription>
            Detailed conversion metrics for each signup form on your site
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={selectedForm} onValueChange={setSelectedForm}>
            <TabsList className="mb-6">
              {diagnostic.forms.map(form => (
                <TabsTrigger key={form.id} value={form.id}>
                  {form.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {diagnostic.forms.map(form => (
              <TabsContent key={form.id} value={form.id}>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{form.name}</h3>
                    <Badge variant={form.score > 70 ? "success" : form.score > 50 ? "warning" : "destructive"}>
                      Score: {form.score}/100
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{form.description}</p>
                  
                  <ChartContainer config={chartConfig}>
                    <div className="w-full aspect-[3/1]">
                      <div className="flex items-end justify-around h-full gap-4 pb-2">
                        <div className="space-y-2 text-center">
                          <div 
                            className="w-16 bg-slate-200" 
                            style={{
                              height: `${(form.currentRate / form.potentialRate) * 100}%`,
                              minHeight: "20px"
                            }}
                          />
                          <span className="text-sm font-medium">Current</span>
                          <span className="block text-sm text-muted-foreground">
                            {form.currentRate}%
                          </span>
                        </div>
                        <div className="space-y-2 text-center">
                          <div 
                            className="w-16 bg-gray-300" 
                            style={{
                              height: `${(form.industryAverage / form.potentialRate) * 100}%`,
                              minHeight: "20px"
                            }}
                          />
                          <span className="text-sm font-medium">Industry</span>
                          <span className="block text-sm text-muted-foreground">
                            {form.industryAverage}%
                          </span>
                        </div>
                        <div className="space-y-2 text-center">
                          <div 
                            className="w-16 bg-primary" 
                            style={{
                              height: "100%",
                              minHeight: "20px"
                            }}
                          />
                          <span className="text-sm font-medium">Potential</span>
                          <span className="block text-sm text-muted-foreground">
                            {form.potentialRate}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </ChartContainer>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Improvement Recommendations</CardTitle>
          <CardDescription>
            Actionable tips to improve your {selectedFormData.name.toLowerCase()} conversion rate
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ul className="space-y-3">
              {selectedFormData.improvementTips.map((tip, index) => (
                <li key={index} className="flex gap-3">
                  <div className="bg-primary/10 text-primary font-medium h-6 w-6 rounded-full flex items-center justify-center shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-sm">{tip}</p>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <Button variant="outline" className="w-full" asChild>
                <a href="#providers">
                  Find Email List Growth Specialists
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailListGrowthDiagnostic;
