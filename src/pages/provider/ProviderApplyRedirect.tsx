
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ProviderApplyRedirect = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Show a toast notification about the redirect
    toast.info("Redirecting to provider application page");
    
    // Redirect to the new path
    navigate("/provider-application", { replace: true });
  }, [navigate]);
  
  // Render nothing as this is just a redirect component
  return null;
};

export default ProviderApplyRedirect;
