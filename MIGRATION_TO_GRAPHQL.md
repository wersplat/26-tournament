# Migration to GraphQL-Only

This document outlines the migration from REST APIs to GraphQL-only architecture.

## Environment Variables Updated

### Before

```bash
NEXT_PUBLIC_API_URL=https://data.bodegacatsgc.gg
NEXT_PUBLIC_ADMIN_API_URL=https://api.bodegacatsgc.gg
```

### After

```bash
NEXT_PUBLIC_GRAPHQL_URL=https://graphql.bodegacatsgc.gg
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Service Layer Changes

### Old REST API Services (Removed)

- `apiClient` - General API client
- `adminApiClient` - Admin API client  
- `playersService` - Player REST endpoints
- `teamsService` - Team REST endpoints
- `matchesService` - Match REST endpoints
- `eventsService` - Event REST endpoints
- `leaderboardService` - Leaderboard REST endpoints
- `adminService` - Admin REST endpoints

### New GraphQL Service

- `graphqlService` - Single service for all GraphQL operations

## Component Migration

### Before (REST API)

```typescript
import { playersService } from '@/services'

const [players, setPlayers] = useState([])

useEffect(() => {
  playersService.getAllPlayers().then(setPlayers)
}, [])
```

### After (GraphQL)

```typescript
import { usePlayers } from '@/hooks/useGraphQL'

const { players, loading, error } = usePlayers()
```

## Benefits

- ✅ **Single API**: One endpoint for all data operations
- ✅ **Better Performance**: GraphQL caching and optimized queries
- ✅ **Type Safety**: Better TypeScript integration
- ✅ **Simplified Architecture**: No need to manage multiple API endpoints
- ✅ **Real-time Updates**: Easy to add subscriptions later
- ✅ **Reduced Bundle Size**: Remove unused REST API code

## Testing

1. Update environment variables
2. Restart development server: `npm run dev`
3. Test all pages to ensure GraphQL integration works
4. Verify authentication still works
5. Check that data loads correctly

## Rollback Plan

If needed, you can rollback by:

1. Restoring old environment variables
2. Uncommenting old service exports in `src/services/index.ts`
3. Reverting component changes to use REST APIs


