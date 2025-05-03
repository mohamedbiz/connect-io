
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

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
        const { data, error } = await supabase
          .from('founder_onboarding')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) {
          throw error;
        }

        setQualificationData(data);
        setIsQualified(data?.qualification_completed || false);
      } catch (err) {
        console.error('Error checking qualification status:', err);
        setError(err instanceof Error ? err : new Error('Unknown error checking qualification'));
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
