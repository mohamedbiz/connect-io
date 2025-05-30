
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trophy, Award, Star, CheckCircle } from 'lucide-react';
import { ApplicationScore } from '@/services/providerApplicationAutomation';

interface ApplicationScoreIndicatorProps {
  score: ApplicationScore;
  className?: string;
}

const ApplicationScoreIndicator = ({ score, className = '' }: ApplicationScoreIndicatorProps) => {
  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'premium':
        return <Trophy className="h-4 w-4 text-yellow-500" />;
      case 'verified':
        return <Award className="h-4 w-4 text-blue-500" />;
      default:
        return <Star className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'premium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'verified':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getScoreColor = (scoreValue: number) => {
    if (scoreValue >= 85) return 'text-green-600';
    if (scoreValue >= 70) return 'text-yellow-600';
    if (scoreValue >= 50) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <Card className={`${className} bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200`}>
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Score Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg">Application Score</h3>
              {score.autoApproved && (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
            </div>
            <div className={`text-2xl font-bold ${getScoreColor(score.score)}`}>
              {score.score}/100
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress value={score.score} className="h-3" />
            <div className="flex justify-between text-xs text-gray-600">
              <span>0</span>
              <span className="font-medium">Auto-Approval: 85+</span>
              <span>100</span>
            </div>
          </div>

          {/* Tier and Status */}
          <div className="flex items-center gap-2 flex-wrap">
            <Badge 
              variant="outline" 
              className={`flex items-center gap-1 ${getTierColor(score.tier)}`}
            >
              {getTierIcon(score.tier)}
              {score.tier.charAt(0).toUpperCase() + score.tier.slice(1)} Tier
            </Badge>
            
            {score.autoApproved && (
              <Badge className="bg-green-100 text-green-800 border-green-200">
                Auto-Approval Eligible
              </Badge>
            )}
          </div>

          {/* Score Breakdown */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-gray-700">Score Breakdown:</h4>
            <div className="grid grid-cols-1 gap-2">
              {Object.entries(score.breakdown).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between text-sm">
                  <span className="capitalize text-gray-600">
                    {key.replace(/([A-Z])/g, ' $1').trim()}:
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((value / 50) * 100, 100)}%` }}
                      />
                    </div>
                    <span className="font-medium text-blue-600 w-8 text-right">
                      {value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips for Improvement */}
          {score.score < 85 && (
            <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-200">
              <h4 className="font-medium text-sm text-blue-800 mb-2">Tips to improve your score:</h4>
              <ul className="text-xs text-blue-700 space-y-1">
                {score.breakdown.caseStudies < 30 && (
                  <li>• Add more detailed case studies with specific results</li>
                )}
                {score.breakdown.portfolio === 0 && (
                  <li>• Include a portfolio URL to showcase your work</li>
                )}
                {score.breakdown.linkedin === 0 && (
                  <li>• Add your LinkedIn profile URL</li>
                )}
                {score.breakdown.guarantee === 0 && (
                  <li>• Consider offering a performance guarantee</li>
                )}
                {score.breakdown.expertise < 15 && (
                  <li>• Select more expertise areas that match your skills</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationScoreIndicator;
