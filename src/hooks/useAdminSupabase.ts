import useSWR from 'swr'
import { useAuth } from '@clerk/nextjs'
import { createSupabaseClient } from '@/lib/supabase'
import { useEffect, useState } from 'react'

// Helper to get Clerk token for Supabase auth
const useSupabaseToken = () => {
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const loadToken = async () => {
      if (isSignedIn) {
        try {
          // Using standard Clerk token as per new Supabase integration
          const t = await getToken()
          setToken(t)
        } catch (e) {
          console.error("Failed to retrieve token", e)
          setToken(null)
        }
      } else {
        setToken(null)
      }
    }
    if (isLoaded) loadToken()
  }, [isSignedIn, isLoaded, getToken])

  return { token, isLoaded, isSignedIn }
}

// Supabase fetcher for players with team relation
// Expects key format: ['key-name', token]
const playersFetcher = async ([, token]: [string, (string | null)?]) => {
  const supabase = createSupabaseClient(token)
  const { data, error } = await supabase
    .from('players')
    .select(`
      *,
      teams:current_team_id (
        id,
        name,
        logo_url,
        current_rp,
        elo_rating,
        global_rank,
        leaderboard_tier
      )
    `)
    .order('player_rp', { ascending: false })
  
  if (error) throw error
  return data || []
}

// Supabase fetcher for teams
const teamsFetcher = async ([, token]: [string, (string | null)?]) => {
  const supabase = createSupabaseClient(token)
  const { data, error } = await supabase
    .from('teams')
    .select('*')
    .order('current_rp', { ascending: false })
  
  if (error) throw error
  return data || []
}

// Supabase fetcher for matches with team relations
const matchesFetcher = async ([, token]: [string, (string | null)?]) => {
  const supabase = createSupabaseClient(token)
  const { data, error } = await supabase
    .from('matches')
    .select(`
      *,
      team_a:team_a_id (
        id,
        name,
        logo_url
      ),
      team_b:team_b_id (
        id,
        name,
        logo_url
      ),
      winner:winner_id (
        id,
        name,
        logo_url
      )
    `)
    .order('played_at', { ascending: false })
    .limit(100)
  
  if (error) throw error
  return data || []
}

// Supabase fetcher for tournaments (events)
const tournamentsFetcher = async ([, token]: [string, (string | null)?]) => {
  const supabase = createSupabaseClient(token)
  const { data, error } = await supabase
    .from('tournaments')
    .select('*')
    .order('start_date', { ascending: false })
  
  if (error) throw error
  return data || []
}

// Fetcher for team roster (players on a specific team)
// Expects key format: ['key-name', teamId, token]
const teamRosterFetcher = async ([, teamId, token]: [string, string, (string | null)?]) => {
  const supabase = createSupabaseClient(token)
  const { data, error } = await supabase
    .from('players')
    .select('*')
    .eq('current_team_id', teamId)
  
  if (error) throw error
  return data || []
}

// Admin hook for players (using Supabase)
export const useAdminPlayers = () => {
  const { token, isLoaded } = useSupabaseToken()

  const { data, error, isLoading, mutate } = useSWR(
    isLoaded ? ['admin-players', token] : null,
    playersFetcher
  )

  return {
    players: data || [],
    loading: !isLoaded || isLoading,
    error,
    refetch: mutate,
  }
}

// Admin hook for teams (using Supabase)
export const useAdminTeams = () => {
  const { token, isLoaded } = useSupabaseToken()

  const { data, error, isLoading, mutate } = useSWR(
    isLoaded ? ['admin-teams', token] : null,
    teamsFetcher
  )

  return {
    teams: data || [],
    loading: !isLoaded || isLoading,
    error,
    refetch: mutate,
  }
}

// Admin hook for matches (using Supabase)
export const useAdminMatches = () => {
  const { token, isLoaded } = useSupabaseToken()

  const { data, error, isLoading, mutate } = useSWR(
    isLoaded ? ['admin-matches', token] : null,
    matchesFetcher
  )

  return {
    matches: data || [],
    loading: !isLoaded || isLoading,
    error,
    refetch: mutate,
  }
}

// Admin hook for tournaments/events (using Supabase)
export const useAdminEvents = () => {
  const { token, isLoaded } = useSupabaseToken()

  const { data, error, isLoading, mutate } = useSWR(
    isLoaded ? ['admin-tournaments', token] : null,
    tournamentsFetcher
  )

  return {
    events: data || [],
    loading: !isLoaded || isLoading,
    error,
    refetch: mutate,
  }
}

// Public hooks - use Supabase for live data (no auth required for public access)
// Passing null as token
export const usePublicPlayers = () => {
  const { data, error, isLoading, mutate } = useSWR(
    ['public-players', null],
    playersFetcher
  )

  return {
    players: data || [],
    loading: isLoading,
    error,
    refetch: mutate,
  }
}

export const usePublicTeams = () => {
  const { data, error, isLoading, mutate } = useSWR(
    ['public-teams', null],
    teamsFetcher
  )

  return {
    teams: data || [],
    loading: isLoading,
    error,
    refetch: mutate,
  }
}

export const usePublicMatches = () => {
  const { data, error, isLoading, mutate } = useSWR(
    ['public-matches', null],
    matchesFetcher
  )

  return {
    matches: data || [],
    loading: isLoading,
    error,
    refetch: mutate,
  }
}

export const usePublicTournaments = () => {
  const { data, error, isLoading, mutate } = useSWR(
    ['public-tournaments', null],
    tournamentsFetcher
  )

  return {
    events: data || [],
    tournaments: data || [],
    loading: isLoading,
    error,
    refetch: mutate,
  }
}

// Single player fetcher
const playerFetcher = async ([, id, token]: [string, string, (string | null)?]) => {
  const supabase = createSupabaseClient(token)
  const { data, error } = await supabase
    .from('players')
    .select(`
      *,
      teams:current_team_id (
        id,
        name,
        logo_url,
        current_rp,
        elo_rating
      )
    `)
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data
}

export const usePublicPlayer = (id: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    id ? ['public-player', id, null] : null,
    playerFetcher
  )

  return {
    player: data,
    loading: isLoading,
    error,
    refetch: mutate,
  }
}

// Team roster hook
export const useTeamRoster = (teamId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    teamId ? ['team-roster', teamId, null] : null,
    teamRosterFetcher
  )

  return {
    players: data || [],
    loading: isLoading,
    error,
    refetch: mutate,
  }
}
