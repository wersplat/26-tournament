import { cleanEnv, str, url } from 'envalid'

// Helper to check if we're on the server
const isServer = typeof window === 'undefined';

export const env = cleanEnv(
  {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    NEXT_PUBLIC_GRAPHQL_URL: process.env.NEXT_PUBLIC_GRAPHQL_URL,
    NEXT_PUBLIC_HASURA_IS_PUBLIC: process.env.NEXT_PUBLIC_HASURA_IS_PUBLIC,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_HASURA_ADMIN_SECRET: process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
  },
  {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: str({ desc: 'Clerk Publishable Key' }),
    // Secret key is only required on the server
    CLERK_SECRET_KEY: str({ desc: 'Clerk Secret Key', default: isServer ? undefined : '' }),
  NEXT_PUBLIC_GRAPHQL_URL: url({ desc: 'GraphQL endpoint URL' }),
    NEXT_PUBLIC_HASURA_IS_PUBLIC: str({ desc: 'Is Hasura Public', default: 'true' }),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: str({ desc: 'Supabase Anon Key', default: '' }),
    NEXT_PUBLIC_SUPABASE_URL: str({ desc: 'Supabase URL', default: 'https://qwpxsufrgigpjcxtnery.supabase.co' }),
    NEXT_PUBLIC_HASURA_ADMIN_SECRET: str({ desc: 'Hasura Admin Secret', default: '' }),
  }
)
