import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Custom scalar for handling date and time values in ISO 8601 format. */
  DateTime: { input: any; output: any; }
  /** Custom scalar for handling UUID values. */
  UUID: { input: any; output: any; }
};

/**
 * Represents a tournament, league, or other competitive event.
 * Events contain multiple matches and have specific rules and prizes.
 */
export type Event = {
  __typename?: 'Event';
  /** When the event was created */
  createdAt: Scalars['DateTime']['output'];
  /** ID of the user who created the event */
  createdBy: Scalars['ID']['output'];
  /** Current number of registered participants */
  currentParticipants: Scalars['Int']['output'];
  /** Description of the event */
  description?: Maybe<Scalars['String']['output']>;
  /** When the event ends */
  endDate?: Maybe<Scalars['DateTime']['output']>;
  /** Entry fee to participate in the event */
  entryFee: Scalars['Float']['output'];
  /** Type of event (tournament, league, etc.) */
  eventType?: Maybe<EventType>;
  /** Unique identifier for the event */
  id: Scalars['ID']['output'];
  /** Maximum number of participants allowed */
  maxParticipants?: Maybe<Scalars['Int']['output']>;
  /** Name of the event */
  name: Scalars['String']['output'];
  /** When the event starts */
  startDate?: Maybe<Scalars['DateTime']['output']>;
  /** Current status of the event */
  status?: Maybe<EventStatus>;
  /** Tier level of the event */
  tier?: Maybe<EventTier>;
  /** When the event was last updated */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

/** Status of an event indicating its current phase. */
export enum EventStatus {
  /** Event was cancelled */
  Cancelled = 'cancelled',
  /** Event has finished */
  Completed = 'completed',
  /** Event is in draft mode and not yet published */
  Draft = 'draft',
  /** Event is currently running */
  InProgress = 'in_progress',
  /** Event is open for registration */
  Open = 'open',
  /** Event registration is closed */
  RegistrationClosed = 'registration_closed'
}

/** Event tiers indicating the level and prestige of the competition. */
export enum EventTier {
  /** Tier 1 - Highest level events */
  T1 = 'T1',
  /** Tier 2 - High level events */
  T2 = 'T2',
  /** Tier 3 - Mid level events */
  T3 = 'T3',
  /** Tier 4 - Entry level events */
  T4 = 'T4'
}

/** Types of competitive events in the platform. */
export enum EventType {
  /** League event with regular season matches */
  League = 'League',
  /** Single elimination or double elimination tournament */
  Tournament = 'Tournament'
}

/**
 * Represents a competitive match between two teams.
 * Matches can be in various stages and have detailed statistics.
 */
export type Match = {
  __typename?: 'Match';
  /** URL to the match boxscore/stats */
  boxscoreUrl?: Maybe<Scalars['String']['output']>;
  /** When the match record was created */
  createdAt: Scalars['DateTime']['output'];
  /** When the match ended */
  endedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Event details */
  event?: Maybe<Event>;
  /** ID of the event this match belongs to */
  eventId?: Maybe<Scalars['UUID']['output']>;
  /** Game number within the match series */
  gameNumber: Scalars['Int']['output'];
  /** Unique identifier for the match */
  id: Scalars['ID']['output'];
  /** Whether the match is currently being played live */
  isLive: Scalars['Boolean']['output'];
  /** When the match was actually played */
  playedAt?: Maybe<Scalars['DateTime']['output']>;
  /** When the match was scheduled to start */
  scheduledAt?: Maybe<Scalars['DateTime']['output']>;
  /** Score for team A */
  scoreA?: Maybe<Scalars['Int']['output']>;
  /** Score for team B */
  scoreB?: Maybe<Scalars['Int']['output']>;
  /** Current stage of the match (group, finals, etc.) */
  stage: MatchStage;
  /** When the match started */
  startedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Current status of the match */
  status: MatchStatus;
  /** Team A details */
  teamA?: Maybe<Team>;
  /** ID of the first team */
  teamAId: Scalars['UUID']['output'];
  /** Name of the first team */
  teamAName: Scalars['String']['output'];
  /** Player statistics for team A */
  teamAPlayers: Array<PlayerMatchStats>;
  /** Team B details */
  teamB?: Maybe<Team>;
  /** ID of the second team */
  teamBId: Scalars['UUID']['output'];
  /** Name of the second team */
  teamBName: Scalars['String']['output'];
  /** Player statistics for team B */
  teamBPlayers: Array<PlayerMatchStats>;
  /** Time elapsed in the current match (for live matches) */
  timeElapsed?: Maybe<Scalars['String']['output']>;
  /** When the match record was last updated */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Winning team details */
  winner?: Maybe<Team>;
  /** ID of the winning team */
  winnerId?: Maybe<Scalars['UUID']['output']>;
  /** Name of the winning team */
  winnerName?: Maybe<Scalars['String']['output']>;
};

/** Input type for creating a new match. */
export type MatchInput = {
  /** ID of the event this match belongs to */
  eventId?: InputMaybe<Scalars['UUID']['input']>;
  /** Game number within the match series (defaults to 1) */
  gameNumber?: InputMaybe<Scalars['Int']['input']>;
  /** When the match is scheduled to start */
  scheduledAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Stage of the match (defaults to GROUP) */
  stage?: InputMaybe<MatchStage>;
  /** ID of the first team */
  teamAId: Scalars['UUID']['input'];
  /** Name of the first team */
  teamAName: Scalars['String']['input'];
  /** ID of the second team */
  teamBId: Scalars['UUID']['input'];
  /** Name of the second team */
  teamBName: Scalars['String']['input'];
};

/** Stages of a tournament or competition indicating the round or phase. */
export enum MatchStage {
  /** Championship final match */
  Finals = 'Finals',
  /** Grand championship final match */
  GrandFinals = 'Grand_Finals',
  /** Group stage matches */
  GroupPlay = 'Group_Play',
  /** League level 1 matches */
  L1 = 'L1',
  /** League level 2 matches */
  L2 = 'L2',
  /** League level 3 matches */
  L3 = 'L3',
  /** League level 4 matches */
  L4 = 'L4',
  /** League level 5 matches */
  L5 = 'L5',
  /** Loser bracket final */
  Lf = 'LF',
  /** Regular season matches */
  RegularSeason = 'Regular_Season',
  /** Round 1 matches */
  Round_1 = 'Round_1',
  /** Round 2 matches */
  Round_2 = 'Round_2',
  /** Round 3 matches */
  Round_3 = 'Round_3',
  /** Round 4 matches */
  Round_4 = 'Round_4',
  /** Semifinal matches */
  SemiFinals = 'Semi_Finals',
  /** Winner bracket round 1 */
  W1 = 'W1',
  /** Winner bracket round 2 */
  W2 = 'W2',
  /** Winner bracket round 3 */
  W3 = 'W3',
  /** Winner bracket round 4 */
  W4 = 'W4',
  /** Winner bracket final */
  Wf = 'WF'
}

/** Status of a match indicating its current state in the competition. */
export enum MatchStatus {
  /** Match was cancelled */
  Cancelled = 'cancelled',
  /** Match has finished */
  Completed = 'completed',
  /** Match is currently being played */
  InProgress = 'in_progress',
  /** Match was postponed to a later date */
  Postponed = 'postponed',
  /** Match is scheduled but not yet started */
  Scheduled = 'scheduled'
}

/** Input type for updating an existing match. */
export type MatchUpdateInput = {
  /** URL to the match boxscore/stats */
  boxscoreUrl?: InputMaybe<Scalars['String']['input']>;
  /** Updated game number */
  gameNumber?: InputMaybe<Scalars['Int']['input']>;
  /** When the match was played */
  playedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Updated score for team A */
  scoreA?: InputMaybe<Scalars['Int']['input']>;
  /** Updated score for team B */
  scoreB?: InputMaybe<Scalars['Int']['input']>;
  /** Updated stage of the match */
  stage?: InputMaybe<MatchStage>;
  /** New status of the match */
  status?: InputMaybe<MatchStatus>;
  /** ID of the winning team */
  winnerId?: InputMaybe<Scalars['UUID']['input']>;
};

/**
 * Root mutation type for the Bodega Cats GC GraphQL API.
 * Provides access to all write operations for creating, updating, and deleting data.
 */
export type Mutation = {
  __typename?: 'Mutation';
  /** Create a new user (admin only) */
  createUser: User;
  /** Delete a match */
  deleteMatch: Scalars['Boolean']['output'];
  /** Delete a user (admin only) */
  deleteUser: Scalars['Boolean']['output'];
  /** Create a new match */
  submitMatch: Match;
  /** Submit player statistics for a match */
  submitMatchStats: Array<PlayerMatchStats>;
  /** Update an existing match */
  updateMatch: Match;
  /** Update an existing user (admin only) */
  updateUser: User;
};


/**
 * Root mutation type for the Bodega Cats GC GraphQL API.
 * Provides access to all write operations for creating, updating, and deleting data.
 */
export type MutationCreateUserArgs = {
  input: UserInput;
};


/**
 * Root mutation type for the Bodega Cats GC GraphQL API.
 * Provides access to all write operations for creating, updating, and deleting data.
 */
export type MutationDeleteMatchArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Root mutation type for the Bodega Cats GC GraphQL API.
 * Provides access to all write operations for creating, updating, and deleting data.
 */
export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Root mutation type for the Bodega Cats GC GraphQL API.
 * Provides access to all write operations for creating, updating, and deleting data.
 */
export type MutationSubmitMatchArgs = {
  input: MatchInput;
};


/**
 * Root mutation type for the Bodega Cats GC GraphQL API.
 * Provides access to all write operations for creating, updating, and deleting data.
 */
export type MutationSubmitMatchStatsArgs = {
  matchId: Scalars['ID']['input'];
  stats: Array<PlayerMatchStatsInput>;
};


/**
 * Root mutation type for the Bodega Cats GC GraphQL API.
 * Provides access to all write operations for creating, updating, and deleting data.
 */
export type MutationUpdateMatchArgs = {
  id: Scalars['ID']['input'];
  input: MatchUpdateInput;
};


/**
 * Root mutation type for the Bodega Cats GC GraphQL API.
 * Provides access to all write operations for creating, updating, and deleting data.
 */
export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  input: UserUpdateInput;
};

