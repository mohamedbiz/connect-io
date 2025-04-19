
import { useState } from "react";
import { ServiceProvider } from "@/types/provider";
import ProvidersList from "./ProvidersList";
import ProvidersComparison from "./ProvidersComparison";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useProviders } from "@/hooks/useProviders";
import { Skeleton } from "@/components/ui/skeleton";

const ProvidersDirectory = () => {
  const { data: providers, isLoading, error } = useProviders();
  const [searchQuery, setSearchQuery] = useState("");
  const [compareProviders, setCompareProviders] = useState<ServiceProvider[]>([]);

  const handleCompare = (provider: ServiceProvider) => {
    if (compareProviders.length < 3 && !compareProviders.find(p => p.id === provider.id)) {
      setCompareProviders([...compareProviders, provider]);
    }
  };

  const handleRemoveComparison = (providerId: string) => {
    setCompareProviders(compareProviders.filter(p => p.id !== providerId));
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3].map((_, index) => (
            <Skeleton key={index} className="h-64 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error loading providers: {error.message}
      </div>
    );
  }

  const filteredProviders = providers?.filter(provider =>
    provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    provider.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  ) || [];

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search providers by name or specialty..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      <ProvidersComparison 
        providers={compareProviders} 
        onRemove={handleRemoveComparison} 
      />
      <ProvidersList 
        providers={filteredProviders} 
        onCompare={handleCompare} 
      />
    </div>
  );
};

export default ProvidersDirectory;
