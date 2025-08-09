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

/** Application role for users. */
export enum AppRole {
  Admin = 'ADMIN',
  Analyst = 'ANALYST',
  Editor = 'EDITOR',
  LeagueStaff = 'LEAGUE_STAFF',
  Player = 'PLAYER',
  TeamStaff = 'TEAM_STAFF',
  User = 'USER'
}

/** Awards race information. */
export type AwardsRace = {
  __typename?: 'AwardsRace';
  /** Award type */
  awardType?: Maybe<Scalars['String']['output']>;
  /** Whether this is the award winner */
  awardWinner?: Maybe<Scalars['Boolean']['output']>;
  /** When the race entry was created */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Associated event */
  event?: Maybe<Event>;
  /** Event ID */
  eventId?: Maybe<Scalars['String']['output']>;
  /** Unique identifier */
  id: Scalars['ID']['output'];
  /** Associated player */
  player?: Maybe<Player>;
  /** Player ID */
  playerId?: Maybe<Scalars['String']['output']>;
  /** Current rank */
  rank?: Maybe<Scalars['Int']['output']>;
  /** RP bonus */
  rpBonus?: Maybe<Scalars['Int']['output']>;
  /** Associated team */
  team?: Maybe<Team>;
  /** Team ID */
  teamId: Scalars['String']['output'];
};

