// GraphQL types that match the pg_graphql generated schema exactly

// Enums from the actual schema
export enum player_position {
  POINT_GUARD = 'Point Guard',
  SHOOTING_GUARD = 'Shooting Guard',
  LOCK = 'Lock',
  POWER_FORWARD = 'Power Forward',
  CENTER = 'Center'
}

export enum salary_tier {
  S = 'S',
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D'
}

export enum event_tier {
  T1 = 'T1',
  T2 = 'T2',
  T3 = 'T3',
  T4 = 'T4'
}

export enum stage {
  REGULAR_SEASON = 'Regular Season',
  GROUP_PLAY = 'Group Play',
  ROUND_1 = 'Round 1',
  ROUND_2 = 'Round 2',
  ROUND_3 = 'Round 3',
  ROUND_4 = 'Round 4',
  SEMI_FINALS = 'Semi Finals',
  FINALS = 'Finals',
  GRAND_FINALS = 'Grand Finals',
  L1 = 'L1',
  L2 = 'L2',
  L3 = 'L3',
  L4 = 'L4',
  L5 = 'L5',
  W1 = 'W1',
  W2 = 'W2',
  W3 = 'W3',
  W4 = 'W4',
  LF = 'LF',
  WF = 'WF'
}

export enum app_role {
  ADMIN = 'admin',
  LEAGUE_STAFF = 'league_staff',
  USER = 'user',
  EDITOR = 'editor',
  ANALYST = 'analyst',
  TEAM_STAFF = 'team_staff',
  PLAYER = 'player'
}

// Core types matching the pg_graphql schema
export interface players {
  nodeId: string
  id: string
  gamertag: string
  position?: player_position
  region_id?: string
  current_team_id?: string
  performance_score?: number
  player_rp?: number
  player_rank_score?: number
  salary_tier?: salary_tier
  monthly_value?: number
  created_at?: string
  is_rookie?: boolean
  discord_id?: string
  twitter_id?: string
  alternate_gamertag?: string
  teams?: teams
  regions?: regions
}

export interface teams {
  nodeId: string
  id: string
  name: string
  logo_url?: string
  region_id?: string
  current_rp?: number
  elo_rating?: number
  global_rank?: number
  leaderboard_tier?: string
  created_at?: string
  player_rank_score?: number
  money_won?: number
  regions?: regions
}

export interface matches {
  nodeId: string
  id: string
  event_id?: string
  team_a_id?: string
  team_b_id?: string
  winner_id?: string
  score_a?: number
  score_b?: number
  played_at?: string
  boxscore_url?: string
  team_a_name?: string
  stage?: stage
  game_number?: number
  team_b_name?: string
  winner_name?: string
  events?: events
  teams?: teams
  player_statsCollection?: player_statsConnection
}

export interface events {
  nodeId: string
  id: string
  name: string
  type?: string
  is_global?: boolean
  region_id?: string
  start_date?: string
  end_date?: string
  max_rp?: number
  decay_days?: number
  processed?: boolean
  description?: string
  banner_url?: string
  rules_url?: string
  processed_at?: string
  status?: string
  tier?: event_tier
  season_number?: number
  prize_pool?: number
  regions?: regions
}

export interface player_stats {
  nodeId: string
  id: string
  player_id: string
  match_id: string
  team_id: string
  points?: number
  assists?: number
  rebounds?: number
  steals?: number
  blocks?: number
  turnovers?: number
  fouls?: number
  ps?: number
  created_at?: string
  fgm?: number
  fga?: number
  three_points_made?: number
  three_points_attempted?: number
  ftm?: number
  fta?: number
  plus_minus?: number
  player_name?: string
  updated_at?: string
  matches?: matches
  players?: players
  teams?: teams
}

export interface profiles {
  nodeId: string
  id: string
  email?: string
  role: string
  created_at?: string
  updated_at?: string
  app_role?: app_role
}

export interface regions {
  nodeId: string
  id: string
  name: string
}

// Connection types for pagination
export interface PageInfo {
  hasNextPage: boolean
  hasPreviousPage: boolean
  startCursor?: string
  endCursor?: string
}

export interface playersConnection {
  edges: playersEdge[]
  pageInfo: PageInfo
}

export interface playersEdge {
  cursor: string
  node: players
}

export interface teamsConnection {
  edges: teamsEdge[]
  pageInfo: PageInfo
}

export interface teamsEdge {
  cursor: string
  node: teams
}

export interface matchesConnection {
  edges: matchesEdge[]
  pageInfo: PageInfo
}

export interface matchesEdge {
  cursor: string
  node: matches
}

export interface eventsConnection {
  edges: eventsEdge[]
  pageInfo: PageInfo
}

export interface eventsEdge {
  cursor: string
  node: events
}

export interface player_statsConnection {
  edges: player_statsEdge[]
  pageInfo: PageInfo
}

export interface player_statsEdge {
  cursor: string
  node: player_stats
}

