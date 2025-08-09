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
  /** Custom scalar for handling BigFloat values. */
  BigFloat: { input: any; output: any; }
  /** Custom scalar for handling BigInt values. */
  BigInt: { input: any; output: any; }
  /** Custom scalar for handling date and time values in ISO 8601 format. */
  DateTime: { input: any; output: any; }
  /** Custom scalar for handling JSON values. */
  JSON: { input: any; output: any; }
  /** Custom scalar for handling UUID values. */
  UUID: { input: any; output: any; }
};

/** Basic dashboard statistics. */
export type DashboardStats = {
  __typename?: 'DashboardStats';
  /** Number of active players */
  activePlayers: Scalars['Int']['output'];
  /** Number of active teams */
  activeTeams: Scalars['Int']['output'];
  /** Average player RP */
  averagePlayerRP: Scalars['Float']['output'];
  /** Average team size */
  averageTeamSize: Scalars['Float']['output'];
  /** Number of completed matches */
  completedMatches: Scalars['Int']['output'];
  /** Most active team */
  mostActiveTeam?: Maybe<Team>;
  /** Recent matches */
  recentMatches: Array<Match>;
  /** Recent players */
  recentPlayers: Array<Player>;
  /** Top performing player */
  topPerformingPlayer?: Maybe<Player>;
  /** Total number of events */
  totalEvents: Scalars['Int']['output'];
  /** Total number of matches */
  totalMatches: Scalars['Int']['output'];
  /** Total number of players */
  totalPlayers: Scalars['Int']['output'];
  /** Total number of teams */
  totalTeams: Scalars['Int']['output'];
  /** Number of upcoming events */
  upcomingEvents: Scalars['Int']['output'];
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

/** Input type for creating a new event. */
export type EventInput = {
  /** ID of the user who created the event */
  createdBy: Scalars['ID']['input'];
  /** Event description */
  description?: InputMaybe<Scalars['String']['input']>;
  /** When the event ends */
  endDate: Scalars['DateTime']['input'];
  /** Entry fee for participants */
  entryFee?: InputMaybe<Scalars['Float']['input']>;
  /** Type of event */
  eventType: EventType;
  /** Maximum number of participants */
  maxParticipants?: InputMaybe<Scalars['Int']['input']>;
  /** Event name */
  name: Scalars['String']['input'];
  /** When the event starts */
  startDate: Scalars['DateTime']['input'];
  /** Event tier */
  tier: EventTier;
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

/** Input type for updating an existing event. */
export type EventUpdateInput = {
  /** Updated event description */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Updated end date */
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  /** Updated entry fee */
  entryFee?: InputMaybe<Scalars['Float']['input']>;
  /** Updated event type */
  eventType?: InputMaybe<EventType>;
  /** Updated max participants */
  maxParticipants?: InputMaybe<Scalars['Int']['input']>;
  /** Updated event name */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Updated start date */
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  /** Updated event status */
  status?: InputMaybe<EventStatus>;
  /** Updated event tier */
  tier?: InputMaybe<EventTier>;
};

/** Basic leaderboard entry. */
export type LeaderboardEntry = {
  __typename?: 'LeaderboardEntry';
  /** Average assists per game */
  averageAssists: Scalars['Float']['output'];
  /** Average points per game */
  averagePoints: Scalars['Float']['output'];
  /** Average rebounds per game */
  averageRebounds: Scalars['Float']['output'];
  /** Number of losses */
  losses: Scalars['Int']['output'];
  /** Player information */
  player: Player;
  /** Player's rank */
  rank: Scalars['Int']['output'];
  /** Total matches played */
  totalMatches: Scalars['Int']['output'];
  /** Win rate percentage */
  winRate: Scalars['Float']['output'];
  /** Number of wins */
  wins: Scalars['Int']['output'];
};

/** Sort options for leaderboard. */
export enum LeaderboardSortBy {
  /** Sort by average assists */
  AverageAssists = 'AVERAGE_ASSISTS',
  /** Sort by average points */
  AveragePoints = 'AVERAGE_POINTS',
  /** Sort by average rebounds */
  AverageRebounds = 'AVERAGE_REBOUNDS',
  /** Sort by current RP */
  CurrentRp = 'CURRENT_RP',
  /** Sort by peak RP */
  PeakRp = 'PEAK_RP',
  /** Sort by number of wins */
  Wins = 'WINS',
  /** Sort by win rate */
  WinRate = 'WIN_RATE'
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
  eventId: Scalars['UUID']['input'];
  /** Game number within the event */
  gameNumber: Scalars['Int']['input'];
  /** Optional notes about the match */
  notes?: InputMaybe<Scalars['String']['input']>;
  /** When the match is scheduled to start */
  scheduledAt: Scalars['DateTime']['input'];
  /** Match stage (group, quarterfinal, semifinal, final) */
  stage: MatchStage;
  /** Optional stream URL for the match */
  streamUrl?: InputMaybe<Scalars['String']['input']>;
  /** ID of team A */
  teamAId: Scalars['ID']['input'];
  /** Name of team A */
  teamAName: Scalars['String']['input'];
  /** ID of team B */
  teamBId: Scalars['ID']['input'];
  /** Name of team B */
  teamBName: Scalars['String']['input'];
  /** Optional venue where the match will be played */
  venue?: InputMaybe<Scalars['String']['input']>;
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
  /** Updated boxscore URL */
  boxscoreUrl?: InputMaybe<Scalars['String']['input']>;
  /** Updated end time */
  endedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Updated event ID */
  eventId?: InputMaybe<Scalars['UUID']['input']>;
  /** Updated game number */
  gameNumber?: InputMaybe<Scalars['Int']['input']>;
  /** Updated notes */
  notes?: InputMaybe<Scalars['String']['input']>;
  /** Updated scheduled time */
  scheduledAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Updated score for team A */
  scoreA?: InputMaybe<Scalars['Int']['input']>;
  /** Updated score for team B */
  scoreB?: InputMaybe<Scalars['Int']['input']>;
  /** Updated match stage */
  stage?: InputMaybe<MatchStage>;
  /** Updated start time */
  startedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Updated match status */
  status?: InputMaybe<MatchStatus>;
  /** Updated stream URL */
  streamUrl?: InputMaybe<Scalars['String']['input']>;
  /** Updated team A ID */
  teamAId?: InputMaybe<Scalars['ID']['input']>;
  /** Updated team A name */
  teamAName?: InputMaybe<Scalars['String']['input']>;
  /** Updated team B ID */
  teamBId?: InputMaybe<Scalars['ID']['input']>;
  /** Updated team B name */
  teamBName?: InputMaybe<Scalars['String']['input']>;
  /** Updated venue */
  venue?: InputMaybe<Scalars['String']['input']>;
  /** Updated winner ID */
  winnerId?: InputMaybe<Scalars['ID']['input']>;
  /** Updated winner name */
  winnerName?: InputMaybe<Scalars['String']['input']>;
};

/**
 * Root mutation type for the Bodega Cats GC GraphQL API.
 * Provides access to all write operations for creating, updating, and deleting data.
 */
export type Mutation = {
  __typename?: 'Mutation';
  /** Add a player to a team */
  addPlayerToTeam: Team;
  /** Assign a player to a team */
  assignPlayerToTeam: Player;
  /** Cancel an event */
  cancelEvent: Event;
  /** Cancel a match */
  cancelMatch: Match;
  /** Create a new event */
  createEvent: Event;
  /** Create a new player */
  createPlayer: Player;
  /** Create a new team */
  createTeam: Team;
  /** Create a new user (admin only) */
  createUser: User;
  /** Delete an event */
  deleteEvent: Scalars['Boolean']['output'];
  /** Delete a match */
  deleteMatch: Scalars['Boolean']['output'];
  /** Delete a player */
  deletePlayer: Scalars['Boolean']['output'];
  /** Delete a team */
  deleteTeam: Scalars['Boolean']['output'];
  /** Delete a user (admin only) */
  deleteUser: Scalars['Boolean']['output'];
  /** End an event */
  endEvent: Event;
  /** End a match with final scores */
  endMatch: Match;
  /** Pause a match */
  pauseMatch: Match;
  /** Register a team for an event */
  registerTeamForEvent: Event;
  /** Remove a player from their current team */
  removePlayerFromCurrentTeam: Player;
  /** Remove a player from a team */
  removePlayerFromTeam: Team;
  /** Resume a paused match */
  resumeMatch: Match;
  /** Set a player as team captain */
  setTeamCaptain: Team;
  /** Start an event */
  startEvent: Event;
  /** Start a match */
  startMatch: Match;
  /** Create a new match */
  submitMatch: Match;
  /** Submit player statistics for a match */
  submitMatchStats: Array<PlayerMatchStats>;
  /** Unregister a team from an event */
  unregisterTeamFromEvent: Event;
  /** Update an existing event */
  updateEvent: Event;
  /** Update an existing match */
  updateMatch: Match;
  /** Update match score */
  updateMatchScore: Match;
  /** Update match time elapsed */
  updateMatchTime: Match;
  /** Update an existing player */
  updatePlayer: Player;
  /** Update player ranking points */
  updatePlayerRP: Player;
  /** Update an existing team */
  updateTeam: Team;
  /** Update an existing user (admin only) */
  updateUser: User;
  /** Verify a player account */
  verifyPlayer: Player;
};


/**
 * Root mutation type for the Bodega Cats GC GraphQL API.
 * Provides access to all write operations for creating, updating, and deleting data.
 */
export type MutationAddPlayerToTeamArgs = {
  playerId: Scalars['ID']['input'];
  teamId: Scalars['ID']['input'];
};


/**
 * Root mutation type for the Bodega Cats GC GraphQL API.
 * Provides access to all write operations for creating, updating, and deleting data.
 */
export type MutationAssignPlayerToTeamArgs = {
  playerId: Scalars['ID']['input'];
  teamId: Scalars['ID']['input'];
};


/**
 * Root mutation type for the Bodega Cats GC GraphQL API.
 * Provides access to all write operations for creating, updating, and deleting data.
 */
export type MutationCancelEventArgs = {
  id: Scalars['ID']['input'];
  reason: Scalars['String']['input'];
};


/**
 * Root mutation type for the Bodega Cats GC GraphQL API.
 * Provides access to all write operations for creating, updating, and deleting data.
 */
export type MutationCancelMatchArgs = {
  id: Scalars['ID']['input'];
  reason: Scalars['String']['input'];
};


/**
 * Root mutation type for the Bodega Cats GC GraphQL API.
 * Provides access to all write operations for creating, updating, and deleting data.
 */
export type MutationCreateEventArgs = {
  input: EventInput;
};


/**
 * Root mutation type for the Bodega Cats GC GraphQL API.
 * Provides access to all write operations for creating, updating, and deleting data.
 */
export type MutationCreatePlayerArgs = {
  input: PlayerInput;
};


/**
 * Root mutation type for the Bodega Cats GC GraphQL API.
 * Provides access to all write operations for creating, updating, and deleting data.
 */
export type MutationCreateTeamArgs = {
  input: TeamInput;
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
export type MutationDeleteEventArgs = {
  id: Scalars['ID']['input'];
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
export type MutationDeletePlayerArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Root mutation type for the Bodega Cats GC GraphQL API.
 * Provides access to all write operations for creating, updating, and deleting data.
 */
export type MutationDeleteTeamArgs = {
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
export type MutationEndEventArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Root mutation type for the Bodega Cats GC GraphQL API.
 * Provides access to all write operations for creating, updating, and deleting data.
 */
export type MutationEndMatchArgs = {
  id: Scalars['ID']['input'];
  scoreA: Scalars['Int']['input'];
  scoreB: Scalars['Int']['input'];
};


/**
 * Root mutation type for the Bodega Cats GC GraphQL API.
 * Provides access to all write operations for creating, updating, and deleting data.
 */
export type MutationPauseMatchArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Root mutation type for the Bodega Cats GC GraphQL API.
 * Provides access to all write operations for creating, updating, and deleting data.
 */
export type MutationRegisterTeamForEventArgs = {
  eventId: Scalars['ID']['input'];
  teamId: Scalars['ID']['input'];
};


/**
 * Root mutation type for the Bodega Cats GC GraphQL API.
 * Provides access to all write operations for creating, updating, and deleting data.
 */
export type MutationRemovePlayerFromCurrentTeamArgs = {
  playerId: Scalars['ID']['input'];
};


/**
 * Root mutation type for the Bodega Cats GC GraphQL API.
 * Provides access to all write operations for creating, updating, and deleting data.
 */
export type MutationRemovePlayerFromTeamArgs = {
  playerId: Scalars['ID']['input'];
  teamId: Scalars['ID']['input'];
};


/**
 * Root mutation type for the Bodega Cats GC GraphQL API.
 * Provides access to all write operations for creating, updating, and deleting data.
 */
export type MutationResumeMatchArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Root mutation type for the Bodega Cats GC GraphQL API.
 * Provides access to all write operations for creating, updating, and deleting data.
 */
export type MutationSetTeamCaptainArgs = {
  playerId: Scalars['ID']['input'];
  teamId: Scalars['ID']['input'];
};


/**
 * Root mutation type for the Bodega Cats GC GraphQL API.
 * Provides access to all write operations for creating, updating, and deleting data.
 */
export type MutationStartEventArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Root mutation type for the Bodega Cats GC GraphQL API.
 * Provides access to all write operations for creating, updating, and deleting data.
 */
export type MutationStartMatchArgs = {
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
export type MutationUnregisterTeamFromEventArgs = {
  eventId: Scalars['ID']['input'];
  teamId: Scalars['ID']['input'];
};


/**
 * Root mutation type for the Bodega Cats GC GraphQL API.
 * Provides access to all write operations for creating, updating, and deleting data.
 */
export type MutationUpdateEventArgs = {
  id: Scalars['ID']['input'];
  input: EventUpdateInput;
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
export type MutationUpdateMatchScoreArgs = {
  id: Scalars['ID']['input'];
  scoreA: Scalars['Int']['input'];
  scoreB: Scalars['Int']['input'];
};


/**
 * Root mutation type for the Bodega Cats GC GraphQL API.
 * Provides access to all write operations for creating, updating, and deleting data.
 */
export type MutationUpdateMatchTimeArgs = {
  id: Scalars['ID']['input'];
  timeElapsed: Scalars['Int']['input'];
};


/**
 * Root mutation type for the Bodega Cats GC GraphQL API.
 * Provides access to all write operations for creating, updating, and deleting data.
 */
export type MutationUpdatePlayerArgs = {
  id: Scalars['ID']['input'];
  input: PlayerUpdateInput;
};


/**
 * Root mutation type for the Bodega Cats GC GraphQL API.
 * Provides access to all write operations for creating, updating, and deleting data.
 */
export type MutationUpdatePlayerRpArgs = {
  playerId: Scalars['ID']['input'];
  reason: Scalars['String']['input'];
  rpChange: Scalars['Float']['input'];
};


/**
 * Root mutation type for the Bodega Cats GC GraphQL API.
 * Provides access to all write operations for creating, updating, and deleting data.
 */
export type MutationUpdateTeamArgs = {
  id: Scalars['ID']['input'];
  input: TeamUpdateInput;
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
 * Root mutation type for the Bodega Cats GC GraphQL API.
 * Provides access to all write operations for creating, updating, and deleting data.
 */
export type MutationVerifyPlayerArgs = {
  id: Scalars['ID']['input'];
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
  /** Current team information */
  current_teams?: Maybe<Team>;
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

/** Input type for creating a new player. */
export type PlayerInput = {
  /** Gaming handle/username used in matches */
  gamertag: Scalars['String']['input'];
  /** Whether the player account has been verified */
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  /** Player position on the court */
  position?: InputMaybe<PlayerPosition>;
  /** Geographic region for matchmaking */
  region?: InputMaybe<Scalars['String']['input']>;
  /** Salary tier indicating player value */
  salaryTier?: InputMaybe<SalaryTier>;
  /** Name of the team the player is currently on */
  teamName?: InputMaybe<Scalars['String']['input']>;
  /** ID of the associated user account */
  userId: Scalars['ID']['input'];
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

/** Input type for player match statistics. */
export type PlayerMatchStatsInput = {
  /** Assists made */
  assists: Scalars['Int']['input'];
  /** Blocks made */
  blocks: Scalars['Int']['input'];
  /** Field goals attempted */
  fga: Scalars['Int']['input'];
  /** Field goals made */
  fgm: Scalars['Int']['input'];
  /** Fouls committed */
  fouls: Scalars['Int']['input'];
  /** Free throws attempted */
  fta: Scalars['Int']['input'];
  /** Free throws made */
  ftm: Scalars['Int']['input'];
  /** Minutes played */
  minutesPlayed: Scalars['Int']['input'];
  /** ID of the player */
  playerId: Scalars['ID']['input'];
  /** Plus/minus rating */
  plusMinus: Scalars['Int']['input'];
  /** Points scored */
  points: Scalars['Int']['input'];
  /** Rebounds grabbed */
  rebounds: Scalars['Int']['input'];
  /** Steals made */
  steals: Scalars['Int']['input'];
  /** ID of the team the player is on */
  teamId: Scalars['ID']['input'];
  /** Three-point shots attempted */
  threePointsAttempted: Scalars['Int']['input'];
  /** Three-point shots made */
  threePointsMade: Scalars['Int']['input'];
  /** Turnovers committed */
  turnovers: Scalars['Int']['input'];
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

/** Input type for updating an existing player. */
export type PlayerUpdateInput = {
  /** Updated current ranking points */
  currentRp?: InputMaybe<Scalars['Float']['input']>;
  /** Updated gaming handle */
  gamertag?: InputMaybe<Scalars['String']['input']>;
  /** Updated verification status */
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  /** Updated highest ranking points achieved */
  peakRp?: InputMaybe<Scalars['Float']['input']>;
  /** Updated player position */
  position?: InputMaybe<PlayerPosition>;
  /** Updated geographic region */
  region?: InputMaybe<Scalars['String']['input']>;
  /** Updated salary tier */
  salaryTier?: InputMaybe<SalaryTier>;
  /** Updated team name */
  teamName?: InputMaybe<Scalars['String']['input']>;
  /** Updated player tier */
  tier?: InputMaybe<PlayerTier>;
};

/**
 * Root query type for the Bodega Cats GC GraphQL API.
 * Provides access to all read operations for users, matches, teams, events, and players.
 */
export type Query = {
  __typename?: 'Query';
  /** Get dashboard statistics */
  getDashboardStats: DashboardStats;
  /** Get a specific event by ID */
  getEvent?: Maybe<Event>;
  /** Get a list of events with optional filtering and pagination */
  getEvents: Array<Event>;
  /** Get leaderboard with sorting and filtering options */
  getLeaderboard: Array<LeaderboardEntry>;
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
  /** Get top performing players */
  getTopPlayers: Array<LeaderboardEntry>;
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
export type QueryGetLeaderboardArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  region?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<LeaderboardSortBy>;
  tier?: InputMaybe<PlayerTier>;
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
export type QueryGetTopPlayersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  tier?: InputMaybe<PlayerTier>;
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

/** Input type for creating a new team. */
export type TeamInput = {
  /** Team description */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Whether the team is active */
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** URL to team logo */
  logoUrl?: InputMaybe<Scalars['String']['input']>;
  /** Team name */
  name: Scalars['String']['input'];
  /** Geographic region */
  region?: InputMaybe<Scalars['String']['input']>;
};

/** Input type for updating an existing team. */
export type TeamUpdateInput = {
  /** Updated team description */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Updated active status */
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** Updated logo URL */
  logoUrl?: InputMaybe<Scalars['String']['input']>;
  /** Updated team name */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Updated region */
  region?: InputMaybe<Scalars['String']['input']>;
};

/** Time range options for analytics. */
export enum TimeRange {
  /** All time */
  AllTime = 'ALL_TIME',
  /** Last 6 months */
  Last_6Months = 'LAST_6_MONTHS',
  /** Last 7 days */
  Last_7Days = 'LAST_7_DAYS',
  /** Last 30 days */
  Last_30Days = 'LAST_30_DAYS',
  /** Last 90 days */
  Last_90Days = 'LAST_90_DAYS',
  /** Last year */
  LastYear = 'LAST_YEAR'
}

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

export type CreateEventMutationVariables = Exact<{
  input: EventInput;
}>;


export type CreateEventMutation = { __typename?: 'Mutation', createEvent: { __typename?: 'Event', id: string, name: string, description?: string | null, eventType?: EventType | null, status?: EventStatus | null, tier?: EventTier | null, startDate?: any | null, endDate?: any | null, entryFee: number, maxParticipants?: number | null, currentParticipants: number, createdBy: string, createdAt: any, updatedAt?: any | null } };

export type UpdateEventMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: EventUpdateInput;
}>;


export type UpdateEventMutation = { __typename?: 'Mutation', updateEvent: { __typename?: 'Event', id: string, name: string, description?: string | null, eventType?: EventType | null, status?: EventStatus | null, tier?: EventTier | null, startDate?: any | null, endDate?: any | null, entryFee: number, maxParticipants?: number | null, currentParticipants: number, createdBy: string, createdAt: any, updatedAt?: any | null } };

export type DeleteEventMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteEventMutation = { __typename?: 'Mutation', deleteEvent: boolean };

export type StartEventMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type StartEventMutation = { __typename?: 'Mutation', startEvent: { __typename?: 'Event', id: string, name: string, status?: EventStatus | null, startDate?: any | null, updatedAt?: any | null } };

export type EndEventMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type EndEventMutation = { __typename?: 'Mutation', endEvent: { __typename?: 'Event', id: string, name: string, status?: EventStatus | null, endDate?: any | null, updatedAt?: any | null } };

export type CancelEventMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  reason: Scalars['String']['input'];
}>;


export type CancelEventMutation = { __typename?: 'Mutation', cancelEvent: { __typename?: 'Event', id: string, name: string, status?: EventStatus | null, updatedAt?: any | null } };

export type SubmitMatchMutationVariables = Exact<{
  input: MatchInput;
}>;


export type SubmitMatchMutation = { __typename?: 'Mutation', submitMatch: { __typename?: 'Match', id: string, eventId?: any | null, gameNumber: number, scheduledAt?: any | null, startedAt?: any | null, endedAt?: any | null, playedAt?: any | null, status: MatchStatus, stage: MatchStage, isLive: boolean, timeElapsed?: string | null, scoreA?: number | null, scoreB?: number | null, winnerId?: any | null, winnerName?: string | null, teamAId: any, teamAName: string, teamBId: any, teamBName: string, boxscoreUrl?: string | null, createdAt: any, updatedAt?: any | null } };

export type UpdateMatchMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: MatchUpdateInput;
}>;


export type UpdateMatchMutation = { __typename?: 'Mutation', updateMatch: { __typename?: 'Match', id: string, eventId?: any | null, gameNumber: number, scheduledAt?: any | null, startedAt?: any | null, endedAt?: any | null, playedAt?: any | null, status: MatchStatus, stage: MatchStage, isLive: boolean, timeElapsed?: string | null, scoreA?: number | null, scoreB?: number | null, winnerId?: any | null, winnerName?: string | null, teamAId: any, teamAName: string, teamBId: any, teamBName: string, boxscoreUrl?: string | null, createdAt: any, updatedAt?: any | null } };

export type DeleteMatchMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteMatchMutation = { __typename?: 'Mutation', deleteMatch: boolean };

export type SubmitMatchStatsMutationVariables = Exact<{
  matchId: Scalars['ID']['input'];
  stats: Array<PlayerMatchStatsInput> | PlayerMatchStatsInput;
}>;


export type SubmitMatchStatsMutation = { __typename?: 'Mutation', submitMatchStats: Array<{ __typename?: 'PlayerMatchStats', id: string, playerId: string, teamId: string, matchId: string, points: number, assists: number, rebounds: number, steals: number, blocks: number, turnovers: number, fouls: number, fgm: number, fga: number, threePointsMade: number, threePointsAttempted: number, ftm: number, fta: number, plusMinus: number, minutesPlayed: number, createdAt: any, updatedAt?: any | null }> };

export type StartMatchMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type StartMatchMutation = { __typename?: 'Mutation', startMatch: { __typename?: 'Match', id: string, status: MatchStatus, startedAt?: any | null, isLive: boolean, updatedAt?: any | null } };

export type EndMatchMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  scoreA: Scalars['Int']['input'];
  scoreB: Scalars['Int']['input'];
}>;


export type EndMatchMutation = { __typename?: 'Mutation', endMatch: { __typename?: 'Match', id: string, status: MatchStatus, endedAt?: any | null, scoreA?: number | null, scoreB?: number | null, winnerId?: any | null, winnerName?: string | null, isLive: boolean, updatedAt?: any | null } };

export type PauseMatchMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type PauseMatchMutation = { __typename?: 'Mutation', pauseMatch: { __typename?: 'Match', id: string, status: MatchStatus, isLive: boolean, updatedAt?: any | null } };

export type ResumeMatchMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ResumeMatchMutation = { __typename?: 'Mutation', resumeMatch: { __typename?: 'Match', id: string, status: MatchStatus, isLive: boolean, updatedAt?: any | null } };

export type CancelMatchMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  reason: Scalars['String']['input'];
}>;


export type CancelMatchMutation = { __typename?: 'Mutation', cancelMatch: { __typename?: 'Match', id: string, status: MatchStatus, updatedAt?: any | null } };

export type UpdateMatchScoreMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  scoreA: Scalars['Int']['input'];
  scoreB: Scalars['Int']['input'];
}>;


export type UpdateMatchScoreMutation = { __typename?: 'Mutation', updateMatchScore: { __typename?: 'Match', id: string, scoreA?: number | null, scoreB?: number | null, winnerId?: any | null, winnerName?: string | null, updatedAt?: any | null } };

export type UpdateMatchTimeMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  timeElapsed: Scalars['Int']['input'];
}>;


export type UpdateMatchTimeMutation = { __typename?: 'Mutation', updateMatchTime: { __typename?: 'Match', id: string, timeElapsed?: string | null, updatedAt?: any | null } };

export type CreatePlayerMutationVariables = Exact<{
  input: PlayerInput;
}>;


export type CreatePlayerMutation = { __typename?: 'Mutation', createPlayer: { __typename?: 'Player', id: string, userId: string, gamertag: string, region?: string | null, currentRp?: number | null, peakRp?: number | null, tier?: PlayerTier | null, position?: PlayerPosition | null, salaryTier?: SalaryTier | null, teamName?: string | null, isVerified?: boolean | null, createdAt: any, updatedAt?: any | null, user: { __typename?: 'User', id: string, username: string, email: string, fullName?: string | null, isActive: boolean, isAdmin: boolean, discordId?: string | null, createdAt: any, updatedAt?: any | null } } };

export type UpdatePlayerMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: PlayerUpdateInput;
}>;


export type UpdatePlayerMutation = { __typename?: 'Mutation', updatePlayer: { __typename?: 'Player', id: string, userId: string, gamertag: string, region?: string | null, currentRp?: number | null, peakRp?: number | null, tier?: PlayerTier | null, position?: PlayerPosition | null, salaryTier?: SalaryTier | null, teamName?: string | null, isVerified?: boolean | null, createdAt: any, updatedAt?: any | null, user: { __typename?: 'User', id: string, username: string, email: string, fullName?: string | null, isActive: boolean, isAdmin: boolean, discordId?: string | null, createdAt: any, updatedAt?: any | null } } };

export type DeletePlayerMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeletePlayerMutation = { __typename?: 'Mutation', deletePlayer: boolean };

export type UpdatePlayerRpMutationVariables = Exact<{
  playerId: Scalars['ID']['input'];
  rpChange: Scalars['Float']['input'];
  reason: Scalars['String']['input'];
}>;


export type UpdatePlayerRpMutation = { __typename?: 'Mutation', updatePlayerRP: { __typename?: 'Player', id: string, gamertag: string, currentRp?: number | null, peakRp?: number | null, tier?: PlayerTier | null, updatedAt?: any | null } };

export type VerifyPlayerMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type VerifyPlayerMutation = { __typename?: 'Mutation', verifyPlayer: { __typename?: 'Player', id: string, gamertag: string, isVerified?: boolean | null, updatedAt?: any | null } };

export type CreateTeamMutationVariables = Exact<{
  input: TeamInput;
}>;


export type CreateTeamMutation = { __typename?: 'Mutation', createTeam: { __typename?: 'Team', id: string, name: string, description?: string | null, isActive: boolean, logoUrl?: string | null, region?: string | null, createdAt: any, updatedAt?: any | null } };

export type UpdateTeamMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: TeamUpdateInput;
}>;


export type UpdateTeamMutation = { __typename?: 'Mutation', updateTeam: { __typename?: 'Team', id: string, name: string, description?: string | null, isActive: boolean, logoUrl?: string | null, region?: string | null, createdAt: any, updatedAt?: any | null } };

export type DeleteTeamMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteTeamMutation = { __typename?: 'Mutation', deleteTeam: boolean };

export type AddPlayerToTeamMutationVariables = Exact<{
  teamId: Scalars['ID']['input'];
  playerId: Scalars['ID']['input'];
}>;


export type AddPlayerToTeamMutation = { __typename?: 'Mutation', addPlayerToTeam: { __typename?: 'Team', id: string, name: string, description?: string | null, isActive: boolean, logoUrl?: string | null, region?: string | null, createdAt: any, updatedAt?: any | null } };

export type RemovePlayerFromTeamRosterMutationVariables = Exact<{
  teamId: Scalars['ID']['input'];
  playerId: Scalars['ID']['input'];
}>;


export type RemovePlayerFromTeamRosterMutation = { __typename?: 'Mutation', removePlayerFromTeam: { __typename?: 'Team', id: string, name: string, description?: string | null, isActive: boolean, logoUrl?: string | null, region?: string | null, createdAt: any, updatedAt?: any | null } };

export type SetTeamCaptainMutationVariables = Exact<{
  teamId: Scalars['ID']['input'];
  playerId: Scalars['ID']['input'];
}>;


export type SetTeamCaptainMutation = { __typename?: 'Mutation', setTeamCaptain: { __typename?: 'Team', id: string, name: string, description?: string | null, isActive: boolean, logoUrl?: string | null, region?: string | null, createdAt: any, updatedAt?: any | null } };

export type CreateUserMutationVariables = Exact<{
  input: UserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, username: string, email: string, fullName?: string | null, isActive: boolean, isAdmin: boolean, discordId?: string | null, createdAt: any, updatedAt?: any | null, player?: { __typename?: 'Player', id: string, gamertag: string, currentRp?: number | null, peakRp?: number | null, tier?: PlayerTier | null, position?: PlayerPosition | null } | null } };

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UserUpdateInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, username: string, email: string, fullName?: string | null, isActive: boolean, isAdmin: boolean, discordId?: string | null, createdAt: any, updatedAt?: any | null, player?: { __typename?: 'Player', id: string, gamertag: string, currentRp?: number | null, peakRp?: number | null, tier?: PlayerTier | null, position?: PlayerPosition | null } | null } };

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: boolean };

