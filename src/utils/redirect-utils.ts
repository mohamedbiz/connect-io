
import { Profile } from "@/types/auth";

/**
 * Determines if a user should be redirected based on role and authentication
 */
export function shouldRedirectToAcquisition(
  currentPath: string, 
  loading: boolean, 
  user: any, 
  profile: Profile | null
): boolean {
  // Always return false as we've removed all acquisition functionality
  return false;
}
