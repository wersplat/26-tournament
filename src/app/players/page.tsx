'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, Trophy, TrendingUp, MapPin, User, Star } from 'lucide-react'
import { useGetPlayersQuery } from '@/types/generated/graphql'
import { GraphQLWrapper } from '@/components/graphql-wrapper'

// Force dynamic rendering to prevent SSR issues
export const dynamic = 'force-dynamic';

export default function PlayersPage() {
  const { data, loading, error, refetch } = useGetPlayersQuery({
    variables: {
      pagination: {
        limit: 50,
        offset: 0
      }
    },
    fetchPolicy: 'cache-and-network'
  });

  const getPositionColor = (position: string) => {
    switch (position) {
      case 'POINT_GUARD':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'SHOOTING_GUARD':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'LOCK':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'POWER_FORWARD':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'CENTER':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'S':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'A':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'B':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'C':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'D':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <GraphQLWrapper loading={loading} error={error} onRetry={() => refetch()}>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Users className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Players</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">View player profiles, statistics, and rankings</p>
        </div>

        {/* Players Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.players?.items && Array.isArray(data.players.items) && data.players.items.length > 0 ? (
            data.players.items.map((player: any) => (
              <Card key={player.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {player.gamertag}
                        {player.isRookie && (
                          <Badge variant="outline" className="text-xs">
                            <Star className="w-3 h-3 mr-1" />
                            Rookie
                          </Badge>
                        )}
                      </CardTitle>
                      {player.team && (
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <span>{player.team.name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {/* Position & Tier */}
                    <div className="flex gap-2">
                      {player.position && (
                        <Badge className={`text-xs ${getPositionColor(player.position)}`}>
                          {player.position.replace('_', ' ')}
                        </Badge>
                      )}
                      {player.salaryTier && (
                        <Badge className={`text-xs ${getTierColor(player.salaryTier)}`}>
                          {player.salaryTier} Tier
                        </Badge>
                      )}
                    </div>

                    {/* Stats Row */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Trophy className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium">RP: {player.playerRp || 0}</span>
                      </div>
                      {player.monthlyValue && (
                        <Badge variant="outline" className="text-xs">
                          ${player.monthlyValue}
                        </Badge>
                      )}
                    </div>

                    {/* Performance Score */}
                    {player.performanceScore && (
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-sm">PS: {Math.round(player.performanceScore)}</span>
                      </div>
                    )}

                    {/* Region */}
                    {player.region && (
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{player.region.name}</span>
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
                  <p className="text-muted-foreground">No players found</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Pagination Info */}
        {data?.players?.pagination && (
          <div className="mt-8 text-center text-sm text-muted-foreground">
            Showing {data.players.pagination.limit} players
            {data.players.pagination.total && (
              <span> of {data.players.pagination.total} total</span>
            )}
          </div>
        )}
      </div>
    </GraphQLWrapper>
  )
}