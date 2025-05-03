
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface QualificationStatus {
  isQualified: boolean;
  isLoading: boolean;
  error: Error | null;
  qualificationData: any | null;
}

export const useQualificationStatus = (): QualificationStatus => {
  const { user } = useAuth();
  const [isQualified, setIsQualified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [qualificationData, setQualificationData] = useState<any | null>(null);

  useEffect(() => {
    const checkQualification = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        // Use maybeSingle instead of single to handle cases where no record exists
        const { data, error: fetchError } = await supabase
          .from('founder_onboarding')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (fetchError) {
          throw fetchError;
        }

        // If no data exists, create a default record
        if (!data) {
          console.log('No qualification data found, creating default record');
          
          const { data: newData, error: insertError } = await supabase
            .from('founder_onboarding')
            .insert({
              user_id: user.id,
              qualification_completed: false,
              acquisition_completed: false
            })
            .select('*')
            .single();

          if (insertError) {
            throw insertError;
          }

          setQualificationData(newData);
          setIsQualified(false);
        } else {
          setQualificationData(data);
          setIsQualified(data?.qualification_completed || false);
        }
      } catch (err) {
        console.error('Error checking qualification status:', err);
        setError(err instanceof Error ? err : new Error('Unknown error checking qualification'));
        // Ensure we still update loading state even when error occurs
        toast.error('Error checking qualification status');
      } finally {
        setIsLoading(false);
      }
    };

    checkQualification();
  }, [user]);

  return {
    isQualified,
    isLoading,
    error,
    qualificationData
  };
};
