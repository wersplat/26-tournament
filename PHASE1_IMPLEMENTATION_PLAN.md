# Phase 1 Implementation Plan - High Priority Schema Expansion

## Current Status ✅

### Working Operations (Current Schema)

- ✅ **User Mutations**: `CreateUser`, `UpdateUser`, `DeleteUser`
- ✅ **Match Mutations**: `SubmitMatch`, `UpdateMatch`, `DeleteMatch`, `SubmitMatchStats`
- ✅ **Player Queries**: `GetPlayers`, `GetPlayer` (with filtering)
- ✅ **Team Queries**: `GetTeams`, `GetTeam`
- ✅ **Event Queries**: `GetEvents`, `GetEvent` (with filtering)
- ✅ **Match Queries**: `GetMatches`, `GetMatch` (with filtering)

### Missing Input Types (Need to be added to backend schema)

- ❌ `MatchInput` - Required for `submitMatch`
- ❌ `MatchUpdateInput` - Required for `updateMatch`
- ❌ `PlayerMatchStatsInput` - Required for `submitMatchStats`

## Phase 1 Implementation Steps

### Step 1: Backend Schema Updates (High Priority)

#### 1.1 Add Missing Input Types to Backend Schema

```graphql
# Add to graphql-server/src/schema.graphql

"""
Input type for creating a new match.
"""
input MatchInput {
  eventId: UUID!
  gameNumber: Int!
  scheduledAt: DateTime!
  stage: MatchStage!
  teamAId: ID!
  teamAName: String!
  teamBId: ID!
  teamBName: String!
  venue: String
  streamUrl: String
  notes: String
}

"""
Input type for updating an existing match.
"""
input MatchUpdateInput {
  eventId: UUID
  gameNumber: Int
  scheduledAt: DateTime
  stage: MatchStage
  teamAId: ID
  teamAName: String
  teamBId: ID
  teamBName: String
  venue: String
  streamUrl: String
  notes: String
  status: MatchStatus
  startedAt: DateTime
  endedAt: DateTime
  scoreA: Int
  scoreB: Int
  winnerId: ID
  winnerName: String
  boxscoreUrl: String
}

"""
Input type for player match statistics.
"""
input PlayerMatchStatsInput {
  playerId: ID!
  teamId: ID!
  points: Int!
  assists: Int!
  rebounds: Int!
  steals: Int!
  blocks: Int!
  turnovers: Int!
  fouls: Int!
  fgm: Int!
  fga: Int!
  threePointsMade: Int!
  threePointsAttempted: Int!
  ftm: Int!
  fta: Int!
  plusMinus: Int!
  minutesPlayed: Int!
}
```

#### 1.2 Add New Mutations to Backend Schema

```graphql
# Add to Mutation type in graphql-server/src/schema.graphql

# Player Management
createPlayer(input: PlayerInput!): Player!
updatePlayer(id: ID!, input: PlayerUpdateInput!): Player!
deletePlayer(id: ID!): Boolean!

# Player Statistics
updatePlayerRP(playerId: ID!, rpChange: Float!, reason: String!): Player!
verifyPlayer(id: ID!): Player!
assignPlayerToTeam(playerId: ID!, teamId: ID!): Player!
removePlayerFromTeam(playerId: ID!): Player!

# Team Management
createTeam(input: TeamInput!): Team!
updateTeam(id: ID!, input: TeamUpdateInput!): Team!
deleteTeam(id: ID!): Boolean!

# Team Roster Management
addPlayerToTeam(teamId: ID!, playerId: ID!): Team!
removePlayerFromTeam(teamId: ID!, playerId: ID!): Team!
setTeamCaptain(teamId: ID!, playerId: ID!): Team!

# Event Management
createEvent(input: EventInput!): Event!
updateEvent(id: ID!, input: EventUpdateInput!): Event!
deleteEvent(id: ID!): Boolean!

# Event Registration
registerTeamForEvent(eventId: ID!, teamId: ID!): Event!
unregisterTeamFromEvent(eventId: ID!, teamId: ID!): Event!

# Event Lifecycle
startEvent(id: ID!): Event!
endEvent(id: ID!): Event!
cancelEvent(id: ID!, reason: String!): Event!

# Enhanced Match Operations
startMatch(id: ID!): Match!
endMatch(id: ID!, scoreA: Int!, scoreB: Int!): Match!
pauseMatch(id: ID!): Match!
resumeMatch(id: ID!): Match!
cancelMatch(id: ID!, reason: String!): Match!
updateMatchScore(id: ID!, scoreA: Int!, scoreB: Int!): Match!
updateMatchTime(id: ID!, timeElapsed: Int!): Match!
```