/**
 * Represents a player profile with gaming statistics and achievements.
 * Each player is associated with a user account.
 */
export type Player = {
  __typename?: 'Player';
  /** When the player profile was created */
  createdAt: Scalars['DateTime']['output'];
  /** Current ranking points */
  currentRp?: Maybe<Scalars['Float']['output']>;
  /** Gaming handle/username used in matches */
  gamertag: Scalars['String']['output'];
  /** Unique identifier for the player */
  id: Scalars['ID']['output'];
  /** Whether the player account has been verified */
  isVerified?: Maybe<Scalars['Boolean']['output']>;
  /** Highest ranking points achieved */
  peakRp?: Maybe<Scalars['Float']['output']>;
  /** Player position on the court */
  position?: Maybe<PlayerPosition>;
  /** Geographic region for matchmaking */
  region?: Maybe<Scalars['String']['output']>;
  /** Salary tier indicating player value */
  salaryTier?: Maybe<SalaryTier>;
  /** Name of the team the player is currently on */
  teamName?: Maybe<Scalars['String']['output']>;
  /** Current player tier (bronze, silver, gold, etc.) */
  tier?: Maybe<PlayerTier>;
  /** When the player profile was last updated */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Associated user account */
  user: User;
  /** ID of the associated user account */
  userId: Scalars['ID']['output'];
};

