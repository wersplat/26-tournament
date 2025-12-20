'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, Trophy, TrendingUp, MapPin } from 'lucide-react'
import { usePublicTeams } from '@/hooks/useAdminSupabase'
import { GraphQLWrapper } from '@/components/graphql-wrapper'

// Force dynamic rendering to prevent SSR issues
export const dynamic = 'force-dynamic';

export default function TeamsPage() {
  const { teams, loading, error, refetch } = usePublicTeams();

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
          {teams && Array.isArray(teams) && teams.length > 0 ? (
            teams.map((team: any) => (
              <Card key={team.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    {team.logo_url && (
                      <img 
                        src={team.logo_url} 
                        alt={`${team.name} logo`}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <CardTitle className="text-lg">{team.name}</CardTitle>
                      {team.lg_conf && (
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          Conference
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
                        <span className="text-sm font-medium">RP: {team.current_rp || 0}</span>
                      </div>
                      {team.global_rank && (
                        <Badge variant="outline" className="text-xs">
                          Rank #{team.global_rank}
                        </Badge>
                      )}
                    </div>

                    {/* ELO Rating */}
                    {team.elo_rating && (
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-sm">ELO: {Math.round(team.elo_rating)}</span>
                      </div>
                    )}

                    {/* Tier Badge */}
                    {team.leaderboard_tier && (
                      <div className="flex justify-end">
                        <Badge variant="secondary">
                          {team.leaderboard_tier} Tier
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
        <div className="mt-8 text-center text-sm text-muted-foreground">
            Showing {teams.length} teams
        </div>
      </div>
    </GraphQLWrapper>
  )
}
