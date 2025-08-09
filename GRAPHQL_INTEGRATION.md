# GraphQL-Only Integration

This project now uses **only** GraphQL for all data operations.

## Environment Variables

- `NEXT_PUBLIC_GRAPHQL_URL` - GraphQL API endpoint
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase URL (for auth only)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key (for auth only)

## Migration Complete

- ✅ All REST API calls replaced with GraphQL queries
- ✅ Single source of truth for data
- ✅ Simplified architecture
- ✅ Better performance with GraphQL caching

## Usage

### Using GraphQL Service

```typescript
import { graphqlService } from '@/services'

// Get all players
const players = await graphqlService.getPlayers()

// Get specific player
const player = await graphqlService.getPlayer('player-id')

// Get all teams
const teams = await graphqlService.getTeams()
```

### Using GraphQL Hooks (Recommended)

```typescript
import { usePlayers, usePlayer } from '@/hooks/useGraphQL'

// In your component
const { players, loading, error } = usePlayers()
const { player, loading, error } = usePlayer('player-id')
```

## Architecture

- **Single API**: `https://graphql.bodegacatsgc.gg`
- **Authentication**: Supabase JWT tokens
- **Caching**: Apollo Client cache
- **Error Handling**: Comprehensive error states
- **Type Safety**: Full TypeScript support

## Available Queries

### Players

- `GET_PLAYER(id: ID!)` - Get a single player by ID
- `GET_PLAYERS` - Get all players

### Teams

- `GET_TEAMS` - Get all teams with their players

### Matches

- `GET_MATCHES` - Get all matches
- `GET_MATCH(id: ID!)` - Get a specific match by ID

## Custom Hooks

### `usePlayer(id: string)`

Returns player data with authentication checks.

### `usePlayers()`

Returns all players with authentication checks.

### `useTeams()`

Returns all teams with authentication checks.

### `useMatches()`

Returns all matches with authentication checks.

### `useMatch(id: string)`

Returns specific match data with authentication checks.

### `usePermissions()`

Returns user permission levels for different operations.

## Authentication Flow

1. User logs in via Supabase (Discord OAuth)
2. Supabase provides JWT token
3. Apollo Client automatically includes token in GraphQL requests
4. GraphQL server validates token and returns data
5. If token expires, Supabase automatically refreshes it

## Development

### Adding New Queries

1. Add the query to `src/lib/graphql/queries.ts`
2. Create a custom hook in `src/hooks/useGraphQL.ts`
3. Use the hook in your components

### Example: Adding a New Query

```typescript
// src/lib/graphql/queries.ts
export const GET_PLAYER_STATS = gql`
  query GetPlayerStats($playerId: ID!) {
    playerStats(playerId: $playerId) {
      id
      season
      gamesPlayed
      averagePoints
    }
  }
`

// src/hooks/useGraphQL.ts
export const usePlayerStats = (playerId: string) => {
  const { user, loading: authLoading } = useAuth()
  
  const { loading, error, data } = useQuery(GET_PLAYER_STATS, {
    variables: { playerId },
    errorPolicy: 'all',
    skip: authLoading || !user,
  })

  return {
    stats: data?.playerStats,
    loading: loading || authLoading,
    error,
    isAuthenticated: !!user,
  }
}
```

## Deployment

The GraphQL integration is ready for deployment to `dashboard.bodegacatsgc.gg`. The Apollo Client is configured to connect to `https://graphql.bodegacatsgc.gg`.

### Environment Variables

Ensure these are set in your deployment environment:

- `NEXT_PUBLIC_GRAPHQL_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Testing

To test the GraphQL integration:

1. Start the development server: `npm run dev`
2. Navigate to `/players` to see the players list
3. Click on a player to view their profile
4. Navigate to `/teams` to see team rosters
5. Check the browser's Network tab to see GraphQL requests with authentication headers

## Troubleshooting

### Common Issues

1. **Authentication Errors**
   - Ensure user is logged in via Supabase
   - Check that JWT token is valid
   - Verify Supabase environment variables

2. **Network Errors**
   - Check GraphQL server is running at `https://graphql.bodegacatsgc.gg`
   - Verify CORS settings on the GraphQL server

3. **Missing Data**
   - Check GraphQL schema matches expected structure
   - Verify query variables are correct
   - Check server logs for errors

### Debug Mode

Enable debug logging by adding to your component:

```typescript
const { loading, error, data } = useQuery(GET_PLAYERS, {
  errorPolicy: 'all',
  onCompleted: (data) => console.log('Query completed:', data),
  onError: (error) => console.error('Query error:', error),
})
```
