
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { QualificationFormData, initialQualificationData } from '@/types/qualification';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const useQualification = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<QualificationFormData>(initialQualificationData);
  const [currentStep, setCurrentStep] = useState(0);

  const updateFormData = (field: keyof QualificationFormData, value: string | number | boolean | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const submitQualification = async () => {
    if (!user) {
      toast.error("You must be logged in to submit qualification data");
      navigate("/auth");
      return;
    }

    setLoading(true);

    try {
      // Check if record exists
      const { data: existingRecord } = await supabase
        .from('founder_onboarding')
        .select('id')
        .eq('user_id', user.id)
        .single();

      let operation;
      
      if (existingRecord) {
        // Update existing record
        operation = supabase
          .from('founder_onboarding')
          .update({
            revenue_threshold: formData.revenue_threshold,
            ecommerce_platform: formData.ecommerce_platform,
            monthly_traffic: formData.monthly_traffic,
            product_margins: formData.product_margins,
            growth_mindset: formData.growth_mindset,
            project_scope: formData.project_scope,
            accepts_timeframe: formData.accepts_timeframe,
            is_decision_maker: formData.is_decision_maker,
            accepts_performance_based: formData.accepts_performance_based,
            allows_portfolio_use: formData.allows_portfolio_use,
            qualification_completed: true,
            qualification_completed_at: new Date().toISOString()
          })
          .eq('user_id', user.id);
      } else {
        // Insert new record
        operation = supabase
          .from('founder_onboarding')
          .insert({
            user_id: user.id,
            revenue_threshold: formData.revenue_threshold,
            ecommerce_platform: formData.ecommerce_platform,
            monthly_traffic: formData.monthly_traffic,
            product_margins: formData.product_margins,
            growth_mindset: formData.growth_mindset,
            project_scope: formData.project_scope,
            accepts_timeframe: formData.accepts_timeframe,
            is_decision_maker: formData.is_decision_maker,
            accepts_performance_based: formData.accepts_performance_based,
            allows_portfolio_use: formData.allows_portfolio_use,
            qualification_completed: true,
            qualification_completed_at: new Date().toISOString()
          });
      }

      const { error } = await operation;

      if (error) {
        throw error;
      }

      toast.success("Qualification complete! Redirecting to your dashboard...");
      
      // Add a small delay for the toast to be visible
      setTimeout(() => {
        navigate("/founder-dashboard");
      }, 1000);
      
    } catch (error: any) {
      console.error("Error submitting qualification:", error);
      toast.error(`Failed to submit qualification: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    updateFormData,
    currentStep,
    nextStep,
    prevStep,
    submitQualification,
    loading
  };
};
