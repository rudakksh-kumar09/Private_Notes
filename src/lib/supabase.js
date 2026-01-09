// ===========================================
// SUPABASE CLIENT CONFIGURATION
// ===========================================
// This is the single source of truth for Supabase connection
// Used across the entire application for auth and database operations

import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env file.'
  );
}

// Create and export Supabase client
// This client is protected by Row Level Security policies
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Persist auth state in local storage
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// ===========================================
// SECURITY NOTES:
// ===========================================
// 1. The anon key is SAFE to expose in frontend code
// 2. All database operations are protected by RLS policies
// 3. Users can only access their own data (enforced at DB level)
// 4. Never use the service_role key in frontend code
// ===========================================
