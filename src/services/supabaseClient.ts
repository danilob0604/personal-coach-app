import { createClient } from '@supabase/supabase-js';

// Default Supabase project credentials with environment variable override
const DEFAULT_URL = 'https://fthnchdypxgcrhhubaui.supabase.co';
const DEFAULT_KEY = 'sb_publishable_FAgMF2Ape2ENckO9yOOQ8w_Ua7DRkQW';

const envUrl = (import.meta.env.VITE_SUPABASE_URL as string) || DEFAULT_URL;
const envAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || DEFAULT_KEY;

const localUrl = typeof window !== 'undefined' ? localStorage.getItem('supabase_project_url') || '' : '';
const localAnonKey = typeof window !== 'undefined' ? localStorage.getItem('supabase_anon_key') || '' : '';

export const supabaseUrl = localUrl || envUrl;
export const supabaseAnonKey = localAnonKey || envAnonKey;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      },
      realtime: {
        params: {
          eventsPerSecond: 10
        }
      }
    })
  : null;
