import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

/**
 * Returns true if Supabase environment variables are configured.
 * When credentials are missing, API routes will gracefully fallback to mock responses.
 */
export function isSupabaseConfigured(): boolean {
    return !!(supabaseUrl && supabaseAnonKey);
}

/**
 * Supabase client singleton.
 * Returns null if Supabase is not configured (missing env vars).
 */
export const supabase = isSupabaseConfigured()
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;
