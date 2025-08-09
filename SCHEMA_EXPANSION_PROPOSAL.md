# GraphQL Schema Expansion Proposal

This document outlines proposed additions to the GraphQL schema to support enhanced functionality for the Bodega Cats GC platform.

## Current Schema Status

The current schema provides basic CRUD operations for:
- **Users**: Create, update, delete
- **Players**: Read operations with filtering
- **Teams**: Read operations
- **Events**: Read operations with filtering
- **Matches**: Create, update, delete, submit stats

## Proposed Schema Expansions

### 1. Enhanced Player Operations

#### New Mutations
```graphql
# Player Management
createPlayer(input: PlayerInput!): Player!
updatePlayer(id: ID!, input: PlayerUpdateInput!): Player!
deletePlayer(id: ID!): Boolean!

# Player Statistics
updatePlayerRP(playerId: ID!, rpChange: Float!, reason: String!): Player!
verifyPlayer(id: ID!): Player!
assignPlayerToTeam(playerId: ID!, teamId: ID!): Player!
removePlayerFromTeam(playerId: ID!): Player!
```

#### New Input Types
```graphql
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
```

### 2. Enhanced Team Operations

#### New Mutations
```graphql
# Team Management
createTeam(input: TeamInput!): Team!
updateTeam(id: ID!, input: TeamUpdateInput!): Team!
deleteTeam(id: ID!): Boolean!

# Team Roster Management
addPlayerToTeam(teamId: ID!, playerId: ID!): Team!
removePlayerFromTeam(teamId: ID!, playerId: ID!): Team!
setTeamCaptain(teamId: ID!, playerId: ID!): Team!
```

#### New Input Types
```graphql
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
```

### 3. Enhanced Event Operations

#### New Mutations
```graphql
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
```

#### New Input Types
```graphql
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

### 4. Enhanced Match Operations

#### New Mutations
```graphql
# Match Lifecycle
startMatch(id: ID!): Match!
endMatch(id: ID!, scoreA: Int!, scoreB: Int!): Match!
pauseMatch(id: ID!): Match!
resumeMatch(id: ID!): Match!
cancelMatch(id: ID!, reason: String!): Match!

# Match Statistics
updateMatchScore(id: ID!, scoreA: Int!, scoreB: Int!): Match!
updateMatchTime(id: ID!, timeElapsed: Int!): Match!
```

### 5. Analytics and Reporting

#### New Queries
```graphql
# Dashboard Analytics
getDashboardStats: DashboardStats!

# Player Analytics
getPlayerAnalytics(playerId: ID!, timeRange: TimeRange = LAST_30_DAYS): PlayerAnalytics!
getPlayerPerformanceTrend(playerId: ID!, timeRange: TimeRange): [PerformanceData!]!

# Team Analytics
getTeamAnalytics(teamId: ID!, timeRange: TimeRange = LAST_30_DAYS): TeamAnalytics!
getTeamPerformanceTrend(teamId: ID!, timeRange: TimeRange): [PerformanceData!]!

# Event Analytics
getEventAnalytics(eventId: ID!): EventAnalytics!
getEventLeaderboard(eventId: ID!): [EventLeaderboardEntry!]!

# Leaderboard Enhancements
getLeaderboard(
  limit: Int = 50
  offset: Int = 0
  tier: PlayerTier
  region: String
  sortBy: LeaderboardSortBy = CURRENT_RP
): [LeaderboardEntry!]!

getTopPlayers(limit: Int = 10, tier: PlayerTier): [LeaderboardEntry!]!
```

#### New Types
```graphql
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

type PlayerAnalytics {
  player: Player!
  performanceTrend: [PerformanceData!]!
  matchHistory: [MatchWithStats!]!
  achievements: [Achievement!]!
}

type TeamAnalytics {
  team: Team!
  performanceTrend: [PerformanceData!]!
  playerStats: [PlayerTeamStats!]!
  matchHistory: [Match!]!
}

