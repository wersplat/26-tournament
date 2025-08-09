import { useQuery, useMutation, ApolloError } from '@apollo/client'
import { useAuth } from '@/context/auth-context'
import { GET_PLAYER, GET_PLAYERS, GET_TEAMS, GET_MATCHES, GET_MATCH } from '@/lib/graphql/queries'

// Custom hook for player queries
export const usePlayer = (nodeId: string) => {
  const { user, loading: authLoading } = useAuth()
  
  const { loading, error, data, refetch } = useQuery(GET_PLAYER, {
    variables: { nodeId },
    errorPolicy: 'all',
    skip: authLoading || !user, // Skip query if not authenticated
  })

  return {
    player: data?.node,
    loading: loading || authLoading,
    error,
    refetch,
    isAuthenticated: !!user,
  }
}

// Custom hook for all players
export const usePlayers = () => {
  const { user, loading: authLoading } = useAuth()
  
  const { loading, error, data, refetch } = useQuery(GET_PLAYERS, {
    errorPolicy: 'all',
    skip: authLoading || !user,
  })

  const players = data?.playersCollection?.edges?.map((edge: any) => edge.node) || []

  return {
    players,
    loading: loading || authLoading,
    error,
    refetch,
    isAuthenticated: !!user,
  }
}

// Custom hook for teams
export const useTeams = () => {
  const { user, loading: authLoading } = useAuth()
  
  const { loading, error, data, refetch } = useQuery(GET_TEAMS, {
    errorPolicy: 'all',
    skip: authLoading || !user,
  })

  const teams = data?.teamsCollection?.edges?.map((edge: any) => edge.node) || []

  return {
    teams,
    loading: loading || authLoading,
    error,
    refetch,
    isAuthenticated: !!user,
  }
}

// Custom hook for matches
export const useMatches = () => {
  const { user, loading: authLoading } = useAuth()
  
  const { loading, error, data, refetch } = useQuery(GET_MATCHES, {
    errorPolicy: 'all',
    skip: authLoading || !user,
  })

  const matches = data?.matchesCollection?.edges?.map((edge: any) => edge.node) || []

  return {
    matches,
    loading: loading || authLoading,
    error,
    refetch,
    isAuthenticated: !!user,
  }
}

// Custom hook for a specific match
export const useMatch = (nodeId: string) => {
  const { user, loading: authLoading } = useAuth()
  
  const { loading, error, data, refetch } = useQuery(GET_MATCH, {
    variables: { nodeId },
    errorPolicy: 'all',
    skip: authLoading || !user,
  })

  return {
    match: data?.node,
    loading: loading || authLoading,
    error,
    refetch,
    isAuthenticated: !!user,
  }
}

// Utility function to handle GraphQL errors
export const handleGraphQLError = (error: ApolloError | undefined) => {
  if (!error) return null
  
  // Handle different types of errors
  if (error.networkError) {
    return 'Network error. Please check your connection.'
  }
  
  if (error.graphQLErrors && error.graphQLErrors.length > 0) {
    const graphQLError = error.graphQLErrors[0]
    
    // Handle authentication errors
    if (graphQLError.extensions?.code === 'UNAUTHENTICATED') {
      return 'Authentication required. Please log in.'
    }
    
    // Handle authorization errors
    if (graphQLError.extensions?.code === 'FORBIDDEN') {
      return 'You do not have permission to access this resource.'
    }
    
    // Return the GraphQL error message
    return graphQLError.message
  }
  
  return error.message
}

// Hook to check if user has required permissions
export const usePermissions = () => {
  const { user, isAdmin } = useAuth()
  
  return {
    isAuthenticated: !!user,
    isAdmin,
    canViewPlayers: !!user,
    canViewTeams: !!user,
    canViewMatches: !!user,
    canEditData: isAdmin,
  }
}
