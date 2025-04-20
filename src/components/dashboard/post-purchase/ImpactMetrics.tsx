
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { PostPurchaseDiagnostic } from "@/types/post-purchase-diagnostics";

interface ImpactMetricsProps {
  diagnostic: PostPurchaseDiagnostic;
}

const ImpactMetrics = ({ diagnostic }: ImpactMetricsProps) => {
  const chartConfig = {
    current: {
      color: "#94a3b8",
      label: "Current Rate",
    },
    industry: {
      color: "#64748b",
      label: "Industry Average",
    },
    potential: {
      color: "#8b5cf6",
      label: "Potential Rate",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Impact</CardTitle>
        <CardDescription>
          Potential revenue increase from optimized post-purchase sequences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <ChartContainer config={chartConfig}>
            <div className="w-full aspect-[2/1]">
              <div className="flex items-end justify-around h-full gap-4 pb-2">
                <div className="space-y-2 text-center">
                  <div
                    className="w-20 bg-slate-200"
                    style={{
                      height: `${(diagnostic.currentRepeatRate / diagnostic.potentialRepeatRate) * 100}%`
                    }}
                  />
                  <span className="text-sm font-medium">Current</span>
                  <span className="block text-sm text-muted-foreground">
                    {diagnostic.currentRepeatRate}%
                  </span>
                </div>
                <div className="space-y-2 text-center">
                  <div
                    className="w-20 bg-slate-400"
                    style={{
                      height: `${(diagnostic.industryAverage / diagnostic.potentialRepeatRate) * 100}%`
                    }}
                  />
                  <span className="text-sm font-medium">Industry</span>
                  <span className="block text-sm text-muted-foreground">
                    {diagnostic.industryAverage}%
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
                    {diagnostic.potentialRepeatRate}%
                  </span>
                </div>
              </div>
            </div>
          </ChartContainer>
          <div className="text-center">
            <p className="text-lg font-medium">
              Estimated Annual Revenue Lift
            </p>
            <p className="text-3xl font-bold text-primary">
              ${(diagnostic.estimatedRevenueLift / 1000).toFixed(0)}k
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImpactMetrics;