/**
 * Detailed statistics for a player in a specific match.
 * These stats are used for rankings and performance analysis.
 */
export type PlayerMatchStats = {
  __typename?: 'PlayerMatchStats';
  /** Number of assists */
  assists: Scalars['Int']['output'];
  /** Number of blocks */
  blocks: Scalars['Int']['output'];
  /** When the stats record was created */
  createdAt: Scalars['DateTime']['output'];
  /** Field goals attempted */
  fga: Scalars['Int']['output'];
  /** Field goals made */
  fgm: Scalars['Int']['output'];
  /** Number of fouls */
  fouls: Scalars['Int']['output'];
  /** Free throws attempted */
  fta: Scalars['Int']['output'];
  /** Free throws made */
  ftm: Scalars['Int']['output'];
  /** Unique identifier for the stats record */
  id: Scalars['ID']['output'];
  /** ID of the match these stats belong to */
  matchId: Scalars['ID']['output'];
  /** Minutes played in the match */
  minutesPlayed: Scalars['Int']['output'];
  /** ID of the player these stats belong to */
  playerId: Scalars['ID']['output'];
  /** Plus/minus rating */
  plusMinus: Scalars['Int']['output'];
  /** Total points scored */
  points: Scalars['Int']['output'];
  /** Number of rebounds */
  rebounds: Scalars['Int']['output'];
  /** Number of steals */
  steals: Scalars['Int']['output'];
  /** ID of the team the player was on */
  teamId: Scalars['ID']['output'];
  /** Three-point shots attempted */
  threePointsAttempted: Scalars['Int']['output'];
  /** Three-point shots made */
  threePointsMade: Scalars['Int']['output'];
  /** Number of turnovers */
  turnovers: Scalars['Int']['output'];
  /** When the stats record was last updated */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

/** Input type for submitting player match statistics. */
export type PlayerMatchStatsInput = {
  /** Number of assists (defaults to 0) */
  assists?: InputMaybe<Scalars['Int']['input']>;
  /** Number of blocks (defaults to 0) */
  blocks?: InputMaybe<Scalars['Int']['input']>;
  /** Field goals attempted (defaults to 0) */
  fga?: InputMaybe<Scalars['Int']['input']>;
  /** Field goals made (defaults to 0) */
  fgm?: InputMaybe<Scalars['Int']['input']>;
  /** Number of fouls (defaults to 0) */
  fouls?: InputMaybe<Scalars['Int']['input']>;
  /** Free throws attempted (defaults to 0) */
  fta?: InputMaybe<Scalars['Int']['input']>;
  /** Free throws made (defaults to 0) */
  ftm?: InputMaybe<Scalars['Int']['input']>;
  /** Minutes played in the match (defaults to 0) */
  minutesPlayed?: InputMaybe<Scalars['Int']['input']>;
  /** ID of the player */
  playerId: Scalars['UUID']['input'];
  /** Plus/minus rating (defaults to 0) */
  plusMinus?: InputMaybe<Scalars['Int']['input']>;
  /** Total points scored (defaults to 0) */
  points?: InputMaybe<Scalars['Int']['input']>;
  /** Number of rebounds (defaults to 0) */
  rebounds?: InputMaybe<Scalars['Int']['input']>;
  /** Number of steals (defaults to 0) */
  steals?: InputMaybe<Scalars['Int']['input']>;
  /** ID of the team the player was on */
  teamId: Scalars['UUID']['input'];
  /** Three-point shots attempted (defaults to 0) */
  threePointsAttempted?: InputMaybe<Scalars['Int']['input']>;
  /** Three-point shots made (defaults to 0) */
  threePointsMade?: InputMaybe<Scalars['Int']['input']>;
  /** Number of turnovers (defaults to 0) */
  turnovers?: InputMaybe<Scalars['Int']['input']>;
};

/** Player positions on the court. */
export enum PlayerPosition {
  /** Center position */
  Center = 'Center',
  /** Lock position */
  Lock = 'Lock',
  /** Point guard position */
  PointGuard = 'Point_Guard',
  /** Power forward position */
  PowerForward = 'Power_Forward',
  /** Shooting guard position */
  ShootingGuard = 'Shooting_Guard'
}

/**
 * Player tiers representing skill levels and achievements.
 * Higher tiers indicate better performance and more experience.
 */
export enum PlayerTier {
  /** Beginner level player */
  Bronze = 'bronze',
  /** Elite level player */
  Diamond = 'diamond',
  /** Legendary level player */
  GalaxyOpal = 'galaxy_opal',
  /** Advanced level player */
  Gold = 'gold',
  /** Master level player */
  PinkDiamond = 'pink_diamond',
  /** Expert level player */
  Platinum = 'platinum',
  /** Intermediate level player */
  Silver = 'silver'
}

/**
 * Root query type for the Bodega Cats GC GraphQL API.
 * Provides access to all read operations for users, matches, teams, events, and players.
 */
export type Query = {
  __typename?: 'Query';
  /** Get a specific event by ID */
  getEvent?: Maybe<Event>;
  /** Get a list of events with optional filtering and pagination */
  getEvents: Array<Event>;
  /** Get a specific match by ID */
  getMatch?: Maybe<Match>;
  /** Get a list of matches with optional filtering and pagination */
  getMatches: Array<Match>;
  /** Get a specific player by ID */
  getPlayer?: Maybe<Player>;
  /** Get a list of players with optional filtering and pagination */
  getPlayers: Array<Player>;
  /** Get a specific team by ID */
  getTeam?: Maybe<Team>;
  /** Get a list of teams with pagination */
  getTeams: Array<Team>;
  /** Get a specific user by ID */
  getUser?: Maybe<User>;
  /** Get a list of users with pagination */
  getUsers: Array<User>;
};


/**
 * Root query type for the Bodega Cats GC GraphQL API.
 * Provides access to all read operations for users, matches, teams, events, and players.
 */
export type QueryGetEventArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Root query type for the Bodega Cats GC GraphQL API.
 * Provides access to all read operations for users, matches, teams, events, and players.
 */
export type QueryGetEventsArgs = {
  eventType?: InputMaybe<EventType>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<EventStatus>;
};


/**
 * Root query type for the Bodega Cats GC GraphQL API.
 * Provides access to all read operations for users, matches, teams, events, and players.
 */
export type QueryGetMatchArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Root query type for the Bodega Cats GC GraphQL API.
 * Provides access to all read operations for users, matches, teams, events, and players.
 */
export type QueryGetMatchesArgs = {
  eventId?: InputMaybe<Scalars['UUID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  stage?: InputMaybe<MatchStage>;
  status?: InputMaybe<MatchStatus>;
  teamId?: InputMaybe<Scalars['ID']['input']>;
};


/**
 * Root query type for the Bodega Cats GC GraphQL API.
 * Provides access to all read operations for users, matches, teams, events, and players.
 */
export type QueryGetPlayerArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Root query type for the Bodega Cats GC GraphQL API.
 * Provides access to all read operations for users, matches, teams, events, and players.
 */
export type QueryGetPlayersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  region?: InputMaybe<Scalars['String']['input']>;
  tier?: InputMaybe<PlayerTier>;
};


/**
 * Root query type for the Bodega Cats GC GraphQL API.
 * Provides access to all read operations for users, matches, teams, events, and players.
 */
export type QueryGetTeamArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Root query type for the Bodega Cats GC GraphQL API.
 * Provides access to all read operations for users, matches, teams, events, and players.
 */
export type QueryGetTeamsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


/**
 * Root query type for the Bodega Cats GC GraphQL API.
 * Provides access to all read operations for users, matches, teams, events, and players.
 */
export type QueryGetUserArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Root query type for the Bodega Cats GC GraphQL API.
 * Provides access to all read operations for users, matches, teams, events, and players.
 */
export type QueryGetUsersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Salary tiers for players indicating their value and compensation level. */
export enum SalaryTier {
  /** All-star tier */
  A = 'A',
  /** Starter tier */
  B = 'B',
  /** Role player tier */
  C = 'C',
  /** Bench tier */
  D = 'D',
  /** Superstar tier */
  S = 'S'
}

/**
 * Represents a team in the Bodega Cats GC platform.
 * Teams compete in matches and tournaments.
 */
export type Team = {
  __typename?: 'Team';
  /** When the team was created */
  createdAt: Scalars['DateTime']['output'];
  /** Description of the team */
  description?: Maybe<Scalars['String']['output']>;
  /** Unique identifier for the team */
  id: Scalars['ID']['output'];
  /** Whether the team is currently active */
  isActive: Scalars['Boolean']['output'];
  /** URL to the team logo */
  logoUrl?: Maybe<Scalars['String']['output']>;
  /** Name of the team */
  name: Scalars['String']['output'];
  /** Geographic region the team represents */
  region?: Maybe<Scalars['String']['output']>;
  /** When the team was last updated */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

/**
 * Represents a user in the Bodega Cats GC platform.
 * Users can have associated player profiles with gaming statistics.
 */
export type User = {
  __typename?: 'User';
  /** When the user account was created */
  createdAt: Scalars['DateTime']['output'];
  /** Discord ID for integration with Discord */
  discordId?: Maybe<Scalars['String']['output']>;
  /** Email address for notifications and account management */
  email: Scalars['String']['output'];
  /** Full name of the user */
  fullName?: Maybe<Scalars['String']['output']>;
  /** Unique identifier for the user */
  id: Scalars['ID']['output'];
  /** Whether the user account is active */
  isActive: Scalars['Boolean']['output'];
  /** Whether the user has administrative privileges */
  isAdmin: Scalars['Boolean']['output'];
  /** Associated player profile with gaming statistics */
  player?: Maybe<Player>;
  /** When the user account was last updated */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Username for login and display */
  username: Scalars['String']['output'];
};

/** Input type for creating a new user. */
export type UserInput = {
  /** Discord ID for integration with Discord */
  discordId?: InputMaybe<Scalars['String']['input']>;
  /** Email address for notifications and account management */
  email: Scalars['String']['input'];
  /** Full name of the user */
  fullName?: InputMaybe<Scalars['String']['input']>;
  /** Whether the user account is active (defaults to true) */
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether the user has administrative privileges (defaults to false) */
  isAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  /** Username for login and display */
  username: Scalars['String']['input'];
};

/** Input type for updating an existing user. */
export type UserUpdateInput = {
  /** Updated Discord ID */
  discordId?: InputMaybe<Scalars['String']['input']>;
  /** Updated email address */
  email?: InputMaybe<Scalars['String']['input']>;
  /** Updated full name */
  fullName?: InputMaybe<Scalars['String']['input']>;
  /** Updated active status */
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** Updated admin privileges */
  isAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  /** Updated username */
  username?: InputMaybe<Scalars['String']['input']>;
};

export type GetEventsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  eventType?: InputMaybe<EventType>;
  status?: InputMaybe<EventStatus>;
}>;


export type GetEventsQuery = { __typename?: 'Query', getEvents: Array<{ __typename?: 'Event', id: string, name: string, description?: string | null, eventType?: EventType | null, status?: EventStatus | null, tier?: EventTier | null, startDate?: any | null, endDate?: any | null, entryFee: number, maxParticipants?: number | null, currentParticipants: number, createdBy: string, createdAt: any, updatedAt?: any | null }> };

export type GetEventQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetEventQuery = { __typename?: 'Query', getEvent?: { __typename?: 'Event', id: string, name: string, description?: string | null, eventType?: EventType | null, status?: EventStatus | null, tier?: EventTier | null, startDate?: any | null, endDate?: any | null, entryFee: number, maxParticipants?: number | null, currentParticipants: number, createdBy: string, createdAt: any, updatedAt?: any | null } | null };

export type GetMatchesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  eventId?: InputMaybe<Scalars['UUID']['input']>;
  stage?: InputMaybe<MatchStage>;
  status?: InputMaybe<MatchStatus>;
  teamId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetMatchesQuery = { __typename?: 'Query', getMatches: Array<{ __typename?: 'Match', id: string, eventId?: any | null, gameNumber: number, scheduledAt?: any | null, startedAt?: any | null, endedAt?: any | null, playedAt?: any | null, status: MatchStatus, stage: MatchStage, isLive: boolean, timeElapsed?: string | null, scoreA?: number | null, scoreB?: number | null, winnerId?: any | null, winnerName?: string | null, teamAId: any, teamAName: string, teamBId: any, teamBName: string, boxscoreUrl?: string | null, createdAt: any, updatedAt?: any | null, event?: { __typename?: 'Event', id: string, name: string, eventType?: EventType | null, status?: EventStatus | null, tier?: EventTier | null } | null, teamA?: { __typename?: 'Team', id: string, name: string, logoUrl?: string | null } | null, teamB?: { __typename?: 'Team', id: string, name: string, logoUrl?: string | null } | null, winner?: { __typename?: 'Team', id: string, name: string, logoUrl?: string | null } | null }> };

export type GetMatchQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetMatchQuery = { __typename?: 'Query', getMatch?: { __typename?: 'Match', id: string, eventId?: any | null, gameNumber: number, scheduledAt?: any | null, startedAt?: any | null, endedAt?: any | null, playedAt?: any | null, status: MatchStatus, stage: MatchStage, isLive: boolean, timeElapsed?: string | null, scoreA?: number | null, scoreB?: number | null, winnerId?: any | null, winnerName?: string | null, teamAId: any, teamAName: string, teamBId: any, teamBName: string, boxscoreUrl?: string | null, createdAt: any, updatedAt?: any | null, event?: { __typename?: 'Event', id: string, name: string, eventType?: EventType | null, status?: EventStatus | null, tier?: EventTier | null } | null, teamA?: { __typename?: 'Team', id: string, name: string, logoUrl?: string | null } | null, teamB?: { __typename?: 'Team', id: string, name: string, logoUrl?: string | null } | null, winner?: { __typename?: 'Team', id: string, name: string, logoUrl?: string | null } | null, teamAPlayers: Array<{ __typename?: 'PlayerMatchStats', id: string, playerId: string, teamId: string, matchId: string, points: number, assists: number, rebounds: number, steals: number, blocks: number, turnovers: number, fouls: number, fgm: number, fga: number, threePointsMade: number, threePointsAttempted: number, ftm: number, fta: number, plusMinus: number, minutesPlayed: number, createdAt: any, updatedAt?: any | null }>, teamBPlayers: Array<{ __typename?: 'PlayerMatchStats', id: string, playerId: string, teamId: string, matchId: string, points: number, assists: number, rebounds: number, steals: number, blocks: number, turnovers: number, fouls: number, fgm: number, fga: number, threePointsMade: number, threePointsAttempted: number, ftm: number, fta: number, plusMinus: number, minutesPlayed: number, createdAt: any, updatedAt?: any | null }> } | null };

export type GetPlayersQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  region?: InputMaybe<Scalars['String']['input']>;
  tier?: InputMaybe<PlayerTier>;
}>;


