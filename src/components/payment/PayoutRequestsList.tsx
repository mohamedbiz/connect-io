
import { useState, useEffect } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface PayoutRequest {
  id: string;
  provider_id: string;
  amount: number;
  status: string;
  requested_at: string;
  processed_at: string | null;
  notes: string | null;
}

const PayoutRequestsList = () => {
  const { user } = useAuth();
  const [payoutRequests, setPayoutRequests] = useState<PayoutRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    const fetchPayoutRequests = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from("payout_requests")
          .select("*")
          .eq("provider_id", user.id)
          .order("requested_at", { ascending: false });
          
        if (error) {
          throw error;
        }
        
        setPayoutRequests(data || []);
      } catch (error) {
        console.error("Error fetching payout requests:", error);
        toast.error("Failed to load payout requests");
      } finally {
        setLoading(false);
      }
    };
    
    fetchPayoutRequests();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('payout_requests_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'payout_requests',
          filter: `provider_id=eq.${user.id}`
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setPayoutRequests(prev => [payload.new as PayoutRequest, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setPayoutRequests(prev => 
              prev.map(request => 
                request.id === payload.new.id ? payload.new as PayoutRequest : request
              )
            );
          } else if (payload.eventType === 'DELETE') {
            setPayoutRequests(prev => 
              prev.filter(request => request.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending</Badge>;
      case 'approved':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Approved</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Completed</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Rejected</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-6">
        <Loader2 className="h-8 w-8 text-[#2D82B7] animate-spin" />
      </div>
    );
  }

  if (!payoutRequests.length) {
    return (
      <div className="text-center p-6 text-[#0E3366]">
        No payout requests found. Use the form to request a payout.
      </div>
    );
  }

  return (
    <div className="border rounded-md border-[#2D82B7]/30">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payoutRequests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>
                {new Date(request.requested_at).toLocaleDateString()}
              </TableCell>
              <TableCell>${(request.amount / 100).toFixed(2)}</TableCell>
              <TableCell>{getStatusBadge(request.status)}</TableCell>
              <TableCell>{request.notes || '—'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PayoutRequestsList;
