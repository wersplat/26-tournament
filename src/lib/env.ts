import { cleanEnv, str, url } from 'envalid'

export const env = cleanEnv(typeof process !== 'undefined' ? process.env : ({} as any), {
  NEXT_PUBLIC_SUPABASE_URL: url({ desc: 'Supabase project URL' }),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: str({ desc: 'Supabase anon key' }),
  NEXT_PUBLIC_GRAPHQL_URL: url({ desc: 'GraphQL endpoint URL' }),
})


