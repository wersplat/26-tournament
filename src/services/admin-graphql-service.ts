import { apolloClient } from '@/lib/graphql/client'
import { 
  CREATE_MATCH,
  UPDATE_MATCH,
  DELETE_MATCH,
  CREATE_PLAYER_STATS,
  UPDATE_PLAYER_STATS,
  DELETE_PLAYER_STATS,
  CREATE_PLAYER,
  UPDATE_PLAYER,
  DELETE_PLAYER,
  CREATE_TEAM,
  UPDATE_TEAM,
  DELETE_TEAM,
  CREATE_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT
} from '@/lib/graphql/mutations'

/**
 * Admin GraphQL service for mutation operations
 * Handles all write operations and admin-specific functionality
 */
export class AdminGraphQLService {
  /**
   * Create a new match
   */
  async createMatch(matchData: any) {
    const { data } = await apolloClient.mutate({
      mutation: CREATE_MATCH,
      variables: { input: matchData },
      errorPolicy: 'all',
    })
    return data.insertIntomatchesCollection.records[0]
  }

  /**
   * Update an existing match
   */
  async updateMatch(id: string, matchData: any) {
    const { data } = await apolloClient.mutate({
      mutation: UPDATE_MATCH,
      variables: { 
        filter: { id: { eq: id } },
        set: matchData 
      },
      errorPolicy: 'all',
    })
    return data.updatematchesCollection.records[0]
  }

  /**
   * Delete a match
   */
  async deleteMatch(id: string): Promise<boolean> {
    const { data } = await apolloClient.mutate({
      mutation: DELETE_MATCH,
      variables: { 
        filter: { id: { eq: id } },
        atMost: 1 
      },
      errorPolicy: 'all',
    })
    return data.deleteFrommatchesCollection.affectedCount > 0
  }

  /**
   * Create player match statistics
   */
  async createPlayerStats(statsData: any) {
    const { data } = await apolloClient.mutate({
      mutation: CREATE_PLAYER_STATS,
      variables: { input: statsData },
      errorPolicy: 'all',
    })
    return data.insertIntoplayer_statsCollection.records[0]
  }

  /**
   * Update player match statistics
   */
  async updatePlayerStats(id: string, statsData: any) {
    const { data } = await apolloClient.mutate({
      mutation: UPDATE_PLAYER_STATS,
      variables: { 
        filter: { id: { eq: id } },
        set: statsData 
      },
      errorPolicy: 'all',
    })
    return data.updateplayer_statsCollection.records[0]
  }

  /**
   * Delete player match statistics
   */
  async deletePlayerStats(id: string): Promise<boolean> {
    const { data } = await apolloClient.mutate({
      mutation: DELETE_PLAYER_STATS,
      variables: { 
        filter: { id: { eq: id } },
        atMost: 1 
      },
      errorPolicy: 'all',
    })
    return data.deleteFromplayer_statsCollection.affectedCount > 0
  }

  /**
   * Submit multiple player match statistics
   */
  async submitMatchStats(matchId: string, stats: any[]): Promise<any[]> {
    const results = []
    for (const stat of stats) {
      const result = await this.createPlayerStats({
        ...stat,
        match_id: matchId
      })
      results.push(result)
    }
    return results
  }

  /**
   * Create a new player
   */
  async createPlayer(playerData: any) {
    const { data } = await apolloClient.mutate({
      mutation: CREATE_PLAYER,
      variables: { input: playerData },
      errorPolicy: 'all',
    })
    return data.insertIntoplayersCollection.records[0]
  }

  /**
   * Update an existing player
   */
  async updatePlayer(id: string, playerData: any) {
    const { data } = await apolloClient.mutate({
      mutation: UPDATE_PLAYER,
      variables: { 
        filter: { id: { eq: id } },
        set: playerData 
      },
      errorPolicy: 'all',
    })
    return data.updateplayersCollection.records[0]
  }

  /**
   * Delete a player
   */
  async deletePlayer(id: string): Promise<boolean> {
    const { data } = await apolloClient.mutate({
      mutation: DELETE_PLAYER,
      variables: { 
        filter: { id: { eq: id } },
        atMost: 1 
      },
      errorPolicy: 'all',
    })
    return data.deleteFromplayersCollection.affectedCount > 0
  }

  /**
   * Create a new team
   */
  async createTeam(teamData: any) {
    const { data } = await apolloClient.mutate({
      mutation: CREATE_TEAM,
      variables: { input: teamData },
      errorPolicy: 'all',
    })
    return data.insertIntoteamsCollection.records[0]
  }

  /**
   * Update an existing team
   */
  async updateTeam(id: string, teamData: any) {
    const { data } = await apolloClient.mutate({
      mutation: UPDATE_TEAM,
      variables: { 
        filter: { id: { eq: id } },
        set: teamData 
      },
      errorPolicy: 'all',
    })
    return data.updateteamsCollection.records[0]
  }

  /**
   * Delete a team
   */
  async deleteTeam(id: string): Promise<boolean> {
    const { data } = await apolloClient.mutate({
      mutation: DELETE_TEAM,
      variables: { 
        filter: { id: { eq: id } },
        atMost: 1 
      },
      errorPolicy: 'all',
    })
    return data.deleteFromteamsCollection.affectedCount > 0
  }

  /**
   * Create a new event
   */
  async createEvent(eventData: any) {
    const { data } = await apolloClient.mutate({
      mutation: CREATE_EVENT,
      variables: { input: eventData },
      errorPolicy: 'all',
    })
    return data.insertIntoeventsCollection.records[0]
  }

  /**
   * Update an existing event
   */
  async updateEvent(id: string, eventData: any) {
    const { data } = await apolloClient.mutate({
      mutation: UPDATE_EVENT,
      variables: { 
        filter: { id: { eq: id } },
        set: eventData 
      },
      errorPolicy: 'all',
    })
    return data.updateeventsCollection.records[0]
  }

  /**
   * Delete an event
   */
  async deleteEvent(id: string): Promise<boolean> {
    const { data } = await apolloClient.mutate({
      mutation: DELETE_EVENT,
      variables: { 
        filter: { id: { eq: id } },
        atMost: 1 
      },
      errorPolicy: 'all',
    })
    return data.deleteFromeventsCollection.affectedCount > 0
  }
}

// Export singleton instance
export const adminGraphqlService = new AdminGraphQLService()
