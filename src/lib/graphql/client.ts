import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { RetryLink } from '@apollo/client/link/retry'
import { setContext } from '@apollo/client/link/context'
import { createClient } from '@/lib/supabase'

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'https://graphql.bodegacatsgc.gg/graphql',
})

const authLink = setContext(async (_, { headers }) => {
  // Get the Supabase client
  const supabase = createClient()
  
  // Get the current session
  const { data: { session } } = await supabase.auth.getSession()
  
  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: session?.access_token ? `Bearer ${session.access_token}` : '',
    }
  }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    // eslint-disable-next-line no-console
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error('[GraphQL error]:', { message, locations, path })
    })
  }
  if (networkError) {
    console.error('[Network error]:', networkError)
  }
})

const retryLink = new RetryLink({
  attempts: (count, operation, error) => {
    if (!error) return false
    // Retry on network errors up to 2 times
    return count <= 2 && !!(error as any).statusCode
  },
  delay: () => 300,
})

export const apolloClient = new ApolloClient({
  link: from([errorLink, retryLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
})
