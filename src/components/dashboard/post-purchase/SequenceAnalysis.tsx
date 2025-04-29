
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SequenceStep } from "@/types/post-purchase-diagnostics";
import SequenceItem from "./SequenceItem";

interface SequenceAnalysisProps {
  sequences: SequenceStep[];
}

const SequenceAnalysis = ({ sequences }: SequenceAnalysisProps) => {
  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle>Sequence Analysis</CardTitle>
        <CardDescription>
          Review and optimize your post-purchase email sequences
        </CardDescription>
      </CardHeader>
      <CardContent className="equal-height-body">
        <div className="space-y-6">
          {sequences.map((sequence) => (
            <SequenceItem key={sequence.id} sequence={sequence} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SequenceAnalysis;
