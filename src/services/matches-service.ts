import { apiClient } from './api-client';
import { 
  Match, 
  MatchCreate, 
  MatchUpdate,
  UpcomingMatch,
  PlayerStats,
  PlayerStatsCreate,
  PlayerStatsUpdate,
  TeamMatchStats,
  TeamMatchStatsCreate,
  MatchMVP,
  MatchSubmission,
  PaginatedResponse,
  ApiResponse 
} from '@/types/schema';

/**
 * Service for match-related API calls
 */
export const matchesService = {
  /**
   * Get all matches
   */
  getAllMatches: (limit = 100, offset = 0) => {
    return apiClient.publicGet<PaginatedResponse<Match>>(
      `/v1/matches?limit=${limit}&offset=${offset}`
    );
  },

  /**
   * Get match by ID
   */
  getMatch: (matchId: string) => {
    return apiClient.publicGet<Match>(`/v1/matches/${matchId}`);
  },

  /**
   * Get match player statistics
   */
  getMatchPlayerStats: (matchId: string) => {
    return apiClient.publicGet<PlayerStats[]>(`/v1/matches/${matchId}/player-stats`);
  },

  /**
   * Get match team statistics
   */
  getMatchTeamStats: (matchId: string) => {
    return apiClient.publicGet<TeamMatchStats[]>(`/v1/matches/${matchId}/team-stats`);
  },

  /**
   * Get match MVP
   */
  getMatchMVP: (matchId: string) => {
    return apiClient.publicGet<MatchMVP>(`/v1/matches/${matchId}/mvp`);
  },

  /**
   * Set match MVP
   */
  setMatchMVP: (matchId: string, playerId: string) => {
    return apiClient.adminPost<MatchMVP>('/v1/match-mvp', {
      match_id: matchId,
      player_id: playerId
    });
  },

  /**
   * Get upcoming matches
   */
  getUpcomingMatches: (limit = 50, offset = 0) => {
    return apiClient.publicGet<PaginatedResponse<UpcomingMatch>>(
      `/v1/upcoming-matches?limit=${limit}&offset=${offset}`
    );
  },

  /**
   * Get upcoming match by ID
   */
  getUpcomingMatch: (matchId: string) => {
    return apiClient.publicGet<UpcomingMatch>(`/v1/upcoming-matches/${matchId}`);
  },

  /**
   * Update upcoming match
   */
  updateUpcomingMatch: (matchId: string, matchData: Partial<UpcomingMatch>) => {
    return apiClient.adminPut<UpcomingMatch>(`/v1/upcoming-matches/${matchId}`, matchData);
  },

  /**
   * Create a new match (admin only)
   */
  createMatch: (matchData: MatchCreate) => {
    return apiClient.adminPost<Match>('/v1/admin/matches', matchData);
  },

  /**
   * Update match (admin only)
   */
  updateMatch: (matchId: string, matchData: MatchUpdate) => {
    return apiClient.adminPut<Match>(`/v1/admin/matches/${matchId}`, matchData);
  },

  /**
   * Delete match (admin only)
   */
  deleteMatch: (matchId: string) => {
    return apiClient.adminDelete<void>(`/v1/admin/matches/${matchId}`);
  },

  /**
   * Create player statistics for a match
   */
  createPlayerStats: (stats: PlayerStatsCreate) => {
    return apiClient.adminPost<PlayerStats>('/v1/player-stats', stats);
  },

  /**
   * Update player statistics
   */
  updatePlayerStats: (statsId: string, stats: PlayerStatsUpdate) => {
    return apiClient.adminPut<PlayerStats>(`/v1/player-stats/${statsId}`, stats);
  },

  /**
   * Delete player statistics
   */
  deletePlayerStats: (statsId: string) => {
    return apiClient.adminDelete<void>(`/v1/player-stats/${statsId}`);
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
   * Submit match result
   */
  submitMatchResult: (submission: Partial<MatchSubmission>) => {
    return apiClient.adminPost<MatchSubmission>('/v1/match-submissions', submission);
  },

  /**
   * Get match submissions
   */
  getMatchSubmissions: (status?: string) => {
    let endpoint = '/v1/match-submissions';
    if (status) {
      endpoint += `?status=${status}`;
    }
    return apiClient.publicGet<MatchSubmission[]>(endpoint);
  },

  /**
   * Review match submission (admin only)
   */
  reviewMatchSubmission: (submissionId: string, reviewStatus: string, reviewedBy: string) => {
    return apiClient.adminPut<MatchSubmission>(`/v1/admin/match-submissions/${submissionId}/review`, {
      review_status: reviewStatus,
      reviewed_by: reviewedBy
    });
  }
}; 