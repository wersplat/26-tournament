import useSWR from 'swr'
import { useAuth, useUser } from '@clerk/nextjs'
import { GET_PLAYER, GET_PLAYERS, GET_TEAMS, GET_MATCHES, GET_MATCH, GET_EVENTS, GET_EVENT } from '@/lib/graphql/queries'
import { fetcher } from '@/lib/graphql/client'
import { useEffect, useState } from 'react'

// Helper to safely get token
const useHasuraToken = () => {
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const loadToken = async () => {
      if (isSignedIn) {
        try {
          // Try to get Hasura-specific token first
          const t = await getToken()
          setToken(t)
        } catch (e) {
          console.warn("Hasura token template not found, falling back to default token", e)
          try {
             // Fallback to default token
             const t = await getToken()
             setToken(t)
          } catch (e2) {
             console.error("Failed to retrieve any token", e2)
             setToken(null)
          }
        }
      } else {
        setToken(null)
      }
    }
    if (isLoaded) loadToken()
  }, [isSignedIn, isLoaded, getToken])

  return { token, isLoaded, isSignedIn }
}

// Custom hook for player queries
export const usePlayer = (id: string) => {
  const { token, isLoaded, isSignedIn } = useHasuraToken()
  
  const { data, error, isLoading, mutate } = useSWR(
    isLoaded ? [GET_PLAYER, { id }, token] : null,
    fetcher
  )

  return {
    player: data?.players_by_pk,
    loading: !isLoaded || isLoading,
    error,
    refetch: mutate,
    isAuthenticated: isSignedIn,
  }
}

// Custom hook for all players
export const usePlayers = () => {
  const { token, isLoaded, isSignedIn } = useHasuraToken()
  
  const { data, error, isLoading, mutate } = useSWR(
    isLoaded ? [GET_PLAYERS, {}, token] : null,
    fetcher
  )

  return {
    players: data?.players || [],
    loading: !isLoaded || isLoading,
    error,
    refetch: mutate,
    isAuthenticated: isSignedIn,
  }
}

// Custom hook for teams
export const useTeams = () => {
  const { token, isLoaded, isSignedIn } = useHasuraToken()
  
  const { data, error, isLoading, mutate } = useSWR(
    isLoaded ? [GET_TEAMS, {}, token] : null,
    fetcher
  )

  return {
    teams: data?.teams || [],
    loading: !isLoaded || isLoading,
    error,
    refetch: mutate,
    isAuthenticated: isSignedIn,
  }
}

// Custom hook for matches
export const useMatches = () => {
  const { token, isLoaded, isSignedIn } = useHasuraToken()
  
  const { data, error, isLoading, mutate } = useSWR(
    isLoaded ? [GET_MATCHES, {}, token] : null,
    fetcher
  )

  return {
    matches: data?.matches || [],
    loading: !isLoaded || isLoading,
    error,
    refetch: mutate,
    isAuthenticated: isSignedIn,
  }
}

// Custom hook for a specific match
export const useMatch = (id: string) => {
  const { token, isLoaded, isSignedIn } = useHasuraToken()

  const { data, error, isLoading, mutate } = useSWR(
    isLoaded ? [GET_MATCH, { id }, token] : null,
    fetcher
  )

  return {
    match: data?.matches_by_pk,
    loading: !isLoaded || isLoading,
    error,
    refetch: mutate,
    isAuthenticated: isSignedIn,
  }
}

// Custom hook for events
export const useEvents = () => {
  const { token, isLoaded, isSignedIn } = useHasuraToken()

  const { data, error, isLoading, mutate } = useSWR(
    isLoaded ? [GET_EVENTS, {}, token] : null,
    fetcher
  )

  return {
    events: data?.events || [],
    loading: !isLoaded || isLoading,
    error,
    refetch: mutate,
    isAuthenticated: isSignedIn,
  }
}

// Custom hook for a specific event
export const useEvent = (id: string) => {
  const { token, isLoaded, isSignedIn } = useHasuraToken()

  const { data, error, isLoading, mutate } = useSWR(
    isLoaded ? [GET_EVENT, { id }, token] : null,
    fetcher
  )

  return {
    event: data?.events_by_pk,
    loading: !isLoaded || isLoading,
    error,
    refetch: mutate,
    isAuthenticated: isSignedIn,
  }
}

// Utility function to handle GraphQL errors
export const handleGraphQLError = (error: any) => {
  if (!error) return null
  return error.message || 'An error occurred'
}

// Hook to check if user has required permissions
export const usePermissions = () => {
  const { isLoaded, isSignedIn } = useAuth()
  const { user } = useUser()
  
  // Basic admin check from metadata or specific check logic
  const isAdmin = isSignedIn && (
    (user?.publicMetadata as any)?.role === 'admin' || 
    (user?.publicMetadata as any)?.role === 'ADMIN'
  );
  
  return {
    isAuthenticated: isSignedIn,
    isAdmin: !!isAdmin,
    canViewPlayers: isSignedIn,
    canViewTeams: isSignedIn,
    canViewMatches: isSignedIn,
    canEditData: !!isAdmin,
  }
}