export type GetPlayersQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  region?: InputMaybe<Scalars['String']['input']>;
  tier?: InputMaybe<PlayerTier>;
}>;


export type GetPlayersQuery = { __typename?: 'Query', getPlayers: Array<{ __typename?: 'Player', id: string, gamertag: string, position?: PlayerPosition | null, currentRp?: number | null, peakRp?: number | null, salaryTier?: SalaryTier | null, teamName?: string | null, tier?: PlayerTier | null, region?: string | null, isVerified?: boolean | null, createdAt: any, updatedAt?: any | null, user: { __typename?: 'User', id: string, username: string, email: string, fullName?: string | null, isActive: boolean, isAdmin: boolean } }> };

export type GetDashboardStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDashboardStatsQuery = { __typename?: 'Query', getDashboardStats: { __typename?: 'DashboardStats', totalPlayers: number, totalTeams: number, totalMatches: number, totalEvents: number, activePlayers: number, activeTeams: number, completedMatches: number, upcomingEvents: number, averagePlayerRP: number, averageTeamSize: number, topPerformingPlayer?: { __typename?: 'Player', id: string, gamertag: string, currentRp?: number | null, peakRp?: number | null, tier?: PlayerTier | null, position?: PlayerPosition | null, teamName?: string | null } | null, mostActiveTeam?: { __typename?: 'Team', id: string, name: string, description?: string | null, logoUrl?: string | null, region?: string | null } | null, recentMatches: Array<{ __typename?: 'Match', id: string, teamAName: string, teamBName: string, scoreA?: number | null, scoreB?: number | null, winnerName?: string | null, playedAt?: any | null, status: MatchStatus }>, recentPlayers: Array<{ __typename?: 'Player', id: string, gamertag: string, currentRp?: number | null, tier?: PlayerTier | null, teamName?: string | null, createdAt: any }> } };

