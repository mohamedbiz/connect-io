
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface PaymentButtonProps {
  amount: number;
  providerId?: string;
  description?: string;
  className?: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
}

const PaymentButton = ({
  amount,
  providerId,
  description = "Service payment",
  className = "",
  variant = "default",
}: PaymentButtonProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!user) {
      toast.error("Please log in to make a payment");
      return;
    }

    setLoading(true);
    try {
      // Call the create-payment edge function
      const { data, error } = await supabase.functions.invoke("create-payment", {
        body: {
          amount,
          providerId,
          description,
        },
      });

      if (error) {
        console.error("Payment initiation error:", error);
        toast.error("Failed to initiate payment");
        return;
      }

      if (data?.url) {
        // Redirect to Stripe checkout
        window.location.href = data.url;
      } else {
        toast.error("Invalid payment response");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment processing error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={loading || !user}
      className={className}
      variant={variant}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        `Pay $${(amount / 100).toFixed(2)}`
      )}
    </Button>
  );
};

export default PaymentButton;
