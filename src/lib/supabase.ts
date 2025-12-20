import { createClient } from '@supabase/supabase-js';
import { env } from './env';

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const createSupabaseClient = (token?: string | null) => {
  const options: any = {};
  
  if (token) {
    options.global = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  return createClient(supabaseUrl, supabaseKey, options);
};

// Singleton for default access (anon)
export const supabase = createClient(supabaseUrl, supabaseKey);

