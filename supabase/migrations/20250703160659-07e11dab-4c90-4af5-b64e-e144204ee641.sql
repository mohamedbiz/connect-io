-- Drop triggers first before dropping functions
DROP TRIGGER IF EXISTS trigger_process_new_application ON public.provider_applications;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS update_provider_profiles_updated_at ON public.provider_profiles;
DROP TRIGGER IF EXISTS update_founder_profiles_updated_at ON public.founder_profiles;

-- Now drop the functions
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP FUNCTION IF EXISTS public.process_new_application();
DROP FUNCTION IF EXISTS public.create_provider_on_application_approval();
DROP FUNCTION IF EXISTS public.calculate_application_score(jsonb);
DROP FUNCTION IF EXISTS public.update_account_status_on_profile_completion();

-- Remove foreign key constraint from profiles to auth.users (not needed for MVP)
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- Drop complex tables not used in MVP
DROP TABLE IF EXISTS public.application_reviews CASCADE;
DROP TABLE IF EXISTS public.provider_onboarding CASCADE;
DROP TABLE IF EXISTS public.providers CASCADE;

-- Simplify provider_applications table for basic MVP use
ALTER TABLE public.provider_applications 
DROP COLUMN IF EXISTS automated_score,
DROP COLUMN IF EXISTS auto_approved,
DROP COLUMN IF EXISTS approval_tier,
DROP COLUMN IF EXISTS verification_status,
DROP COLUMN IF EXISTS technical_assessment_score,
DROP COLUMN IF EXISTS interview_notes,
DROP COLUMN IF EXISTS notification_sent;

-- Keep only essential columns for MVP
ALTER TABLE public.provider_applications 
ALTER COLUMN status SET DEFAULT 'submitted',
ALTER COLUMN submitted_at SET DEFAULT now();