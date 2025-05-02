
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MatchesList from "@/components/matches/MatchesList";
import { Bell } from "lucide-react";
import { useMessages } from '@/hooks/useMessages';
import UnreadBadge from '@/components/messaging/UnreadBadge';
import MessageDialog from '@/components/messaging/MessageDialog';
import { Match } from '@/hooks/useMatches';

const MatchesTab = () => {
  const { unreadCount } = useMessages();
  const [activeMatch, setActiveMatch] = useState<Match | null>(null);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);

  const handleOpenMessageDialog = (match: Match) => {
    setActiveMatch(match);
    setMessageDialogOpen(true);
  };

  return (
    <Card className="border border-[#2D82B7]/30 transition-all duration-300 hover:border-[#2D82B7]">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-bold text-[#0A2342]">Client Connection Requests</CardTitle>
          <p className="text-sm text-[#0E3366] mt-1">
            Manage and respond to clients interested in your services
          </p>
        </div>
        <div className="relative">
          <Bell className="h-6 w-6 text-[#2D82B7]" />
          <UnreadBadge count={unreadCount} />
        </div>
      </CardHeader>
      <CardContent>
        <MatchesList onMessageClick={handleOpenMessageDialog} />
        <MessageDialog 
          match={activeMatch} 
          open={messageDialogOpen} 
          onOpenChange={setMessageDialogOpen} 
        />
      </CardContent>
    </Card>
  );
};

export default MatchesTab;
