
import { useState } from "react";
import { Match, useMatches } from "@/hooks/useMatches";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter 
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, CheckCircle, Clock, MessageCircle, X, XCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

const MatchesList = () => {
  const { user, profile } = useAuth();
  const { matches, isLoading, updateMatchStatus } = useMatches();
  const [currentTab, setCurrentTab] = useState<'pending' | 'accepted' | 'declined'>('pending');
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  
  const isProvider = profile?.role === 'provider';
  
  const pendingMatches = matches.filter(m => m.status === 'pending');
  const acceptedMatches = matches.filter(m => m.status === 'accepted');
  const declinedMatches = matches.filter(m => m.status === 'declined');

  const handleViewMessage = (match: Match) => {
    setSelectedMatch(match);
    setShowMessageDialog(true);
  };
  
  const handleUpdateStatus = (matchId: string, status: 'accepted' | 'declined') => {
    updateMatchStatus({ matchId, status });
  };
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    );
  }
  
  if (matches.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <p className="text-muted-foreground">
            {isProvider 
              ? "You haven't received any connection requests yet." 
              : "You haven't sent any connection requests to providers yet."
            }
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <>
      <Tabs defaultValue="pending" value={currentTab} onValueChange={(v) => setCurrentTab(v as any)}>
        <TabsList className="mb-4">
          <TabsTrigger value="pending">
            Pending <Badge variant="outline" className="ml-2">{pendingMatches.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="accepted">
            Accepted <Badge variant="outline" className="ml-2">{acceptedMatches.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="declined">
            Declined <Badge variant="outline" className="ml-2">{declinedMatches.length}</Badge>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="space-y-4">
          {pendingMatches.length === 0 ? (
            <Card className="text-center py-6">
              <CardContent>
                <p className="text-muted-foreground">No pending requests</p>
              </CardContent>
            </Card>
          ) : (
            pendingMatches.map(match => (
              <MatchCard 
                key={match.id} 
                match={match}
                isProvider={isProvider}
                onViewMessage={handleViewMessage}
                onUpdateStatus={handleUpdateStatus}
              />
            ))
          )}
        </TabsContent>
        
        <TabsContent value="accepted" className="space-y-4">
          {acceptedMatches.length === 0 ? (
            <Card className="text-center py-6">
              <CardContent>
                <p className="text-muted-foreground">No accepted connections</p>
              </CardContent>
            </Card>
          ) : (
            acceptedMatches.map(match => (
              <MatchCard 
                key={match.id} 
                match={match}
                isProvider={isProvider}
                onViewMessage={handleViewMessage}
                onUpdateStatus={handleUpdateStatus}
              />
            ))
          )}
        </TabsContent>
        
        <TabsContent value="declined" className="space-y-4">
          {declinedMatches.length === 0 ? (
            <Card className="text-center py-6">
              <CardContent>
                <p className="text-muted-foreground">No declined connections</p>
              </CardContent>
            </Card>
          ) : (
            declinedMatches.map(match => (
              <MatchCard 
                key={match.id} 
                match={match}
                isProvider={isProvider}
                onViewMessage={handleViewMessage}
                onUpdateStatus={handleUpdateStatus}
              />
            ))
          )}
        </TabsContent>
      </Tabs>
      
      <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Message</DialogTitle>
            <DialogDescription>
              {isProvider ? "Message from founder" : "Your message to the provider"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 border rounded-md p-4 bg-slate-50">
            {selectedMatch?.message || <em className="text-muted-foreground">No message included</em>}
          </div>
          
          <DialogFooter>
            <Button onClick={() => setShowMessageDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

interface MatchCardProps {
  match: Match;
  isProvider: boolean;
  onViewMessage: (match: Match) => void;
  onUpdateStatus: (matchId: string, status: 'accepted' | 'declined') => void;
}

const MatchCard = ({ match, isProvider, onViewMessage, onUpdateStatus }: MatchCardProps) => {
  // Determine who to display based on user role
  const displayName = isProvider 
    ? match.founder?.name || "Unknown Founder"
    : match.provider?.name || "Unknown Provider";
    
  const isPending = match.status === 'pending';
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <img 
                src={isProvider 
                  ? match.founder?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}`
                  : match.provider?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}`
                } 
                alt={displayName} 
              />
            </Avatar>
            <div>
              <CardTitle className="text-base">{displayName}</CardTitle>
              <CardDescription>
                {isProvider 
                  ? (match.founder?.business_name || "Founder") 
                  : (match.provider?.expertise || "Provider")}
              </CardDescription>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {match.status === 'pending' && (
              <Badge variant="outline" className="flex gap-1 items-center">
                <Clock className="h-3 w-3" />
                Pending
              </Badge>
            )}
            {match.status === 'accepted' && (
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100 flex gap-1 items-center">
                <CheckCircle className="h-3 w-3" />
                Accepted
              </Badge>
            )}
            {match.status === 'declined' && (
              <Badge variant="destructive" className="flex gap-1 items-center">
                <XCircle className="h-3 w-3" />
                Declined
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <CalendarIcon className="mr-1 h-3 w-3" />
          <span>Request sent {formatDistanceToNow(new Date(match.created_at), { addSuffix: true })}</span>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <Button 
            variant="ghost" 
            size="sm"
            className="flex gap-1 items-center"
            onClick={() => onViewMessage(match)} 
          >
            <MessageCircle className="h-4 w-4" />
            {match.message ? "View Message" : "No Message"}
          </Button>
          
          {isPending && isProvider && (
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="flex gap-1 items-center"
                onClick={() => onUpdateStatus(match.id, 'declined')} 
              >
                <X className="h-4 w-4" />
                Decline
              </Button>
              <Button 
                variant="default" 
                size="sm"
                className="flex gap-1 items-center"
                onClick={() => onUpdateStatus(match.id, 'accepted')} 
              >
                <CheckCircle className="h-4 w-4" />
                Accept
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchesList;
