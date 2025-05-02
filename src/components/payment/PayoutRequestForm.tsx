
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface PayoutFormData {
  amount: number;
}

const PayoutRequestForm = () => {
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState(false);

  const form = useForm<PayoutFormData>({
    defaultValues: {
      amount: 0,
    },
  });

  const onSubmit = async (data: PayoutFormData) => {
    if (!user || !profile || profile.role !== "provider") {
      toast.error("Only providers can request payouts");
      return;
    }

    if (data.amount <= 0) {
      toast.error("Amount must be greater than zero");
      return;
    }

    setLoading(true);
    try {
      // Convert dollars to cents for storage
      const amountInCents = Math.round(data.amount * 100);
      
      const { error } = await supabase.from("payout_requests").insert({
        provider_id: user.id,
        amount: amountInCents,
        status: "pending",
      });

      if (error) {
        throw error;
      }

      toast.success("Payout request submitted successfully");
      form.reset({ amount: 0 });
    } catch (error) {
      console.error("Error submitting payout request:", error);
      toast.error("Failed to submit payout request");
    } finally {
      setLoading(false);
    }
  };

  if (!user || !profile || profile.role !== "provider") {
    return (
      <div className="text-center p-4">
        <p className="text-[#0E3366]">Only providers can request payouts.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-[#2D82B7]/30">
      <h3 className="text-xl font-semibold mb-4 text-[#0A2342]">Request Payout</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#0E3366]">Amount ($)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="Enter amount in dollars"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="bg-[#2D82B7] hover:bg-[#3D9AD1] w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Request"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PayoutRequestForm;
