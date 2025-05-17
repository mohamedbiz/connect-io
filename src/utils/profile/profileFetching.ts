
import { fetchProfile } from "@/utils/profile/profile-api";
import { logProfile } from "@/utils/profile/profile-logger";

// Constants to configure behavior
const MAX_RETRY_COUNT = 2;
const RETRY_DELAY_BASE = 1000; // 1 second

// Calculate delay for retry attempts using exponential backoff
export const getBackoffDelay = (retryCount: number): number => {
  return RETRY_DELAY_BASE * Math.pow(2, retryCount) * (1 + Math.random() * 0.1);
};

// Apply rate limiting to prevent too many requests
export const shouldThrottleFetch = (lastFetchTime: number): boolean => {
  const now = Date.now();
  const MIN_FETCH_INTERVAL = 1000; // 1 second minimum between fetches
  
  if (now - lastFetchTime < MIN_FETCH_INTERVAL) {
    logProfile("Throttling profile fetch - too many requests", null, true);
    return true;
  }
  return false;
};

export const logProfileFetchAttempt = (userId: string, retryCount: number = 0) => {
  logProfile(`Fetching profile for user: ${userId} (attempt ${retryCount + 1})`);
};

export const logProfileNotFound = (userId: string, retryCount: number) => {
  logProfile(`No profile found for user: ${userId} on attempt ${retryCount + 1}`, null, true);
};
