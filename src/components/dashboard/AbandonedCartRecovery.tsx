
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ServiceProvider } from "@/types/provider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, TrendingUp, CheckCircle } from "lucide-react";

const AbandonedCartRecovery = () => {
  const implementationSteps = [
    {
      title: "Platform Integration",
      description: "Connect to your email marketing platform and set up tracking",
      status: "required"
    },
    {
      title: "Customer Segmentation",
      description: "Define abandoned cart triggers and customer segments",
      status: "required"
    },
    {
      title: "Sequence Design",
      description: "Create recovery email templates and timing",
      status: "required"
    },
    {
      title: "Incentive Strategy",
      description: "Design discount or offer strategy (if applicable)",
      status: "optional"
    }
  ];

  const expectedResults = [
    {
      metric: "Recovery Rate",
      value: "10-15%",
      description: "Percentage of abandoned carts recovered"
    },
    {
      metric: "Revenue Increase",
      value: "30-40%",
      description: "Expected revenue boost from recoveries"
    },
    {
      metric: "Implementation Time",
      value: "7-14 days",
      description: "Time to full implementation"
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Abandoned Cart Recovery Implementation
          </CardTitle>
          <CardDescription>
            Recover lost sales with automated email sequences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6">
            <TrendingUp className="h-4 w-4" />
            <AlertDescription>
              Stores implementing abandoned cart recovery see an average 35% increase in revenue
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="requirements">
            <TabsList>
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
              <TabsTrigger value="results">Expected Results</TabsTrigger>
            </TabsList>

            <TabsContent value="requirements">
              <div className="space-y-4">
                {implementationSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                    <CheckCircle className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{step.title}</h4>
                        <Badge variant={step.status === "required" ? "default" : "secondary"}>
                          {step.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="results">
              <div className="grid gap-4 md:grid-cols-3">
                {expectedResults.map((result, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{result.value}</CardTitle>
                      <CardDescription>{result.metric}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {result.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AbandonedCartRecovery;
