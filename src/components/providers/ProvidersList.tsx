
import { ServiceProvider } from "@/types/provider";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProvidersListProps {
  providers: ServiceProvider[];
  onCompare: (provider: ServiceProvider) => void;
}

const ProvidersList = ({ providers, onCompare }: ProvidersListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {providers.map((provider) => (
        <Card key={provider.id}>
          <CardHeader>
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12">
                <img src={provider.avatar} alt={provider.name} />
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold">{provider.name}</h3>
                <p className="text-sm text-muted-foreground">{provider.title}</p>
              </div>
              <Button variant="outline" onClick={() => onCompare(provider)}>
                Compare
              </Button>
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
              </div>
              <p className="text-sm">{provider.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProvidersList;
