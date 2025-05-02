
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const PaymentStatusChecker = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState<string>("checking");
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkPaymentStatus = async () => {
      if (!sessionId) {
        setStatus("error");
        setLoading(false);
        toast.error("No payment session ID found");
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke("verify-payment", {
          body: { sessionId },
        });

        if (error) {
          console.error("Payment verification error:", error);
          setStatus("error");
          toast.error("Failed to verify payment status");
          return;
        }

        setStatus(data.status || "unknown");
        
        if (data.success) {
          toast.success("Payment completed successfully");
        } else if (data.status === "pending") {
          toast.info("Payment is still processing");
        } else {
          toast.error("Payment failed or was canceled");
        }
      } catch (error) {
        console.error("Verification error:", error);
        setStatus("error");
        toast.error("Error checking payment status");
      } finally {
        setLoading(false);
      }
    };

    checkPaymentStatus();
  }, [sessionId]);

  const getStatusMessage = () => {
    switch (status) {
      case "completed":
        return "Payment completed successfully!";
      case "pending":
        return "Payment is being processed...";
      case "failed":
        return "Payment failed. Please try again.";
      case "error":
        return "Error checking payment status.";
      default:
        return "Checking payment status...";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center text-[#0A2342]">
          {loading ? "Verifying Payment" : "Payment Status"}
        </h2>
        
        <div className="flex flex-col items-center justify-center py-6">
          {loading ? (
            <Loader2 className="h-12 w-12 text-[#2D82B7] animate-spin" />
          ) : (
            <div className={`text-center p-4 rounded-md ${
              status === "completed" 
                ? "bg-green-100 text-green-800" 
                : status === "pending" 
                ? "bg-yellow-100 text-yellow-800" 
                : "bg-red-100 text-red-800"
            }`}>
              {getStatusMessage()}
            </div>
          )}
        </div>
        
        <div className="flex flex-col space-y-4 mt-4">
          {!loading && (
            <>
              <Button
                onClick={() => navigate(status === "completed" ? "/founder-dashboard" : "/")}
                className="bg-[#2D82B7] hover:bg-[#3D9AD1]"
              >
                {status === "completed" ? "Go to Dashboard" : "Return Home"}
              </Button>
              
              {status !== "completed" && (
                <Button
                  variant="outline"
                  onClick={() => navigate("/founder-dashboard")}
                  className="border-[#2D82B7] text-[#2D82B7]"
                >
                  Go to Dashboard
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentStatusChecker;
