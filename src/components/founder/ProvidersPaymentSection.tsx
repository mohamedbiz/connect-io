
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import ProviderPaymentCard from "@/components/payment/ProviderPaymentCard";
import { Loader2 } from "lucide-react";

interface Provider {
  id: string;
  user_id: string;
  name: string;
  title?: string;
  description?: string;
  avatar?: string;
  specialties?: string[];
  expertise?: any;
}

const ProvidersPaymentSection = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("providers")
          .select("*")
          .limit(4);

        if (error) {
          throw error;
        }

        setProviders(data || []);
      } catch (error) {
        console.error("Error fetching providers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 text-[#2D82B7] animate-spin" />
      </div>
    );
  }

  if (providers.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-[#0E3366]">No providers found. Check back later!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {providers.map((provider) => (
        <ProviderPaymentCard
          key={provider.id}
          id={provider.user_id}
          name={provider.name}
          title={provider.title || "Email Marketing Specialist"}
          description={provider.description || "Professional email marketing services."}
          avatarUrl={provider.avatar}
          expertise={provider.specialties || []}
          amount={9900} // $99 in cents
        />
      ))}
    </div>
  );
};

export default ProvidersPaymentSection;
