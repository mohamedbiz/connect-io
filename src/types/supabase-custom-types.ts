
import { Database } from "@/integrations/supabase/types";

// Provider Application table is a custom table that isn't in the auto-generated types
export interface ProviderApplication {
  id: string;
  user_id: string;
  application_data: any; // JSON data
  status: 'submitted' | 'in_review' | 'approved' | 'rejected';
  submitted_at: string;
  reviewed_at?: string;
  reviewer_notes?: string;
  technical_assessment_score?: number;
  interview_notes?: string;
  accepted?: boolean;
  created_at: string;
  automated_score?: number;
  auto_approved?: boolean;
  notification_sent?: boolean;
  verification_status?: string;
  approval_tier?: string;
}
