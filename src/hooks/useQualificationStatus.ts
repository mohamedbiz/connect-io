
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
  const { user, profile } = useAuth();
  const [isQualified, setIsQualified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [qualificationData, setQualificationData] = useState<any | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let isMounted = true;
    
    const checkQualification = async () => {
      if (!user || !profile) {
        if (isMounted) {
          setIsLoading(false);
        }
        return;
      }

      try {
        console.log(`Checking qualification for user ${user.id}, attempt ${retryCount + 1}`);
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

          if (isMounted) {
            setQualificationData(newData);
            setIsQualified(false);
            setError(null);
          }
        } else {
          if (isMounted) {
            setQualificationData(data);
            setIsQualified(data?.qualification_completed || false);
            setError(null);
          }
        }
      } catch (err) {
        console.error('Error checking qualification status:', err);
        
        // Retry logic with exponential backoff
        if (retryCount < 2 && isMounted) {
          const delay = Math.min(1000 * (2 ** retryCount), 3000);
          console.log(`Retrying qualification check in ${delay}ms...`);
          
          setTimeout(() => {
            if (isMounted) {
              setRetryCount(prev => prev + 1);
              checkQualification();
            }
          }, delay);
          return;
        }
        
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Unknown error checking qualification'));
          // Ensure we still update loading state even when error occurs
          toast.error('Error checking qualification status');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (user && profile) {
      checkQualification();
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [user, profile, retryCount]);

  return {
    isQualified,
    isLoading,
    error,
    qualificationData
  };
};
