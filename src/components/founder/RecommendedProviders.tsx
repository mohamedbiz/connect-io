
import React from 'react';
import { useRecommendations } from '@/hooks/useRecommendations';
import { recommendationEngine } from '@/services/recommendationEngine';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, ExternalLink, MessageCircle } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

const RecommendedProviders = () => {
  const { recommendations, loading, error, refreshRecommendations } = useRecommendations();

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            AI-Recommended Providers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-8">
            <LoadingSpinner />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            AI-Recommended Providers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">Failed to load recommendations</p>
            <Button onClick={refreshRecommendations} variant="outline">
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (recommendations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            AI-Recommended Providers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">
              Complete your profile to get personalized provider recommendations
            </p>
            <Button onClick={refreshRecommendations} variant="outline">
              Refresh Recommendations
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500" />
          AI-Recommended Providers
        </CardTitle>
        <p className="text-sm text-gray-600">
          Based on your business profile and needs
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((recommendation) => {
            const provider = recommendation.provider;
            if (!provider) return null;

            return (
              <div
                key={recommendation.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={provider.avatar_url} />
                    <AvatarFallback>
                      {provider.first_name?.[0]}{provider.last_name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">
                        {provider.first_name} {provider.last_name}
                      </h3>
                      <Badge variant="secondary" className="text-sm">
                        {recommendation.match_score}% match
                      </Badge>
                      {provider.is_featured && (
                        <Badge variant="default" className="bg-yellow-500">
                          Featured
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-2">{provider.headline}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {recommendation.reason_codes.map((reasonCode) => (
                        <Badge key={reasonCode} variant="outline" className="text-xs">
                          {recommendationEngine.getReasonDescription(reasonCode)}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="default">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Connect
                      </Button>
                      {provider.portfolio_url && (
                        <Button size="sm" variant="outline" asChild>
                          <a
                            href={provider.portfolio_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Portfolio
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 pt-4 border-t">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Showing top {recommendations.length} recommendations
            </p>
            <Button onClick={refreshRecommendations} variant="outline" size="sm">
              Refresh
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendedProviders;