export type GetPlayersQuery = { __typename?: 'Query', getPlayers: Array<{ __typename?: 'Player', id: string, gamertag: string, position?: PlayerPosition | null, currentRp?: number | null, peakRp?: number | null, salaryTier?: SalaryTier | null, teamName?: string | null, tier?: PlayerTier | null, region?: string | null, isVerified?: boolean | null, createdAt: any, updatedAt?: any | null, user: { __typename?: 'User', id: string, username: string, email: string, fullName?: string | null, isActive: boolean, isAdmin: boolean } }> };

export type GetTeamsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetTeamsQuery = { __typename?: 'Query', getTeams: Array<{ __typename?: 'Team', id: string, name: string, description?: string | null, isActive: boolean, logoUrl?: string | null, region?: string | null, createdAt: any, updatedAt?: any | null }> };

export type GetTeamQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetTeamQuery = { __typename?: 'Query', getTeam?: { __typename?: 'Team', id: string, name: string, description?: string | null, isActive: boolean, logoUrl?: string | null, region?: string | null, createdAt: any, updatedAt?: any | null } | null };


export const GetEventsDocument = gql`
    query GetEvents($limit: Int, $offset: Int, $eventType: EventType, $status: EventStatus) {
  getEvents(
    limit: $limit
    offset: $offset
    eventType: $eventType
    status: $status
  ) {
    id
    name
    description
    eventType
    status
    tier
    startDate
    endDate
    entryFee
    maxParticipants
    currentParticipants
    createdBy
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetEventsQuery__
 *
 * To run a query within a React component, call `useGetEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      eventType: // value for 'eventType'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useGetEventsQuery(baseOptions?: Apollo.QueryHookOptions<GetEventsQuery, GetEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, options);
      }