export type GetLeaderboardQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  tier?: InputMaybe<PlayerTier>;
  region?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<LeaderboardSortBy>;
}>;


export type GetLeaderboardQuery = { __typename?: 'Query', getLeaderboard: Array<{ __typename?: 'LeaderboardEntry', rank: number, wins: number, losses: number, winRate: number, totalMatches: number, averagePoints: number, averageAssists: number, averageRebounds: number, player: { __typename?: 'Player', id: string, gamertag: string, currentRp?: number | null, peakRp?: number | null, tier?: PlayerTier | null, position?: PlayerPosition | null, region?: string | null, teamName?: string | null, isVerified?: boolean | null, createdAt: any, user: { __typename?: 'User', id: string, username: string, fullName?: string | null } } }> };

export type GetTopPlayersQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  tier?: InputMaybe<PlayerTier>;
}>;


export type GetTopPlayersQuery = { __typename?: 'Query', getTopPlayers: Array<{ __typename?: 'LeaderboardEntry', rank: number, wins: number, losses: number, winRate: number, player: { __typename?: 'Player', id: string, gamertag: string, currentRp?: number | null, peakRp?: number | null, tier?: PlayerTier | null, position?: PlayerPosition | null, teamName?: string | null, isVerified?: boolean | null } }> };

export type GetEventWithDetailsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetEventWithDetailsQuery = { __typename?: 'Query', getEvent?: { __typename?: 'Event', id: string, name: string, description?: string | null, eventType?: EventType | null, status?: EventStatus | null, tier?: EventTier | null, startDate?: any | null, endDate?: any | null, entryFee: number, maxParticipants?: number | null, currentParticipants: number, createdBy: string, createdAt: any, updatedAt?: any | null } | null };

