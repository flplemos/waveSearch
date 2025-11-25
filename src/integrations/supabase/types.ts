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
      reviews: {
        Row: {
          id: string
          created_at: string
          location: string
          rating: number
          comment: string | null
          user_id: string | null
          user_name: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          location: string
          rating: number
          comment?: string | null
          user_id?: string | null
          user_name?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          location?: string
          rating?: number
          comment?: string | null
          user_id?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}