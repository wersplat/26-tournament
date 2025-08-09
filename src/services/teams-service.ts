import { apiClient } from './api-client';
import { 
  Team, 
  TeamRoster, 
  TeamMatchStats, 
  TeamMatchStatsCreate,
  Player,
  Match,
  PaginatedResponse,
  ApiResponse 
} from '@/types/schema';

/**
 * Service for team-related API calls
 */
export const teamsService = {
  /**
   * Get all teams
   */
  getAllTeams: (limit = 100, offset = 0) => {
    return apiClient.publicGet<PaginatedResponse<Team>>(
      `/v1/teams?limit=${limit}&offset=${offset}`
    );
  },

  /**
   * Get team by ID
   */
  getTeam: (teamId: string) => {
    return apiClient.publicGet<Team>(`/v1/teams/${teamId}`);
  },

  /**
   * Get team roster
   */
  getTeamRoster: (teamId: string) => {
    return apiClient.publicGet<TeamRoster[]>(`/v1/teams/${teamId}/roster`);
  },

  /**
   * Get team players
   */
  getTeamPlayers: (teamId: string) => {
    return apiClient.publicGet<Player[]>(`/v1/teams/${teamId}/players`);
  },

  /**
   * Get team matches
   */
  getTeamMatches: (teamId: string, limit = 10, offset = 0) => {
    return apiClient.publicGet<PaginatedResponse<Match>>(
      `/v1/teams/${teamId}/matches?limit=${limit}&offset=${offset}`
    );
  },

  /**
   * Get team statistics
   */
  getTeamStats: (teamId: string) => {
    return apiClient.publicGet<TeamMatchStats[]>(`/v1/teams/${teamId}/stats`);
  },

  /**
   * Get team match statistics
   */
  getTeamMatchStats: (teamId: string, matchId: string) => {
    return apiClient.publicGet<TeamMatchStats>(`/v1/teams/${teamId}/matches/${matchId}/stats`);
  },

  /**
   * Create team match statistics
   */
  createTeamMatchStats: (stats: TeamMatchStatsCreate) => {
    return apiClient.adminPost<TeamMatchStats>('/v1/team-match-stats', stats);
  },

  /**
   * Update team match statistics
   */
  updateTeamMatchStats: (statsId: string, stats: Partial<TeamMatchStatsCreate>) => {
    return apiClient.adminPut<TeamMatchStats>(`/v1/team-match-stats/${statsId}`, stats);
  },

  /**
   * Delete team match statistics
   */
  deleteTeamMatchStats: (statsId: string) => {
    return apiClient.adminDelete<void>(`/v1/team-match-stats/${statsId}`);
  },

  /**
   * Add player to team roster
   */
  addPlayerToRoster: (teamId: string, playerId: string, isCaptain = false, isPlayerCoach = false) => {
    return apiClient.adminPost<TeamRoster>('/v1/team-rosters', {
      team_id: teamId,
      player_id: playerId,
      is_captain: isCaptain,
      is_player_coach: isPlayerCoach
    });
  },

  /**
   * Remove player from team roster
   */
  removePlayerFromRoster: (rosterId: string) => {
    return apiClient.adminDelete<void>(`/v1/team-rosters/${rosterId}`);
  },

  /**
   * Create a new team (admin only)
   */
  createTeam: (teamData: Partial<Team>) => {
    return apiClient.adminPost<Team>('/v1/admin/teams', teamData);
  },

  /**
   * Update team (admin only)
   */
  updateTeam: (teamId: string, teamData: Partial<Team>) => {
    return apiClient.adminPut<Team>(`/v1/admin/teams/${teamId}`, teamData);
  },

  /**
   * Delete team (admin only)
   */
  deleteTeam: (teamId: string) => {
    return apiClient.adminDelete<void>(`/v1/admin/teams/${teamId}`);
  }
}; 