#### 1.3 Add New Input Types for Mutations

```graphql
# Add to graphql-server/src/schema.graphql

input PlayerInput {
  userId: ID!
  gamertag: String!
  region: String
  position: PlayerPosition
  salaryTier: SalaryTier
  teamName: String
  isVerified: Boolean = false
}

input PlayerUpdateInput {
  gamertag: String
  region: String
  currentRp: Float
  peakRp: Float
  tier: PlayerTier
  position: PlayerPosition
  salaryTier: SalaryTier
  teamName: String
  isVerified: Boolean
}

input TeamInput {
  name: String!
  description: String
  logoUrl: String
  region: String
  isActive: Boolean = true
}

input TeamUpdateInput {
  name: String
  description: String
  logoUrl: String
  region: String
  isActive: Boolean
}

input EventInput {
  name: String!
  description: String
  eventType: EventType!
  tier: EventTier!
  startDate: DateTime!
  endDate: DateTime!
  entryFee: Float
  maxParticipants: Int
  createdBy: ID!
}

input EventUpdateInput {
  name: String
  description: String
  eventType: EventType
  tier: EventTier
  startDate: DateTime
  endDate: DateTime
  entryFee: Float
  maxParticipants: Int
  status: EventStatus
}
```

#### 1.4 Add New Queries to Backend Schema

```graphql
# Add to Query type in graphql-server/src/schema.graphql

# Dashboard Analytics
getDashboardStats: DashboardStats!

# Leaderboard Enhancements
getLeaderboard(
  limit: Int = 50
  offset: Int = 0
  tier: PlayerTier
  region: String
  sortBy: LeaderboardSortBy = CURRENT_RP
): [LeaderboardEntry!]!

getTopPlayers(limit: Int = 10, tier: PlayerTier): [LeaderboardEntry!]!

# Basic Analytics
getPlayerStats(playerId: ID!): PlayerStats!
getTeamStats(teamId: ID!): TeamStats!
getEventStats(eventId: ID!): EventStats!
```

#### 1.5 Add New Types for Analytics

```graphql
# Add to graphql-server/src/schema.graphql

type DashboardStats {
  totalPlayers: Int!
  totalTeams: Int!
  totalMatches: Int!
  totalEvents: Int!
  activePlayers: Int!
  activeTeams: Int!
  completedMatches: Int!
  upcomingEvents: Int!
  averagePlayerRP: Float!
  averageTeamSize: Float!
  topPerformingPlayer: Player
  mostActiveTeam: Team
  recentMatches: [Match!]!
  recentPlayers: [Player!]!
}

type LeaderboardEntry {
  rank: Int!
  player: Player!
  wins: Int!
  losses: Int!
  winRate: Float!
  totalMatches: Int!
  averagePoints: Float!
  averageAssists: Float!
  averageRebounds: Float!
}

enum LeaderboardSortBy {
  CURRENT_RP
  PEAK_RP
  WINS
  WIN_RATE
  AVERAGE_POINTS
  AVERAGE_ASSISTS
  AVERAGE_REBOUNDS
}

type PlayerStats {
  player: Player!
  totalMatches: Int!
  wins: Int!
  losses: Int!
  winRate: Float!
  averagePoints: Float!
  averageAssists: Float!
  averageRebounds: Float!
  averageSteals: Float!
  averageBlocks: Float!
  averageTurnovers: Float!
  averageFouls: Float!
  fieldGoalPercentage: Float!
  threePointPercentage: Float!
  freeThrowPercentage: Float!
  recentMatches: [MatchWithStats!]!
}

type TeamStats {
  team: Team!
  totalMatches: Int!
  wins: Int!
  losses: Int!
  winRate: Float!
  averageScore: Float!
  averagePointsAgainst: Float!
  totalPoints: Int!
  totalAssists: Int!
  totalRebounds: Int!
  recentMatches: [Match!]!
  playerStats: [PlayerTeamStats!]!
}

type EventStats {
  event: Event!
  totalMatches: Int!
  completedMatches: Int!
  averageScore: Float!
  highestScore: Int!
  participantStats: [TeamEventStats!]!
  leaderboard: [EventLeaderboardEntry!]!
}

type MatchWithStats {
  match: Match!
  playerStats: PlayerMatchStats!
}

type PlayerTeamStats {
  player: Player!
  matches: Int!
  averagePoints: Float!
  averageAssists: Float!
  averageRebounds: Float!
  totalPoints: Int!
  totalAssists: Int!
  totalRebounds: Int!
}

type TeamEventStats {
  team: Team!
  matches: Int!
  wins: Int!
  losses: Int!
  winRate: Float!
  averageScore: Float!
  totalPoints: Int!
}

type EventLeaderboardEntry {
  rank: Int!
  team: Team!
  wins: Int!
  losses: Int!
  winRate: Float!
  totalPoints: Int!
  averageScore: Float!
}
```

