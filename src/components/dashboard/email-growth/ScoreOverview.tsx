
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Mail } from "lucide-react";

interface ScoreOverviewProps {
  data: {
    overallScore: number;
    currentConversionRate: number;
    industryAverage: number;
    potentialConversionRate: number;
    estimatedListGrowth: number;
  };
}

const ScoreOverview = ({ data }: ScoreOverviewProps) => {
  return (
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
              <span>Overall Score: {data.overallScore}/100</span>
              <span className="text-muted-foreground">Room for improvement</span>
            </div>
            <Progress value={data.overallScore} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-secondary/30 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground">Current Conversion</p>
              <p className="text-2xl font-bold">{data.currentConversionRate}%</p>
            </div>
            <div className="bg-secondary/30 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground">Industry Average</p>
              <p className="text-2xl font-bold">{data.industryAverage}%</p>
            </div>
            <div className="bg-primary/10 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground">Potential Rate</p>
              <p className="text-2xl font-bold text-primary">{data.potentialConversionRate}%</p>
            </div>
          </div>
          <div className="mt-4 p-4 border border-dashed border-primary/50 rounded-lg bg-primary/5 text-center">
            <p className="text-sm text-muted-foreground">Estimated Monthly List Growth with Improvements</p>
            <div className="flex items-center justify-center gap-2 mt-1">
              <Mail className="h-5 w-5 text-primary" />
              <p className="text-2xl font-bold text-primary">+{data.estimatedListGrowth} subscribers/month</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScoreOverview;
