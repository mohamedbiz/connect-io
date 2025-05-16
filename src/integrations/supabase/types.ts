export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      direct_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          match_id: string
          read: boolean
          receiver_id: string
          sender_id: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          match_id: string
          read?: boolean
          receiver_id: string
          sender_id: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          match_id?: string
          read?: boolean
          receiver_id?: string
          sender_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "direct_messages_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
        ]
      }
      email_diagnostics: {
        Row: {
          created_at: string | null
          current_conversion_rate: number | null
          estimated_list_growth: number | null
          forms: Json | null
          id: string
          industry_average: number | null
          overall_score: number
          potential_conversion_rate: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_conversion_rate?: number | null
          estimated_list_growth?: number | null
          forms?: Json | null
          id?: string
          industry_average?: number | null
          overall_score: number
          potential_conversion_rate?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_conversion_rate?: number | null
          estimated_list_growth?: number | null
          forms?: Json | null
          id?: string
          industry_average?: number | null
          overall_score?: number
          potential_conversion_rate?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      founder_applications: {
        Row: {
          application_data: Json
          created_at: string
          id: string
          reviewed_at: string | null
          reviewer_notes: string | null
          status: string
          submitted_at: string
          user_id: string
        }
        Insert: {
          application_data: Json
          created_at?: string
          id?: string
          reviewed_at?: string | null
          reviewer_notes?: string | null
          status?: string
          submitted_at?: string
          user_id: string
        }
        Update: {
          application_data?: Json
          created_at?: string
          id?: string
          reviewed_at?: string | null
          reviewer_notes?: string | null
          status?: string
          submitted_at?: string
          user_id?: string
        }
        Relationships: []
      }
      founder_onboarding: {
        Row: {
          accepts_performance_based: boolean | null
          accepts_timeframe: boolean | null
          acquisition_completed: boolean | null
          acquisition_completed_at: string | null
          allows_portfolio_use: boolean | null
          created_at: string | null
          ecommerce_platform: string | null
          growth_mindset: boolean | null
          id: string
          is_decision_maker: boolean | null
          monthly_traffic: number | null
          product_margins: string | null
          project_scope: string | null
          qualification_completed: boolean | null
          qualification_completed_at: string | null
          revenue_threshold: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          accepts_performance_based?: boolean | null
          accepts_timeframe?: boolean | null
          acquisition_completed?: boolean | null
          acquisition_completed_at?: string | null
          allows_portfolio_use?: boolean | null
          created_at?: string | null
          ecommerce_platform?: string | null
          growth_mindset?: boolean | null
          id?: string
          is_decision_maker?: boolean | null
          monthly_traffic?: number | null
          product_margins?: string | null
          project_scope?: string | null
          qualification_completed?: boolean | null
          qualification_completed_at?: string | null
          revenue_threshold?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          accepts_performance_based?: boolean | null
          accepts_timeframe?: boolean | null
          acquisition_completed?: boolean | null
          acquisition_completed_at?: string | null
          allows_portfolio_use?: boolean | null
          created_at?: string | null
          ecommerce_platform?: string | null
          growth_mindset?: boolean | null
          id?: string
          is_decision_maker?: boolean | null
          monthly_traffic?: number | null
          product_margins?: string | null
          project_scope?: string | null
          qualification_completed?: boolean | null
          qualification_completed_at?: string | null
          revenue_threshold?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      matches: {
        Row: {
          created_at: string | null
          founder_id: string
          id: string
          message: string | null
          provider_id: string
          status: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          founder_id: string
          id?: string
          message?: string | null
          provider_id: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          founder_id?: string
          id?: string
          message?: string | null
          provider_id?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      payment_analytics: {
        Row: {
          id: string
          period_end: string
          period_start: string
          total_fees: number
          total_revenue: number
          transaction_count: number
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          period_end: string
          period_start: string
          total_fees?: number
          total_revenue?: number
          transaction_count?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: string
          period_end?: string
          period_start?: string
          total_fees?: number
          total_revenue?: number
          transaction_count?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          currency: string | null
          fee_amount: number
          id: string
          metadata: Json | null
          payment_intent_id: string | null
          payment_method: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string | null
          fee_amount: number
          id?: string
          metadata?: Json | null
          payment_intent_id?: string | null
          payment_method?: string | null
          status: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string | null
          fee_amount?: number
          id?: string
          metadata?: Json | null
          payment_intent_id?: string | null
          payment_method?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      payout_requests: {
        Row: {
          amount: number
          id: string
          notes: string | null
          processed_at: string | null
          provider_id: string
          requested_at: string
          status: string
        }
        Insert: {
          amount: number
          id?: string
          notes?: string | null
          processed_at?: string | null
          provider_id: string
          requested_at?: string
          status?: string
        }
        Update: {
          amount?: number
          id?: string
          notes?: string | null
          processed_at?: string | null
          provider_id?: string
          requested_at?: string
          status?: string
        }
        Relationships: []
      }
      post_purchase_diagnostics: {
        Row: {
          created_at: string | null
          current_repeat_rate: number | null
          estimated_revenue_lift: number | null
          id: string
          industry_average: number | null
          overall_score: number
          potential_repeat_rate: number | null
          sequences: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_repeat_rate?: number | null
          estimated_revenue_lift?: number | null
          id?: string
          industry_average?: number | null
          overall_score: number
          potential_repeat_rate?: number | null
          sequences?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_repeat_rate?: number | null
          estimated_revenue_lift?: number | null
          id?: string
          industry_average?: number | null
          overall_score?: number
          potential_repeat_rate?: number | null
          sequences?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          about: string | null
          avatar_url: string | null
          business_name: string | null
          created_at: string | null
          email: string
          expertise: string | null
          first_name: string | null
          id: string
          last_name: string | null
          linkedin_url: string | null
          onboarding_complete: boolean | null
          portfolio_url: string | null
          role: Database["public"]["Enums"]["user_role"]
        }
        Insert: {
          about?: string | null
          avatar_url?: string | null
          business_name?: string | null
          created_at?: string | null
          email: string
          expertise?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          linkedin_url?: string | null
          onboarding_complete?: boolean | null
          portfolio_url?: string | null
          role?: Database["public"]["Enums"]["user_role"]
        }
        Update: {
          about?: string | null
          avatar_url?: string | null
          business_name?: string | null
          created_at?: string | null
          email?: string
          expertise?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          linkedin_url?: string | null
          onboarding_complete?: boolean | null
          portfolio_url?: string | null
          role?: Database["public"]["Enums"]["user_role"]
        }
        Relationships: []
      }
      provider_applications: {
        Row: {
          accepted: boolean | null
          application_data: Json
          created_at: string
          id: string
          interview_notes: string | null
          reviewed_at: string | null
          reviewer_notes: string | null
          status: string
          submitted_at: string
          technical_assessment_score: number | null
          user_id: string
        }
        Insert: {
          accepted?: boolean | null
          application_data: Json
          created_at?: string
          id?: string
          interview_notes?: string | null
          reviewed_at?: string | null
          reviewer_notes?: string | null
          status?: string
          submitted_at?: string
          technical_assessment_score?: number | null
          user_id: string
        }
        Update: {
          accepted?: boolean | null
          application_data?: Json
          created_at?: string
          id?: string
          interview_notes?: string | null
          reviewed_at?: string | null
          reviewer_notes?: string | null
          status?: string
          submitted_at?: string
          technical_assessment_score?: number | null
          user_id?: string
        }
        Relationships: []
      }
      providers: {
        Row: {
          avatar: string | null
          average_order_value: number | null
          created_at: string | null
          description: string | null
          email: string
          expertise: Json | null
          id: string
          is_featured: boolean | null
          name: string
          platform_experience: string[] | null
          projects_completed: number | null
          rating: number | null
          specialties: string[] | null
          success_metrics: Json | null
          title: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          avatar?: string | null
          average_order_value?: number | null
          created_at?: string | null
          description?: string | null
          email: string
          expertise?: Json | null
          id?: string
          is_featured?: boolean | null
          name: string
          platform_experience?: string[] | null
          projects_completed?: number | null
          rating?: number | null
          specialties?: string[] | null
          success_metrics?: Json | null
          title?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          avatar?: string | null
          average_order_value?: number | null
          created_at?: string | null
          description?: string | null
          email?: string
          expertise?: Json | null
          id?: string
          is_featured?: boolean | null
          name?: string
          platform_experience?: string[] | null
          projects_completed?: number | null
          rating?: number | null
          specialties?: string[] | null
          success_metrics?: Json | null
          title?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_fee: {
        Args: { payment_amount: number }
        Returns: number
      }
      get_unread_messages_count: {
        Args: { user_id: string }
        Returns: number
      }
    }
    Enums: {
      user_role: "founder" | "provider" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["founder", "provider", "admin"],
    },
  },
} as const