export type GetEventsByStatusQueryVariables = Exact<{
  status: EventStatus;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetEventsByStatusQuery = { __typename?: 'Query', getEvents: Array<{ __typename?: 'Event', id: string, name: string, description?: string | null, eventType?: EventType | null, status?: EventStatus | null, tier?: EventTier | null, startDate?: any | null, endDate?: any | null, entryFee: number, maxParticipants?: number | null, currentParticipants: number, createdBy: string, createdAt: any, updatedAt?: any | null }> };

export type GetEventsByTypeQueryVariables = Exact<{
  eventType: EventType;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetEventsByTypeQuery = { __typename?: 'Query', getEvents: Array<{ __typename?: 'Event', id: string, name: string, description?: string | null, eventType?: EventType | null, status?: EventStatus | null, tier?: EventTier | null, startDate?: any | null, endDate?: any | null, entryFee: number, maxParticipants?: number | null, currentParticipants: number, createdBy: string, createdAt: any, updatedAt?: any | null }> };

export type GetMatchWithDetailsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetMatchWithDetailsQuery = { __typename?: 'Query', getMatch?: { __typename?: 'Match', id: string, eventId?: any | null, gameNumber: number, scheduledAt?: any | null, startedAt?: any | null, endedAt?: any | null, playedAt?: any | null, status: MatchStatus, stage: MatchStage, isLive: boolean, timeElapsed?: string | null, scoreA?: number | null, scoreB?: number | null, winnerId?: any | null, winnerName?: string | null, teamAId: any, teamAName: string, teamBId: any, teamBName: string, boxscoreUrl?: string | null, createdAt: any, updatedAt?: any | null } | null };

export type GetMatchesByEventQueryVariables = Exact<{
  eventId: Scalars['UUID']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetMatchesByEventQuery = { __typename?: 'Query', getMatches: Array<{ __typename?: 'Match', id: string, eventId?: any | null, gameNumber: number, scheduledAt?: any | null, startedAt?: any | null, endedAt?: any | null, playedAt?: any | null, status: MatchStatus, stage: MatchStage, isLive: boolean, timeElapsed?: string | null, scoreA?: number | null, scoreB?: number | null, winnerId?: any | null, winnerName?: string | null, teamAId: any, teamAName: string, teamBId: any, teamBName: string, boxscoreUrl?: string | null, createdAt: any, updatedAt?: any | null }> };

export type GetMatchesByTeamQueryVariables = Exact<{
  teamId: Scalars['ID']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetMatchesByTeamQuery = { __typename?: 'Query', getMatches: Array<{ __typename?: 'Match', id: string, eventId?: any | null, gameNumber: number, scheduledAt?: any | null, startedAt?: any | null, endedAt?: any | null, playedAt?: any | null, status: MatchStatus, stage: MatchStage, isLive: boolean, timeElapsed?: string | null, scoreA?: number | null, scoreB?: number | null, winnerId?: any | null, winnerName?: string | null, teamAId: any, teamAName: string, teamBId: any, teamBName: string, boxscoreUrl?: string | null, createdAt: any, updatedAt?: any | null }> };

export type GetMatchesByStatusQueryVariables = Exact<{
  status: MatchStatus;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetMatchesByStatusQuery = { __typename?: 'Query', getMatches: Array<{ __typename?: 'Match', id: string, eventId?: any | null, gameNumber: number, scheduledAt?: any | null, startedAt?: any | null, endedAt?: any | null, playedAt?: any | null, status: MatchStatus, stage: MatchStage, isLive: boolean, timeElapsed?: string | null, scoreA?: number | null, scoreB?: number | null, winnerId?: any | null, winnerName?: string | null, teamAId: any, teamAName: string, teamBId: any, teamBName: string, boxscoreUrl?: string | null, createdAt: any, updatedAt?: any | null }> };

export type GetPlayerWithStatsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetPlayerWithStatsQuery = { __typename?: 'Query', getPlayer?: { __typename?: 'Player', id: string, userId: string, gamertag: string, region?: string | null, currentRp?: number | null, peakRp?: number | null, tier?: PlayerTier | null, position?: PlayerPosition | null, salaryTier?: SalaryTier | null, teamName?: string | null, isVerified?: boolean | null, createdAt: any, updatedAt?: any | null, user: { __typename?: 'User', id: string, username: string, email: string, fullName?: string | null, isActive: boolean, isAdmin: boolean, discordId?: string | null, createdAt: any, updatedAt?: any | null } } | null };

export type GetPlayersByTierQueryVariables = Exact<{
  tier: PlayerTier;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetPlayersByTierQuery = { __typename?: 'Query', getPlayers: Array<{ __typename?: 'Player', id: string, gamertag: string, currentRp?: number | null, peakRp?: number | null, tier?: PlayerTier | null, position?: PlayerPosition | null, region?: string | null, teamName?: string | null, isVerified?: boolean | null, createdAt: any, user: { __typename?: 'User', id: string, username: string, fullName?: string | null } }> };

export type GetPlayersByRegionQueryVariables = Exact<{
  region: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetPlayersByRegionQuery = { __typename?: 'Query', getPlayers: Array<{ __typename?: 'Player', id: string, gamertag: string, currentRp?: number | null, peakRp?: number | null, tier?: PlayerTier | null, position?: PlayerPosition | null, region?: string | null, teamName?: string | null, isVerified?: boolean | null, createdAt: any, user: { __typename?: 'User', id: string, username: string, fullName?: string | null } }> };

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
export const CreateEventDocument = gql`
    mutation CreateEvent($input: EventInput!) {
  createEvent(input: $input) {
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
export type CreateEventMutationFn = Apollo.MutationFunction<CreateEventMutation, CreateEventMutationVariables>;

/**
 * __useCreateEventMutation__
 *
 * To run a mutation, you first call `useCreateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEventMutation, { data, loading, error }] = useCreateEventMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateEventMutation(baseOptions?: Apollo.MutationHookOptions<CreateEventMutation, CreateEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEventMutation, CreateEventMutationVariables>(CreateEventDocument, options);
      }
export type CreateEventMutationHookResult = ReturnType<typeof useCreateEventMutation>;
export type CreateEventMutationResult = Apollo.MutationResult<CreateEventMutation>;
export type CreateEventMutationOptions = Apollo.BaseMutationOptions<CreateEventMutation, CreateEventMutationVariables>;
export const UpdateEventDocument = gql`
    mutation UpdateEvent($id: ID!, $input: EventUpdateInput!) {
  updateEvent(id: $id, input: $input) {
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
export type UpdateEventMutationFn = Apollo.MutationFunction<UpdateEventMutation, UpdateEventMutationVariables>;

/**
 * __useUpdateEventMutation__
 *
 * To run a mutation, you first call `useUpdateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEventMutation, { data, loading, error }] = useUpdateEventMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateEventMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEventMutation, UpdateEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEventMutation, UpdateEventMutationVariables>(UpdateEventDocument, options);
      }
export type UpdateEventMutationHookResult = ReturnType<typeof useUpdateEventMutation>;
export type UpdateEventMutationResult = Apollo.MutationResult<UpdateEventMutation>;
export type UpdateEventMutationOptions = Apollo.BaseMutationOptions<UpdateEventMutation, UpdateEventMutationVariables>;
export const DeleteEventDocument = gql`
    mutation DeleteEvent($id: ID!) {
  deleteEvent(id: $id)
}
    `;
export type DeleteEventMutationFn = Apollo.MutationFunction<DeleteEventMutation, DeleteEventMutationVariables>;

/**
 * __useDeleteEventMutation__
 *
 * To run a mutation, you first call `useDeleteEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEventMutation, { data, loading, error }] = useDeleteEventMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteEventMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEventMutation, DeleteEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteEventMutation, DeleteEventMutationVariables>(DeleteEventDocument, options);
      }
export type DeleteEventMutationHookResult = ReturnType<typeof useDeleteEventMutation>;
export type DeleteEventMutationResult = Apollo.MutationResult<DeleteEventMutation>;
export type DeleteEventMutationOptions = Apollo.BaseMutationOptions<DeleteEventMutation, DeleteEventMutationVariables>;
export const StartEventDocument = gql`
    mutation StartEvent($id: ID!) {
  startEvent(id: $id) {
    id
    name
    status
    startDate
    updatedAt
  }
}
    `;
export type StartEventMutationFn = Apollo.MutationFunction<StartEventMutation, StartEventMutationVariables>;

/**
 * __useStartEventMutation__
 *
 * To run a mutation, you first call `useStartEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startEventMutation, { data, loading, error }] = useStartEventMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useStartEventMutation(baseOptions?: Apollo.MutationHookOptions<StartEventMutation, StartEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartEventMutation, StartEventMutationVariables>(StartEventDocument, options);
      }
export type StartEventMutationHookResult = ReturnType<typeof useStartEventMutation>;
export type StartEventMutationResult = Apollo.MutationResult<StartEventMutation>;
export type StartEventMutationOptions = Apollo.BaseMutationOptions<StartEventMutation, StartEventMutationVariables>;
export const EndEventDocument = gql`
    mutation EndEvent($id: ID!) {
  endEvent(id: $id) {
    id
    name
    status
    endDate
    updatedAt
  }
}
    `;
export type EndEventMutationFn = Apollo.MutationFunction<EndEventMutation, EndEventMutationVariables>;

/**
 * __useEndEventMutation__
 *
 * To run a mutation, you first call `useEndEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEndEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [endEventMutation, { data, loading, error }] = useEndEventMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEndEventMutation(baseOptions?: Apollo.MutationHookOptions<EndEventMutation, EndEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EndEventMutation, EndEventMutationVariables>(EndEventDocument, options);
      }
export type EndEventMutationHookResult = ReturnType<typeof useEndEventMutation>;
export type EndEventMutationResult = Apollo.MutationResult<EndEventMutation>;
export type EndEventMutationOptions = Apollo.BaseMutationOptions<EndEventMutation, EndEventMutationVariables>;
export const CancelEventDocument = gql`
    mutation CancelEvent($id: ID!, $reason: String!) {
  cancelEvent(id: $id, reason: $reason) {
    id
    name
    status
    updatedAt
  }
}
    `;
export type CancelEventMutationFn = Apollo.MutationFunction<CancelEventMutation, CancelEventMutationVariables>;

/**
 * __useCancelEventMutation__
 *
 * To run a mutation, you first call `useCancelEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelEventMutation, { data, loading, error }] = useCancelEventMutation({
 *   variables: {
 *      id: // value for 'id'
 *      reason: // value for 'reason'
 *   },
 * });
 */
export function useCancelEventMutation(baseOptions?: Apollo.MutationHookOptions<CancelEventMutation, CancelEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelEventMutation, CancelEventMutationVariables>(CancelEventDocument, options);
      }
export type CancelEventMutationHookResult = ReturnType<typeof useCancelEventMutation>;
export type CancelEventMutationResult = Apollo.MutationResult<CancelEventMutation>;
export type CancelEventMutationOptions = Apollo.BaseMutationOptions<CancelEventMutation, CancelEventMutationVariables>;
export const SubmitMatchDocument = gql`
    mutation SubmitMatch($input: MatchInput!) {
  submitMatch(input: $input) {
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
  }
}
    `;
export type SubmitMatchMutationFn = Apollo.MutationFunction<SubmitMatchMutation, SubmitMatchMutationVariables>;

/**
 * __useSubmitMatchMutation__
 *
 * To run a mutation, you first call `useSubmitMatchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitMatchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitMatchMutation, { data, loading, error }] = useSubmitMatchMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSubmitMatchMutation(baseOptions?: Apollo.MutationHookOptions<SubmitMatchMutation, SubmitMatchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubmitMatchMutation, SubmitMatchMutationVariables>(SubmitMatchDocument, options);
      }
export type SubmitMatchMutationHookResult = ReturnType<typeof useSubmitMatchMutation>;
export type SubmitMatchMutationResult = Apollo.MutationResult<SubmitMatchMutation>;
export type SubmitMatchMutationOptions = Apollo.BaseMutationOptions<SubmitMatchMutation, SubmitMatchMutationVariables>;
export const UpdateMatchDocument = gql`
    mutation UpdateMatch($id: ID!, $input: MatchUpdateInput!) {
  updateMatch(id: $id, input: $input) {
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
  }
}
    `;
export type UpdateMatchMutationFn = Apollo.MutationFunction<UpdateMatchMutation, UpdateMatchMutationVariables>;

/**
 * __useUpdateMatchMutation__
 *
 * To run a mutation, you first call `useUpdateMatchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMatchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMatchMutation, { data, loading, error }] = useUpdateMatchMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateMatchMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMatchMutation, UpdateMatchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMatchMutation, UpdateMatchMutationVariables>(UpdateMatchDocument, options);
      }
export type UpdateMatchMutationHookResult = ReturnType<typeof useUpdateMatchMutation>;
export type UpdateMatchMutationResult = Apollo.MutationResult<UpdateMatchMutation>;
export type UpdateMatchMutationOptions = Apollo.BaseMutationOptions<UpdateMatchMutation, UpdateMatchMutationVariables>;
export const DeleteMatchDocument = gql`
    mutation DeleteMatch($id: ID!) {
  deleteMatch(id: $id)
}
    `;
export type DeleteMatchMutationFn = Apollo.MutationFunction<DeleteMatchMutation, DeleteMatchMutationVariables>;

/**
 * __useDeleteMatchMutation__
 *
 * To run a mutation, you first call `useDeleteMatchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMatchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMatchMutation, { data, loading, error }] = useDeleteMatchMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMatchMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMatchMutation, DeleteMatchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMatchMutation, DeleteMatchMutationVariables>(DeleteMatchDocument, options);
      }
export type DeleteMatchMutationHookResult = ReturnType<typeof useDeleteMatchMutation>;
export type DeleteMatchMutationResult = Apollo.MutationResult<DeleteMatchMutation>;
export type DeleteMatchMutationOptions = Apollo.BaseMutationOptions<DeleteMatchMutation, DeleteMatchMutationVariables>;
export const SubmitMatchStatsDocument = gql`
    mutation SubmitMatchStats($matchId: ID!, $stats: [PlayerMatchStatsInput!]!) {
  submitMatchStats(matchId: $matchId, stats: $stats) {
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
    `;
export type SubmitMatchStatsMutationFn = Apollo.MutationFunction<SubmitMatchStatsMutation, SubmitMatchStatsMutationVariables>;

/**
 * __useSubmitMatchStatsMutation__
 *
 * To run a mutation, you first call `useSubmitMatchStatsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitMatchStatsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitMatchStatsMutation, { data, loading, error }] = useSubmitMatchStatsMutation({
 *   variables: {
 *      matchId: // value for 'matchId'
 *      stats: // value for 'stats'
 *   },
 * });
 */
export function useSubmitMatchStatsMutation(baseOptions?: Apollo.MutationHookOptions<SubmitMatchStatsMutation, SubmitMatchStatsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubmitMatchStatsMutation, SubmitMatchStatsMutationVariables>(SubmitMatchStatsDocument, options);
      }
export type SubmitMatchStatsMutationHookResult = ReturnType<typeof useSubmitMatchStatsMutation>;
export type SubmitMatchStatsMutationResult = Apollo.MutationResult<SubmitMatchStatsMutation>;
export type SubmitMatchStatsMutationOptions = Apollo.BaseMutationOptions<SubmitMatchStatsMutation, SubmitMatchStatsMutationVariables>;
export const StartMatchDocument = gql`
    mutation StartMatch($id: ID!) {
  startMatch(id: $id) {
    id
    status
    startedAt
    isLive
    updatedAt
  }
}
    `;
export type StartMatchMutationFn = Apollo.MutationFunction<StartMatchMutation, StartMatchMutationVariables>;

/**
 * __useStartMatchMutation__
 *
 * To run a mutation, you first call `useStartMatchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartMatchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startMatchMutation, { data, loading, error }] = useStartMatchMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useStartMatchMutation(baseOptions?: Apollo.MutationHookOptions<StartMatchMutation, StartMatchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartMatchMutation, StartMatchMutationVariables>(StartMatchDocument, options);
      }
export type StartMatchMutationHookResult = ReturnType<typeof useStartMatchMutation>;
export type StartMatchMutationResult = Apollo.MutationResult<StartMatchMutation>;
export type StartMatchMutationOptions = Apollo.BaseMutationOptions<StartMatchMutation, StartMatchMutationVariables>;
export const EndMatchDocument = gql`
    mutation EndMatch($id: ID!, $scoreA: Int!, $scoreB: Int!) {
  endMatch(id: $id, scoreA: $scoreA, scoreB: $scoreB) {
    id
    status
    endedAt
    scoreA
    scoreB
    winnerId
    winnerName
    isLive
    updatedAt
  }
}
    `;
export type EndMatchMutationFn = Apollo.MutationFunction<EndMatchMutation, EndMatchMutationVariables>;

/**
 * __useEndMatchMutation__
 *
 * To run a mutation, you first call `useEndMatchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEndMatchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [endMatchMutation, { data, loading, error }] = useEndMatchMutation({
 *   variables: {
 *      id: // value for 'id'
 *      scoreA: // value for 'scoreA'
 *      scoreB: // value for 'scoreB'
 *   },
 * });
 */
export function useEndMatchMutation(baseOptions?: Apollo.MutationHookOptions<EndMatchMutation, EndMatchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EndMatchMutation, EndMatchMutationVariables>(EndMatchDocument, options);
      }
export type EndMatchMutationHookResult = ReturnType<typeof useEndMatchMutation>;
export type EndMatchMutationResult = Apollo.MutationResult<EndMatchMutation>;
export type EndMatchMutationOptions = Apollo.BaseMutationOptions<EndMatchMutation, EndMatchMutationVariables>;
export const PauseMatchDocument = gql`
    mutation PauseMatch($id: ID!) {
  pauseMatch(id: $id) {
    id
    status
    isLive
    updatedAt
  }
}
    `;
export type PauseMatchMutationFn = Apollo.MutationFunction<PauseMatchMutation, PauseMatchMutationVariables>;

/**
 * __usePauseMatchMutation__
 *
 * To run a mutation, you first call `usePauseMatchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePauseMatchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pauseMatchMutation, { data, loading, error }] = usePauseMatchMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePauseMatchMutation(baseOptions?: Apollo.MutationHookOptions<PauseMatchMutation, PauseMatchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PauseMatchMutation, PauseMatchMutationVariables>(PauseMatchDocument, options);
      }
export type PauseMatchMutationHookResult = ReturnType<typeof usePauseMatchMutation>;
export type PauseMatchMutationResult = Apollo.MutationResult<PauseMatchMutation>;
export type PauseMatchMutationOptions = Apollo.BaseMutationOptions<PauseMatchMutation, PauseMatchMutationVariables>;
export const ResumeMatchDocument = gql`
    mutation ResumeMatch($id: ID!) {
  resumeMatch(id: $id) {
    id
    status
    isLive
    updatedAt
  }
}
    `;
export type ResumeMatchMutationFn = Apollo.MutationFunction<ResumeMatchMutation, ResumeMatchMutationVariables>;

/**
 * __useResumeMatchMutation__
 *
 * To run a mutation, you first call `useResumeMatchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResumeMatchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resumeMatchMutation, { data, loading, error }] = useResumeMatchMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useResumeMatchMutation(baseOptions?: Apollo.MutationHookOptions<ResumeMatchMutation, ResumeMatchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResumeMatchMutation, ResumeMatchMutationVariables>(ResumeMatchDocument, options);
      }
export type ResumeMatchMutationHookResult = ReturnType<typeof useResumeMatchMutation>;
export type ResumeMatchMutationResult = Apollo.MutationResult<ResumeMatchMutation>;
export type ResumeMatchMutationOptions = Apollo.BaseMutationOptions<ResumeMatchMutation, ResumeMatchMutationVariables>;
export const CancelMatchDocument = gql`
    mutation CancelMatch($id: ID!, $reason: String!) {
  cancelMatch(id: $id, reason: $reason) {
    id
    status
    updatedAt
  }
}
    `;
export type CancelMatchMutationFn = Apollo.MutationFunction<CancelMatchMutation, CancelMatchMutationVariables>;

/**
 * __useCancelMatchMutation__
 *
 * To run a mutation, you first call `useCancelMatchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelMatchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelMatchMutation, { data, loading, error }] = useCancelMatchMutation({
 *   variables: {
 *      id: // value for 'id'
 *      reason: // value for 'reason'
 *   },
 * });
 */
export function useCancelMatchMutation(baseOptions?: Apollo.MutationHookOptions<CancelMatchMutation, CancelMatchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelMatchMutation, CancelMatchMutationVariables>(CancelMatchDocument, options);
      }
export type CancelMatchMutationHookResult = ReturnType<typeof useCancelMatchMutation>;
export type CancelMatchMutationResult = Apollo.MutationResult<CancelMatchMutation>;
export type CancelMatchMutationOptions = Apollo.BaseMutationOptions<CancelMatchMutation, CancelMatchMutationVariables>;
export const UpdateMatchScoreDocument = gql`
    mutation UpdateMatchScore($id: ID!, $scoreA: Int!, $scoreB: Int!) {
  updateMatchScore(id: $id, scoreA: $scoreA, scoreB: $scoreB) {
    id
    scoreA
    scoreB
    winnerId
    winnerName
    updatedAt
  }
}
    `;
export type UpdateMatchScoreMutationFn = Apollo.MutationFunction<UpdateMatchScoreMutation, UpdateMatchScoreMutationVariables>;

/**
 * __useUpdateMatchScoreMutation__
 *
 * To run a mutation, you first call `useUpdateMatchScoreMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMatchScoreMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMatchScoreMutation, { data, loading, error }] = useUpdateMatchScoreMutation({
 *   variables: {
 *      id: // value for 'id'
 *      scoreA: // value for 'scoreA'
 *      scoreB: // value for 'scoreB'
 *   },
 * });
 */
export function useUpdateMatchScoreMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMatchScoreMutation, UpdateMatchScoreMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMatchScoreMutation, UpdateMatchScoreMutationVariables>(UpdateMatchScoreDocument, options);
      }
export type UpdateMatchScoreMutationHookResult = ReturnType<typeof useUpdateMatchScoreMutation>;
export type UpdateMatchScoreMutationResult = Apollo.MutationResult<UpdateMatchScoreMutation>;
export type UpdateMatchScoreMutationOptions = Apollo.BaseMutationOptions<UpdateMatchScoreMutation, UpdateMatchScoreMutationVariables>;
export const UpdateMatchTimeDocument = gql`
    mutation UpdateMatchTime($id: ID!, $timeElapsed: Int!) {
  updateMatchTime(id: $id, timeElapsed: $timeElapsed) {
    id
    timeElapsed
    updatedAt
  }
}
    `;
export type UpdateMatchTimeMutationFn = Apollo.MutationFunction<UpdateMatchTimeMutation, UpdateMatchTimeMutationVariables>;

/**
 * __useUpdateMatchTimeMutation__
 *
 * To run a mutation, you first call `useUpdateMatchTimeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMatchTimeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMatchTimeMutation, { data, loading, error }] = useUpdateMatchTimeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      timeElapsed: // value for 'timeElapsed'
 *   },
 * });
 */
export function useUpdateMatchTimeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMatchTimeMutation, UpdateMatchTimeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMatchTimeMutation, UpdateMatchTimeMutationVariables>(UpdateMatchTimeDocument, options);
      }
export type UpdateMatchTimeMutationHookResult = ReturnType<typeof useUpdateMatchTimeMutation>;
export type UpdateMatchTimeMutationResult = Apollo.MutationResult<UpdateMatchTimeMutation>;
export type UpdateMatchTimeMutationOptions = Apollo.BaseMutationOptions<UpdateMatchTimeMutation, UpdateMatchTimeMutationVariables>;
export const CreatePlayerDocument = gql`
    mutation CreatePlayer($input: PlayerInput!) {
  createPlayer(input: $input) {
    id
    userId
    gamertag
    region
    currentRp
    peakRp
    tier
    position
    salaryTier
    teamName
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
      discordId
      createdAt
      updatedAt
    }
  }
}
    `;
export type CreatePlayerMutationFn = Apollo.MutationFunction<CreatePlayerMutation, CreatePlayerMutationVariables>;

/**
 * __useCreatePlayerMutation__
 *
 * To run a mutation, you first call `useCreatePlayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePlayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPlayerMutation, { data, loading, error }] = useCreatePlayerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePlayerMutation(baseOptions?: Apollo.MutationHookOptions<CreatePlayerMutation, CreatePlayerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePlayerMutation, CreatePlayerMutationVariables>(CreatePlayerDocument, options);
      }
export type CreatePlayerMutationHookResult = ReturnType<typeof useCreatePlayerMutation>;
export type CreatePlayerMutationResult = Apollo.MutationResult<CreatePlayerMutation>;
export type CreatePlayerMutationOptions = Apollo.BaseMutationOptions<CreatePlayerMutation, CreatePlayerMutationVariables>;
export const UpdatePlayerDocument = gql`
    mutation UpdatePlayer($id: ID!, $input: PlayerUpdateInput!) {
  updatePlayer(id: $id, input: $input) {
    id
    userId
    gamertag
    region
    currentRp
    peakRp
    tier
    position
    salaryTier
    teamName
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
      discordId
      createdAt
      updatedAt
    }
  }
}
    `;
export type UpdatePlayerMutationFn = Apollo.MutationFunction<UpdatePlayerMutation, UpdatePlayerMutationVariables>;

/**
 * __useUpdatePlayerMutation__
 *
 * To run a mutation, you first call `useUpdatePlayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePlayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePlayerMutation, { data, loading, error }] = useUpdatePlayerMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePlayerMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePlayerMutation, UpdatePlayerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePlayerMutation, UpdatePlayerMutationVariables>(UpdatePlayerDocument, options);
      }
export type UpdatePlayerMutationHookResult = ReturnType<typeof useUpdatePlayerMutation>;
export type UpdatePlayerMutationResult = Apollo.MutationResult<UpdatePlayerMutation>;
export type UpdatePlayerMutationOptions = Apollo.BaseMutationOptions<UpdatePlayerMutation, UpdatePlayerMutationVariables>;
export const DeletePlayerDocument = gql`
    mutation DeletePlayer($id: ID!) {
  deletePlayer(id: $id)
}
    `;
export type DeletePlayerMutationFn = Apollo.MutationFunction<DeletePlayerMutation, DeletePlayerMutationVariables>;

/**
 * __useDeletePlayerMutation__
 *
 * To run a mutation, you first call `useDeletePlayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePlayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePlayerMutation, { data, loading, error }] = useDeletePlayerMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePlayerMutation(baseOptions?: Apollo.MutationHookOptions<DeletePlayerMutation, DeletePlayerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePlayerMutation, DeletePlayerMutationVariables>(DeletePlayerDocument, options);
      }
export type DeletePlayerMutationHookResult = ReturnType<typeof useDeletePlayerMutation>;
export type DeletePlayerMutationResult = Apollo.MutationResult<DeletePlayerMutation>;
export type DeletePlayerMutationOptions = Apollo.BaseMutationOptions<DeletePlayerMutation, DeletePlayerMutationVariables>;
export const UpdatePlayerRpDocument = gql`
    mutation UpdatePlayerRP($playerId: ID!, $rpChange: Float!, $reason: String!) {
  updatePlayerRP(playerId: $playerId, rpChange: $rpChange, reason: $reason) {
    id
    gamertag
    currentRp
    peakRp
    tier
    updatedAt
  }
}
    `;
export type UpdatePlayerRpMutationFn = Apollo.MutationFunction<UpdatePlayerRpMutation, UpdatePlayerRpMutationVariables>;

/**
 * __useUpdatePlayerRpMutation__
 *
 * To run a mutation, you first call `useUpdatePlayerRpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePlayerRpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePlayerRpMutation, { data, loading, error }] = useUpdatePlayerRpMutation({
 *   variables: {
 *      playerId: // value for 'playerId'
 *      rpChange: // value for 'rpChange'
 *      reason: // value for 'reason'
 *   },
 * });
 */
export function useUpdatePlayerRpMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePlayerRpMutation, UpdatePlayerRpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePlayerRpMutation, UpdatePlayerRpMutationVariables>(UpdatePlayerRpDocument, options);
      }
export type UpdatePlayerRpMutationHookResult = ReturnType<typeof useUpdatePlayerRpMutation>;
export type UpdatePlayerRpMutationResult = Apollo.MutationResult<UpdatePlayerRpMutation>;
export type UpdatePlayerRpMutationOptions = Apollo.BaseMutationOptions<UpdatePlayerRpMutation, UpdatePlayerRpMutationVariables>;
export const VerifyPlayerDocument = gql`
    mutation VerifyPlayer($id: ID!) {
  verifyPlayer(id: $id) {
    id
    gamertag
    isVerified
    updatedAt
  }
}
    `;
export type VerifyPlayerMutationFn = Apollo.MutationFunction<VerifyPlayerMutation, VerifyPlayerMutationVariables>;

/**
 * __useVerifyPlayerMutation__
 *
 * To run a mutation, you first call `useVerifyPlayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyPlayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyPlayerMutation, { data, loading, error }] = useVerifyPlayerMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useVerifyPlayerMutation(baseOptions?: Apollo.MutationHookOptions<VerifyPlayerMutation, VerifyPlayerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyPlayerMutation, VerifyPlayerMutationVariables>(VerifyPlayerDocument, options);
      }
export type VerifyPlayerMutationHookResult = ReturnType<typeof useVerifyPlayerMutation>;
export type VerifyPlayerMutationResult = Apollo.MutationResult<VerifyPlayerMutation>;
export type VerifyPlayerMutationOptions = Apollo.BaseMutationOptions<VerifyPlayerMutation, VerifyPlayerMutationVariables>;
export const CreateTeamDocument = gql`
    mutation CreateTeam($input: TeamInput!) {
  createTeam(input: $input) {
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
export type CreateTeamMutationFn = Apollo.MutationFunction<CreateTeamMutation, CreateTeamMutationVariables>;

/**
 * __useCreateTeamMutation__
 *
 * To run a mutation, you first call `useCreateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamMutation, { data, loading, error }] = useCreateTeamMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTeamMutation(baseOptions?: Apollo.MutationHookOptions<CreateTeamMutation, CreateTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTeamMutation, CreateTeamMutationVariables>(CreateTeamDocument, options);
      }
export type CreateTeamMutationHookResult = ReturnType<typeof useCreateTeamMutation>;
export type CreateTeamMutationResult = Apollo.MutationResult<CreateTeamMutation>;
export type CreateTeamMutationOptions = Apollo.BaseMutationOptions<CreateTeamMutation, CreateTeamMutationVariables>;
export const UpdateTeamDocument = gql`
    mutation UpdateTeam($id: ID!, $input: TeamUpdateInput!) {
  updateTeam(id: $id, input: $input) {
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
export type UpdateTeamMutationFn = Apollo.MutationFunction<UpdateTeamMutation, UpdateTeamMutationVariables>;

/**
 * __useUpdateTeamMutation__
 *
 * To run a mutation, you first call `useUpdateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTeamMutation, { data, loading, error }] = useUpdateTeamMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTeamMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTeamMutation, UpdateTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTeamMutation, UpdateTeamMutationVariables>(UpdateTeamDocument, options);
      }
export type UpdateTeamMutationHookResult = ReturnType<typeof useUpdateTeamMutation>;
export type UpdateTeamMutationResult = Apollo.MutationResult<UpdateTeamMutation>;
export type UpdateTeamMutationOptions = Apollo.BaseMutationOptions<UpdateTeamMutation, UpdateTeamMutationVariables>;
export const DeleteTeamDocument = gql`
    mutation DeleteTeam($id: ID!) {
  deleteTeam(id: $id)
}
    `;
export type DeleteTeamMutationFn = Apollo.MutationFunction<DeleteTeamMutation, DeleteTeamMutationVariables>;

/**
 * __useDeleteTeamMutation__
 *
 * To run a mutation, you first call `useDeleteTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTeamMutation, { data, loading, error }] = useDeleteTeamMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTeamMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTeamMutation, DeleteTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTeamMutation, DeleteTeamMutationVariables>(DeleteTeamDocument, options);
      }
export type DeleteTeamMutationHookResult = ReturnType<typeof useDeleteTeamMutation>;
export type DeleteTeamMutationResult = Apollo.MutationResult<DeleteTeamMutation>;
export type DeleteTeamMutationOptions = Apollo.BaseMutationOptions<DeleteTeamMutation, DeleteTeamMutationVariables>;
export const AddPlayerToTeamDocument = gql`
    mutation AddPlayerToTeam($teamId: ID!, $playerId: ID!) {
  addPlayerToTeam(teamId: $teamId, playerId: $playerId) {
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
export type AddPlayerToTeamMutationFn = Apollo.MutationFunction<AddPlayerToTeamMutation, AddPlayerToTeamMutationVariables>;

/**
 * __useAddPlayerToTeamMutation__
 *
 * To run a mutation, you first call `useAddPlayerToTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPlayerToTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPlayerToTeamMutation, { data, loading, error }] = useAddPlayerToTeamMutation({
 *   variables: {
 *      teamId: // value for 'teamId'
 *      playerId: // value for 'playerId'
 *   },
 * });
 */
export function useAddPlayerToTeamMutation(baseOptions?: Apollo.MutationHookOptions<AddPlayerToTeamMutation, AddPlayerToTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddPlayerToTeamMutation, AddPlayerToTeamMutationVariables>(AddPlayerToTeamDocument, options);
      }
export type AddPlayerToTeamMutationHookResult = ReturnType<typeof useAddPlayerToTeamMutation>;
export type AddPlayerToTeamMutationResult = Apollo.MutationResult<AddPlayerToTeamMutation>;
export type AddPlayerToTeamMutationOptions = Apollo.BaseMutationOptions<AddPlayerToTeamMutation, AddPlayerToTeamMutationVariables>;
export const RemovePlayerFromTeamRosterDocument = gql`
    mutation RemovePlayerFromTeamRoster($teamId: ID!, $playerId: ID!) {
  removePlayerFromTeam(teamId: $teamId, playerId: $playerId) {
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
export type RemovePlayerFromTeamRosterMutationFn = Apollo.MutationFunction<RemovePlayerFromTeamRosterMutation, RemovePlayerFromTeamRosterMutationVariables>;

/**
 * __useRemovePlayerFromTeamRosterMutation__
 *
 * To run a mutation, you first call `useRemovePlayerFromTeamRosterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemovePlayerFromTeamRosterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removePlayerFromTeamRosterMutation, { data, loading, error }] = useRemovePlayerFromTeamRosterMutation({
 *   variables: {
 *      teamId: // value for 'teamId'
 *      playerId: // value for 'playerId'
 *   },
 * });
 */
