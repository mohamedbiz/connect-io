
import { useState } from "react";
import { useEmailPasswordAuth } from "@/hooks/useEmailPasswordAuth";
import { useOAuth } from "@/hooks/useOAuth";
import { useRedirection } from "@/hooks/useRedirection";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function useAuthPageController() {
  const [isRegister, setIsRegister] = useState(false);
  const [userType, setUserType] = useState<"founder" | "provider">("founder");
  const navigate = useNavigate();
  
  const { form, setForm, loading: authLoading, handleInput, handleSignIn, handleSignUp } = useEmailPasswordAuth();
  const { loading: oauthLoading, handleOAuth } = useOAuth();
  const { loading: redirectLoading, handleRedirectBasedOnRole } = useRedirection();
  
  const loading = authLoading || oauthLoading || redirectLoading;

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Starting authentication process");

    try {
      if (isRegister) {
        const { data, error } = await handleSignUp(userType);
        
        if (!error && data?.user) {
          // For new founder registrations, add a flag for the qualification page
          if (userType === "founder") {
            toast.success("Account created! Redirecting to qualification...");
            // Add delay for better user experience and to ensure profile is created
            setTimeout(() => {
              navigate("/founder-qualification?new=true");
            }, 1000);
            return;
          }
          
          // For other user types, use standard redirection
          toast.success("Account created! Setting up your account...");
          setTimeout(() => {
            handleRedirectBasedOnRole(data.user.id);
          }, 1000);
        }
      } else {
        const { data, error } = await handleSignIn();
        
        if (!error && data?.user) {
          toast.success("Login successful! Redirecting...");
          // Add delay for better user experience and to ensure profile is loaded
          setTimeout(() => {
            handleRedirectBasedOnRole(data.user.id);
          }, 1000);
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
    }
  };

  return {
    isRegister,
    setIsRegister,
    form,
    setForm,
    loading,
    handleInput,
    handleAuth,
    handleOAuth: (provider: "google" | "github" | "twitter") => handleOAuth(provider, userType),
    userType,
    setUserType
  };
}