export interface profilesConnection {
  edges: profilesEdge[]
  pageInfo: PageInfo
}

export interface profilesEdge {
  cursor: string
  node: profiles
}

// Filter types
export interface playersFilter {
  id?: UUIDFilterInput
  gamertag?: StringFilterInput
  position?: player_positionFilterInput
  region_id?: UUIDFilterInput
  current_team_id?: UUIDFilterInput
  performance_score?: FloatFilterInput
  player_rp?: IntFilterInput
  player_rank_score?: FloatFilterInput
  salary_tier?: salary_tierFilterInput
  monthly_value?: IntFilterInput
  created_at?: StringFilterInput
  is_rookie?: BooleanFilterInput
  discord_id?: StringFilterInput
  twitter_id?: StringFilterInput
  alternate_gamertag?: StringFilterInput
}

export interface teamsFilter {
  id?: UUIDFilterInput
  name?: StringFilterInput
  logo_url?: StringFilterInput
  region_id?: UUIDFilterInput
  current_rp?: IntFilterInput
  elo_rating?: FloatFilterInput
  global_rank?: IntFilterInput
  leaderboard_tier?: StringFilterInput
  created_at?: StringFilterInput
  player_rank_score?: FloatFilterInput
  money_won?: IntFilterInput
}

export interface matchesFilter {
  id?: UUIDFilterInput
  event_id?: UUIDFilterInput
  team_a_id?: UUIDFilterInput
  team_b_id?: UUIDFilterInput
  winner_id?: UUIDFilterInput
  score_a?: IntFilterInput
  score_b?: IntFilterInput
  played_at?: StringFilterInput
  boxscore_url?: StringFilterInput
  team_a_name?: StringFilterInput
  stage?: stageFilterInput
  game_number?: IntFilterInput
  team_b_name?: StringFilterInput
  winner_name?: StringFilterInput
}

export interface eventsFilter {
  id?: UUIDFilterInput
  name?: StringFilterInput
  type?: StringFilterInput
  is_global?: BooleanFilterInput
  region_id?: UUIDFilterInput
  start_date?: StringFilterInput
  end_date?: StringFilterInput
  max_rp?: IntFilterInput
  decay_days?: IntFilterInput
  processed?: BooleanFilterInput
  description?: StringFilterInput
  banner_url?: StringFilterInput
  rules_url?: StringFilterInput
  processed_at?: StringFilterInput
  status?: StringFilterInput
  tier?: event_tierFilterInput
  season_number?: IntFilterInput
  prize_pool?: IntFilterInput
}

export interface profilesFilter {
  id?: UUIDFilterInput
  email?: StringFilterInput
  role?: StringFilterInput
  created_at?: StringFilterInput
  updated_at?: StringFilterInput
  app_role?: app_roleFilterInput
}

// Filter input types
export interface UUIDFilterInput {
  eq?: string
  neq?: string
  in?: string[]
  nin?: string[]
  is?: FilterIs
}

export interface StringFilterInput {
  eq?: string
  neq?: string
  in?: string[]
  nin?: string[]
  like?: string
  ilike?: string
  is?: FilterIs
}

export interface IntFilterInput {
  eq?: number
  neq?: number
  in?: number[]
  nin?: number[]
  gt?: number
  gte?: number
  lt?: number
  lte?: number
  is?: FilterIs
}

export interface FloatFilterInput {
  eq?: number
  neq?: number
  in?: number[]
  nin?: number[]
  gt?: number
  gte?: number
  lt?: number
  lte?: number
  is?: FilterIs
}

export interface BooleanFilterInput {
  eq?: boolean
  neq?: boolean
  is?: FilterIs
}

export interface player_positionFilterInput {
  eq?: player_position
  neq?: player_position
  in?: player_position[]
  nin?: player_position[]
  is?: FilterIs
}

export interface salary_tierFilterInput {
  eq?: salary_tier
  neq?: salary_tier
  in?: salary_tier[]
  nin?: salary_tier[]
  is?: FilterIs
}

export interface stageFilterInput {
  eq?: stage
  neq?: stage
  in?: stage[]
  nin?: stage[]
  is?: FilterIs
}

export interface event_tierFilterInput {
  eq?: event_tier
  neq?: event_tier
  in?: event_tier[]
  nin?: event_tier[]
  is?: FilterIs
}

export interface app_roleFilterInput {
  eq?: app_role
  neq?: app_role
  in?: app_role[]
  nin?: app_role[]
  is?: FilterIs
}

export enum FilterIs {
  NULL = 'NULL',
  NOT_NULL = 'NOT_NULL'
}

// Legacy type aliases for backward compatibility
export type Player = players
export type Team = teams
export type Match = matches
export type Event = events
export type PlayerMatchStats = player_stats
export type User = profiles
export type PlayerPosition = player_position
export type SalaryTier = salary_tier
export type EventTier = event_tier
export type MatchStage = stage
export type AppRole = app_role
