import { adminGraphqlService } from './admin-graphql-service'
import { graphqlService } from './graphql-service'
import { 
  User, 
  Player, 
  Team, 
  Event, 
  Match, 
  PlayerMatchStats
} from '@/types/graphql'

/**
 * Admin API client that uses GraphQL for all operations
 * This replaces the old REST API client with GraphQL operations
 */
class AdminApiClient {
  /**
   * Get all players with pagination
   */
  async getPlayers(limit = 100, offset = 0): Promise<Player[]> {
    return graphqlService.getPlayers(limit, offset)
  }

  /**
   * Get a single player by ID
   */
  async getPlayer(id: string): Promise<Player | null> {
    return graphqlService.getPlayer(id)
  }

  /**
   * Get all teams with pagination
   */
  async getTeams(limit = 100, offset = 0): Promise<Team[]> {
    return graphqlService.getTeams(limit, offset)
  }

  /**
   * Get a single team by ID
   */
  async getTeam(id: string): Promise<Team | null> {
    return graphqlService.getTeam(id)
  }

  /**
   * Get all matches with pagination
   */
  async getMatches(limit = 100, offset = 0): Promise<Match[]> {
    return graphqlService.getMatches(limit, offset)
  }

  /**
   * Get a single match by ID
   */
  async getMatch(id: string): Promise<Match | null> {
    return graphqlService.getMatch(id)
  }

  /**
   * Get all events with pagination
   */
  async getEvents(limit = 100, offset = 0): Promise<Event[]> {
    return graphqlService.getEvents(limit, offset)
  }

  /**
   * Get a single event by ID
   */
  async getEvent(id: string): Promise<Event | null> {
    return graphqlService.getEvent(id)
  }

  /**
   * Get all users with pagination
   */
  async getUsers(limit = 100, offset = 0): Promise<User[]> {
    return graphqlService.getUsers(limit, offset)
  }

  /**
   * Get a single user by ID
   */
  async getUser(id: string): Promise<User | null> {
    return graphqlService.getUser(id)
  }

  /**
   * Create a new match
   */
  async createMatch(matchData: any): Promise<Match> {
    return adminGraphqlService.createMatch(matchData)
  }

  /**
   * Update an existing match
   */
  async updateMatch(id: string, matchData: any): Promise<Match> {
    return adminGraphqlService.updateMatch(id, matchData)
  }

  /**
   * Delete a match
   */
  async deleteMatch(id: string): Promise<boolean> {
    return adminGraphqlService.deleteMatch(id)
  }

  /**
   * Submit player match statistics
   */
  async submitMatchStats(matchId: string, stats: any[]): Promise<PlayerMatchStats[]> {
    return adminGraphqlService.submitMatchStats(matchId, stats)
  }

  /**
   * Create a new player
   */
  async createPlayer(playerData: any): Promise<Player> {
    return adminGraphqlService.createPlayer(playerData)
  }

  /**
   * Update an existing player
   */
  async updatePlayer(id: string, playerData: any): Promise<Player> {
    return adminGraphqlService.updatePlayer(id, playerData)
  }

  /**
   * Delete a player
   */
  async deletePlayer(id: string): Promise<boolean> {
    return adminGraphqlService.deletePlayer(id)
  }

  /**
   * Create a new team
   */
  async createTeam(teamData: any): Promise<Team> {
    return adminGraphqlService.createTeam(teamData)
  }

  /**
   * Update an existing team
   */
  async updateTeam(id: string, teamData: any): Promise<Team> {
    return adminGraphqlService.updateTeam(id, teamData)
  }

  /**
   * Delete a team
   */
  async deleteTeam(id: string): Promise<boolean> {
    return adminGraphqlService.deleteTeam(id)
  }

  /**
   * Create a new event
   */
  async createEvent(eventData: any): Promise<Event> {
    return adminGraphqlService.createEvent(eventData)
  }

