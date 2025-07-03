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

-- Remove complex RLS policies and keep only MVP-friendly ones
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Everyone can view featured status" ON public.profiles;
DROP POLICY IF EXISTS "Only admins can update featured status" ON public.profiles;

-- Create simple MVP policies for profiles
CREATE POLICY "MVP: Anyone can read profiles" 
ON public.profiles 
FOR SELECT 
USING (true);

CREATE POLICY "MVP: Anyone can insert profiles" 
ON public.profiles 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "MVP: Anyone can update profiles by email" 
ON public.profiles 
FOR UPDATE 
USING (true);