export function useGetEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventsQuery, GetEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, options);
        }
export function useGetEventsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetEventsQuery, GetEventsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, options);
        }
export type GetEventsQueryHookResult = ReturnType<typeof useGetEventsQuery>;
export type GetEventsLazyQueryHookResult = ReturnType<typeof useGetEventsLazyQuery>;
export type GetEventsSuspenseQueryHookResult = ReturnType<typeof useGetEventsSuspenseQuery>;
export type GetEventsQueryResult = Apollo.QueryResult<GetEventsQuery, GetEventsQueryVariables>;
export const GetEventDocument = gql`
    query GetEvent($id: ID!) {
  getEvent(id: $id) {
    id
    name
    description
    eventType
    status
    tier
    startDate
    endDate
    entryFee
    maxParticipants
    currentParticipants
    createdBy
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetEventQuery__
 *
 * To run a query within a React component, call `useGetEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetEventQuery(baseOptions: Apollo.QueryHookOptions<GetEventQuery, GetEventQueryVariables> & ({ variables: GetEventQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventQuery, GetEventQueryVariables>(GetEventDocument, options);
      }
export function useGetEventLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventQuery, GetEventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventQuery, GetEventQueryVariables>(GetEventDocument, options);
        }
export function useGetEventSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetEventQuery, GetEventQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEventQuery, GetEventQueryVariables>(GetEventDocument, options);
        }
