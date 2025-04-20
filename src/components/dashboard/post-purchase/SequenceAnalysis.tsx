
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SequenceStep } from "@/types/post-purchase-diagnostics";

interface SequenceAnalysisProps {
  sequences: SequenceStep[];
}

const SequenceAnalysis = ({ sequences }: SequenceAnalysisProps) => {
  const getStatusColor = (status: SequenceStep['status']) => {
    switch (status) {
      case 'advanced':
        return 'bg-green-500/10 text-green-500';
      case 'basic':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'missing':
        return 'bg-red-500/10 text-red-500';
      default:
        return '';
    }
  };

  const getImpactColor = (impact: SequenceStep['impact']) => {
    switch (impact) {
      case 'high':
        return 'bg-purple-500/10 text-purple-500';
      case 'medium':
        return 'bg-blue-500/10 text-blue-500';
      case 'low':
        return 'bg-slate-500/10 text-slate-500';
      default:
        return '';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sequence Analysis</CardTitle>
        <CardDescription>
          Review and optimize your post-purchase email sequences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {sequences.map((sequence) => (
            <div key={sequence.id} className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium">{sequence.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {sequence.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Badge variant="secondary" className={getStatusColor(sequence.status)}>
                    {sequence.status}
                  </Badge>
                  <Badge variant="secondary" className={getImpactColor(sequence.impact)}>
                    {sequence.impact} impact
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Expected Impact:</p>
                <p className="text-sm text-muted-foreground">{sequence.expectedLift}</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Recommendations:</p>
                <ul className="space-y-1">
                  {sequence.recommendations.map((rec, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      • {rec}
                    </li>
                  ))}
                </ul>
              </div>

              <Button variant="outline" className="w-full" asChild>
                <a href="#providers">
                  Find Email Sequence Specialists
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SequenceAnalysis;
