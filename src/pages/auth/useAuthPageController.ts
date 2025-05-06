
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useEmailPasswordAuth } from "@/hooks/useEmailPasswordAuth";
import { useOAuth } from "@/hooks/useOAuth";

const useAuthPageController = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [userType, setUserType] = useState<"founder" | "provider">("founder");
  const navigate = useNavigate();
  const { form, loading, handleInput, handleSignIn, handleSignUp } = useEmailPasswordAuth();
  const { loading: oauthLoading, handleOAuth } = useOAuth();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isRegister) {
        // Handle sign up
        const { data, error } = await handleSignUp(userType);
        
        if (error) {
          return; // Error is handled within the hook
        }
        
        if (data?.user) {
          console.log("Registration successful, redirecting to post-register navigation");
          navigate("/post-register"); // Use the post-register navigator
        }
      } else {
        // Handle sign in
        const { data, error } = await handleSignIn();
        
        if (error) {
          return; // Error is handled within the hook
        }
        
        if (data?.user) {
          console.log("Login successful, waiting for profile data before redirecting");
          // Small delay to let profile fetch complete
          setTimeout(() => {
            // Use post-register navigator for proper role-based routing
            navigate("/post-register");
          }, 200);
        }
      }
    } catch (err) {
      console.error("Auth error:", err);
      toast.error("Authentication error. Please try again.");
    }
  };

  return {
    isRegister,
    setIsRegister,
    form,
    loading: loading || oauthLoading,
    handleInput,
    handleAuth,
    handleOAuth,
    userType,
    setUserType
  };
};

export default useAuthPageController;