export type GetEventQueryHookResult = ReturnType<typeof useGetEventQuery>;
export type GetEventLazyQueryHookResult = ReturnType<typeof useGetEventLazyQuery>;
export type GetEventSuspenseQueryHookResult = ReturnType<typeof useGetEventSuspenseQuery>;
export type GetEventQueryResult = Apollo.QueryResult<GetEventQuery, GetEventQueryVariables>;
export const GetMatchesDocument = gql`
    query GetMatches($limit: Int, $offset: Int, $eventId: UUID, $stage: MatchStage, $status: MatchStatus, $teamId: ID) {
  getMatches(
    limit: $limit
    offset: $offset
    eventId: $eventId
    stage: $stage
    status: $status
    teamId: $teamId
  ) {
    id
    eventId
    gameNumber
    scheduledAt
    startedAt
    endedAt
    playedAt
    status
    stage
    isLive
    timeElapsed
    scoreA
    scoreB
    winnerId
    winnerName
    teamAId
    teamAName
    teamBId
    teamBName
    boxscoreUrl
    createdAt
    updatedAt
    event {
      id
      name
      eventType
      status
      tier
    }
    teamA {
      id
      name
      logoUrl
    }
    teamB {
      id
      name
      logoUrl
    }
    winner {
      id
      name
      logoUrl
    }
  }
}
    `;

