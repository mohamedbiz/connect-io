import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Chart } from "@/components/ui/chart";

const EmailMarketingDiagnostic = () => {
  // Mock diagnostic data
  const { data: diagnostic } = useQuery({
    queryKey: ["emailDiagnostic"],
    queryFn: async () => ({
      score: 65,
      potentialRevenue: 150000,
      currentRevenue: 100000,
      improvements: [
        {
          id: 1,
          title: "Abandoned Cart Recovery",
          description: "Implement automated cart recovery sequences",
          impact: "high",
          currentState: "Missing",
        },
        {
          id: 2,
          title: "Post-Purchase Sequence",
          description: "Optimize customer follow-up and retention",
          impact: "medium",
          currentState: "Basic",
        },
      ],
    }),
  });

  if (!diagnostic) {
    return null;
  }

  const chartConfig = {
    current: {
      color: "#94a3b8",
      label: "Current Revenue",
    },
    potential: {
      color: "#8b5cf6",
      label: "Potential Revenue",
    },
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Email Marketing Score</CardTitle>
          <CardDescription>
            Based on your current email marketing setup and performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Score: {diagnostic.score}/100</span>
              <span className="text-muted-foreground">Room for improvement</span>
            </div>
            <Progress value={diagnostic.score} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Revenue Impact</CardTitle>
          <CardDescription>
            Potential revenue increase from email marketing improvements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Chart 
            config={chartConfig}
          >
            <div className="w-full aspect-[2/1]">
              <div className="flex items-end justify-around h-full gap-4 pb-2">
                <div className="space-y-2 text-center">
                  <div 
                    className="w-20 bg-slate-200" 
                    style={{
                      height: `${(diagnostic.currentRevenue / diagnostic.potentialRevenue) * 100}%`
                    }}
                  />
                  <span className="text-sm font-medium">Current</span>
                  <span className="block text-sm text-muted-foreground">
                    ${(diagnostic.currentRevenue / 1000).toFixed(0)}k
                  </span>
                </div>
                <div className="space-y-2 text-center">
                  <div 
                    className="w-20 bg-primary" 
                    style={{
                      height: "100%"
                    }}
                  />
                  <span className="text-sm font-medium">Potential</span>
                  <span className="block text-sm text-muted-foreground">
                    ${(diagnostic.potentialRevenue / 1000).toFixed(0)}k
                  </span>
                </div>
              </div>
            </div>
          </Chart>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recommended Improvements</CardTitle>
          <CardDescription>
            High-impact opportunities for your email marketing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {diagnostic.improvements.map((improvement) => (
              <div key={improvement.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{improvement.title}</h4>
                  <span className="text-sm text-muted-foreground">
                    {improvement.currentState}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {improvement.description}
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <a href="#providers">
                    Find Specialists
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailMarketingDiagnostic;