export function useRemovePlayerFromTeamRosterMutation(baseOptions?: Apollo.MutationHookOptions<RemovePlayerFromTeamRosterMutation, RemovePlayerFromTeamRosterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemovePlayerFromTeamRosterMutation, RemovePlayerFromTeamRosterMutationVariables>(RemovePlayerFromTeamRosterDocument, options);
      }
export type RemovePlayerFromTeamRosterMutationHookResult = ReturnType<typeof useRemovePlayerFromTeamRosterMutation>;
export type RemovePlayerFromTeamRosterMutationResult = Apollo.MutationResult<RemovePlayerFromTeamRosterMutation>;
export type RemovePlayerFromTeamRosterMutationOptions = Apollo.BaseMutationOptions<RemovePlayerFromTeamRosterMutation, RemovePlayerFromTeamRosterMutationVariables>;
export const SetTeamCaptainDocument = gql`
    mutation SetTeamCaptain($teamId: ID!, $playerId: ID!) {
  setTeamCaptain(teamId: $teamId, playerId: $playerId) {
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
export type SetTeamCaptainMutationFn = Apollo.MutationFunction<SetTeamCaptainMutation, SetTeamCaptainMutationVariables>;

/**
 * __useSetTeamCaptainMutation__
 *
 * To run a mutation, you first call `useSetTeamCaptainMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetTeamCaptainMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setTeamCaptainMutation, { data, loading, error }] = useSetTeamCaptainMutation({
 *   variables: {
 *      teamId: // value for 'teamId'
 *      playerId: // value for 'playerId'
 *   },
 * });
 */
