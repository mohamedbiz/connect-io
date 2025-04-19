
import { ServiceProvider } from "@/types/provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Users } from "lucide-react";

interface ProvidersComparisonProps {
  providers: ServiceProvider[];
  onRemove: (providerId: string) => void;
}

const ProvidersComparison = ({ providers, onRemove }: ProvidersComparisonProps) => {
  if (providers.length === 0) {
    return null;
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Compare Providers</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Provider</TableHead>
              <TableHead>Specialties</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Projects</TableHead>
              <TableHead>Avg. Value</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {providers.map((provider) => (
              <TableRow key={provider.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <img src={provider.avatar} alt={provider.name} />
                    </Avatar>
                    <div>
                      <div className="font-medium">{provider.name}</div>
                      <div className="text-sm text-muted-foreground">{provider.title}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1 flex-wrap">
                    {provider.specialties.slice(0, 2).map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-primary" />
                    {provider.rating}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {provider.projectsCompleted}
                  </div>
                </TableCell>
                <TableCell>${provider.averageOrderValue}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" onClick={() => onRemove(provider.id)}>
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ProvidersComparison;
