import { apolloClient } from '@/lib/graphql/client'
import { 
  GET_PLAYERS, 
  GET_PLAYER, 
  GET_TEAMS, 
  GET_TEAM,
  GET_MATCHES, 
  GET_MATCH,
  GET_EVENTS,
  GET_EVENT,
  GET_USERS,
  GET_USER
} from '@/lib/graphql/queries'

/**
 * GraphQL service layer for the Bodega Cats GC platform
 * Provides access to all data operations through the GraphQL API
 */
export class GraphQLService {
  /**
   * Get all players with optional filtering and pagination
   */
  async getPlayers(first = 20, offset = 0, filter?: any, orderBy?: string[]) {
    const { data } = await apolloClient.query({
      query: GET_PLAYERS,
      variables: { first, offset, filter, orderBy },
      errorPolicy: 'all',
    })
    return data.playersCollection?.edges?.map((edge: any) => edge.node) || []
  }

  /**
   * Get a single player by ID
   */
  async getPlayer(nodeId: string) {
    const { data } = await apolloClient.query({
      query: GET_PLAYER,
      variables: { nodeId },
      errorPolicy: 'all',
    })
    return data.node
  }

  /**
   * Get all teams with pagination
   */
  async getTeams(first = 10, offset = 0, filter?: any, orderBy?: string[]) {
    const { data } = await apolloClient.query({
      query: GET_TEAMS,
      variables: { first, offset, filter, orderBy },
      errorPolicy: 'all',
    })
    return data.teamsCollection?.edges?.map((edge: any) => edge.node) || []
  }

  /**
   * Get a single team by ID
   */
  async getTeam(nodeId: string) {
    const { data } = await apolloClient.query({
      query: GET_TEAM,
      variables: { nodeId },
      errorPolicy: 'all',
    })
    return data.node
  }

  /**
   * Get all matches with optional filtering and pagination
   */
  async getMatches(first = 20, offset = 0, filter?: any, orderBy?: string[]) {
    const { data } = await apolloClient.query({
      query: GET_MATCHES,
      variables: { first, offset, filter, orderBy },
      errorPolicy: 'all',
    })
    return data.matchesCollection?.edges?.map((edge: any) => edge.node) || []
  }

  /**
   * Get a single match by ID
   */
  async getMatch(nodeId: string) {
    const { data } = await apolloClient.query({
      query: GET_MATCH,
      variables: { nodeId },
      errorPolicy: 'all',
    })
    return data.node
  }

  /**
   * Get all events with optional filtering and pagination
   */
  async getEvents(first = 10, offset = 0, filter?: any, orderBy?: string[]) {
    const { data } = await apolloClient.query({
      query: GET_EVENTS,
      variables: { first, offset, filter, orderBy },
      errorPolicy: 'all',
    })
    return data.eventsCollection?.edges?.map((edge: any) => edge.node) || []
  }

  /**
   * Get a single event by ID
   */
  async getEvent(nodeId: string) {
    const { data } = await apolloClient.query({
      query: GET_EVENT,
      variables: { nodeId },
      errorPolicy: 'all',
    })
    return data.node
  }

  /**
   * Get all users with pagination (admin only)
   */
  async getUsers(first = 10, offset = 0, filter?: any, orderBy?: string[]) {
    const { data } = await apolloClient.query({
      query: GET_USERS,
      variables: { first, offset, filter, orderBy },
      errorPolicy: 'all',
    })
    return data.profilesCollection?.edges?.map((edge: any) => edge.node) || []
  }

  /**
   * Get a single user by ID (admin only)
   */
  async getUser(nodeId: string) {
    const { data } = await apolloClient.query({
      query: GET_USER,
      variables: { nodeId },
      errorPolicy: 'all',
    })
    return data.node
  }
}

// Export singleton instance
export const graphqlService = new GraphQLService()