type EventAnalytics {
  event: Event!
  participantStats: [TeamEventStats!]!
  matchStats: EventMatchStats!
  leaderboard: [EventLeaderboardEntry!]!
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

enum TimeRange {
  LAST_7_DAYS
  LAST_30_DAYS
  LAST_90_DAYS
  LAST_6_MONTHS
  LAST_YEAR
  ALL_TIME
}
```

### 6. Search and Filtering

#### New Queries
```graphql
# Search Operations
searchPlayers(
  query: String!
  limit: Int = 20
  offset: Int = 0
  filters: PlayerSearchFilters
): [Player!]!

searchTeams(
  query: String!
  limit: Int = 20
  offset: Int = 0
  filters: TeamSearchFilters
): [Team!]!

searchEvents(
  query: String!
  limit: Int = 20
  offset: Int = 0
  filters: EventSearchFilters
): [Event!]!

# Autocomplete
getPlayerSuggestions(query: String!, limit: Int = 10): [Player!]!
getTeamSuggestions(query: String!, limit: Int = 10): [Team!]!
```

#### New Input Types
```graphql
input PlayerSearchFilters {
  tier: PlayerTier
  region: String
  position: PlayerPosition
  isVerified: Boolean
  hasTeam: Boolean
}

input TeamSearchFilters {
  region: String
  isActive: Boolean
  hasPlayers: Boolean
}

input EventSearchFilters {
  eventType: EventType
  status: EventStatus
  tier: EventTier
  dateRange: DateRange
}

input DateRange {
  startDate: DateTime!
  endDate: DateTime!
}
```

### 7. User Profile Management

#### New Mutations
```graphql
# Profile Management
updateUserProfile(input: UserProfileUpdateInput!): User!
changePassword(currentPassword: String!, newPassword: String!): PasswordChangeResult!
resetPassword(email: String!): PasswordResetResult!
verifyEmail(token: String!): EmailVerificationResult!

# User Preferences
updateUserPreferences(input: UserPreferencesInput!): UserPreferences!
```

#### New Types
```graphql
type PasswordChangeResult {
  success: Boolean!
  message: String!
}

type PasswordResetResult {
  success: Boolean!
  message: String!
}

type EmailVerificationResult {
  success: Boolean!
  message: String!
}

type UserPreferences {
  id: ID!
  userId: ID!
  theme: Theme!
  notifications: NotificationSettings!
  privacy: PrivacySettings!
  createdAt: DateTime!
  updatedAt: DateTime!
}

enum Theme {
  LIGHT
  DARK
  SYSTEM
}

type NotificationSettings {
  email: Boolean!
  push: Boolean!
  discord: Boolean!
  matchReminders: Boolean!
  eventUpdates: Boolean!
  achievementAlerts: Boolean!
}

type PrivacySettings {
  profileVisibility: ProfileVisibility!
  showStats: Boolean!
  showTeam: Boolean!
  allowFriendRequests: Boolean!
}

enum ProfileVisibility {
  PUBLIC
  FRIENDS_ONLY
  PRIVATE
}
```

### 8. Achievement System

#### New Types
```graphql
type Achievement {
  id: ID!
  name: String!
  description: String!
  icon: String!
  category: AchievementCategory!
  rarity: AchievementRarity!
  points: Int!
  criteria: AchievementCriteria!
  createdAt: DateTime!
}

type UserAchievement {
  id: ID!
  userId: ID!
  achievementId: ID!
  earnedAt: DateTime!
  progress: Int
  maxProgress: Int
  achievement: Achievement!
  user: User!
}

enum AchievementCategory {
  PERFORMANCE
  SOCIAL
  COMPETITIVE
  COLLECTION
  MILESTONE
}

enum AchievementRarity {
  COMMON
  UNCOMMON
  RARE
  EPIC
  LEGENDARY
}

type AchievementCriteria {
  type: CriteriaType!
  value: Int!
  description: String!
}

enum CriteriaType {
  MATCHES_PLAYED
  WINS
  POINTS_SCORED
  ASSISTS
  REBOUNDS
  TEAM_JOINED
  EVENTS_PARTICIPATED
  CONSECUTIVE_WINS
  PERFECT_GAME
}
```

## Implementation Priority

### Phase 1: Core Operations (High Priority)
1. Player CRUD operations
2. Team CRUD operations
3. Event CRUD operations
4. Enhanced match operations
5. Basic analytics queries

### Phase 2: Advanced Features (Medium Priority)
1. Search and filtering
2. User profile management
3. Achievement system
4. Advanced analytics

### Phase 3: Optimization (Low Priority)
1. Performance optimizations
2. Caching strategies
3. Real-time subscriptions

## Benefits

1. **Complete CRUD Operations**: Full create, read, update, delete capabilities for all entities
2. **Enhanced Analytics**: Rich data insights for players, teams, and events
3. **Better User Experience**: Search, filtering, and autocomplete functionality
4. **Gamification**: Achievement system to increase engagement
5. **Scalability**: Proper pagination and filtering for large datasets
6. **Type Safety**: Comprehensive input validation and type checking

## Migration Strategy

1. **Backward Compatibility**: All existing queries and mutations remain functional
2. **Gradual Rollout**: New features can be deployed incrementally
3. **Feature Flags**: New operations can be enabled/disabled as needed
4. **Documentation**: Comprehensive documentation for all new operations
5. **Testing**: Thorough testing of all new operations before production deployment
