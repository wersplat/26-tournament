'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, Trophy, TrendingUp, MapPin } from 'lucide-react'
import { useGetTeamsQuery } from '@/types/generated/graphql'
import { GraphQLWrapper } from '@/components/graphql-wrapper'

// Force dynamic rendering to prevent SSR issues
export const dynamic = 'force-dynamic';

export default function TeamsPage() {
  const { data, loading, error, refetch } = useGetTeamsQuery({
    variables: {
      pagination: {
        limit: 50,
        offset: 0
      }
    },
    fetchPolicy: 'cache-and-network'
  });

  return (
    <GraphQLWrapper loading={loading} error={error} onRetry={() => refetch()}>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Users className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Teams</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">View all teams and their roster</p>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.teams?.items && Array.isArray(data.teams.items) && data.teams.items.length > 0 ? (
            data.teams.items.map((team: any) => (
              <Card key={team.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    {team.logoUrl && (
                      <img 
                        src={team.logoUrl} 
                        alt={`${team.name} logo`}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <CardTitle className="text-lg">{team.name}</CardTitle>
                      {team.region && (
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {team.region.name}
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {/* Stats Row */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Trophy className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium">RP: {team.currentRp || 0}</span>
                      </div>
                      {team.globalRank && (
                        <Badge variant="outline" className="text-xs">
                          Rank #{team.globalRank}
                        </Badge>
                      )}
                    </div>

                    {/* ELO Rating */}
                    {team.eloRating && (
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-sm">ELO: {Math.round(team.eloRating)}</span>
                      </div>
                    )}

                    {/* Tier Badge */}
                    {team.leaderboardTier && (
                      <div className="flex justify-end">
                        <Badge variant="secondary">
                          {team.leaderboardTier} Tier
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full">
              <Card>
                <CardContent className="py-8 text-center">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No teams found</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Pagination Info */}
        {data?.teams?.pagination && (
          <div className="mt-8 text-center text-sm text-muted-foreground">
            Showing {data.teams.pagination.limit} teams
            {data.teams.pagination.total && (
              <span> of {data.teams.pagination.total} total</span>
            )}
          </div>
        )}
      </div>
    </GraphQLWrapper>
  )
}