/** Draft pool information. */
export type DraftPool = {
  __typename?: 'DraftPool';
  /** When the entry was created */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** When the player declared */
  declaredAt?: Maybe<Scalars['DateTime']['output']>;
  /** Draft notes */
  draftNotes?: Maybe<Scalars['String']['output']>;
  /** Draft rating */
  draftRating?: Maybe<Scalars['Int']['output']>;
  /** Associated event */
  event?: Maybe<Event>;
  /** Event ID */
  eventId?: Maybe<Scalars['String']['output']>;
  /** Associated player */
  player?: Maybe<Player>;
  /** Player ID */
  playerId: Scalars['String']['output'];
  /** Season */
  season?: Maybe<Scalars['String']['output']>;
  /** Player status */
  status?: Maybe<Scalars['String']['output']>;
  /** When the entry was last updated */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

/** Event information. */
export type Event = {
  __typename?: 'Event';
  /** Banner URL */
  bannerUrl?: Maybe<Scalars['String']['output']>;
  /** Decay days */
  decayDays?: Maybe<Scalars['Int']['output']>;
  /** Event description */
  description?: Maybe<Scalars['String']['output']>;
  /** End date */
  endDate?: Maybe<Scalars['DateTime']['output']>;
  /** Unique identifier */
  id: Scalars['ID']['output'];
  /** Whether the event is global */
  isGlobal?: Maybe<Scalars['Boolean']['output']>;
  /** Maximum ranking points */
  maxRp?: Maybe<Scalars['Int']['output']>;
  /** Event name */
  name: Scalars['String']['output'];
  /** Prize pool */
  prizePool?: Maybe<Scalars['Int']['output']>;
  /** Whether the event has been processed */
  processed?: Maybe<Scalars['Boolean']['output']>;
  /** When the event was processed */
  processedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Associated region */
  region?: Maybe<Region>;
  /** Region ID */
  regionId?: Maybe<Scalars['String']['output']>;
  /** Rules URL */
  rulesUrl?: Maybe<Scalars['String']['output']>;
  /** Season number */
  seasonNumber?: Maybe<Scalars['Int']['output']>;
  /** Start date */
  startDate?: Maybe<Scalars['DateTime']['output']>;
  /** Event status */
  status?: Maybe<Scalars['String']['output']>;
  /** Event tier */
  tier?: Maybe<EventTier>;
  /** Event type */
  type?: Maybe<Scalars['String']['output']>;
};

/** Event group information. */
export type EventGroup = {
  __typename?: 'EventGroup';
  /** Number of teams that advance */
  advancementCount?: Maybe<Scalars['Int']['output']>;
  /** When the group was created */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Group description */
  description?: Maybe<Scalars['String']['output']>;
  /** Associated event */
  event?: Maybe<Event>;
  /** Event ID */
  eventId: Scalars['String']['output'];
  /** Unique identifier */
  id: Scalars['ID']['output'];
  /** Maximum number of teams */
  maxTeams?: Maybe<Scalars['Int']['output']>;
  /** Group name */
  name: Scalars['String']['output'];
  /** Sort order */
  sortOrder?: Maybe<Scalars['Int']['output']>;
  /** Group status */
  status?: Maybe<Scalars['String']['output']>;
  /** When the group was last updated */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

/** Event group member information. */
export type EventGroupMember = {
  __typename?: 'EventGroupMember';
  /** When the team joined the group */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Associated group */
  group?: Maybe<EventGroup>;
  /** Group ID */
  groupId: Scalars['String']['output'];
  /** Unique identifier */
  id: Scalars['ID']['output'];
  /** Team seed */
  seed?: Maybe<Scalars['Int']['output']>;
  /** Associated team */
  team?: Maybe<Team>;
  /** Team ID */
  teamId: Scalars['String']['output'];
};

/** Event results information. */
export type EventResults = {
  __typename?: 'EventResults';
  /** When the results were awarded */
  awardedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Bonus RP */
  bonusRp?: Maybe<Scalars['Int']['output']>;
  /** Associated event */
  event?: Maybe<Event>;
  /** Event ID */
  eventId: Scalars['String']['output'];
  /** Unique identifier */
  id: Scalars['ID']['output'];
  /** Placement */
  placement?: Maybe<Scalars['Int']['output']>;
  /** Prize amount */
  prizeAmount?: Maybe<Scalars['Int']['output']>;
  /** RP awarded */
  rpAwarded?: Maybe<Scalars['Int']['output']>;
  /** Associated team */
  team?: Maybe<Team>;
  /** Team ID */
  teamId: Scalars['String']['output'];
  /** Total RP */
  totalRp?: Maybe<Scalars['Int']['output']>;
  /** Winner banner URL */
  winnerBannerUrl?: Maybe<Scalars['String']['output']>;
};

/** Event status. */
export enum EventStatus {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  Upcoming = 'UPCOMING'
}

/** Event tier indicating event importance. */
export enum EventTier {
  T1 = 'T1',
  T2 = 'T2',
  T3 = 'T3',
  T4 = 'T4'
}

/** Group match information. */
export type GroupMatch = {
  __typename?: 'GroupMatch';
  /** When the match was created */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Associated group */
  group?: Maybe<EventGroup>;
  /** Group ID */
  groupId: Scalars['String']['output'];
  /** Unique identifier */
  id: Scalars['ID']['output'];
  /** Associated match */
  match?: Maybe<Match>;
  /** Match ID */
  matchId: Scalars['String']['output'];
  /** Match number */
  matchNumber?: Maybe<Scalars['Int']['output']>;
  /** Round number */
  round?: Maybe<Scalars['Int']['output']>;
};

/** Group standings information. */
export type GroupStandings = {
  __typename?: 'GroupStandings';
  /** Associated group */
  group?: Maybe<EventGroup>;
  /** Group ID */
  groupId: Scalars['String']['output'];
  /** Unique identifier */
  id: Scalars['ID']['output'];
  /** Number of losses */
  losses?: Maybe<Scalars['Int']['output']>;
  /** Number of matches played */
  matchesPlayed?: Maybe<Scalars['Int']['output']>;
  /** Point differential */
  pointDifferential?: Maybe<Scalars['Int']['output']>;
  /** Points against */
  pointsAgainst?: Maybe<Scalars['Int']['output']>;
  /** Points for */
  pointsFor?: Maybe<Scalars['Int']['output']>;
  /** Position in group */
  position?: Maybe<Scalars['Int']['output']>;
  /** Associated team */
  team?: Maybe<Team>;
  /** Team ID */
  teamId: Scalars['String']['output'];
  /** When the standings were last updated */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Number of wins */
  wins?: Maybe<Scalars['Int']['output']>;
};

/** Match information. */
export type Match = {
  __typename?: 'Match';
  /** Boxscore URL */
  boxscoreUrl?: Maybe<Scalars['String']['output']>;
  /** Associated event */
  event?: Maybe<Event>;
  /** Event ID */
  eventId?: Maybe<Scalars['String']['output']>;
  /** Game number */
  gameNumber?: Maybe<Scalars['Int']['output']>;
  /** Unique identifier */
  id: Scalars['ID']['output'];
  /** When the match was played */
  playedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Player statistics for this match */
  playerStats: Array<PlayerMatchStats>;
  /** Team A score */
  scoreA?: Maybe<Scalars['Int']['output']>;
  /** Team B score */
  scoreB?: Maybe<Scalars['Int']['output']>;
  /** Match stage */
  stage?: Maybe<MatchStage>;
  /** Team A */
  teamA?: Maybe<Team>;
  /** Team A ID */
  teamAId?: Maybe<Scalars['String']['output']>;
  /** Team A name */
  teamAName?: Maybe<Scalars['String']['output']>;
  /** Team B */
  teamB?: Maybe<Team>;
  /** Team B ID */
  teamBId?: Maybe<Scalars['String']['output']>;
  /** Team B name */
  teamBName?: Maybe<Scalars['String']['output']>;
  /** Winner team */
  winner?: Maybe<Team>;
  /** Winner ID */
  winnerId?: Maybe<Scalars['String']['output']>;
  /** Winner name */
  winnerName?: Maybe<Scalars['String']['output']>;
};

/** Match MVP information. */
export type MatchMvp = {
  __typename?: 'MatchMVP';
  /** Associated match */
  match?: Maybe<Match>;
  /** Match ID */
  matchId: Scalars['String']['output'];
  /** Associated player */
  player?: Maybe<Player>;
  /** Player ID */
  playerId: Scalars['String']['output'];
};

/** Match points information. */
export type MatchPoints = {
  __typename?: 'MatchPoints';
  /** When the points were created */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Associated group */
  group?: Maybe<EventGroup>;
  /** Group ID */
  groupId?: Maybe<Scalars['String']['output']>;
  /** Unique identifier */
  id: Scalars['ID']['output'];
  /** Associated match */
  match?: Maybe<Match>;
  /** Match ID */
  matchId: Scalars['String']['output'];
  /** Point type */
  pointType?: Maybe<Scalars['String']['output']>;
  /** Points earned */
  pointsEarned?: Maybe<Scalars['Int']['output']>;
  /** Associated team */
  team?: Maybe<Team>;
  /** Team ID */
  teamId: Scalars['String']['output'];
  /** When the points were last updated */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

/** Match stage in tournament progression. */
export enum MatchStage {
  Finals = 'FINALS',
  GrandFinals = 'GRAND_FINALS',
  GroupPlay = 'GROUP_PLAY',
  L1 = 'L1',
  L2 = 'L2',
  L3 = 'L3',
  L4 = 'L4',
  L5 = 'L5',
  Lf = 'LF',
  RegularSeason = 'REGULAR_SEASON',
  Round_1 = 'ROUND_1',
  Round_2 = 'ROUND_2',
  Round_3 = 'ROUND_3',
  Round_4 = 'ROUND_4',
  SemiFinals = 'SEMI_FINALS',
  W1 = 'W1',
  W2 = 'W2',
  W3 = 'W3',
  W4 = 'W4',
  Wf = 'WF'
}

/** Match submission information. */
export type MatchSubmission = {
  __typename?: 'MatchSubmission';
  /** When the submission was created */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Associated event */
  event?: Maybe<Event>;
  /** Event ID */
  eventId?: Maybe<Scalars['String']['output']>;
  /** Unique identifier */
  id: Scalars['ID']['output'];
  /** Associated match */
  match?: Maybe<Match>;
  /** Match ID */
  matchId?: Maybe<Scalars['String']['output']>;
  /** Review status */
  reviewStatus?: Maybe<Scalars['String']['output']>;
  /** When the submission was reviewed */
  reviewedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Reviewed by */
  reviewedBy?: Maybe<Scalars['String']['output']>;
  /** Team A */
  teamA?: Maybe<Team>;
  /** Team A ID */
  teamAId?: Maybe<Scalars['String']['output']>;
  /** Team A name */
  teamAName?: Maybe<Scalars['String']['output']>;
  /** Team B */
  teamB?: Maybe<Team>;
  /** Team B ID */
  teamBId?: Maybe<Scalars['String']['output']>;
  /** Team B name */
  teamBName?: Maybe<Scalars['String']['output']>;
};

/** Mutation root type. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Add player to team roster */
  addPlayerToRoster: TeamRoster;
  /** Add team to event group */
  addTeamToGroup: EventGroupMember;
  /** Add player to draft pool */
  addToDraftPool: DraftPool;
  /** Award match points */
  awardMatchPoints: MatchPoints;
  /** Award ranking points */
  awardRankingPoints: RankingPoints;
  /** Create awards race entry */
  createAwardsRace: AwardsRace;
  /** Create a new event */
  createEvent: Event;
  /** Create an event group */
  createEventGroup: EventGroup;
  /** Create event results */
  createEventResults: EventResults;
  /** Create a group match */
  createGroupMatch: GroupMatch;
  /** Create a new match */
  createMatch: Match;
  /** Create a new player */
  createPlayer: Player;
  /** Create player match statistics */
  createPlayerMatchStats: PlayerMatchStats;
  /** Create player RP transaction */
  createPlayerRpTransaction: PlayerRpTransaction;
  /** Create pot tracker entry */
  createPotTrackerEntry: TeamsPotTracker;
  /** Create RP transaction */
  createRpTransaction: RpTransaction;
  /** Create a new team */
  createTeam: Team;
  /** Create upcoming match */
  createUpcomingMatch: UpcomingMatch;
  /** Create update race entry */
  createUpdateRace: UpdateRace;
  /** Delete awards race entry */
  deleteAwardsRace: Scalars['Boolean']['output'];
  /** Delete an event */
  deleteEvent: Scalars['Boolean']['output'];
  /** Delete an event group */
  deleteEventGroup: Scalars['Boolean']['output'];
  /** Delete event results */
  deleteEventResults: Scalars['Boolean']['output'];
  /** Delete a group match */
  deleteGroupMatch: Scalars['Boolean']['output'];
  /** Delete a match */
  deleteMatch: Scalars['Boolean']['output'];
  /** Delete a player */
  deletePlayer: Scalars['Boolean']['output'];
  /** Delete player match statistics */
  deletePlayerMatchStats: Scalars['Boolean']['output'];
  /** Delete pot tracker entry */
  deletePotTrackerEntry: Scalars['Boolean']['output'];
  /** Delete a team */
  deleteTeam: Scalars['Boolean']['output'];
  /** Delete upcoming match */
  deleteUpcomingMatch: Scalars['Boolean']['output'];
  /** Remove from draft pool */
  removeFromDraftPool: Scalars['Boolean']['output'];
  /** Remove player from team roster */
  removePlayerFromRoster: Scalars['Boolean']['output'];
  /** Remove team from event group */
  removeTeamFromGroup: Scalars['Boolean']['output'];
  /** Review match submission */
  reviewMatchSubmission: MatchSubmission;
  /** Set match MVP */
  setMatchMVP: MatchMvp;
  /** Submit match result */
  submitMatch: MatchSubmission;
  /** Update awards race entry */
  updateAwardsRace: AwardsRace;
  /** Update draft pool entry */
  updateDraftPool: DraftPool;
  /** Update an existing event */
  updateEvent: Event;
  /** Update an event group */
  updateEventGroup: EventGroup;
  /** Update event results */
  updateEventResults: EventResults;
  /** Update a group match */
  updateGroupMatch: GroupMatch;
  /** Update group standings */
  updateGroupStandings: GroupStandings;
  /** Update an existing match */
  updateMatch: Match;
  /** Update an existing player */
  updatePlayer: Player;
  /** Update player match statistics */
  updatePlayerMatchStats: PlayerMatchStats;
  /** Update pot tracker entry */
  updatePotTrackerEntry: TeamsPotTracker;
  /** Update an existing team */
  updateTeam: Team;
  /** Update upcoming match */
  updateUpcomingMatch: UpcomingMatch;
};


/** Mutation root type. */
export type MutationAddPlayerToRosterArgs = {
  input: Scalars['JSON']['input'];
};


/** Mutation root type. */
export type MutationAddTeamToGroupArgs = {
  input: Scalars['JSON']['input'];
};


/** Mutation root type. */
export type MutationAddToDraftPoolArgs = {
  input: Scalars['JSON']['input'];
};


/** Mutation root type. */
export type MutationAwardMatchPointsArgs = {
  input: Scalars['JSON']['input'];
};


/** Mutation root type. */
export type MutationAwardRankingPointsArgs = {
  input: Scalars['JSON']['input'];
};


/** Mutation root type. */
export type MutationCreateAwardsRaceArgs = {
  input: Scalars['JSON']['input'];
};


/** Mutation root type. */
export type MutationCreateEventArgs = {
  input: Scalars['JSON']['input'];
};


/** Mutation root type. */
export type MutationCreateEventGroupArgs = {
  input: Scalars['JSON']['input'];
};


/** Mutation root type. */
export type MutationCreateEventResultsArgs = {
  input: Scalars['JSON']['input'];
};


/** Mutation root type. */
export type MutationCreateGroupMatchArgs = {
  input: Scalars['JSON']['input'];
};


/** Mutation root type. */
export type MutationCreateMatchArgs = {
  input: Scalars['JSON']['input'];
};


/** Mutation root type. */
export type MutationCreatePlayerArgs = {
  input: Scalars['JSON']['input'];
};


/** Mutation root type. */
export type MutationCreatePlayerMatchStatsArgs = {
  input: Scalars['JSON']['input'];
};


/** Mutation root type. */
export type MutationCreatePlayerRpTransactionArgs = {
  input: Scalars['JSON']['input'];
};


/** Mutation root type. */
export type MutationCreatePotTrackerEntryArgs = {
  input: Scalars['JSON']['input'];
};


/** Mutation root type. */
export type MutationCreateRpTransactionArgs = {
  input: Scalars['JSON']['input'];
};


/** Mutation root type. */
export type MutationCreateTeamArgs = {
  input: Scalars['JSON']['input'];
};


/** Mutation root type. */
export type MutationCreateUpcomingMatchArgs = {
  input: Scalars['JSON']['input'];
};


/** Mutation root type. */
export type MutationCreateUpdateRaceArgs = {
  input: Scalars['JSON']['input'];
};


/** Mutation root type. */
export type MutationDeleteAwardsRaceArgs = {
  id: Scalars['ID']['input'];
};


/** Mutation root type. */
export type MutationDeleteEventArgs = {
  id: Scalars['ID']['input'];
};


/** Mutation root type. */
export type MutationDeleteEventGroupArgs = {
  id: Scalars['ID']['input'];
};


/** Mutation root type. */
export type MutationDeleteEventResultsArgs = {
  id: Scalars['ID']['input'];
};


/** Mutation root type. */
export type MutationDeleteGroupMatchArgs = {
  id: Scalars['ID']['input'];
};


/** Mutation root type. */
export type MutationDeleteMatchArgs = {
  id: Scalars['ID']['input'];
};


/** Mutation root type. */
export type MutationDeletePlayerArgs = {
  id: Scalars['ID']['input'];
};


/** Mutation root type. */
export type MutationDeletePlayerMatchStatsArgs = {
  id: Scalars['ID']['input'];
};


/** Mutation root type. */
export type MutationDeletePotTrackerEntryArgs = {
  id: Scalars['ID']['input'];
};


/** Mutation root type. */
export type MutationDeleteTeamArgs = {
  id: Scalars['ID']['input'];
};


/** Mutation root type. */
export type MutationDeleteUpcomingMatchArgs = {
  id: Scalars['ID']['input'];
};


/** Mutation root type. */
export type MutationRemoveFromDraftPoolArgs = {
  playerId: Scalars['ID']['input'];
};


/** Mutation root type. */
export type MutationRemovePlayerFromRosterArgs = {
  id: Scalars['ID']['input'];
};


/** Mutation root type. */
export type MutationRemoveTeamFromGroupArgs = {
  id: Scalars['ID']['input'];
};


/** Mutation root type. */
export type MutationReviewMatchSubmissionArgs = {
  id: Scalars['ID']['input'];
  input: Scalars['JSON']['input'];
};


/** Mutation root type. */
export type MutationSetMatchMvpArgs = {
  input: Scalars['JSON']['input'];
};


/** Mutation root type. */
export type MutationSubmitMatchArgs = {
  input: Scalars['JSON']['input'];
};


/** Mutation root type. */
export type MutationUpdateAwardsRaceArgs = {
  id: Scalars['ID']['input'];
  input: Scalars['JSON']['input'];
};


/** Mutation root type. */
export type MutationUpdateDraftPoolArgs = {
  input: Scalars['JSON']['input'];
  playerId: Scalars['ID']['input'];
};


/** Mutation root type. */
export type MutationUpdateEventArgs = {
  id: Scalars['ID']['input'];
  input: Scalars['JSON']['input'];
};


/** Mutation root type. */
export type MutationUpdateEventGroupArgs = {
  id: Scalars['ID']['input'];
  input: Scalars['JSON']['input'];
};


/** Mutation root type. */
export type MutationUpdateEventResultsArgs = {
  id: Scalars['ID']['input'];
  input: Scalars['JSON']['input'];
};


/** Mutation root type. */
export type MutationUpdateGroupMatchArgs = {
  id: Scalars['ID']['input'];
  input: Scalars['JSON']['input'];
};


/** Mutation root type. */
export type MutationUpdateGroupStandingsArgs = {
  input: Scalars['JSON']['input'];
};


/** Mutation root type. */
export type MutationUpdateMatchArgs = {
  id: Scalars['ID']['input'];
  input: Scalars['JSON']['input'];
};


/** Mutation root type. */
export type MutationUpdatePlayerArgs = {
  id: Scalars['ID']['input'];
  input: Scalars['JSON']['input'];
};


/** Mutation root type. */
export type MutationUpdatePlayerMatchStatsArgs = {
  id: Scalars['ID']['input'];
  input: Scalars['JSON']['input'];
};


/** Mutation root type. */
export type MutationUpdatePotTrackerEntryArgs = {
  id: Scalars['ID']['input'];
  input: Scalars['JSON']['input'];
};


/** Mutation root type. */
export type MutationUpdateTeamArgs = {
  id: Scalars['ID']['input'];
  input: Scalars['JSON']['input'];
};


/** Mutation root type. */
export type MutationUpdateUpcomingMatchArgs = {
  id: Scalars['ID']['input'];
  input: Scalars['JSON']['input'];
};

/** Paginated response wrapper. */
export type PaginatedResponse = {
  __typename?: 'PaginatedResponse';
  /** List of items */
  items: Array<Scalars['JSON']['output']>;
  /** Pagination information */
  pagination: PaginationInfo;
};

/** Pagination info for responses that support pagination. */
export type PaginationInfo = {
  __typename?: 'PaginationInfo';
  /** Whether there are more items available */
  hasMore: Scalars['Boolean']['output'];
  /** Number of items per page */
  limit: Scalars['Int']['output'];
  /** Current page number */
  page: Scalars['Int']['output'];
  /** Total number of items available */
  total: Scalars['Int']['output'];
};

/** Pagination input for queries that support pagination. */
export type PaginationInput = {
  /** Number of items to return (default: 20, max: 100) */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /** Number of items to skip for pagination */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Player profile with gaming statistics. */
export type Player = {
  __typename?: 'Player';
  /** Alternate gamertag */
  alternateGamertag?: Maybe<Scalars['String']['output']>;
  /** When the player was created */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Current team ID */
  currentTeamId?: Maybe<Scalars['String']['output']>;
  /** Discord ID */
  discordId?: Maybe<Scalars['String']['output']>;
  /** Gaming handle/username */
  gamertag: Scalars['String']['output'];
  /** Unique identifier */
  id: Scalars['ID']['output'];
  /** Whether the player is a rookie */
  isRookie?: Maybe<Scalars['Boolean']['output']>;
  /** Monthly value */
  monthlyValue?: Maybe<Scalars['Int']['output']>;
  /** Performance score */
  performanceScore?: Maybe<Scalars['Float']['output']>;
  /** Player rank score */
  playerRankScore?: Maybe<Scalars['Float']['output']>;
  /** Current ranking points */
  playerRp?: Maybe<Scalars['Int']['output']>;
  /** Player position */
  position?: Maybe<PlayerPosition>;
  /** Associated region */
  region?: Maybe<Region>;
  /** Region ID */
  regionId?: Maybe<Scalars['String']['output']>;
  /** Salary tier */
  salaryTier?: Maybe<SalaryTier>;
  /** Associated team */
  team?: Maybe<Team>;
  /** Twitter ID */
  twitterId?: Maybe<Scalars['String']['output']>;
};

/** Player statistics for a specific match. */
export type PlayerMatchStats = {
  __typename?: 'PlayerMatchStats';
  /** Assists */
  assists?: Maybe<Scalars['Int']['output']>;
  /** Blocks */
  blocks?: Maybe<Scalars['Int']['output']>;
  /** When the stats were created */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Field goals attempted */
  fga?: Maybe<Scalars['Int']['output']>;
  /** Field goals made */
  fgm?: Maybe<Scalars['Int']['output']>;
  /** Fouls */
  fouls?: Maybe<Scalars['Int']['output']>;
  /** Free throws attempted */
  fta?: Maybe<Scalars['Int']['output']>;
  /** Free throws made */
  ftm?: Maybe<Scalars['Int']['output']>;
  /** Unique identifier */
  id: Scalars['ID']['output'];
  /** Associated match */
  match?: Maybe<Match>;
  /** Match ID */
  matchId: Scalars['String']['output'];
  /** Associated player */
  player?: Maybe<Player>;
  /** Player ID */
  playerId: Scalars['String']['output'];
  /** Player name */
  playerName?: Maybe<Scalars['String']['output']>;
  /** Plus/minus */
  plusMinus?: Maybe<Scalars['Int']['output']>;
  /** Points scored */
  points?: Maybe<Scalars['Int']['output']>;
  /** Performance score */
  ps?: Maybe<Scalars['Int']['output']>;
  /** Rebounds */
  rebounds?: Maybe<Scalars['Int']['output']>;
  /** Steals */
  steals?: Maybe<Scalars['Int']['output']>;
  /** Associated team */
  team?: Maybe<Team>;
  /** Team ID */
  teamId: Scalars['String']['output'];
  /** Three points attempted */
  threePointsAttempted?: Maybe<Scalars['Int']['output']>;
  /** Three points made */
  threePointsMade?: Maybe<Scalars['Int']['output']>;
  /** Turnovers */
  turnovers?: Maybe<Scalars['Int']['output']>;
  /** When the stats were last updated */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

/** Player position on the court. */
export enum PlayerPosition {
  Center = 'CENTER',
  Lock = 'LOCK',
  PointGuard = 'POINT_GUARD',
  PowerForward = 'POWER_FORWARD',
  ShootingGuard = 'SHOOTING_GUARD'
}

/** Player RP transaction information. */
export type PlayerRpTransaction = {
  __typename?: 'PlayerRPTransaction';
  /** Transaction amount */
  amount?: Maybe<Scalars['Int']['output']>;
  /** When the transaction was created */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Transaction description */
  description?: Maybe<Scalars['String']['output']>;
  /** Associated event */
  event?: Maybe<Event>;
  /** Event ID */
  eventId?: Maybe<Scalars['String']['output']>;
  /** Unique identifier */
  id: Scalars['ID']['output'];
  /** Associated match */
  match?: Maybe<Match>;
  /** Match ID */
  matchId?: Maybe<Scalars['String']['output']>;
  /** Associated player */
  player?: Maybe<Player>;
  /** Player ID */
  playerId?: Maybe<Scalars['String']['output']>;
  /** Transaction type */
  type?: Maybe<Scalars['String']['output']>;
  /** When the transaction was last updated */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

/** Query root type. */
export type Query = {
  __typename?: 'Query';
  /** Get awards race */
  awardsRace: PaginatedResponse;
  /** Get draft pool */
  draftPool: PaginatedResponse;
  /** Get a single event by ID */
  event?: Maybe<Event>;
  /** Get event group members */
  eventGroupMembers: Array<EventGroupMember>;
  /** Get event groups */
  eventGroups: Array<EventGroup>;
  /** Get event results */
  eventResults: PaginatedResponse;
  /** Get a list of events with pagination */
  events: PaginatedResponse;
  /** Get group matches */
  groupMatches: Array<GroupMatch>;
  /** Get group standings */
  groupStandings: Array<GroupStandings>;
  /** Get a single match by ID */
  match?: Maybe<Match>;
  /** Get match MVP */
  matchMVP?: Maybe<MatchMvp>;
  /** Get match points */
  matchPoints: Array<MatchPoints>;
  /** Get match submissions */
  matchSubmissions: PaginatedResponse;
  /** Get a list of matches with pagination */
  matches: PaginatedResponse;
  matchesCount: Scalars['Int']['output'];
  /** Get a single player by ID */
  player?: Maybe<Player>;
  /** Get player match statistics */
  playerMatchStats: Array<PlayerMatchStats>;
  /** Get player RP transactions */
  playerRpTransactions: Array<PlayerRpTransaction>;
  /** Get a list of players with pagination */
  players: PaginatedResponse;
  playersCount: Scalars['Int']['output'];
  /** Get ranking points */
  rankingPoints: Array<RankingPoints>;
  /** Get a single region by ID */
  region?: Maybe<Region>;
  /** Get a list of regions */
  regions: Array<Region>;
  /** Get RP transactions */
  rpTransactions: Array<RpTransaction>;
  /** Get a single team by ID */
  team?: Maybe<Team>;
  /** Get team roster */
  teamRoster: Array<TeamRoster>;
  /** Get a list of teams with pagination */
  teams: PaginatedResponse;
  teamsCount: Scalars['Int']['output'];
  /** Get teams pot tracker */
  teamsPotTracker: PaginatedResponse;
  /** Get upcoming matches */
  upcomingMatches: PaginatedResponse;
  /** Get update race */
  updateRace: PaginatedResponse;
  /** Get a single user by ID */
  user?: Maybe<User>;
  /** Get a list of users with pagination */
  users: PaginatedResponse;
};


/** Query root type. */
export type QueryAwardsRaceArgs = {
  pagination?: InputMaybe<PaginationInput>;
};


/** Query root type. */
export type QueryDraftPoolArgs = {
  pagination?: InputMaybe<PaginationInput>;
};


/** Query root type. */
export type QueryEventArgs = {
  id: Scalars['ID']['input'];
};


/** Query root type. */
export type QueryEventGroupMembersArgs = {
  groupId: Scalars['ID']['input'];
};


/** Query root type. */
export type QueryEventGroupsArgs = {
  eventId: Scalars['ID']['input'];
};


/** Query root type. */
export type QueryEventResultsArgs = {
  pagination?: InputMaybe<PaginationInput>;
};


/** Query root type. */
export type QueryEventsArgs = {
  pagination?: InputMaybe<PaginationInput>;
};


/** Query root type. */
export type QueryGroupMatchesArgs = {
  groupId: Scalars['ID']['input'];
};


/** Query root type. */
export type QueryGroupStandingsArgs = {
  groupId: Scalars['ID']['input'];
};


/** Query root type. */
export type QueryMatchArgs = {
  id: Scalars['ID']['input'];
};


/** Query root type. */
export type QueryMatchMvpArgs = {
  matchId: Scalars['ID']['input'];
};


/** Query root type. */
export type QueryMatchPointsArgs = {
  matchId: Scalars['ID']['input'];
};


/** Query root type. */
export type QueryMatchSubmissionsArgs = {
  pagination?: InputMaybe<PaginationInput>;
};


/** Query root type. */
export type QueryMatchesArgs = {
  pagination?: InputMaybe<PaginationInput>;
};


/** Query root type. */
export type QueryPlayerArgs = {
  id: Scalars['ID']['input'];
};


/** Query root type. */
export type QueryPlayerMatchStatsArgs = {
  matchId: Scalars['ID']['input'];
};


/** Query root type. */
export type QueryPlayerRpTransactionsArgs = {
  playerId: Scalars['ID']['input'];
};


/** Query root type. */
export type QueryPlayersArgs = {
  pagination?: InputMaybe<PaginationInput>;
};


/** Query root type. */
export type QueryRankingPointsArgs = {
  teamId: Scalars['ID']['input'];
};


/** Query root type. */
export type QueryRegionArgs = {
  id: Scalars['ID']['input'];
};


/** Query root type. */
export type QueryRpTransactionsArgs = {
  teamId: Scalars['ID']['input'];
};


/** Query root type. */
export type QueryTeamArgs = {
  id: Scalars['ID']['input'];
};


/** Query root type. */
export type QueryTeamRosterArgs = {
  teamId: Scalars['ID']['input'];
};


/** Query root type. */
export type QueryTeamsArgs = {
  pagination?: InputMaybe<PaginationInput>;
};


/** Query root type. */
export type QueryTeamsPotTrackerArgs = {
  pagination?: InputMaybe<PaginationInput>;
};


/** Query root type. */
export type QueryUpcomingMatchesArgs = {
  pagination?: InputMaybe<PaginationInput>;
};


/** Query root type. */
export type QueryUpdateRaceArgs = {
  pagination?: InputMaybe<PaginationInput>;
};


/** Query root type. */
export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


/** Query root type. */
export type QueryUsersArgs = {
  pagination?: InputMaybe<PaginationInput>;
};

/** RP transaction information. */
export type RpTransaction = {
  __typename?: 'RPTransaction';
  /** Transaction amount */
  amount?: Maybe<Scalars['Int']['output']>;
  /** When the transaction was created */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Transaction description */
  description?: Maybe<Scalars['String']['output']>;
  /** Associated event */
  event?: Maybe<Event>;
  /** Event ID */
  eventId?: Maybe<Scalars['String']['output']>;
  /** Unique identifier */
  id: Scalars['ID']['output'];
  /** Associated team */
  team?: Maybe<Team>;
  /** Team ID */
  teamId?: Maybe<Scalars['String']['output']>;
  /** Transaction type */
  type?: Maybe<Scalars['String']['output']>;
  /** When the transaction was last updated */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

/** Ranking points information. */
export type RankingPoints = {
  __typename?: 'RankingPoints';
  /** When points were awarded */
  awardedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Associated event */
  event?: Maybe<Event>;
  /** Event ID */
  eventId?: Maybe<Scalars['String']['output']>;
  /** When points expire */
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  /** Unique identifier */
  id: Scalars['ID']['output'];
  /** Points awarded */
  points?: Maybe<Scalars['Int']['output']>;
  /** Points source */
  source?: Maybe<Scalars['String']['output']>;
  /** Associated team */
  team?: Maybe<Team>;
  /** Team ID */
  teamId?: Maybe<Scalars['String']['output']>;
};

/** Geographic region. */
export type Region = {
  __typename?: 'Region';
  /** Unique identifier */
  id: Scalars['ID']['output'];
  /** Region name */
  name: Scalars['String']['output'];
};

/** Salary tier indicating player value. */
export enum SalaryTier {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  S = 'S'
}

/** Team information. */
export type Team = {
  __typename?: 'Team';
  /** When the team was created */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Current ranking points */
  currentRp?: Maybe<Scalars['Int']['output']>;
  /** ELO rating */
  eloRating?: Maybe<Scalars['Float']['output']>;
  /** Global rank */
  globalRank?: Maybe<Scalars['Int']['output']>;
  /** Unique identifier */
  id: Scalars['ID']['output'];
  /** Leaderboard tier */
  leaderboardTier?: Maybe<Scalars['String']['output']>;
  /** Team logo URL */
  logoUrl?: Maybe<Scalars['String']['output']>;
  /** Total money won */
  moneyWon?: Maybe<Scalars['Int']['output']>;
  /** Team name */
  name: Scalars['String']['output'];
  /** Player rank score */
  playerRankScore?: Maybe<Scalars['Float']['output']>;
  /** Associated region */
  region?: Maybe<Region>;
  /** Region ID */
  regionId?: Maybe<Scalars['String']['output']>;
};

/** Team roster information. */
export type TeamRoster = {
  __typename?: 'TeamRoster';
  /** Associated event */
  event?: Maybe<Event>;
  /** Event ID */
  eventId?: Maybe<Scalars['String']['output']>;
  /** Unique identifier */
  id: Scalars['ID']['output'];
  /** Whether the player is captain */
  isCaptain?: Maybe<Scalars['Boolean']['output']>;
  /** Whether the player is player-coach */
  isPlayerCoach?: Maybe<Scalars['Boolean']['output']>;
  /** When the player joined */
  joinedAt?: Maybe<Scalars['DateTime']['output']>;
  /** When the player left */
  leftAt?: Maybe<Scalars['DateTime']['output']>;
  /** Associated player */
  player?: Maybe<Player>;
  /** Player ID */
  playerId?: Maybe<Scalars['String']['output']>;
  /** Associated team */
  team?: Maybe<Team>;
  /** Team ID */
  teamId?: Maybe<Scalars['String']['output']>;
};

/** Teams pot tracker information. */
export type TeamsPotTracker = {
  __typename?: 'TeamsPotTracker';
  /** When the entry was created */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Associated event */
  event?: Maybe<Event>;
  /** Event ID */
  eventId?: Maybe<Scalars['String']['output']>;
  /** Unique identifier */
  id: Scalars['ID']['output'];
  /** Placement */
  placement?: Maybe<Scalars['Int']['output']>;
  /** Prize amount */
  prizeAmount?: Maybe<Scalars['Int']['output']>;
  /** Associated team */
  team?: Maybe<Team>;
  /** Team ID */
  teamId?: Maybe<Scalars['String']['output']>;
};

/** Upcoming match information. */
export type UpcomingMatch = {
  __typename?: 'UpcomingMatch';
  /** When the match was created */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Associated event */
  event?: Maybe<Event>;
  /** Event ID */
  eventId: Scalars['String']['output'];
  /** Associated group */
  group?: Maybe<EventGroup>;
  /** Group ID */
  groupId?: Maybe<Scalars['String']['output']>;
  /** Unique identifier */
  id: Scalars['ID']['output'];
  /** Match number */
  matchNumber?: Maybe<Scalars['Int']['output']>;
  /** Match notes */
  notes?: Maybe<Scalars['String']['output']>;
  /** Round number */
  round?: Maybe<Scalars['Int']['output']>;
  /** When the match is scheduled */
  scheduledAt?: Maybe<Scalars['DateTime']['output']>;
  /** Match status */
  status?: Maybe<Scalars['String']['output']>;
  /** Stream URL */
  streamUrl?: Maybe<Scalars['String']['output']>;
  /** Team A */
  teamA?: Maybe<Team>;
  /** Team A ID */
  teamAId?: Maybe<Scalars['String']['output']>;
  /** Team A logo */
  teamALogo?: Maybe<Scalars['String']['output']>;
  /** Team B */
  teamB?: Maybe<Team>;
  /** Team B ID */
  teamBId?: Maybe<Scalars['String']['output']>;
  /** Team B logo */
  teamBLogo?: Maybe<Scalars['String']['output']>;
  /** When the match was last updated */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Match venue */
  venue?: Maybe<Scalars['String']['output']>;
};

/** Update race information. */
export type UpdateRace = {
  __typename?: 'UpdateRace';
  /** Unique identifier */
  id: Scalars['Int']['output'];
  /** New rank */
  newRank?: Maybe<Scalars['Int']['output']>;
  /** Previous rank */
  previousRank?: Maybe<Scalars['Int']['output']>;
  /** Associated race */
  race?: Maybe<AwardsRace>;
  /** Race ID */
  raceId?: Maybe<Scalars['String']['output']>;
  /** Update details */
  updateDetails?: Maybe<Scalars['JSON']['output']>;
  /** Update type */
  updateType?: Maybe<Scalars['String']['output']>;
  /** When the update was made */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Updated by */
  updatedBy?: Maybe<Scalars['String']['output']>;
};

/** User profile. */
export type User = {
  __typename?: 'User';
  /** Application role */
  appRole?: Maybe<AppRole>;
  /** When the user was created */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Email address */
  email?: Maybe<Scalars['String']['output']>;
  /** Unique identifier */
  id: Scalars['ID']['output'];
  /** User role */
  role: Scalars['String']['output'];
  /** When the user was last updated */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type GetEventsQueryVariables = Exact<{
  pagination?: InputMaybe<PaginationInput>;
}>;


export type GetEventsQuery = { __typename?: 'Query', events: { __typename?: 'PaginatedResponse', items: Array<any>, pagination: { __typename?: 'PaginationInfo', total: number, page: number, limit: number, hasMore: boolean } } };

export type GetEventQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetEventQuery = { __typename?: 'Query', event?: { __typename?: 'Event', id: string, name: string, type?: string | null, isGlobal?: boolean | null, regionId?: string | null, startDate?: any | null, endDate?: any | null, maxRp?: number | null, decayDays?: number | null, processed?: boolean | null, description?: string | null, bannerUrl?: string | null, rulesUrl?: string | null, processedAt?: any | null, status?: string | null, tier?: EventTier | null, seasonNumber?: number | null, prizePool?: number | null, region?: { __typename?: 'Region', id: string, name: string } | null } | null };

export type GetMatchesQueryVariables = Exact<{
  pagination?: InputMaybe<PaginationInput>;
}>;


export type GetMatchesQuery = { __typename?: 'Query', matches: { __typename?: 'PaginatedResponse', items: Array<any>, pagination: { __typename?: 'PaginationInfo', total: number, page: number, limit: number, hasMore: boolean } } };

export type GetMatchQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetMatchQuery = { __typename?: 'Query', match?: { __typename?: 'Match', id: string, eventId?: string | null, teamAId?: string | null, teamBId?: string | null, winnerId?: string | null, scoreA?: number | null, scoreB?: number | null, playedAt?: any | null, boxscoreUrl?: string | null, teamAName?: string | null, stage?: MatchStage | null, gameNumber?: number | null, teamBName?: string | null, winnerName?: string | null, event?: { __typename?: 'Event', id: string, name: string, type?: string | null, status?: string | null, tier?: EventTier | null } | null, teamA?: { __typename?: 'Team', id: string, name: string, logoUrl?: string | null, regionId?: string | null, currentRp?: number | null, eloRating?: number | null, globalRank?: number | null, leaderboardTier?: string | null } | null, teamB?: { __typename?: 'Team', id: string, name: string, logoUrl?: string | null, regionId?: string | null, currentRp?: number | null, eloRating?: number | null, globalRank?: number | null, leaderboardTier?: string | null } | null, winner?: { __typename?: 'Team', id: string, name: string, logoUrl?: string | null, regionId?: string | null, currentRp?: number | null, eloRating?: number | null, globalRank?: number | null, leaderboardTier?: string | null } | null, playerStats: Array<{ __typename?: 'PlayerMatchStats', id: string, playerId: string, matchId: string, teamId: string, points?: number | null, assists?: number | null, rebounds?: number | null, steals?: number | null, blocks?: number | null, turnovers?: number | null, fouls?: number | null, ps?: number | null, createdAt?: any | null, fgm?: number | null, fga?: number | null, threePointsMade?: number | null, threePointsAttempted?: number | null, ftm?: number | null, fta?: number | null, plusMinus?: number | null, playerName?: string | null, updatedAt?: any | null, player?: { __typename?: 'Player', id: string, gamertag: string, position?: PlayerPosition | null, salaryTier?: SalaryTier | null } | null }> } | null };

export type GetPlayersQueryVariables = Exact<{
  pagination?: InputMaybe<PaginationInput>;
}>;


export type GetPlayersQuery = { __typename?: 'Query', players: { __typename?: 'PaginatedResponse', items: Array<any>, pagination: { __typename?: 'PaginationInfo', total: number, page: number, limit: number, hasMore: boolean } } };

export type GetPlayerQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetPlayerQuery = { __typename?: 'Query', player?: { __typename?: 'Player', id: string, gamertag: string, alternateGamertag?: string | null, discordId?: string | null, playerRp?: number | null, position?: PlayerPosition | null, regionId?: string | null, salaryTier?: SalaryTier | null, isRookie?: boolean | null, monthlyValue?: number | null, performanceScore?: number | null, playerRankScore?: number | null, currentTeamId?: string | null, twitterId?: string | null, createdAt?: any | null, team?: { __typename?: 'Team', id: string, name: string, logoUrl?: string | null, regionId?: string | null, currentRp?: number | null, eloRating?: number | null, globalRank?: number | null, leaderboardTier?: string | null } | null, region?: { __typename?: 'Region', id: string, name: string } | null } | null };

export type GetTeamsQueryVariables = Exact<{
  pagination?: InputMaybe<PaginationInput>;
}>;


export type GetTeamsQuery = { __typename?: 'Query', teams: { __typename?: 'PaginatedResponse', items: Array<any>, pagination: { __typename?: 'PaginationInfo', total: number, page: number, limit: number, hasMore: boolean } } };

export type GetTeamQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetTeamQuery = { __typename?: 'Query', team?: { __typename?: 'Team', id: string, name: string, logoUrl?: string | null, regionId?: string | null, currentRp?: number | null, eloRating?: number | null, globalRank?: number | null, leaderboardTier?: string | null, createdAt?: any | null, playerRankScore?: number | null, moneyWon?: number | null, region?: { __typename?: 'Region', id: string, name: string } | null } | null };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, email?: string | null, role: string, appRole?: AppRole | null, createdAt?: any | null, updatedAt?: any | null } | null };


export const GetEventsDocument = gql`
    query GetEvents($pagination: PaginationInput) {
  events(pagination: $pagination) {
    items
    pagination {
      total
      page
      limit
      hasMore
    }
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
 *      pagination: // value for 'pagination'
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
  event(id: $id) {
    id
    name
    type
    isGlobal
    regionId
    startDate
    endDate
    maxRp
    decayDays
    processed
    description
    bannerUrl
    rulesUrl
    processedAt
    status
    tier
    seasonNumber
    prizePool
    region {
      id
      name
    }
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
    query GetMatches($pagination: PaginationInput) {
  matches(pagination: $pagination) {
    items
    pagination {
      total
      page
      limit
      hasMore
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
 *      pagination: // value for 'pagination'
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
  match(id: $id) {
    id
    eventId
    teamAId
    teamBId
    winnerId
    scoreA
    scoreB
    playedAt
    boxscoreUrl
    teamAName
    stage
    gameNumber
    teamBName
    winnerName
    event {
      id
      name
      type
      status
      tier
    }
    teamA {
      id
      name
      logoUrl
      regionId
      currentRp
      eloRating
      globalRank
      leaderboardTier
    }
    teamB {
      id
      name
      logoUrl
      regionId
      currentRp
      eloRating
      globalRank
      leaderboardTier
    }
    winner {
      id
      name
      logoUrl
      regionId
      currentRp
      eloRating
      globalRank
      leaderboardTier
    }
    playerStats {
      id
      playerId
      matchId
      teamId
      points
      assists
      rebounds
      steals
      blocks
      turnovers
      fouls
      ps
      createdAt
      fgm
      fga
      threePointsMade
      threePointsAttempted
      ftm
      fta
      plusMinus
      playerName
      updatedAt
      player {
        id
        gamertag
        position
        salaryTier
      }
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
    query GetPlayers($pagination: PaginationInput) {
  players(pagination: $pagination) {
    items
    pagination {
      total
      page
      limit
      hasMore
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
 *      pagination: // value for 'pagination'
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
export const GetPlayerDocument = gql`
    query GetPlayer($id: ID!) {
  player(id: $id) {
    id
    gamertag
    alternateGamertag
    discordId
    playerRp
    position
    regionId
    salaryTier
    isRookie
    monthlyValue
    performanceScore
    playerRankScore
    currentTeamId
    twitterId
    createdAt
    team {
      id
      name
      logoUrl
      regionId
      currentRp
      eloRating
      globalRank
      leaderboardTier
    }
    region {
      id
      name
    }
  }
}
    `;

/**
 * __useGetPlayerQuery__
 *
 * To run a query within a React component, call `useGetPlayerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlayerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlayerQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPlayerQuery(baseOptions: Apollo.QueryHookOptions<GetPlayerQuery, GetPlayerQueryVariables> & ({ variables: GetPlayerQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPlayerQuery, GetPlayerQueryVariables>(GetPlayerDocument, options);
      }
export function useGetPlayerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlayerQuery, GetPlayerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPlayerQuery, GetPlayerQueryVariables>(GetPlayerDocument, options);
        }
export function useGetPlayerSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPlayerQuery, GetPlayerQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPlayerQuery, GetPlayerQueryVariables>(GetPlayerDocument, options);
        }
export type GetPlayerQueryHookResult = ReturnType<typeof useGetPlayerQuery>;
export type GetPlayerLazyQueryHookResult = ReturnType<typeof useGetPlayerLazyQuery>;
export type GetPlayerSuspenseQueryHookResult = ReturnType<typeof useGetPlayerSuspenseQuery>;
export type GetPlayerQueryResult = Apollo.QueryResult<GetPlayerQuery, GetPlayerQueryVariables>;
export const GetTeamsDocument = gql`
    query GetTeams($pagination: PaginationInput) {
  teams(pagination: $pagination) {
    items
    pagination {
      total
      page
      limit
      hasMore
    }
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
 *      pagination: // value for 'pagination'
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
  team(id: $id) {
    id
    name
    logoUrl
    regionId
    currentRp
    eloRating
    globalRank
    leaderboardTier
    createdAt
    playerRankScore
    moneyWon
    region {
      id
      name
    }
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
export const GetCurrentUserDocument = gql`
    query GetCurrentUser {
  user(id: "me") {
    id
    email
    role
    appRole
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export function useGetCurrentUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserSuspenseQueryHookResult = ReturnType<typeof useGetCurrentUserSuspenseQuery>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;