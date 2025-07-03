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
      application_reviews: {
        Row: {
          action: string
          application_id: string | null
          automated: boolean | null
          created_at: string | null
          id: string
          notes: string | null
          reviewer_id: string | null
        }
        Insert: {
          action: string
          application_id?: string | null
          automated?: boolean | null
          created_at?: string | null
          id?: string
          notes?: string | null
          reviewer_id?: string | null
        }
        Update: {
          action?: string
          application_id?: string | null
          automated?: boolean | null
          created_at?: string | null
          id?: string
          notes?: string | null
          reviewer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "application_reviews_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "provider_applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "application_reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          created_at: string
          founder_id: string
          id: string
          provider_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          founder_id: string
          id?: string
          provider_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          founder_id?: string
          id?: string
          provider_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_founder_id_fkey"
            columns: ["founder_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      founder_profiles: {
        Row: {
          biggest_challenge: string | null
          business_website: string | null
          created_at: string
          current_email_platform: string | null
          id: string
          monthly_revenue_range: string | null
          primary_goal: string | null
          profile_picture_url: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          biggest_challenge?: string | null
          business_website?: string | null
          created_at?: string
          current_email_platform?: string | null
          id?: string
          monthly_revenue_range?: string | null
          primary_goal?: string | null
          profile_picture_url?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          biggest_challenge?: string | null
          business_website?: string | null
          created_at?: string
          current_email_platform?: string | null
          id?: string
          monthly_revenue_range?: string | null
          primary_goal?: string | null
          profile_picture_url?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "founder_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          read: boolean
          sender_id: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          read?: boolean
          sender_id: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          read?: boolean
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          account_status: Database["public"]["Enums"]["account_status"] | null
          approach_description: string | null
          approved: boolean | null
          avatar_url: string | null
          biggest_challenge: string | null
          business_name: string | null
          business_website: string | null
          created_at: string | null
          email: string
          email_platform: string | null
          first_name: string | null
          headline: string | null
          id: string
          industries_served: string[] | null
          industry: string | null
          is_featured: boolean
          last_name: string | null
          marketing_goal: string | null
          monthly_revenue: string | null
          onboarding_complete: boolean | null
          portfolio_url: string | null
          primary_esp: string | null
          profile_picture_url: string | null
          role: Database["public"]["Enums"]["user_role"]
          years_experience: string | null
        }
        Insert: {
          account_status?: Database["public"]["Enums"]["account_status"] | null
          approach_description?: string | null
          approved?: boolean | null
          avatar_url?: string | null
          biggest_challenge?: string | null
          business_name?: string | null
          business_website?: string | null
          created_at?: string | null
          email: string
          email_platform?: string | null
          first_name?: string | null
          headline?: string | null
          id: string
          industries_served?: string[] | null
          industry?: string | null
          is_featured?: boolean
          last_name?: string | null
          marketing_goal?: string | null
          monthly_revenue?: string | null
          onboarding_complete?: boolean | null
          portfolio_url?: string | null
          primary_esp?: string | null
          profile_picture_url?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          years_experience?: string | null
        }
        Update: {
          account_status?: Database["public"]["Enums"]["account_status"] | null
          approach_description?: string | null
          approved?: boolean | null
          avatar_url?: string | null
          biggest_challenge?: string | null
          business_name?: string | null
          business_website?: string | null
          created_at?: string | null
          email?: string
          email_platform?: string | null
          first_name?: string | null
          headline?: string | null
          id?: string
          industries_served?: string[] | null
          industry?: string | null
          is_featured?: boolean
          last_name?: string | null
          marketing_goal?: string | null
          monthly_revenue?: string | null
          onboarding_complete?: boolean | null
          portfolio_url?: string | null
          primary_esp?: string | null
          profile_picture_url?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          years_experience?: string | null
        }
        Relationships: []
      }
      provider_applications: {
        Row: {
          accepted: boolean | null
          application_data: Json
          approval_tier: string | null
          auto_approved: boolean | null
          automated_score: number | null
          created_at: string | null
          id: string
          interview_notes: string | null
          notification_sent: boolean | null
          reviewed_at: string | null
          reviewer_notes: string | null
          status: string | null
          submitted_at: string | null
          technical_assessment_score: number | null
          user_id: string | null
          verification_status: string | null
        }
        Insert: {
          accepted?: boolean | null
          application_data: Json
          approval_tier?: string | null
          auto_approved?: boolean | null
          automated_score?: number | null
          created_at?: string | null
          id?: string
          interview_notes?: string | null
          notification_sent?: boolean | null
          reviewed_at?: string | null
          reviewer_notes?: string | null
          status?: string | null
          submitted_at?: string | null
          technical_assessment_score?: number | null
          user_id?: string | null
          verification_status?: string | null
        }
        Update: {
          accepted?: boolean | null
          application_data?: Json
          approval_tier?: string | null
          auto_approved?: boolean | null
          automated_score?: number | null
          created_at?: string | null
          id?: string
          interview_notes?: string | null
          notification_sent?: boolean | null
          reviewed_at?: string | null
          reviewer_notes?: string | null
          status?: string | null
          submitted_at?: string | null
          technical_assessment_score?: number | null
          user_id?: string | null
          verification_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "provider_applications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      provider_onboarding: {
        Row: {
          application_id: string | null
          completed_at: string | null
          created_at: string | null
          id: string
          onboarding_completed: boolean | null
          onboarding_step: string | null
          profile_created: boolean | null
          user_id: string | null
          welcome_email_sent: boolean | null
        }
        Insert: {
          application_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          onboarding_completed?: boolean | null
          onboarding_step?: string | null
          profile_created?: boolean | null
          user_id?: string | null
          welcome_email_sent?: boolean | null
        }
        Update: {
          application_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          onboarding_completed?: boolean | null
          onboarding_step?: string | null
          profile_created?: boolean | null
          user_id?: string | null
          welcome_email_sent?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "provider_onboarding_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "provider_applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "provider_onboarding_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      provider_profiles: {
        Row: {
          approach_description: string | null
          created_at: string
          headline: string | null
          id: string
          industries_served: string[] | null
          portfolio_url: string | null
          primary_esp: string | null
          profile_picture_url: string | null
          updated_at: string
          user_id: string
          years_experience: string | null
        }
        Insert: {
          approach_description?: string | null
          created_at?: string
          headline?: string | null
          id?: string
          industries_served?: string[] | null
          portfolio_url?: string | null
          primary_esp?: string | null
          profile_picture_url?: string | null
          updated_at?: string
          user_id: string
          years_experience?: string | null
        }
        Update: {
          approach_description?: string | null
          created_at?: string
          headline?: string | null
          id?: string
          industries_served?: string[] | null
          portfolio_url?: string | null
          primary_esp?: string | null
          profile_picture_url?: string | null
          updated_at?: string
          user_id?: string
          years_experience?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "provider_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      providers: {
        Row: {
          avatar: string | null
          created_at: string | null
          description: string | null
          email: string
          id: string
          name: string
          projects_completed: number | null
          rating: number | null
          specialties: string[] | null
          title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          avatar?: string | null
          created_at?: string | null
          description?: string | null
          email: string
          id?: string
          name: string
          projects_completed?: number | null
          rating?: number | null
          specialties?: string[] | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          avatar?: string | null
          created_at?: string | null
          description?: string | null
          email?: string
          id?: string
          name?: string
          projects_completed?: number | null
          rating?: number | null
          specialties?: string[] | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "providers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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
      account_status:
        | "pending_profile"
        | "pending_application"
        | "active"
        | "rejected"
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
      account_status: [
        "pending_profile",
        "pending_application",
        "active",
        "rejected",
      ],
      user_role: ["founder", "provider", "admin"],
    },
  },
} as const
