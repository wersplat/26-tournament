// Export GraphQL services
export { graphqlService } from './graphql-service'
export { adminGraphqlService } from './admin-graphql-service'

// Keep auth service (still needed for Supabase auth)
export { authService } from './auth-service'

// Export updated services that use GraphQL
export { leaderboardService, PlayerProfile, LeaderboardSortBy, PlayerTier } from './leaderboard-service'

// Deprecated REST services are retained for reference only. Do not re-export.
