
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mohamedbiz.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vaGFtZWRiaXoiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTcxMTA5MzUzMywiZXhwIjoyMDI2NjY5NTMzfQ.A5uJsrm0HGbIuZI2kWoOeQPF_6LrEPqyvVnXgUZuEm0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
