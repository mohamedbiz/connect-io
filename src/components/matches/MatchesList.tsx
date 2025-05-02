
import { useMatches, Match } from "@/hooks/useMatches";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Check, X, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface MatchesListProps {
  onMessageClick?: (match: Match) => void;
}

const MatchesList = ({ onMessageClick }: MatchesListProps) => {
  const { matches, isLoading, updateMatchStatus } = useMatches();
  const { user, profile } = useAuth();

  const isProvider = profile?.role === "provider";

  const handleAccept = (matchId: string) => {
    updateMatchStatus({ matchId, status: "accepted" });
    toast.success("Match request accepted");
  };

  const handleDecline = (matchId: string) => {
    updateMatchStatus({ matchId, status: "declined" });
    toast.success("Match request declined");
  };

  const handleMessageClick = (match: Match) => {
    if (onMessageClick) {
      onMessageClick(match);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading matches...</div>;
  }

  if (matches.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">No matches found</p>
          {isProvider ? (
            <p className="text-sm text-muted-foreground mt-1">
              When founders request to work with you, they'll appear here
            </p>
          ) : (
            <p className="text-sm text-muted-foreground mt-1">
              Start connecting with providers to get matches
            </p>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {matches.map((match) => {
        // Get other party info based on user role
        const otherParty = isProvider ? match.founder : match.provider;
        const isPending = match.status === "pending";
        const isAccepted = match.status === "accepted";
        const isDeclined = match.status === "declined";
        const canMessage = isAccepted;

        if (!otherParty) return null;

        return (
          <Card key={match.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12 border">
                    <AvatarImage
                      src={otherParty?.avatar_url || ""}
                      alt={otherParty?.name || "User"}
                    />
                    <AvatarFallback>
                      {(otherParty?.name || "").substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{otherParty?.name}</h3>
                      <Badge
                        variant={
                          isPending
                            ? "outline"
                            : isAccepted
                            ? "success"
                            : "destructive"
                        }
                        className="capitalize"
                      >
                        {match.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {/* Fix the type issue by using type guards */}
                      {isProvider 
                        ? (otherParty as any).business_name || "" 
                        : (otherParty as any).expertise || ""}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Matched: {format(new Date(match.created_at || ""), "MMM d, yyyy")}
                    </p>
                  </div>
                </div>

                {match.message && (
                  <div className="mt-3 bg-muted/50 p-3 rounded-md">
                    <p className="text-sm italic">"{match.message}"</p>
                  </div>
                )}
              </div>

              <Separator />

              <div className="p-3 bg-muted/30 flex justify-end space-x-2">
                {isProvider && isPending && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDecline(match.id)}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Decline
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleAccept(match.id)}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Accept
                    </Button>
                  </>
                )}

                {canMessage && (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleMessageClick(match)}
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Message
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default MatchesList;
