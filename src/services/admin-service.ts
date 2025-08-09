import { adminApiClient } from './admin-api-client';
import { 
  Player, 
  PlayerStats, 
  PlayerStatsCreate, 
  PlayerStatsUpdate,
  Team,
  TeamMatchStats,
  TeamMatchStatsCreate,
  Event,
  EventGroup,
  GroupStandings,
  Match,
  MatchCreate,
  MatchUpdate,
  RPTransaction,
  AwardsRace,
  DraftPool,
  EventResults,
  TeamsPotTracker,
  PaginatedResponse,
  ApiResponse
} from '@/types/schema';

// Player Management
export const createPlayerStats = async (stats: PlayerStatsCreate): Promise<PlayerStats> => {
  return adminApiClient.post<PlayerStats>('/player-stats', stats);
};

export const updatePlayerStats = async (id: string, stats: PlayerStatsUpdate): Promise<PlayerStats> => {
  return adminApiClient.put<PlayerStats>(`/player-stats/${id}`, stats);
};

export const deletePlayerStats = async (id: string): Promise<void> => {
  return adminApiClient.delete<void>(`/player-stats/${id}`);
};

export const getAllPlayers = async (limit = 100, offset = 0): Promise<PaginatedResponse<Player>> => {
  return adminApiClient.get<PaginatedResponse<Player>>(`/players?limit=${limit}&offset=${offset}`);
};

export const updatePlayerRP = async (playerId: string, rpChange: number, reason: string): Promise<Player> => {
  return adminApiClient.post<Player>(`/update-rp`, { player_id: playerId, rp_change: rpChange, reason });
};

// Team Management
export const getAllTeams = async (limit = 100, offset = 0): Promise<PaginatedResponse<Team>> => {
  return adminApiClient.get<PaginatedResponse<Team>>(`/v1/teams/?limit=${limit}&offset=${offset}`);
};

export const createTeam = async (team: Partial<Team>): Promise<Team> => {
  return adminApiClient.post<Team>('/v1/teams/', team);
};

export const updateTeam = async (id: string, team: Partial<Team>): Promise<Team> => {
  return adminApiClient.put<Team>(`/v1/teams/${id}`, team);
};

export const deleteTeam = async (id: string): Promise<void> => {
  return adminApiClient.delete<void>(`/v1/teams/${id}`);
};

export const createTeamMatchStats = async (stats: TeamMatchStatsCreate): Promise<TeamMatchStats> => {
  return adminApiClient.post<TeamMatchStats>('/team-match-stats', stats);
};

export const updateTeamMatchStats = async (id: string, stats: Partial<TeamMatchStatsCreate>): Promise<TeamMatchStats> => {
  return adminApiClient.put<TeamMatchStats>(`/team-match-stats/${id}`, stats);
};

export const deleteTeamMatchStats = async (id: string): Promise<void> => {
  return adminApiClient.delete<void>(`/team-match-stats/${id}`);
};

// Event Management
export const getAllEvents = async (limit = 100, offset = 0): Promise<PaginatedResponse<Event>> => {
  return adminApiClient.get<PaginatedResponse<Event>>(`/v1/events/?limit=${limit}&offset=${offset}`);
};

export const createEvent = async (event: Partial<Event>): Promise<Event> => {
  return adminApiClient.post<Event>('/v1/events/', event);
};

export const updateEvent = async (id: string, event: Partial<Event>): Promise<Event> => {
  return adminApiClient.put<Event>(`/v1/events/${id}`, event);
};

export const deleteEvent = async (id: string): Promise<void> => {
  return adminApiClient.delete<void>(`/v1/events/${id}`);
};

export const getEventGroups = async (eventId: string): Promise<EventGroup[]> => {
  return adminApiClient.get<EventGroup[]>(`/v1/events/${eventId}/groups`);
};

export const createEventGroup = async (eventId: string, group: Partial<EventGroup>): Promise<EventGroup> => {
  return adminApiClient.post<EventGroup>(`/v1/events/${eventId}/groups`, group);
};

export const updateEventGroup = async (id: string, group: Partial<EventGroup>): Promise<EventGroup> => {
  return adminApiClient.put<EventGroup>(`/event-groups/${id}`, group);
};

export const deleteEventGroup = async (id: string): Promise<void> => {
  return adminApiClient.delete<void>(`/event-groups/${id}`);
};

export const addTeamToGroup = async (groupId: string, teamId: string): Promise<void> => {
  return adminApiClient.post<void>(`/event-groups/${groupId}/teams`, { team_id: teamId });
};

export const removeTeamFromGroup = async (groupId: string, teamId: string): Promise<void> => {
  return adminApiClient.delete<void>(`/event-groups/${groupId}/teams/${teamId}`);
};

export const getGroupStandings = async (groupId: string): Promise<GroupStandings[]> => {
  return adminApiClient.get<GroupStandings[]>(`/event-groups/${groupId}/standings`);
};

export const updateGroupStandings = async (groupId: string, standings: Partial<GroupStandings>[]): Promise<GroupStandings[]> => {
  return adminApiClient.put<GroupStandings[]>(`/event-groups/${groupId}/standings`, standings);
};

