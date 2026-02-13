import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase: SupabaseClient<Database> = supabaseUrl && supabaseAnonKey
    ? createClient<Database>(supabaseUrl, supabaseAnonKey)
    : createClient<Database>('https://placeholder.supabase.co', 'placeholder');

// Server-side client with service role (for protected operations)
export const createServerClient = () => {
    const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
    if (!supabaseUrl || !serviceRole) {
        return supabase;
    }
    return createClient<Database>(supabaseUrl, serviceRole);
};
