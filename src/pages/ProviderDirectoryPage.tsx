import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Profile } from '@/types/auth';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Star, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RouteGuard from '@/components/auth/RouteGuard';
import FeaturedBadge from '@/components/ui/featured-badge';

const ProviderDirectoryPage = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch approved providers with featured status
  const { data: providers, isLoading } = useQuery({
    queryKey: ['providers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'provider')
        .eq('approved', true);

      if (error) throw error;
      return data as Profile[];
    },
  });

  // Filter and sort providers based on search term and featured status
  const { featuredProviders, regularProviders } = useMemo(() => {
    if (!providers) return { featuredProviders: [], regularProviders: [] };
    
    let filteredProviders = providers;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredProviders = providers.filter(provider => 
        provider.headline?.toLowerCase().includes(term) ||
        provider.approach_description?.toLowerCase().includes(term) ||
        provider.industries_served?.some(industry => 
          industry.toLowerCase().includes(term)
        ) ||
        provider.primary_esp?.toLowerCase().includes(term)
      );
    }

    const featured = filteredProviders.filter(provider => provider.is_featured);
    const regular = filteredProviders.filter(provider => !provider.is_featured);
    
    return { featuredProviders: featured, regularProviders: regular };
  }, [providers, searchTerm]);

  const handleProviderClick = (providerId: string) => {
    navigate(`/provider/${providerId}`);
  };

  // Only allow founders to access this page
  if (profile?.role !== 'founder') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">This page is only available to founders.</p>
        </div>
      </div>
    );
  }

  const ProviderCard = ({ provider, isFeatured = false }: { provider: Profile; isFeatured?: boolean }) => (
    <Card 
      className={`hover:shadow-lg transition-shadow cursor-pointer ${
        isFeatured ? 'ring-2 ring-yellow-400 border-yellow-200' : ''
      }`}
      onClick={() => handleProviderClick(provider.id)}
    >
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={provider.profile_picture_url} />
            <AvatarFallback>
              {provider.first_name?.[0]}{provider.last_name?.[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-lg">
                {provider.first_name} {provider.last_name}
              </h3>
              {provider.is_featured && <FeaturedBadge />}
            </div>
            <p className="text-sm text-gray-600">{provider.headline}</p>
          </div>
        </div>

        <div className="space-y-3">
          {provider.primary_esp && (
            <div>
              <span className="text-sm font-medium text-gray-700">Primary Platform:</span>
              <Badge variant="secondary" className="ml-2">
                {provider.primary_esp}
              </Badge>
            </div>
          )}

          {provider.years_experience && (
            <div>
              <span className="text-sm font-medium text-gray-700">Experience:</span>
              <span className="ml-2 text-sm text-gray-600">
                {provider.years_experience} years
              </span>
            </div>
          )}

          {provider.industries_served && provider.industries_served.length > 0 && (
            <div>
              <span className="text-sm font-medium text-gray-700">Industries:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {provider.industries_served.slice(0, 3).map((industry, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {industry}
                  </Badge>
                ))}
                {provider.industries_served.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{provider.industries_served.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <RouteGuard type="protected" allowedRoles={['founder']}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Provider Directory</h1>
          <p className="text-gray-600">Find the perfect email marketing expert for your business</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search providers by expertise, industry, or platform..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Providers Content */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                      <div className="h-3 bg-gray-200 rounded w-32"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {/* Featured Providers Section */}
            {featuredProviders.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <h2 className="text-xl font-semibold text-gray-900">Featured Providers</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {featuredProviders.map((provider) => (
                    <ProviderCard key={provider.id} provider={provider} isFeatured={true} />
                  ))}
                </div>
              </div>
            )}

            {/* Regular Providers Section */}
            {regularProviders.length > 0 && (
              <div>
                {featuredProviders.length > 0 && (
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">All Providers</h2>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regularProviders.map((provider) => (
                    <ProviderCard key={provider.id} provider={provider} />
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {featuredProviders.length === 0 && regularProviders.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No providers found</h3>
                <p className="text-gray-600">
                  {searchTerm ? 'Try adjusting your search terms' : 'No approved providers available yet'}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </RouteGuard>
  );
};

export default ProviderDirectoryPage;