// Match Management
export const getAllMatches = async (limit = 100, offset = 0): Promise<PaginatedResponse<Match>> => {
  return adminApiClient.get<PaginatedResponse<Match>>(`/v1/matches/?limit=${limit}&offset=${offset}`);
};

export const createMatch = async (match: MatchCreate): Promise<Match> => {
  return adminApiClient.post<Match>('/v1/matches/', match);
};

export const updateMatch = async (id: string, match: MatchUpdate): Promise<Match> => {
  return adminApiClient.put<Match>(`/v1/matches/${id}`, match);
};

export const deleteMatch = async (id: string): Promise<void> => {
  return adminApiClient.delete<void>(`/v1/matches/${id}`);
};

// RP Transactions
export const getRPTransactions = async (limit = 100, offset = 0): Promise<PaginatedResponse<RPTransaction>> => {
  return adminApiClient.get<PaginatedResponse<RPTransaction>>(`/rp-transactions?limit=${limit}&offset=${offset}`);
};

export const createRPTransaction = async (transaction: Partial<RPTransaction>): Promise<RPTransaction> => {
  return adminApiClient.post<RPTransaction>('/rp-transactions', transaction);
};

export const getPlayerRPTransactions = async (playerId: string, limit = 100, offset = 0): Promise<PaginatedResponse<RPTransaction>> => {
  return adminApiClient.get<PaginatedResponse<RPTransaction>>(`/v1/players/${playerId}/rp-transactions?limit=${limit}&offset=${offset}`);
};

export const createPlayerRPTransaction = async (playerId: string, transaction: Partial<RPTransaction>): Promise<RPTransaction> => {
  return adminApiClient.post<RPTransaction>(`/v1/players/${playerId}/rp-transactions`, transaction);
};

// Awards Race
export const getAwardsRace = async (limit = 100, offset = 0): Promise<PaginatedResponse<AwardsRace>> => {
  return adminApiClient.get<PaginatedResponse<AwardsRace>>(`/awards-race?limit=${limit}&offset=${offset}`);
};

export const createAwardsRace = async (award: Partial<AwardsRace>): Promise<AwardsRace> => {
  return adminApiClient.post<AwardsRace>('/awards-race', award);
};

export const updateAwardsRace = async (id: string, award: Partial<AwardsRace>): Promise<AwardsRace> => {
  return adminApiClient.put<AwardsRace>(`/awards-race/${id}`, award);
};

export const deleteAwardsRace = async (id: string): Promise<void> => {
  return adminApiClient.delete<void>(`/awards-race/${id}`);
};

// Draft Pool
export const getDraftPool = async (limit = 100, offset = 0): Promise<PaginatedResponse<DraftPool>> => {
  return adminApiClient.get<PaginatedResponse<DraftPool>>(`/draft-pool?limit=${limit}&offset=${offset}`);
};

export const addToDraftPool = async (player: Partial<DraftPool>): Promise<DraftPool> => {
  return adminApiClient.post<DraftPool>('/draft-pool', player);
};

export const updateDraftPool = async (id: string, player: Partial<DraftPool>): Promise<DraftPool> => {
  return adminApiClient.put<DraftPool>(`/draft-pool/${id}`, player);
};

export const removeFromDraftPool = async (id: string): Promise<void> => {
  return adminApiClient.delete<void>(`/draft-pool/${id}`);
};

// Event Results
export const getEventResults = async (limit = 100, offset = 0): Promise<PaginatedResponse<EventResults>> => {
  return adminApiClient.get<PaginatedResponse<EventResults>>(`/event-results?limit=${limit}&offset=${offset}`);
};

export const createEventResult = async (result: Partial<EventResults>): Promise<EventResults> => {
  return adminApiClient.post<EventResults>('/event-results', result);
};

export const updateEventResult = async (id: string, result: Partial<EventResults>): Promise<EventResults> => {
  return adminApiClient.put<EventResults>(`/event-results/${id}`, result);
};

export const deleteEventResult = async (id: string): Promise<void> => {
  return adminApiClient.delete<void>(`/event-results/${id}`);
};

// Pot Tracker
export const getPotTracker = async (limit = 100, offset = 0): Promise<PaginatedResponse<TeamsPotTracker>> => {
  return adminApiClient.get<PaginatedResponse<TeamsPotTracker>>(`/pot-tracker?limit=${limit}&offset=${offset}`);
};

export const createPotTrackerEntry = async (entry: Partial<TeamsPotTracker>): Promise<TeamsPotTracker> => {
  return adminApiClient.post<TeamsPotTracker>('/pot-tracker', entry);
};

export const updatePotTrackerEntry = async (id: string, entry: Partial<TeamsPotTracker>): Promise<TeamsPotTracker> => {
  return adminApiClient.put<TeamsPotTracker>(`/pot-tracker/${id}`, entry);
};

export const deletePotTrackerEntry = async (id: string): Promise<void> => {
  return adminApiClient.delete<void>(`/pot-tracker/${id}`);
}; 