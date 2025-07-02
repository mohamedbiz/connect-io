-- Fix the existing user's role to match their intended registration
UPDATE public.profiles 
SET role = 'provider'::public.user_role 
WHERE email = 'biz.mohamed2000@gmail.com' AND role = 'founder';