### Step 2: Frontend Implementation (After Backend Updates)

#### 2.1 Create Enhanced Mutation Files

- ✅ `src/graphql/mutations/players.graphql` - Player CRUD operations
- ✅ `src/graphql/mutations/teams.graphql` - Team CRUD operations  
- ✅ `src/graphql/mutations/events.graphql` - Event CRUD operations
- ✅ `src/graphql/mutations/matches.graphql` - Enhanced match operations

#### 2.2 Create Analytics Query Files

- ✅ `src/graphql/queries/analytics.graphql` - Dashboard and analytics queries

#### 2.3 Update Admin Components

- Update `src/components/admin/admin-dashboard.tsx` to use `getDashboardStats`
- Update `src/components/admin/admin-players-page.tsx` to use player mutations
- Update `src/components/admin/admin-teams-page.tsx` to use team mutations
- Update `src/components/admin/admin-events-page.tsx` to use event mutations
- Update `src/components/admin/admin-matches-page.tsx` to use enhanced match operations

#### 2.4 Update Service Layer

- Update `src/services/admin-graphql-service.ts` to use new mutations
- Update `src/services/graphql-service.ts` to use new queries

### Step 3: Testing and Validation

#### 3.1 Backend Testing

- Test all new mutations with sample data
- Test all new queries with existing data
- Validate input types and error handling

#### 3.2 Frontend Testing

- Test admin dashboard with new analytics
- Test player management operations
- Test team management operations
- Test event management operations
- Test enhanced match operations

## Implementation Priority

### Immediate (Week 1)

1. **Backend Schema Updates**: Add missing input types and new mutations
2. **Backend Implementation**: Implement resolvers for new operations
3. **Testing**: Validate backend operations

### Short Term (Week 2)

1. **Frontend Mutations**: Create GraphQL mutation files
2. **Frontend Queries**: Create analytics query files
3. **Admin Components**: Update admin pages to use new operations

### Medium Term (Week 3-4)

1. **Integration Testing**: End-to-end testing of all operations
2. **Performance Optimization**: Optimize queries and mutations
3. **Documentation**: Update API documentation

## Benefits After Implementation

### For Developers

- ✅ **Complete CRUD Operations**: Full create, read, update, delete for all entities
- ✅ **Type Safety**: All operations fully typed with generated hooks
- ✅ **Consistent API**: Unified GraphQL interface for all operations

### For Users

- ✅ **Enhanced Admin Panel**: Full management capabilities
- ✅ **Rich Analytics**: Dashboard with comprehensive statistics
- ✅ **Better User Experience**: Improved data management and insights

### For System

- ✅ **Scalability**: Proper pagination and filtering
- ✅ **Performance**: Optimized queries and caching
- ✅ **Maintainability**: Clean, documented API structure

## Next Steps

1. **Backend Team**: Implement the schema updates and resolvers
2. **Frontend Team**: Prepare mutation and query files
3. **QA Team**: Plan testing strategy for new operations
4. **DevOps Team**: Plan deployment strategy for schema changes

## Files Ready for Implementation

- ✅ `SCHEMA_EXPANSION_PHASE1.graphql` - Complete schema expansion
- ✅ `PHASE1_IMPLEMENTATION_PLAN.md` - This implementation plan
- ✅ Frontend mutation files (ready to activate after backend updates)
- ✅ Frontend query files (ready to activate after backend updates)
