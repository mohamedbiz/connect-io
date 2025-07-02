-- Fix the role assignment in the trigger to properly handle the user metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, avatar_url, email, role)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name',
    NEW.raw_user_meta_data ->> 'avatar_url',
    NEW.email,
    -- Fix: Properly use the role from user metadata, with better fallback logic
    CASE 
      WHEN NEW.raw_user_meta_data ->> 'role' = 'provider' THEN 'provider'::public.user_role
      WHEN NEW.raw_user_meta_data ->> 'role' = 'founder' THEN 'founder'::public.user_role
      WHEN NEW.raw_user_meta_data ->> 'role' = 'admin' THEN 'admin'::public.user_role
      ELSE 'founder'::public.user_role -- Default fallback
    END
  );
  RETURN NEW;
END;
$$;