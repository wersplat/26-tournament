# GraphQL Migration Guide

This document outlines the migration of the frontend from REST API calls to using the GraphQL server for all data operations.

## Overview

The frontend has been updated to use the GraphQL server as the primary data source, replacing the old REST API calls. This provides:

- **Type Safety**: Full TypeScript support with generated types
- **Better Performance**: Optimized queries with pg_graphql
- **Unified API**: Single endpoint for all data operations
- **Real-time Schema Sync**: Database changes automatically reflected

## Changes Made

### 1. Updated GraphQL Queries (`src/lib/graphql/queries.ts`)

- Updated all queries to match the pg_graphql generated schema exactly
- Changed from custom field names to pg_graphql collection names:
  - `getPlayers` → `playersCollection`
  - `getTeams` → `teamsCollection`
  - `getMatches` → `matchesCollection`
  - `getEvents` → `eventsCollection`
- Added proper pagination with `edges` and `node` structure
- Updated field names to match database schema (snake_case)
- Added support for filtering and ordering

### 2. Updated GraphQL Mutations (`src/lib/graphql/mutations.ts`)

- Updated mutations to use pg_graphql CRUD operations:
  - `insertIntomatchesCollection` for creating matches
  - `updatematchesCollection` for updating matches
  - `deleteFrommatchesCollection` for deleting matches
- Added mutations for all entity types (players, teams, events, player_stats)
- Updated input types to match pg_graphql schema

### 3. Updated GraphQL Service (`src/services/graphql-service.ts`)

- Updated service methods to handle the new query structure
- Changed parameter names from `limit` to `first` to match GraphQL conventions
- Added support for filtering and ordering parameters
- Updated return value handling to extract data from `edges.node` structure

### 4. Updated Admin GraphQL Service (`src/services/admin-graphql-service.ts`)

- Updated mutation methods to use pg_graphql operations
- Changed from custom mutation names to pg_graphql generated names
- Updated parameter structures to match pg_graphql requirements
- Added comprehensive CRUD operations for all entity types

### 5. Updated Types (`src/types/graphql.ts`)

- Completely rewrote types to match the actual pg_graphql schema
- Updated enum names to match database schema:
  - `PlayerTier` → `player_position`
  - `SalaryTier` → `salary_tier`
  - `EventTier` → `event_tier`
  - `MatchStage` → `stage`
- Added connection types for pagination
- Added filter types for querying
- Maintained backward compatibility with legacy type aliases

### 6. Updated Admin API Client (`src/services/admin-api-client.ts`)

- Updated to use the new GraphQL services
- Maintained backward compatibility with REST-style method calls
- Added comprehensive CRUD operations for all entity types
- Updated parameter types to match new schema

## Key Schema Changes

### Field Name Changes

- `userId` → `id` (players table)
- `currentRp` → `player_rp`
- `teamName` → `teams.name`
- `eventId` → `event_id`
- `teamAId` → `team_a_id`
- `scoreA` → `score_a`
- `createdAt` → `created_at`

### Enum Value Changes

- `Point_Guard` → `Point Guard`
- `Shooting_Guard` → `Shooting Guard`
- `Power_Forward` → `Power Forward`
- `Regular_Season` → `Regular Season`
- `Group_Play` → `Group Play`

### Query Structure Changes

- All queries now use `Collection` suffix
- Pagination uses `edges.node` structure
- Single entity queries use `node(nodeId)` with type fragments
- Filtering uses pg_graphql filter types

## Usage Examples

### Querying Players

```typescript
// Get all players
const players = await graphqlService.getPlayers(20, 0)

// Get players with filter
const filter = { position: { eq: 'Point Guard' } }
const pointGuards = await graphqlService.getPlayers(20, 0, filter)

// Get single player
const player = await graphqlService.getPlayer('player-node-id')
```

### Creating Matches

```typescript
// Create a new match
const matchData = {
  event_id: 'event-uuid',
  team_a_id: 'team-a-uuid',
  team_b_id: 'team-b-uuid',
  team_a_name: 'Team Alpha',
  team_b_name: 'Team Beta',
  stage: 'Regular Season',
  game_number: 1
}
const newMatch = await adminGraphqlService.createMatch(matchData)
```

### Updating Players

```typescript
// Update player
const updateData = {
  player_rp: 1500,
  salary_tier: 'A'
}
const updatedPlayer = await adminGraphqlService.updatePlayer('player-id', updateData)
```

## Migration Notes

### Breaking Changes

1. **Field Names**: All field names now use snake_case to match database schema
2. **Query Structure**: Queries now use `Collection` suffix and `edges.node` structure
3. **Enum Values**: Enum values have been updated to match database values
4. **Parameter Names**: Query parameters use `first` instead of `limit`

### Backward Compatibility

- Legacy type aliases are maintained for gradual migration
- Admin API client maintains REST-style method signatures
- Existing component usage should continue to work with minimal changes

### Error Handling

- All GraphQL operations use `errorPolicy: 'all'` to handle partial failures
- Errors are logged but don't crash the application
- Network errors are handled gracefully

## Testing

To test the migration:

1. **Check GraphQL Playground**: Visit `http://localhost:4000/graphql` to test queries
2. **Test Frontend**: Ensure all pages load without errors
3. **Test Admin Operations**: Verify CRUD operations work correctly
4. **Check Console**: Monitor for any GraphQL errors

## Troubleshooting

### Common Issues

1. **Field Not Found Errors**: Ensure field names match the pg_graphql schema exactly
2. **Type Mismatch Errors**: Check that enum values match database values
3. **Node ID Errors**: Use the correct node ID format for single entity queries
4. **Filter Errors**: Ensure filter objects match the expected filter types

### Debugging

1. **Check GraphQL Logs**: Monitor the GraphQL server logs for errors
2. **Use Apollo DevTools**: Install Apollo DevTools browser extension for debugging
3. **Check Network Tab**: Monitor GraphQL requests in browser dev tools
4. **Validate Schema**: Use GraphQL Playground to test queries directly

## Next Steps

1. **Update Components**: Gradually update components to use new field names
2. **Add Error Boundaries**: Implement proper error handling for GraphQL operations
3. **Optimize Queries**: Add query optimization and caching strategies
4. **Add Real-time Features**: Implement GraphQL subscriptions for live updates