export function useSetTeamCaptainMutation(baseOptions?: Apollo.MutationHookOptions<SetTeamCaptainMutation, SetTeamCaptainMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetTeamCaptainMutation, SetTeamCaptainMutationVariables>(SetTeamCaptainDocument, options);
      }
export type SetTeamCaptainMutationHookResult = ReturnType<typeof useSetTeamCaptainMutation>;
export type SetTeamCaptainMutationResult = Apollo.MutationResult<SetTeamCaptainMutation>;
export type SetTeamCaptainMutationOptions = Apollo.BaseMutationOptions<SetTeamCaptainMutation, SetTeamCaptainMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($input: UserInput!) {
  createUser(input: $input) {
    id
    username
    email
    fullName
    isActive
    isAdmin
    discordId
    createdAt
    updatedAt
    player {
      id
      gamertag
      currentRp
      peakRp
      tier
      position
    }
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($id: ID!, $input: UserUpdateInput!) {
  updateUser(id: $id, input: $input) {
    id
    username
    email
    fullName
    isActive
    isAdmin
    discordId
    createdAt
    updatedAt
    player {
      id
      gamertag
      currentRp
      peakRp
      tier
      position
    }
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($id: ID!) {
  deleteUser(id: $id)
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
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
export const GetDashboardStatsDocument = gql`
    query GetDashboardStats {
  getDashboardStats {
    totalPlayers
    totalTeams
    totalMatches
    totalEvents
    activePlayers
    activeTeams
    completedMatches
    upcomingEvents
    averagePlayerRP
    averageTeamSize
    topPerformingPlayer {
      id
      gamertag
      currentRp
      peakRp
      tier
      position
      teamName
    }
    mostActiveTeam {
      id
      name
      description
      logoUrl
      region
    }
    recentMatches {
      id
      teamAName
      teamBName
      scoreA
      scoreB
      winnerName
      playedAt
      status
    }
    recentPlayers {
      id
      gamertag
      currentRp
      tier
      teamName
      createdAt
    }
  }
}
    `;

/**
 * __useGetDashboardStatsQuery__
 *
 * To run a query within a React component, call `useGetDashboardStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDashboardStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDashboardStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDashboardStatsQuery(baseOptions?: Apollo.QueryHookOptions<GetDashboardStatsQuery, GetDashboardStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDashboardStatsQuery, GetDashboardStatsQueryVariables>(GetDashboardStatsDocument, options);
      }
export function useGetDashboardStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDashboardStatsQuery, GetDashboardStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDashboardStatsQuery, GetDashboardStatsQueryVariables>(GetDashboardStatsDocument, options);
        }
export function useGetDashboardStatsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDashboardStatsQuery, GetDashboardStatsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDashboardStatsQuery, GetDashboardStatsQueryVariables>(GetDashboardStatsDocument, options);
        }
export type GetDashboardStatsQueryHookResult = ReturnType<typeof useGetDashboardStatsQuery>;
export type GetDashboardStatsLazyQueryHookResult = ReturnType<typeof useGetDashboardStatsLazyQuery>;
export type GetDashboardStatsSuspenseQueryHookResult = ReturnType<typeof useGetDashboardStatsSuspenseQuery>;
export type GetDashboardStatsQueryResult = Apollo.QueryResult<GetDashboardStatsQuery, GetDashboardStatsQueryVariables>;
export const GetLeaderboardDocument = gql`
    query GetLeaderboard($limit: Int = 50, $offset: Int = 0, $tier: PlayerTier, $region: String, $sortBy: LeaderboardSortBy = CURRENT_RP) {
  getLeaderboard(
    limit: $limit
    offset: $offset
    tier: $tier
    region: $region
    sortBy: $sortBy
  ) {
    rank
    player {
      id
      gamertag
      currentRp
      peakRp
      tier
      position
      region
      teamName
      isVerified
      createdAt
      user {
        id
        username
        fullName
      }
    }
    wins
    losses
    winRate
    totalMatches
    averagePoints
    averageAssists
    averageRebounds
  }
}
    `;

/**
 * __useGetLeaderboardQuery__
 *
 * To run a query within a React component, call `useGetLeaderboardQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLeaderboardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLeaderboardQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      tier: // value for 'tier'
 *      region: // value for 'region'
 *      sortBy: // value for 'sortBy'
 *   },
 * });
 */
export function useGetLeaderboardQuery(baseOptions?: Apollo.QueryHookOptions<GetLeaderboardQuery, GetLeaderboardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLeaderboardQuery, GetLeaderboardQueryVariables>(GetLeaderboardDocument, options);
      }
export function useGetLeaderboardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLeaderboardQuery, GetLeaderboardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLeaderboardQuery, GetLeaderboardQueryVariables>(GetLeaderboardDocument, options);
        }
export function useGetLeaderboardSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetLeaderboardQuery, GetLeaderboardQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetLeaderboardQuery, GetLeaderboardQueryVariables>(GetLeaderboardDocument, options);
        }
export type GetLeaderboardQueryHookResult = ReturnType<typeof useGetLeaderboardQuery>;
export type GetLeaderboardLazyQueryHookResult = ReturnType<typeof useGetLeaderboardLazyQuery>;
export type GetLeaderboardSuspenseQueryHookResult = ReturnType<typeof useGetLeaderboardSuspenseQuery>;
export type GetLeaderboardQueryResult = Apollo.QueryResult<GetLeaderboardQuery, GetLeaderboardQueryVariables>;
export const GetTopPlayersDocument = gql`
    query GetTopPlayers($limit: Int = 10, $tier: PlayerTier) {
  getTopPlayers(limit: $limit, tier: $tier) {
    rank
    player {
      id
      gamertag
      currentRp
      peakRp
      tier
      position
      teamName
      isVerified
    }
    wins
    losses
    winRate
  }
}
    `;

/**
 * __useGetTopPlayersQuery__
 *
 * To run a query within a React component, call `useGetTopPlayersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopPlayersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopPlayersQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      tier: // value for 'tier'
 *   },
 * });
 */
export function useGetTopPlayersQuery(baseOptions?: Apollo.QueryHookOptions<GetTopPlayersQuery, GetTopPlayersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTopPlayersQuery, GetTopPlayersQueryVariables>(GetTopPlayersDocument, options);
      }
export function useGetTopPlayersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopPlayersQuery, GetTopPlayersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTopPlayersQuery, GetTopPlayersQueryVariables>(GetTopPlayersDocument, options);
        }
export function useGetTopPlayersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTopPlayersQuery, GetTopPlayersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTopPlayersQuery, GetTopPlayersQueryVariables>(GetTopPlayersDocument, options);
        }
export type GetTopPlayersQueryHookResult = ReturnType<typeof useGetTopPlayersQuery>;
export type GetTopPlayersLazyQueryHookResult = ReturnType<typeof useGetTopPlayersLazyQuery>;
export type GetTopPlayersSuspenseQueryHookResult = ReturnType<typeof useGetTopPlayersSuspenseQuery>;
export type GetTopPlayersQueryResult = Apollo.QueryResult<GetTopPlayersQuery, GetTopPlayersQueryVariables>;
export const GetEventWithDetailsDocument = gql`
    query GetEventWithDetails($id: ID!) {
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
 * __useGetEventWithDetailsQuery__
 *
 * To run a query within a React component, call `useGetEventWithDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventWithDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventWithDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetEventWithDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetEventWithDetailsQuery, GetEventWithDetailsQueryVariables> & ({ variables: GetEventWithDetailsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventWithDetailsQuery, GetEventWithDetailsQueryVariables>(GetEventWithDetailsDocument, options);
      }
export function useGetEventWithDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventWithDetailsQuery, GetEventWithDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventWithDetailsQuery, GetEventWithDetailsQueryVariables>(GetEventWithDetailsDocument, options);
        }
export function useGetEventWithDetailsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetEventWithDetailsQuery, GetEventWithDetailsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEventWithDetailsQuery, GetEventWithDetailsQueryVariables>(GetEventWithDetailsDocument, options);
        }
