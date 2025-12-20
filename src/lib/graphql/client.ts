import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'https://graphql.bodegacatsgc.gg/v1/graphql';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_JVDv-ShshgDyUKXq0_PT_w_b2x8-PWZ';
const hasuraAdminSecret = process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET;

export const createGraphQLClient = (token?: string | null) => {
  const headers: Record<string, string> = {};
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  } else if (hasuraAdminSecret) {
    // ⚠️ SECURITY WARNING: Exposing admin secret on client is dangerous
    headers['x-hasura-admin-secret'] = hasuraAdminSecret;
  } else if (supabaseAnonKey) {
    // Fallback to Supabase Anon Key for public access if no user token
    headers['Authorization'] = `Bearer ${supabaseAnonKey}`;
    // headers['X-Hasura-Role'] = 'anon'; // Optional: explicit role
  }

  return new GraphQLClient(endpoint, { headers });
};

// SWR fetcher - receives [query, variables?, token?] as the key
export const fetcher = async (key: [string, any?, (string | null)?]) => {
  const [query, variables, token] = key;
  const client = createGraphQLClient(token);
  return client.request(query, variables);
};