  /**
   * Update an existing event
   */
  async updateEvent(id: string, eventData: any): Promise<Event> {
    return adminGraphqlService.updateEvent(id, eventData)
  }

  /**
   * Delete an event
   */
  async deleteEvent(id: string): Promise<boolean> {
    return adminGraphqlService.deleteEvent(id)
  }

  // Legacy method names for backward compatibility
  async get<T>(endpoint: string): Promise<T> {
    // Parse endpoint to determine what to fetch
    if (endpoint.includes('/players')) {
      const params = new URLSearchParams(endpoint.split('?')[1] || '')
      const limit = parseInt(params.get('limit') || '100')
      const offset = parseInt(params.get('offset') || '0')
      return this.getPlayers(limit, offset) as T
    }
    if (endpoint.includes('/teams')) {
      const params = new URLSearchParams(endpoint.split('?')[1] || '')
      const limit = parseInt(params.get('limit') || '100')
      const offset = parseInt(params.get('offset') || '0')
      return this.getTeams(limit, offset) as T
    }
    if (endpoint.includes('/matches')) {
      const params = new URLSearchParams(endpoint.split('?')[1] || '')
      const limit = parseInt(params.get('limit') || '100')
      const offset = parseInt(params.get('offset') || '0')
      return this.getMatches(limit, offset) as T
    }
    if (endpoint.includes('/events')) {
      const params = new URLSearchParams(endpoint.split('?')[1] || '')
      const limit = parseInt(params.get('limit') || '100')
      const offset = parseInt(params.get('offset') || '0')
      return this.getEvents(limit, offset) as T
    }
    if (endpoint.includes('/users')) {
      const params = new URLSearchParams(endpoint.split('?')[1] || '')
      const limit = parseInt(params.get('limit') || '100')
      const offset = parseInt(params.get('offset') || '0')
      return this.getUsers(limit, offset) as T
    }
    throw new Error(`Unsupported GET endpoint: ${endpoint}`)
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    if (endpoint.includes('/matches')) {
      return this.createMatch(data) as T
    }
    if (endpoint.includes('/players')) {
      return this.createPlayer(data) as T
    }
    if (endpoint.includes('/teams')) {
      return this.createTeam(data) as T
    }
    if (endpoint.includes('/events')) {
      return this.createEvent(data) as T
    }
    if (endpoint.includes('/match-stats')) {
      return this.submitMatchStats(data.matchId, data.stats) as T
    }
    throw new Error(`Unsupported POST endpoint: ${endpoint}`)
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    const id = endpoint.split('/').pop()
    if (!id) throw new Error('No ID provided for PUT request')
    
    if (endpoint.includes('/matches/')) {
      return this.updateMatch(id, data) as T
    }
    if (endpoint.includes('/players/')) {
      return this.updatePlayer(id, data) as T
    }
    if (endpoint.includes('/teams/')) {
      return this.updateTeam(id, data) as T
    }
    if (endpoint.includes('/events/')) {
      return this.updateEvent(id, data) as T
    }
    throw new Error(`Unsupported PUT endpoint: ${endpoint}`)
  }

  async delete<T>(endpoint: string): Promise<T> {
    const id = endpoint.split('/').pop()
    if (!id) throw new Error('No ID provided for DELETE request')
    
    if (endpoint.includes('/matches/')) {
      return this.deleteMatch(id) as T
    }
    if (endpoint.includes('/players/')) {
      return this.deletePlayer(id) as T
    }
    if (endpoint.includes('/teams/')) {
      return this.deleteTeam(id) as T
    }
    if (endpoint.includes('/events/')) {
      return this.deleteEvent(id) as T
    }
    throw new Error(`Unsupported DELETE endpoint: ${endpoint}`)
  }

  async patch<T>(endpoint: string, data: any): Promise<T> {
    // Treat PATCH the same as PUT for GraphQL
    return this.put<T>(endpoint, data)
  }
}

// Export a singleton instance
export const adminApiClient = new AdminApiClient() 