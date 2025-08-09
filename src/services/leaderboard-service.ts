import { graphqlService } from './graphql-service';
import { players, player_position } from '@/types/graphql';

/**
 * Types for leaderboard data
 */
export enum PlayerTier {
  BRONZE = 'bronze',
  SILVER = 'silver',
  GOLD = 'gold',
  PLATINUM = 'platinum',
  DIAMOND = 'diamond'
}

export enum LeaderboardSortBy {
  CURRENT_RP = 'player_rp',
  PEAK_RP = 'player_rank_score',
  WINS = 'wins',
  WIN_RATE = 'win_rate'
}

export interface PlayerProfile extends players {
  // Additional profile fields that might be included in leaderboard responses
  win_rate?: number;
  rank?: number;
  wins?: number;
  losses?: number;
}

/**
 * Service for leaderboard-related GraphQL calls
 */
export const leaderboardService = {
  /**
   * Get global leaderboard with various sorting options
   */
  getGlobalLeaderboard: async (
    limit: number = 100,
    offset: number = 0,
    tier?: PlayerTier,
    sortBy: LeaderboardSortBy = LeaderboardSortBy.CURRENT_RP,
    descending: boolean = true
  ): Promise<PlayerProfile[]> => {
    let filter: any = {};
    let orderBy: string[] = [];
    
    if (tier) {
      // Map tier to position filter
      const tierToPosition: Record<PlayerTier, player_position> = {
        [PlayerTier.BRONZE]: player_position.POINT_GUARD, // This would need to be adjusted based on actual tier mapping
        [PlayerTier.SILVER]: player_position.SHOOTING_GUARD,
        [PlayerTier.GOLD]: player_position.LOCK,
        [PlayerTier.PLATINUM]: player_position.POWER_FORWARD,
        [PlayerTier.DIAMOND]: player_position.CENTER,
      };
      filter.position = { eq: tierToPosition[tier] };
    }
    
    // Add sorting
    const sortField = sortBy === LeaderboardSortBy.CURRENT_RP ? 'player_rp' : 
                     sortBy === LeaderboardSortBy.PEAK_RP ? 'player_rank_score' : 
                     'player_rp'; // Default to player_rp
    
    orderBy.push(`${sortField} ${descending ? 'DESC' : 'ASC'}`);
    
    const players = await graphqlService.getPlayers(limit, offset, filter, orderBy);
    
    // Transform to PlayerProfile format
    return players.map((player, index) => ({
      ...player,
      rank: offset + index + 1,
      // Note: wins/losses would need to be calculated from match data
      // For now, we'll use placeholder values
      wins: 0,
      losses: 0,
      win_rate: 0
    }));
  },

  /**
   * Get top players globally by current RP
   */
  getTopPlayers: async (limit: number = 10): Promise<PlayerProfile[]> => {
    const orderBy = ['player_rp DESC'];
    const players = await graphqlService.getPlayers(limit, 0, {}, orderBy);
    
    return players.map((player: players, index: number) => ({
      ...player,
      rank: index + 1,
      wins: 0,
      losses: 0,
      win_rate: 0
    }));
  },

  /**
   * Get leaderboard for a specific tier
   */
  getTierLeaderboard: async (
    tier: PlayerTier,
    limit: number = 100,
    offset: number = 0
  ): Promise<PlayerProfile[]> => {
    // Map tier to position filter (this would need to be adjusted based on actual tier mapping)
    const tierToPosition: Record<PlayerTier, player_position> = {
      [PlayerTier.BRONZE]: player_position.POINT_GUARD,
      [PlayerTier.SILVER]: player_position.SHOOTING_GUARD,
      [PlayerTier.GOLD]: player_position.LOCK,
      [PlayerTier.PLATINUM]: player_position.POWER_FORWARD,
      [PlayerTier.DIAMOND]: player_position.CENTER,
    };
    
    const filter = { position: { eq: tierToPosition[tier] } };
    const orderBy = ['player_rp DESC'];
    
    const players = await graphqlService.getPlayers(limit, offset, filter, orderBy);
    
    return players.map((player: players, index: number) => ({
      ...player,
      rank: offset + index + 1,
      wins: 0,
      losses: 0,
      win_rate: 0
    }));
  },

  /**
   * Get leaderboard for a specific event
   */
  getEventLeaderboard: async (eventId: string): Promise<PlayerProfile[]> => {
    // This would need to be implemented by querying matches for the event
    // and aggregating player statistics
    const filter = {}; // Would need to filter by event participation
    const orderBy = ['player_rp DESC'];
    
    const players = await graphqlService.getPlayers(100, 0, filter, orderBy);
    
    return players.map((player: players, index: number) => ({
      ...player,
      rank: index + 1,
      wins: 0,
      losses: 0,
      win_rate: 0
    }));
  },

  /**
   * Get leaderboard by peak RP
   */
  getPeakRpLeaderboard: async (
    limit: number = 100,
    offset: number = 0
  ): Promise<PlayerProfile[]> => {
    const orderBy = ['player_rank_score DESC'];
    const players = await graphqlService.getPlayers(limit, offset, {}, orderBy);
    
    return players.map((player: players, index: number) => ({
      ...player,
      rank: offset + index + 1,
      wins: 0,
      losses: 0,
      win_rate: 0
    }));
  },

  /**
   * Get leaderboard for a specific platform
   */
  getPlatformLeaderboard: async (
    platform: string,
    limit: number = 100,
    offset: number = 0
  ): Promise<PlayerProfile[]> => {
    // Platform filtering would need to be implemented based on available fields
    const filter = {};
    const orderBy = ['player_rp DESC'];
    
    const players = await graphqlService.getPlayers(limit, offset, filter, orderBy);
    
    return players.map((player: players, index: number) => ({
      ...player,
      rank: offset + index + 1,
      wins: 0,
      losses: 0,
      win_rate: 0
    }));
  },

  /**
   * Get leaderboard for a specific region
   */
  getRegionLeaderboard: async (
    region: string,
    limit: number = 100,
    offset: number = 0
  ): Promise<PlayerProfile[]> => {
    const filter = { region_id: { eq: region } };
    const orderBy = ['player_rp DESC'];
    
    const players = await graphqlService.getPlayers(limit, offset, filter, orderBy);
    
    return players.map((player, index) => ({
      ...player,
      rank: offset + index + 1,
      wins: 0,
      losses: 0,
      win_rate: 0
    }));
  }
};
