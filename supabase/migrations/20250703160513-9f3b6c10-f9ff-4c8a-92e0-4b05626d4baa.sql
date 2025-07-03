-- Remove foreign key constraint from profiles to auth.users (not needed for MVP)
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- Drop auth-based triggers that aren't used in MVP
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Drop complex functions not used in MVP  
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP FUNCTION IF EXISTS public.process_new_application();
DROP FUNCTION IF EXISTS public.create_provider_on_application_approval();
DROP FUNCTION IF EXISTS public.calculate_application_score(jsonb);

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

-- Simplify provider_applications policies
DROP POLICY IF EXISTS "Users can create their own applications" ON public.provider_applications;
DROP POLICY IF EXISTS "Users can view their own applications" ON public.provider_applications;
DROP POLICY IF EXISTS "Admin can view all applications" ON public.provider_applications;

CREATE POLICY "MVP: Anyone can insert applications" 
ON public.provider_applications 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "MVP: Anyone can read applications" 
ON public.provider_applications 
FOR SELECT 
USING (true);

-- Simplify provider_profiles policies
DROP POLICY IF EXISTS "Users can create their own provider profile" ON public.provider_profiles;
DROP POLICY IF EXISTS "Users can update their own provider profile" ON public.provider_profiles;
DROP POLICY IF EXISTS "Users can view their own provider profile" ON public.provider_profiles;

CREATE POLICY "MVP: Anyone can manage provider profiles" 
ON public.provider_profiles 
FOR ALL 
USING (true);