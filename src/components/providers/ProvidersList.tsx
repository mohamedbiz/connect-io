
import { useState } from "react";
import { ServiceProvider } from "@/types/provider";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useMatches } from "@/hooks/useMatches";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter 
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import FeaturedBadge from "@/components/ui/featured-badge";

interface ProvidersListProps {
  providers: ServiceProvider[];
  onCompare: (provider: ServiceProvider) => void;
}

const ProvidersList = ({ providers, onCompare }: ProvidersListProps) => {
  const { user, profile } = useAuth();
  const { createMatch, matches, isCreating } = useMatches();
  const [connectDialogOpen, setConnectDialogOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);
  const [message, setMessage] = useState("");

  const isFounder = profile?.role === 'founder';
  
  // Check if already matched with provider
  const isMatched = (providerId: string) => {
    return matches.some(match => match.provider_id === providerId);
  };

  const handleConnectClick = (provider: ServiceProvider) => {
    if (!user) {
      toast.error("Please sign in to connect with providers");
      return;
    }
    
    setSelectedProvider(provider);
    setConnectDialogOpen(true);
  };

  const handleSendRequest = () => {
    if (!selectedProvider) return;
    
    createMatch({
      providerId: selectedProvider.id,
      message: message.trim() || undefined
    });
    
    setConnectDialogOpen(false);
    setMessage("");
    setSelectedProvider(null);
  };

  // Sort providers with featured ones first
  const sortedProviders = [...providers].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedProviders.map((provider) => {
          const alreadyMatched = isMatched(provider.id);
          
          return (
            <Card 
              key={provider.id}
              className={provider.featured ? 'ring-2 ring-yellow-400 border-yellow-200' : ''}
            >
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <img src={provider.avatar} alt={provider.name} />
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{provider.name}</h3>
                      {provider.featured && <FeaturedBadge />}
                    </div>
                    <p className="text-sm text-muted-foreground">{provider.title}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => onCompare(provider)}>
                      Compare
                    </Button>
                    {isFounder && (
                      <Button 
                        variant={alreadyMatched ? "secondary" : "default"}
                        onClick={() => handleConnectClick(provider)}
                        disabled={alreadyMatched || isCreating}
                      >
                        {alreadyMatched ? "Connected" : "Connect"}
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-2 flex-wrap">
                    {provider.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-primary" />
                      <span>{provider.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{provider.projectsCompleted} projects</span>
                    </div>
                    {provider.averageOrderValue && (
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        <span>${provider.averageOrderValue} avg. value</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm">{provider.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog open={connectDialogOpen} onOpenChange={setConnectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect with {selectedProvider?.name}</DialogTitle>
            <DialogDescription>
              Send a message to start a conversation about your project needs.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Textarea
              placeholder="Tell the provider about your project and what you're looking for..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[120px]"
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setConnectDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendRequest} disabled={isCreating}>
              Send Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProvidersList;
