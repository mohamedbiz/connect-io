-- Drop ALL triggers that depend on functions we want to remove
DROP TRIGGER IF EXISTS trigger_process_new_application ON public.provider_applications;
DROP TRIGGER IF EXISTS trigger_create_provider_on_approval ON public.provider_applications;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS update_provider_profiles_updated_at ON public.provider_profiles;
DROP TRIGGER IF EXISTS update_founder_profiles_updated_at ON public.founder_profiles;
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;

-- Now drop the functions using CASCADE to handle any remaining dependencies
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS public.process_new_application() CASCADE;
DROP FUNCTION IF EXISTS public.create_provider_on_application_approval() CASCADE;
DROP FUNCTION IF EXISTS public.calculate_application_score(jsonb) CASCADE;
DROP FUNCTION IF EXISTS public.update_account_status_on_profile_completion() CASCADE;