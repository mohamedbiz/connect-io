
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface PaymentData {
  id: string;
  user_id: string;
  period_start: string;
  period_end: string;
  total_revenue: number;
  total_fees: number;
  transaction_count: number;
  updated_at: string;
}

const PaymentAnalytics = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [analyticsData, setAnalyticsData] = useState<PaymentData[]>([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!user) return;

      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from("payment_analytics")
          .select("*")
          .eq("user_id", user.id)
          .order("period_start", { ascending: false });

        if (error) {
          throw error;
        }

        setAnalyticsData(data || []);
      } catch (err) {
        console.error("Error fetching payment analytics:", err);
        setError("Failed to load payment analytics");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [user]);

  const formatChartData = () => {
    return analyticsData.map(item => ({
      name: new Date(item.period_start).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      revenue: item.total_revenue / 100, // Convert cents to dollars
      fees: item.total_fees / 100,
      transactions: item.transaction_count,
      net: (item.total_revenue - item.total_fees) / 100
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 text-[#2D82B7] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 text-center">
        {error}
      </div>
    );
  }

  if (analyticsData.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-[#0E3366]">No payment data available yet.</p>
      </div>
    );
  }

  // Calculate totals
  const totalRevenue = analyticsData.reduce((sum, item) => sum + item.total_revenue, 0) / 100;
  const totalFees = analyticsData.reduce((sum, item) => sum + item.total_fees, 0) / 100;
  const totalTransactions = analyticsData.reduce((sum, item) => sum + item.transaction_count, 0);
  const netRevenue = totalRevenue - totalFees;

  const chartData = formatChartData();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-[#2D82B7]/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#0E3366]">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#0A2342]">
              ${totalRevenue.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-[#2D82B7]/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#0E3366]">
              Platform Fees
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#0A2342]">
              ${totalFees.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-[#2D82B7]/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#0E3366]">
              Net Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#0A2342]">
              ${netRevenue.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-[#2D82B7]/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#0E3366]">
              Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#0A2342]">
              {totalTransactions}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-[#2D82B7]/30">
        <CardHeader>
          <CardTitle className="text-[#0A2342]">Monthly Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [`$${(value as number).toFixed(2)}`, name]}
                  labelFormatter={(label) => `Period: ${label}`}
                />
                <Bar dataKey="revenue" name="Revenue" fill="#2D82B7" />
                <Bar dataKey="fees" name="Fees" fill="#BFD7ED" />
                <Bar dataKey="net" name="Net" fill="#0A2342">
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#0A2342" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentAnalytics;
