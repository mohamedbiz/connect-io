
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { SequenceStep } from "@/types/post-purchase-diagnostics";
import SequenceStatusBadges from "./SequenceStatusBadges";
import SequenceRecommendations from "./SequenceRecommendations";

interface SequenceItemProps {
  sequence: SequenceStep;
}

const SequenceItem = ({ sequence }: SequenceItemProps) => {
  return (
    <Card className="overflow-hidden border shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-5">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-medium">{sequence.name}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {sequence.description}
              </p>
            </div>
            <SequenceStatusBadges status={sequence.status} impact={sequence.impact} />
          </div>
          
          <SequenceRecommendations 
            recommendations={sequence.recommendations}
            expectedLift={sequence.expectedLift}
          />

          <Button variant="outline" className="w-full" asChild>
            <a href="#providers">
              Find Email Sequence Specialists
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SequenceItem;
