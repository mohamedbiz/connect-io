
import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { logAuth } from '@/utils/auth/auth-logger';

/**
 * Monitors for session timeouts and refreshes token automatically
 */
export function useSessionTimeout(userId: string | undefined) {
  const [lastActivity, setLastActivity] = useState<Date>(new Date());
  const timerRef = useRef<number | null>(null);
  const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
  const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes
  
  // Update last activity on user interactions
  useEffect(() => {
    const updateLastActivity = () => {
      setLastActivity(new Date());
    };
    
    // Listen for user activity
    window.addEventListener('mousemove', updateLastActivity);
    window.addEventListener('keydown', updateLastActivity);
    window.addEventListener('click', updateLastActivity);
    window.addEventListener('scroll', updateLastActivity);
    
    return () => {
      window.removeEventListener('mousemove', updateLastActivity);
      window.removeEventListener('keydown', updateLastActivity);
      window.removeEventListener('click', updateLastActivity);
      window.removeEventListener('scroll', updateLastActivity);
    };
  }, []);
  
  // Check for session timeout and refresh tokens
  useEffect(() => {
    // Only run if we have a user
    if (!userId) return;
    
    const checkSessionTimeout = async () => {
      const now = new Date();
      const timeSinceLastActivity = now.getTime() - lastActivity.getTime();
      
      if (timeSinceLastActivity < SESSION_TIMEOUT) {
        try {
          // Refresh session if needed
          const { data, error } = await supabase.auth.refreshSession();
          
          if (error) {
            logAuth('Error refreshing session:', error, false, true);
          } else if (data && data.session) {
            logAuth('Session refreshed successfully', { userId });
          }
        } catch (err) {
          logAuth('Exception when refreshing session:', err, false, true);
        }
      }
    };
    
    timerRef.current = window.setInterval(checkSessionTimeout, REFRESH_INTERVAL);
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [userId, lastActivity]);
  
  return { lastActivity };
}