/**
 * __useGetMatchesQuery__
 *
 * To run a query within a React component, call `useGetMatchesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMatchesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMatchesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      eventId: // value for 'eventId'
 *      stage: // value for 'stage'
 *      status: // value for 'status'
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useGetMatchesQuery(baseOptions?: Apollo.QueryHookOptions<GetMatchesQuery, GetMatchesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMatchesQuery, GetMatchesQueryVariables>(GetMatchesDocument, options);
      }
export function useGetMatchesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMatchesQuery, GetMatchesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMatchesQuery, GetMatchesQueryVariables>(GetMatchesDocument, options);
        }
export function useGetMatchesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMatchesQuery, GetMatchesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMatchesQuery, GetMatchesQueryVariables>(GetMatchesDocument, options);
        }
export type GetMatchesQueryHookResult = ReturnType<typeof useGetMatchesQuery>;
export type GetMatchesLazyQueryHookResult = ReturnType<typeof useGetMatchesLazyQuery>;
export type GetMatchesSuspenseQueryHookResult = ReturnType<typeof useGetMatchesSuspenseQuery>;
export type GetMatchesQueryResult = Apollo.QueryResult<GetMatchesQuery, GetMatchesQueryVariables>;
export const GetMatchDocument = gql`
    query GetMatch($id: ID!) {
  getMatch(id: $id) {
    id
    eventId
    gameNumber
    scheduledAt
    startedAt
    endedAt
    playedAt
    status
    stage
    isLive
    timeElapsed
    scoreA
    scoreB
    winnerId
    winnerName
    teamAId
    teamAName
    teamBId
    teamBName
    boxscoreUrl
    createdAt
    updatedAt
    event {
      id
      name
      eventType
      status
      tier
    }
    teamA {
      id
      name
      logoUrl
    }
    teamB {
      id
      name
      logoUrl
    }
    winner {
      id
      name
      logoUrl
    }
    teamAPlayers {
      id
      playerId
      teamId
      matchId
      points
      assists
      rebounds
      steals
      blocks
      turnovers
      fouls
      fgm
      fga
      threePointsMade
      threePointsAttempted
      ftm
      fta
      plusMinus
      minutesPlayed
      createdAt
      updatedAt
    }
    teamBPlayers {
      id
      playerId
      teamId
      matchId
      points
      assists
      rebounds
      steals
      blocks
      turnovers
      fouls
      fgm
      fga
      threePointsMade
      threePointsAttempted
      ftm
      fta
      plusMinus
      minutesPlayed
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useGetMatchQuery__
 *
 * To run a query within a React component, call `useGetMatchQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMatchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMatchQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetMatchQuery(baseOptions: Apollo.QueryHookOptions<GetMatchQuery, GetMatchQueryVariables> & ({ variables: GetMatchQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMatchQuery, GetMatchQueryVariables>(GetMatchDocument, options);
      }
export function useGetMatchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMatchQuery, GetMatchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMatchQuery, GetMatchQueryVariables>(GetMatchDocument, options);
        }
export function useGetMatchSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMatchQuery, GetMatchQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMatchQuery, GetMatchQueryVariables>(GetMatchDocument, options);
        }
export type GetMatchQueryHookResult = ReturnType<typeof useGetMatchQuery>;
export type GetMatchLazyQueryHookResult = ReturnType<typeof useGetMatchLazyQuery>;
export type GetMatchSuspenseQueryHookResult = ReturnType<typeof useGetMatchSuspenseQuery>;
export type GetMatchQueryResult = Apollo.QueryResult<GetMatchQuery, GetMatchQueryVariables>;
export const GetPlayersDocument = gql`
    query GetPlayers($limit: Int, $offset: Int, $region: String, $tier: PlayerTier) {
  getPlayers(limit: $limit, offset: $offset, region: $region, tier: $tier) {
    id
    gamertag
    position
    currentRp
    peakRp
    salaryTier
    teamName
    tier
    region
    isVerified
    createdAt
    updatedAt
    user {
      id
      username
      email
      fullName
      isActive
      isAdmin
    }
  }
}
    `;

/**
 * __useGetPlayersQuery__
 *
 * To run a query within a React component, call `useGetPlayersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlayersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlayersQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      region: // value for 'region'
 *      tier: // value for 'tier'
 *   },
 * });
 */
