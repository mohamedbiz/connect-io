
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ImprovementRecommendationsProps {
  formName: string;
  tips: string[];
}

const ImprovementRecommendations = ({ formName, tips }: ImprovementRecommendationsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Improvement Recommendations</CardTitle>
        <CardDescription>
          Actionable tips to improve your {formName.toLowerCase()} conversion rate
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <ul className="space-y-3">
            {tips.map((tip, index) => (
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
  );
};

export default ImprovementRecommendations;
