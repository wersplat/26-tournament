// Comprehensive type definitions based on the database schema

// Enums
export enum EventTier {
  T1 = 'T1',
  T2 = 'T2',
  T3 = 'T3',
  T4 = 'T4'
}

export enum EventStatus {
  UPCOMING = 'upcoming',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export enum PlayerPosition {
  PG = 'PG',
  SG = 'SG',
  SF = 'SF',
  PF = 'PF',
  C = 'C'
}

export enum SalaryTier {
  ROOKIE = 'rookie',
  VETERAN = 'veteran',
  ALL_STAR = 'all_star',
  SUPERSTAR = 'superstar',
  LEGEND = 'legend'
}

export enum MatchStage {
  GROUP = 'group',
  QUARTERFINAL = 'quarterfinal',
  SEMIFINAL = 'semifinal',
  FINAL = 'final'
}

export enum PointType {
  WIN_BY_20_PLUS = 'win_by_20_plus',
  REGULAR_WIN = 'regular_win',
  LOSS = 'loss',
  FORFEIT = 'forfeit'
}

export enum RPTransactionType {
  EVENT = 'event',
  BONUS = 'bonus',
  PENALTY = 'penalty',
  ADJUSTMENT = 'adjustment',
  MATCH = 'match'
}

export enum ReviewStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

export enum UpdateType {
  RANK_CHANGE = 'rank_change',
  WINNER_SELECTION = 'winner_selection',
  NOMINATION = 'nomination',
  REMOVAL = 'removal',
  OTHER = 'other'
}

// Core Entities
export interface Region {
  id: string;
  name: string;
}

export interface Player {
  id: string;
  gamertag: string;
  position?: PlayerPosition;
  region_id?: string;
  current_team_id?: string;
  performance_score: number;
  player_rp: number;
  player_rank_score: number;
  salary_tier?: SalaryTier;
  monthly_value: number;
  created_at: string;
  is_rookie?: boolean;
  discord_id?: string;
  twitter_id?: string;
  alternate_gamertag?: string;
  // Computed fields
  region?: Region;
  current_team?: Team;
}

export interface Team {
  id: string;
  name: string;
  logo_url?: string;
  region_id?: string;
  current_rp: number;
  elo_rating: number;
  global_rank?: number;
  leaderboard_tier?: string;
  created_at: string;
  player_rank_score?: number;
  money_won: number;
  // Computed fields
  region?: Region;
  players?: Player[];
}

export interface Event {
  id: string;
  name: string;
  type?: string;
  is_global: boolean;
  region_id?: string;
  start_date?: string;
  end_date?: string;
  max_rp?: number;
  decay_days?: number;
  processed: boolean;
  description?: string;
  banner_url?: string;
  rules_url?: string;
  processed_at?: string;
  status: EventStatus;
  tier?: EventTier;
  season_number?: number;
  prize_pool?: number;
  // Computed fields
  region?: Region;
}

export interface Match {
  id: string;
  event_id: string;
  team_a_id?: string;
  team_b_id?: string;
  winner_id?: string;
  score_a?: number;
  score_b?: number;
  played_at: string;
  boxscore_url?: string;
  team_a_name?: string;
  stage?: MatchStage;
  game_number?: number;
  team_b_name?: string;
  winner_name?: string;
  // Computed fields
  event?: Event;
  team_a?: Team;
  team_b?: Team;
  winner?: Team;
}

export interface PlayerStats {
  id: string;
  player_id: string;
  match_id: string;
  team_id: string;
  points?: number;
  assists?: number;
  rebounds?: number;
  steals?: number;
  blocks?: number;
  turnovers?: number;
  fouls?: number;
  ps?: number;
  created_at: string;
  fgm?: number;
  fga?: number;
  three_points_made?: number;
  three_points_attempted?: number;
  ftm?: number;
  fta?: number;
  plus_minus?: number;
  player_name?: string;
  updated_at?: string;
  // Computed fields
  player?: Player;
  match?: Match;
  team?: Team;
}

export interface TeamMatchStats {
  id: string;
  match_id: string;
  team_id: string;
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  field_goals_made: number;
  field_goals_attempted: number;
  three_points_made: number;
  three_points_attempted: number;
  free_throws_made: number;
  free_throws_attempted: number;
  fouls?: number;
  plus_minus?: number;
  // Computed fields
  match?: Match;
  team?: Team;
}

export interface TeamRoster {
  id: string;
  team_id?: string;
  player_id?: string;
  is_captain: boolean;
  is_player_coach: boolean;
  joined_at: string;
  left_at?: string;
  event_id?: string;
  // Computed fields
  team?: Team;
  player?: Player;
  event?: Event;
}

// Event Management
export interface EventGroup {
  id: string;
  event_id: string;
  name: string;
  description?: string;
  max_teams?: number;
  created_at: string;
  updated_at: string;
  status: string;
  advancement_count: number;
  sort_order?: number;
  // Computed fields
  event?: Event;
  teams?: EventGroupMember[];
}

export interface EventGroupMember {
  id: string;
  group_id: string;
  team_id: string;
  seed?: number;
  created_at: string;
  // Computed fields
  group?: EventGroup;
  team?: Team;
}

export interface GroupMatch {
  id: string;
  group_id: string;
  match_id: string;
  round: number;
  match_number: number;
  created_at: string;
  // Computed fields
  group?: EventGroup;
  match?: Match;
}

export interface GroupStandings {
  id: string;
  group_id: string;
  team_id: string;
  matches_played: number;
  wins: number;
  losses: number;
  points_for: number;
  points_against: number;
  point_differential: number;
  position?: number;
  updated_at: string;
  // Computed fields
  group?: EventGroup;
  team?: Team;
}

// Rankings and Points
export interface RankingPoints {
  id: string;
  team_id?: string;
  source?: string;
  event_id?: string;
  points: number;
  awarded_at: string;
  expires_at?: string;
  // Computed fields
  team?: Team;
  event?: Event;
}

export interface RPTransaction {
  id: string;
  team_id?: string;
  event_id?: string;
  amount: number;
  description: string;
  type: RPTransactionType;
  created_at: string;
  updated_at: string;
  // Computed fields
  team?: Team;
  event?: Event;
}

export interface PlayerRPTransaction {
  id: string;
  player_id?: string;
  event_id?: string;
  match_id?: string;
  amount: number;
  description: string;
  type: RPTransactionType;
  created_at: string;
  updated_at: string;
  // Computed fields
  player?: Player;
  event?: Event;
  match?: Match;
}

// Match Management
export interface MatchPoints {
  id: string;
  match_id: string;
  team_id: string;
  group_id?: string;
  points_earned: number;
  point_type: PointType;
  created_at: string;
  updated_at: string;
  // Computed fields
  match?: Match;
  team?: Team;
  group?: EventGroup;
}

export interface MatchMVP {
  match_id: string;
  player_id: string;
  // Computed fields
  match?: Match;
  player?: Player;
}

export interface MatchSubmission {
  id: string;
  event_id?: string;
  match_id?: string;
  team_a_id?: string;
  team_a_name?: string;
  team_b_id?: string;
  team_b_name?: string;
  review_status?: ReviewStatus;
  reviewed_by?: string;
  reviewed_at?: string;
  created_at: string;
  // Computed fields
  event?: Event;
  match?: Match;
  team_a?: Team;
  team_b?: Team;
}

export interface UpcomingMatch {
  id: string;
  event_id: string;
  team_a_id?: string;
  team_b_id?: string;
  scheduled_at: string;
  venue?: string;
  stream_url?: string;
  notes?: string;
  status: string;
  created_at: string;
  updated_at: string;
  group_id?: string;
  round?: number;
  match_number?: number;
  team_a_logo?: string;
  team_b_logo?: string;
  // Computed fields
  event?: Event;
  team_a?: Team;
  team_b?: Team;
  group?: EventGroup;
}

// Awards and Draft
export interface AwardsRace {
  id: string;
  event_id?: string;
  team_id: string;
  player_id?: string;
  award_type?: string;
  rank?: number;
  rp_bonus?: number;
  award_winner?: boolean;
  created_at: string;
  // Computed fields
  event?: Event;
  team?: Team;
  player?: Player;
}

export interface UpdateRace {
  id: number;
  race_id?: string;
  update_type: UpdateType;
  update_details?: any;
  previous_rank?: number;
  new_rank?: number;
  updated_at: string;
  updated_by?: string;
  // Computed fields
  race?: AwardsRace;
}

export interface DraftPool {
  player_id: string;
  declared_at: string;
  status: string;
  season?: string;
  draft_rating?: number;
  draft_notes?: string;
  event_id?: string;
  created_at: string;
  updated_at: string;
  // Computed fields
  player?: Player;
  event?: Event;
}

// Results and Tracking
export interface EventResults {
  id: string;
  event_id: string;
  team_id: string;
  placement?: number;
  rp_awarded?: number;
  bonus_rp: number;
  total_rp: number;
  awarded_at: string;
  prize_amount?: number;
  winner_banner_url?: string;
  // Computed fields
  event?: Event;
  team?: Team;
}

export interface TeamsPotTracker {
  id: string;
  event_id?: string;
  team_id?: string;
  placement?: number;
  prize_amount?: number;
  created_at: string;
  // Computed fields
  event?: Event;
  team?: Team;
}

// User Management
export interface Profile {
  id: string;
  email?: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  user_id?: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  created_at: string;
  updated_at: string;
}

// Salary and Tiers
export interface SalaryTier {
  id: number;
  salary_tier: string;
  label?: string;
  multiplier: number;
  min_rating?: number;
  max_rating?: number;
  description?: string;
}

export interface PlayerSalaryTier {
  id: number;
  tier_name: string;
  min_value?: number;
  max_value?: number;
  multiplier: number;
}

// League Management
export interface LeagueSeason {
  id: number;
  league_name: string;
  season_number: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  event?: string;
}

// API Response Types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  has_more: boolean;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// Form Types
export interface PlayerStatsCreate {
  player_id: string;
  match_id: string;
  team_id: string;
  points?: number;
  assists?: number;
  rebounds?: number;
  steals?: number;
  blocks?: number;
  turnovers?: number;
  fouls?: number;
  fgm?: number;
  fga?: number;
  three_points_made?: number;
  three_points_attempted?: number;
  ftm?: number;
  fta?: number;
  plus_minus?: number;
  player_name?: string;
}

export interface PlayerStatsUpdate {
  points?: number;
  assists?: number;
  rebounds?: number;
  steals?: number;
  blocks?: number;
  turnovers?: number;
  fouls?: number;
  fgm?: number;
  fga?: number;
  three_points_made?: number;
  three_points_attempted?: number;
  ftm?: number;
  fta?: number;
  plus_minus?: number;
  player_name?: string;
}

export interface TeamMatchStatsCreate {
  match_id: string;
  team_id: string;
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  field_goals_made: number;
  field_goals_attempted: number;
  three_points_made: number;
  three_points_attempted: number;
  free_throws_made: number;
  free_throws_attempted: number;
  fouls?: number;
  plus_minus?: number;
}

export interface MatchCreate {
  event_id: string;
  team_a_id?: string;
  team_b_id?: string;
  team_a_name?: string;
  team_b_name?: string;
  stage?: MatchStage;
  game_number?: number;
  scheduled_at?: string;
  venue?: string;
  stream_url?: string;
  notes?: string;
}

export interface MatchUpdate {
  winner_id?: string;
  score_a?: number;
  score_b?: number;
  played_at?: string;
  boxscore_url?: string;
  winner_name?: string;
  status?: string;
} 