export function useGetPlayersQuery(baseOptions?: Apollo.QueryHookOptions<GetPlayersQuery, GetPlayersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPlayersQuery, GetPlayersQueryVariables>(GetPlayersDocument, options);
      }
export function useGetPlayersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlayersQuery, GetPlayersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPlayersQuery, GetPlayersQueryVariables>(GetPlayersDocument, options);
        }
export function useGetPlayersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPlayersQuery, GetPlayersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPlayersQuery, GetPlayersQueryVariables>(GetPlayersDocument, options);
        }
export type GetPlayersQueryHookResult = ReturnType<typeof useGetPlayersQuery>;
export type GetPlayersLazyQueryHookResult = ReturnType<typeof useGetPlayersLazyQuery>;
export type GetPlayersSuspenseQueryHookResult = ReturnType<typeof useGetPlayersSuspenseQuery>;
export type GetPlayersQueryResult = Apollo.QueryResult<GetPlayersQuery, GetPlayersQueryVariables>;
export const GetTeamsDocument = gql`
    query GetTeams($limit: Int, $offset: Int) {
  getTeams(limit: $limit, offset: $offset) {
    id
    name
    description
    isActive
    logoUrl
    region
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetTeamsQuery__
 *
 * To run a query within a React component, call `useGetTeamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeamsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetTeamsQuery(baseOptions?: Apollo.QueryHookOptions<GetTeamsQuery, GetTeamsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTeamsQuery, GetTeamsQueryVariables>(GetTeamsDocument, options);
      }
export function useGetTeamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTeamsQuery, GetTeamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTeamsQuery, GetTeamsQueryVariables>(GetTeamsDocument, options);
        }
export function useGetTeamsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTeamsQuery, GetTeamsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTeamsQuery, GetTeamsQueryVariables>(GetTeamsDocument, options);
        }
export type GetTeamsQueryHookResult = ReturnType<typeof useGetTeamsQuery>;
export type GetTeamsLazyQueryHookResult = ReturnType<typeof useGetTeamsLazyQuery>;
export type GetTeamsSuspenseQueryHookResult = ReturnType<typeof useGetTeamsSuspenseQuery>;
export type GetTeamsQueryResult = Apollo.QueryResult<GetTeamsQuery, GetTeamsQueryVariables>;
export const GetTeamDocument = gql`
    query GetTeam($id: ID!) {
  getTeam(id: $id) {
    id
    name
    description
    isActive
    logoUrl
    region
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetTeamQuery__
 *
 * To run a query within a React component, call `useGetTeamQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeamQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeamQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTeamQuery(baseOptions: Apollo.QueryHookOptions<GetTeamQuery, GetTeamQueryVariables> & ({ variables: GetTeamQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTeamQuery, GetTeamQueryVariables>(GetTeamDocument, options);
      }
export function useGetTeamLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTeamQuery, GetTeamQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTeamQuery, GetTeamQueryVariables>(GetTeamDocument, options);
        }
export function useGetTeamSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTeamQuery, GetTeamQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTeamQuery, GetTeamQueryVariables>(GetTeamDocument, options);
        }
export type GetTeamQueryHookResult = ReturnType<typeof useGetTeamQuery>;
export type GetTeamLazyQueryHookResult = ReturnType<typeof useGetTeamLazyQuery>;
export type GetTeamSuspenseQueryHookResult = ReturnType<typeof useGetTeamSuspenseQuery>;
export type GetTeamQueryResult = Apollo.QueryResult<GetTeamQuery, GetTeamQueryVariables>;