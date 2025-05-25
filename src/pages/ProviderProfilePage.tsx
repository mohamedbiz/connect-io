
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Profile } from '@/types/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, MessageCircle, ExternalLink, Star, Clock, Building } from 'lucide-react';
import { toast } from 'sonner';
import FeaturedBadge from '@/components/ui/featured-badge';

const ProviderProfilePage = () => {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const { profile } = useAuth();

  // Fetch provider profile
  const { data: provider, isLoading } = useQuery({
    queryKey: ['provider', providerId],
    queryFn: async () => {
      if (!providerId) throw new Error('Provider ID is required');
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', providerId)
        .eq('role', 'provider')
        .eq('approved', true)
        .single();

      if (error) throw error;
      return data as Profile;
    },
    enabled: !!providerId,
  });

  const handleSendMessage = async () => {
    if (!provider || !profile) return;

    try {
      // Check if conversation already exists
      const { data: existingConversation } = await supabase
        .from('conversations')
        .select('id')
        .eq('founder_id', profile.id)
        .eq('provider_id', provider.id)
        .single();

      if (existingConversation) {
        // Navigate to existing conversation
        navigate(`/messages/${existingConversation.id}`);
      } else {
        // Create new conversation
        const { data: newConversation, error } = await supabase
          .from('conversations')
          .insert({
            founder_id: profile.id,
            provider_id: provider.id
          })
          .select('id')
          .single();

        if (error) throw error;

        toast.success('Conversation started!');
        navigate(`/messages/${newConversation.id}`);
      }
    } catch (error) {
      console.error('Error creating conversation:', error);
      toast.error('Failed to start conversation');
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
            <div className="space-y-6">
              <div className="h-48 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Provider Not Found</h1>
          <p className="text-gray-600">The provider you're looking for doesn't exist or isn't approved.</p>
          <Button onClick={() => navigate('/providers')} className="mt-4">
            Back to Directory
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        onClick={() => navigate('/providers')}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Directory
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Header */}
          <Card className={provider.is_featured ? 'ring-2 ring-yellow-400 border-yellow-200' : ''}>
            <CardContent className="p-6">
              <div className="flex items-start space-x-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={provider.profile_picture_url} />
                  <AvatarFallback className="text-2xl">
                    {provider.first_name?.[0]}{provider.last_name?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">
                      {provider.first_name} {provider.last_name}
                    </h1>
                    {provider.is_featured && <FeaturedBadge size="md" />}
                  </div>
                  {provider.headline && (
                    <h2 className="text-xl text-gray-600 mb-4">{provider.headline}</h2>
                  )}
                  
                  <div className="flex flex-wrap gap-4 mb-4">
                    {provider.years_experience && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        {provider.years_experience} years experience
                      </div>
                    )}
                    {provider.primary_esp && (
                      <Badge variant="secondary">
                        Primary: {provider.primary_esp}
                      </Badge>
                    )}
                  </div>

                  {/* Send Message Button - Only for founders */}
                  {profile?.role === 'founder' && (
                    <Button onClick={handleSendMessage} className="mt-4">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Approach & Results */}
          {provider.approach_description && (
            <Card>
              <CardHeader>
                <CardTitle>Approach & Results</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {provider.approach_description}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Portfolio Link */}
          {provider.portfolio_url && (
            <Card>
              <CardHeader>
                <CardTitle>Portfolio & Case Studies</CardTitle>
              </CardHeader>
              <CardContent>
                <a 
                  href={provider.portfolio_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:underline"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Portfolio & Case Studies
                </a>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Industries Served */}
          {provider.industries_served && provider.industries_served.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Industries Served</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {provider.industries_served.map((industry, index) => (
                    <Badge key={index} variant="outline">
                      {industry}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Platform Expertise */}
          {provider.primary_esp && (
            <Card>
              <CardHeader>
                <CardTitle>Platform Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>{provider.primary_esp}</span>
                    <Badge>Primary</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Contact Card for Founders */}
          {profile?.role === 'founder' && (
            <Card>
              <CardHeader>
                <CardTitle>Ready to Connect?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Start a conversation with {provider.first_name} to discuss your email marketing needs.
                </p>
                <Button onClick={handleSendMessage} className="w-full">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProviderProfilePage;