export type GetEventWithDetailsQueryHookResult = ReturnType<typeof useGetEventWithDetailsQuery>;
export type GetEventWithDetailsLazyQueryHookResult = ReturnType<typeof useGetEventWithDetailsLazyQuery>;
export type GetEventWithDetailsSuspenseQueryHookResult = ReturnType<typeof useGetEventWithDetailsSuspenseQuery>;
export type GetEventWithDetailsQueryResult = Apollo.QueryResult<GetEventWithDetailsQuery, GetEventWithDetailsQueryVariables>;
export const GetEventsByStatusDocument = gql`
    query GetEventsByStatus($status: EventStatus!, $limit: Int = 10, $offset: Int = 0) {
  getEvents(status: $status, limit: $limit, offset: $offset) {
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
 * __useGetEventsByStatusQuery__
 *
 * To run a query within a React component, call `useGetEventsByStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventsByStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventsByStatusQuery({
 *   variables: {
 *      status: // value for 'status'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetEventsByStatusQuery(baseOptions: Apollo.QueryHookOptions<GetEventsByStatusQuery, GetEventsByStatusQueryVariables> & ({ variables: GetEventsByStatusQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventsByStatusQuery, GetEventsByStatusQueryVariables>(GetEventsByStatusDocument, options);
      }
export function useGetEventsByStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventsByStatusQuery, GetEventsByStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventsByStatusQuery, GetEventsByStatusQueryVariables>(GetEventsByStatusDocument, options);
        }
export function useGetEventsByStatusSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetEventsByStatusQuery, GetEventsByStatusQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEventsByStatusQuery, GetEventsByStatusQueryVariables>(GetEventsByStatusDocument, options);
        }
export type GetEventsByStatusQueryHookResult = ReturnType<typeof useGetEventsByStatusQuery>;
export type GetEventsByStatusLazyQueryHookResult = ReturnType<typeof useGetEventsByStatusLazyQuery>;
export type GetEventsByStatusSuspenseQueryHookResult = ReturnType<typeof useGetEventsByStatusSuspenseQuery>;
export type GetEventsByStatusQueryResult = Apollo.QueryResult<GetEventsByStatusQuery, GetEventsByStatusQueryVariables>;
export const GetEventsByTypeDocument = gql`
    query GetEventsByType($eventType: EventType!, $limit: Int = 10, $offset: Int = 0) {
  getEvents(eventType: $eventType, limit: $limit, offset: $offset) {
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
 * __useGetEventsByTypeQuery__
 *
 * To run a query within a React component, call `useGetEventsByTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventsByTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventsByTypeQuery({
 *   variables: {
 *      eventType: // value for 'eventType'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetEventsByTypeQuery(baseOptions: Apollo.QueryHookOptions<GetEventsByTypeQuery, GetEventsByTypeQueryVariables> & ({ variables: GetEventsByTypeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventsByTypeQuery, GetEventsByTypeQueryVariables>(GetEventsByTypeDocument, options);
      }
export function useGetEventsByTypeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventsByTypeQuery, GetEventsByTypeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventsByTypeQuery, GetEventsByTypeQueryVariables>(GetEventsByTypeDocument, options);
        }
export function useGetEventsByTypeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetEventsByTypeQuery, GetEventsByTypeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEventsByTypeQuery, GetEventsByTypeQueryVariables>(GetEventsByTypeDocument, options);
        }
export type GetEventsByTypeQueryHookResult = ReturnType<typeof useGetEventsByTypeQuery>;
export type GetEventsByTypeLazyQueryHookResult = ReturnType<typeof useGetEventsByTypeLazyQuery>;
export type GetEventsByTypeSuspenseQueryHookResult = ReturnType<typeof useGetEventsByTypeSuspenseQuery>;
export type GetEventsByTypeQueryResult = Apollo.QueryResult<GetEventsByTypeQuery, GetEventsByTypeQueryVariables>;
export const GetMatchWithDetailsDocument = gql`
    query GetMatchWithDetails($id: ID!) {
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
  }
}
    `;

