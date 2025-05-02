
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MatchesList from "@/components/matches/MatchesList";

const MatchesTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold text-[#0A2342]">Client Connection Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <MatchesList />
      </CardContent>
    </Card>
  );
};

export default MatchesTab;
