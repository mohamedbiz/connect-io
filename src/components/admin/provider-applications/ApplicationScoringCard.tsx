
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Star, Award, CheckCircle } from "lucide-react";

interface ApplicationScoringCardProps {
  application: any;
}

const ApplicationScoringCard = ({ application }: ApplicationScoringCardProps) => {
  if (!application.automated_score) return null;

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    if (score >= 60) return "text-orange-600";
    return "text-red-600";
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'premium':
        return "bg-yellow-100 text-yellow-800";
      case 'verified':
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'premium':
        return <Award className="h-4 w-4" />;
      case 'verified':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Star className="h-4 w-4" />;
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Star className="h-4 w-4 text-yellow-500" />
          Automated Assessment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Score</span>
          <span className={`text-xl font-bold ${getScoreColor(application.automated_score)}`}>
            {application.automated_score}/100
          </span>
        </div>
        
        <Progress value={application.automated_score} className="h-2" />
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Tier</span>
          <Badge variant="outline" className={`flex items-center gap-1 ${getTierColor(application.approval_tier)}`}>
            {getTierIcon(application.approval_tier)}
            {application.approval_tier?.charAt(0).toUpperCase() + application.approval_tier?.slice(1)}
          </Badge>
        </div>

        {application.auto_approved && (
          <Badge className="w-full justify-center bg-green-100 text-green-800">
            Auto-Approved
          </Badge>
        )}
      </CardContent>
    </Card>
  );
};

export default ApplicationScoringCard;
