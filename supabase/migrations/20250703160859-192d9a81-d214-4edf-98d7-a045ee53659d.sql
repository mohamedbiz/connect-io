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

-- Simplify founder_profiles policies  
DROP POLICY IF EXISTS "Users can create their own founder profile" ON public.founder_profiles;
DROP POLICY IF EXISTS "Users can update their own founder profile" ON public.founder_profiles;
DROP POLICY IF EXISTS "Users can view their own founder profile" ON public.founder_profiles;

CREATE POLICY "MVP: Anyone can manage founder profiles" 
ON public.founder_profiles 
FOR ALL 
USING (true);