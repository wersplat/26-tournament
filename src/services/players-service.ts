import { apiClient } from './api-client';
import { 
  Player, 
  PlayerStats, 
  PlayerStatsCreate, 
  PlayerStatsUpdate,
  PaginatedResponse,
  ApiResponse 
} from '@/types/schema';

/**
 * Service for player-related API calls
 */
export const playersService = {
  /**
   * Get current user's player profile
   */
  getMyProfile: () => {
    return apiClient.adminGet<Player>('/v1/players/me/profile');
  },

  /**
   * Update current user's player profile
   */
  updateMyProfile: (data: Partial<Player>) => {
    return apiClient.adminPost<Player>('/v1/players/me/profile', data);
  },

  /**
   * Get player by ID
   */
  getPlayer: (playerId: string) => {
    return apiClient.publicGet<Player>(`/v1/players/${playerId}`);
  },

  /**
   * Create a new player profile
   */
  createPlayer: (data: Partial<Player>) => {
    return apiClient.adminPost<Player>('/v1/players', data);
  },

  /**
   * Search for player by gamertag
   */
  searchPlayerByGamertag: (gamertag: string) => {
    return apiClient.publicGet<Player[]>(`/v1/players/search?gamertag=${encodeURIComponent(gamertag)}`);
  },

  /**
   * Get player history
   */
  getPlayerHistory: (playerId: string) => {
    return apiClient.publicGet<PlayerStats[]>(`/v1/players/${playerId}/history`);
  },

  /**
   * Get player statistics
   */
  getPlayerStats: (playerId: string, limit = 10, offset = 0) => {
    return apiClient.publicGet<PaginatedResponse<PlayerStats>>(
      `/v1/player-stats/?player_id=${playerId}&limit=${limit}&offset=${offset}`
    );
  },

  /**
   * Get all players (admin only)
   */
  getAllPlayers: (limit = 100, offset = 0) => {
    return apiClient.adminGet<PaginatedResponse<Player>>(
      `/v1/admin/players?limit=${limit}&offset=${offset}`
    );
  },

  /**
   * Update player RP (admin only)
   */
  updatePlayerRP: (playerId: string, rpChange: number, reason: string) => {
    return apiClient.adminPost<ApiResponse<Player>>('/v1/admin/update-rp', {
      player_id: playerId,
      rp_change: rpChange,
      reason
    });
  }
};