/**
 * __useGetMatchWithDetailsQuery__
 *
 * To run a query within a React component, call `useGetMatchWithDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMatchWithDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMatchWithDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetMatchWithDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetMatchWithDetailsQuery, GetMatchWithDetailsQueryVariables> & ({ variables: GetMatchWithDetailsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMatchWithDetailsQuery, GetMatchWithDetailsQueryVariables>(GetMatchWithDetailsDocument, options);
      }
export function useGetMatchWithDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMatchWithDetailsQuery, GetMatchWithDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMatchWithDetailsQuery, GetMatchWithDetailsQueryVariables>(GetMatchWithDetailsDocument, options);
        }
export function useGetMatchWithDetailsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMatchWithDetailsQuery, GetMatchWithDetailsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMatchWithDetailsQuery, GetMatchWithDetailsQueryVariables>(GetMatchWithDetailsDocument, options);
        }
export type GetMatchWithDetailsQueryHookResult = ReturnType<typeof useGetMatchWithDetailsQuery>;
export type GetMatchWithDetailsLazyQueryHookResult = ReturnType<typeof useGetMatchWithDetailsLazyQuery>;
export type GetMatchWithDetailsSuspenseQueryHookResult = ReturnType<typeof useGetMatchWithDetailsSuspenseQuery>;
export type GetMatchWithDetailsQueryResult = Apollo.QueryResult<GetMatchWithDetailsQuery, GetMatchWithDetailsQueryVariables>;
export const GetMatchesByEventDocument = gql`
    query GetMatchesByEvent($eventId: UUID!, $limit: Int = 20, $offset: Int = 0) {
  getMatches(eventId: $eventId, limit: $limit, offset: $offset) {
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
  }
}
    `;

/**
 * __useGetMatchesByEventQuery__
 *
 * To run a query within a React component, call `useGetMatchesByEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMatchesByEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMatchesByEventQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetMatchesByEventQuery(baseOptions: Apollo.QueryHookOptions<GetMatchesByEventQuery, GetMatchesByEventQueryVariables> & ({ variables: GetMatchesByEventQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMatchesByEventQuery, GetMatchesByEventQueryVariables>(GetMatchesByEventDocument, options);
      }
export function useGetMatchesByEventLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMatchesByEventQuery, GetMatchesByEventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMatchesByEventQuery, GetMatchesByEventQueryVariables>(GetMatchesByEventDocument, options);
        }
export function useGetMatchesByEventSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMatchesByEventQuery, GetMatchesByEventQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMatchesByEventQuery, GetMatchesByEventQueryVariables>(GetMatchesByEventDocument, options);
        }
export type GetMatchesByEventQueryHookResult = ReturnType<typeof useGetMatchesByEventQuery>;
export type GetMatchesByEventLazyQueryHookResult = ReturnType<typeof useGetMatchesByEventLazyQuery>;
export type GetMatchesByEventSuspenseQueryHookResult = ReturnType<typeof useGetMatchesByEventSuspenseQuery>;
export type GetMatchesByEventQueryResult = Apollo.QueryResult<GetMatchesByEventQuery, GetMatchesByEventQueryVariables>;
export const GetMatchesByTeamDocument = gql`
    query GetMatchesByTeam($teamId: ID!, $limit: Int = 20, $offset: Int = 0) {
  getMatches(teamId: $teamId, limit: $limit, offset: $offset) {
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
  }
}
    `;

/**
 * __useGetMatchesByTeamQuery__
 *
 * To run a query within a React component, call `useGetMatchesByTeamQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMatchesByTeamQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMatchesByTeamQuery({
 *   variables: {
 *      teamId: // value for 'teamId'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetMatchesByTeamQuery(baseOptions: Apollo.QueryHookOptions<GetMatchesByTeamQuery, GetMatchesByTeamQueryVariables> & ({ variables: GetMatchesByTeamQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMatchesByTeamQuery, GetMatchesByTeamQueryVariables>(GetMatchesByTeamDocument, options);
      }
export function useGetMatchesByTeamLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMatchesByTeamQuery, GetMatchesByTeamQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMatchesByTeamQuery, GetMatchesByTeamQueryVariables>(GetMatchesByTeamDocument, options);
        }
export function useGetMatchesByTeamSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMatchesByTeamQuery, GetMatchesByTeamQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMatchesByTeamQuery, GetMatchesByTeamQueryVariables>(GetMatchesByTeamDocument, options);
        }
export type GetMatchesByTeamQueryHookResult = ReturnType<typeof useGetMatchesByTeamQuery>;
export type GetMatchesByTeamLazyQueryHookResult = ReturnType<typeof useGetMatchesByTeamLazyQuery>;
export type GetMatchesByTeamSuspenseQueryHookResult = ReturnType<typeof useGetMatchesByTeamSuspenseQuery>;
export type GetMatchesByTeamQueryResult = Apollo.QueryResult<GetMatchesByTeamQuery, GetMatchesByTeamQueryVariables>;
export const GetMatchesByStatusDocument = gql`
    query GetMatchesByStatus($status: MatchStatus!, $limit: Int = 20, $offset: Int = 0) {
  getMatches(status: $status, limit: $limit, offset: $offset) {
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
  }
}
    `;

/**
 * __useGetMatchesByStatusQuery__
 *
 * To run a query within a React component, call `useGetMatchesByStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMatchesByStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMatchesByStatusQuery({
 *   variables: {
 *      status: // value for 'status'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetMatchesByStatusQuery(baseOptions: Apollo.QueryHookOptions<GetMatchesByStatusQuery, GetMatchesByStatusQueryVariables> & ({ variables: GetMatchesByStatusQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMatchesByStatusQuery, GetMatchesByStatusQueryVariables>(GetMatchesByStatusDocument, options);
      }
export function useGetMatchesByStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMatchesByStatusQuery, GetMatchesByStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMatchesByStatusQuery, GetMatchesByStatusQueryVariables>(GetMatchesByStatusDocument, options);
        }
export function useGetMatchesByStatusSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMatchesByStatusQuery, GetMatchesByStatusQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMatchesByStatusQuery, GetMatchesByStatusQueryVariables>(GetMatchesByStatusDocument, options);
        }
export type GetMatchesByStatusQueryHookResult = ReturnType<typeof useGetMatchesByStatusQuery>;
export type GetMatchesByStatusLazyQueryHookResult = ReturnType<typeof useGetMatchesByStatusLazyQuery>;
export type GetMatchesByStatusSuspenseQueryHookResult = ReturnType<typeof useGetMatchesByStatusSuspenseQuery>;
export type GetMatchesByStatusQueryResult = Apollo.QueryResult<GetMatchesByStatusQuery, GetMatchesByStatusQueryVariables>;
export const GetPlayerWithStatsDocument = gql`
    query GetPlayerWithStats($id: ID!) {
  getPlayer(id: $id) {
    id
    userId
    gamertag
    region
    currentRp
    peakRp
    tier
    position
    salaryTier
    teamName
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
      discordId
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useGetPlayerWithStatsQuery__
 *
 * To run a query within a React component, call `useGetPlayerWithStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlayerWithStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlayerWithStatsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPlayerWithStatsQuery(baseOptions: Apollo.QueryHookOptions<GetPlayerWithStatsQuery, GetPlayerWithStatsQueryVariables> & ({ variables: GetPlayerWithStatsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPlayerWithStatsQuery, GetPlayerWithStatsQueryVariables>(GetPlayerWithStatsDocument, options);
      }
export function useGetPlayerWithStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlayerWithStatsQuery, GetPlayerWithStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPlayerWithStatsQuery, GetPlayerWithStatsQueryVariables>(GetPlayerWithStatsDocument, options);
        }
export function useGetPlayerWithStatsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPlayerWithStatsQuery, GetPlayerWithStatsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPlayerWithStatsQuery, GetPlayerWithStatsQueryVariables>(GetPlayerWithStatsDocument, options);
        }
export type GetPlayerWithStatsQueryHookResult = ReturnType<typeof useGetPlayerWithStatsQuery>;
export type GetPlayerWithStatsLazyQueryHookResult = ReturnType<typeof useGetPlayerWithStatsLazyQuery>;
export type GetPlayerWithStatsSuspenseQueryHookResult = ReturnType<typeof useGetPlayerWithStatsSuspenseQuery>;
export type GetPlayerWithStatsQueryResult = Apollo.QueryResult<GetPlayerWithStatsQuery, GetPlayerWithStatsQueryVariables>;
export const GetPlayersByTierDocument = gql`
    query GetPlayersByTier($tier: PlayerTier!, $limit: Int = 20, $offset: Int = 0) {
  getPlayers(tier: $tier, limit: $limit, offset: $offset) {
    id
    gamertag
    currentRp
    peakRp
    tier
    position
    region
    teamName
    isVerified
    createdAt
    user {
      id
      username
      fullName
    }
  }
}
    `;

/**
 * __useGetPlayersByTierQuery__
 *
 * To run a query within a React component, call `useGetPlayersByTierQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlayersByTierQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlayersByTierQuery({
 *   variables: {
 *      tier: // value for 'tier'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetPlayersByTierQuery(baseOptions: Apollo.QueryHookOptions<GetPlayersByTierQuery, GetPlayersByTierQueryVariables> & ({ variables: GetPlayersByTierQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPlayersByTierQuery, GetPlayersByTierQueryVariables>(GetPlayersByTierDocument, options);
      }
export function useGetPlayersByTierLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlayersByTierQuery, GetPlayersByTierQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPlayersByTierQuery, GetPlayersByTierQueryVariables>(GetPlayersByTierDocument, options);
        }
export function useGetPlayersByTierSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPlayersByTierQuery, GetPlayersByTierQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPlayersByTierQuery, GetPlayersByTierQueryVariables>(GetPlayersByTierDocument, options);
        }
export type GetPlayersByTierQueryHookResult = ReturnType<typeof useGetPlayersByTierQuery>;
export type GetPlayersByTierLazyQueryHookResult = ReturnType<typeof useGetPlayersByTierLazyQuery>;
export type GetPlayersByTierSuspenseQueryHookResult = ReturnType<typeof useGetPlayersByTierSuspenseQuery>;
export type GetPlayersByTierQueryResult = Apollo.QueryResult<GetPlayersByTierQuery, GetPlayersByTierQueryVariables>;
export const GetPlayersByRegionDocument = gql`
    query GetPlayersByRegion($region: String!, $limit: Int = 20, $offset: Int = 0) {
  getPlayers(region: $region, limit: $limit, offset: $offset) {
    id
    gamertag
    currentRp
    peakRp
    tier
    position
    region
    teamName
    isVerified
    createdAt
    user {
      id
      username
      fullName
    }
  }
}
    `;

/**
 * __useGetPlayersByRegionQuery__
 *
 * To run a query within a React component, call `useGetPlayersByRegionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlayersByRegionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlayersByRegionQuery({
 *   variables: {
 *      region: // value for 'region'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetPlayersByRegionQuery(baseOptions: Apollo.QueryHookOptions<GetPlayersByRegionQuery, GetPlayersByRegionQueryVariables> & ({ variables: GetPlayersByRegionQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPlayersByRegionQuery, GetPlayersByRegionQueryVariables>(GetPlayersByRegionDocument, options);
      }
export function useGetPlayersByRegionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlayersByRegionQuery, GetPlayersByRegionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPlayersByRegionQuery, GetPlayersByRegionQueryVariables>(GetPlayersByRegionDocument, options);
        }
export function useGetPlayersByRegionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPlayersByRegionQuery, GetPlayersByRegionQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPlayersByRegionQuery, GetPlayersByRegionQueryVariables>(GetPlayersByRegionDocument, options);
        }
export type GetPlayersByRegionQueryHookResult = ReturnType<typeof useGetPlayersByRegionQuery>;
export type GetPlayersByRegionLazyQueryHookResult = ReturnType<typeof useGetPlayersByRegionLazyQuery>;
export type GetPlayersByRegionSuspenseQueryHookResult = ReturnType<typeof useGetPlayersByRegionSuspenseQuery>;
export type GetPlayersByRegionQueryResult = Apollo.QueryResult<GetPlayersByRegionQuery, GetPlayersByRegionQueryVariables>;
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