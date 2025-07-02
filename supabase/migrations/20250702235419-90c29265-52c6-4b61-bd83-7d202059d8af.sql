-- Create a policy to allow anonymous inserts to profiles table for MVP
CREATE POLICY "Allow anonymous profile creation for MVP" 
ON public.profiles 
FOR INSERT 
WITH CHECK (true);

-- Also allow anonymous users to select profiles they create by email
CREATE POLICY "Allow anonymous profile access by email" 
ON public.profiles 
FOR SELECT 
USING (true);