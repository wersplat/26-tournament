'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Trophy, Users, User, MapPin } from 'lucide-react'
import { usePublicPlayers, usePublicTeams } from '@/hooks/useAdminSupabase'
import { GraphQLWrapper } from '@/components/graphql-wrapper'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Force dynamic rendering to prevent SSR issues
export const dynamic = 'force-dynamic';

export default function RankingsPage() {
  const { 
    players, 
    loading: playersLoading, 
    error: playersError, 
    refetch: refetchPlayers 
  } = usePublicPlayers();

  const { 
    teams, 
    loading: teamsLoading, 
    error: teamsError, 
    refetch: refetchTeams 
  } = usePublicTeams();

  // Sort players by RP
  const sortedPlayers = players 
    ? [...players].sort((a: any, b: any) => (b.player_rp || 0) - (a.player_rp || 0))
    : [];

  // Sort teams by RP
  const sortedTeams = teams 
    ? [...teams].sort((a: any, b: any) => (b.current_rp || 0) - (a.current_rp || 0))
    : [];

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

  const loading = playersLoading || teamsLoading;
  const error = playersError || teamsError;
  const refetch = () => {
    refetchPlayers();
    refetchTeams();
  };

  return (
    <GraphQLWrapper loading={loading} error={error} onRetry={refetch}>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <TrendingUp className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Rankings</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">View player and team rankings for the 2K26 Tournament Series</p>
        </div>

        <Tabs defaultValue="players" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="players" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Player Rankings
            </TabsTrigger>
            <TabsTrigger value="teams" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Team Rankings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="players" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Players by Ranking Points</CardTitle>
              </CardHeader>
              <CardContent>
                {sortedPlayers.length > 0 ? (
                  <div className="space-y-4">
                    {sortedPlayers.map((player: any, index: number) => (
                      <div 
                        key={player.id} 
                        className="flex items-center justify-between p-4 rounded-lg border hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center space-x-4">
                          {/* Rank */}
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800">
                            <span className="text-sm font-bold">#{index + 1}</span>
                          </div>
                          
                          {/* Player Avatar & Info */}
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                              <User className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{player.gamertag}</h3>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                {player.team && <span>{player.team.name}</span>}
                                {player.region && (
                                  <span className="flex items-center">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    {player.region.name}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center space-x-6">
                          {/* Ranking Points */}
                          <div className="text-center">
                            <div className="flex items-center space-x-1">
                              <Trophy className="h-4 w-4 text-yellow-500" />
                              <span className="font-semibold">{player.player_rp || 0}</span>
                            </div>
                            <div className="text-xs text-muted-foreground">RP</div>
                          </div>

                          {/* Performance Score */}
                          {player.performance_score && (
                            <div className="text-center">
                              <div className="flex items-center space-x-1">
                                <TrendingUp className="h-4 w-4 text-green-500" />
                                <span className="font-semibold">{Math.round(player.performance_score)}</span>
                              </div>
                              <div className="text-xs text-muted-foreground">PS</div>
                            </div>
                          )}

                          {/* Position */}
                          {player.position && (
                            <Badge variant="outline" className="text-xs">
                              {player.position.replace('_', ' ')}
                            </Badge>
                          )}

                          {/* Tier */}
                          {player.salary_tier && (
                            <Badge className={`text-xs ${getTierColor(player.salary_tier)}`}>
                              {player.salary_tier} Tier
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No player rankings available</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="teams" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Teams by Ranking Points</CardTitle>
              </CardHeader>
              <CardContent>
                {sortedTeams.length > 0 ? (
                  <div className="space-y-4">
                    {sortedTeams.map((team: any, index: number) => (
                      <div 
                        key={team.id} 
                        className="flex items-center justify-between p-4 rounded-lg border hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center space-x-4">
                          {/* Rank */}
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800">
                            <span className="text-sm font-bold">#{index + 1}</span>
                          </div>
                          
                          {/* Team Logo & Name */}
                          <div className="flex items-center space-x-3">
                            {team.logo_url ? (
                              <img 
                                src={team.logo_url} 
                                alt={`${team.name} logo`}
                                className="w-10 h-10 rounded-lg object-cover"
                              />
                            ) : (
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <Users className="w-5 h-5 text-white" />
                              </div>
                            )}
                            <div>
                              <h3 className="font-semibold">{team.name}</h3>
                              {team.region && (
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {team.region.name}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center space-x-6">
                          {/* Ranking Points */}
                          <div className="text-center">
                            <div className="flex items-center space-x-1">
                              <Trophy className="h-4 w-4 text-yellow-500" />
                              <span className="font-semibold">{team.current_rp || 0}</span>
                            </div>
                            <div className="text-xs text-muted-foreground">RP</div>
                          </div>

                          {/* ELO Rating */}
                          {team.elo_rating && (
                            <div className="text-center">
                              <div className="flex items-center space-x-1">
                                <TrendingUp className="h-4 w-4 text-green-500" />
                                <span className="font-semibold">{Math.round(team.elo_rating)}</span>
                              </div>
                              <div className="text-xs text-muted-foreground">ELO</div>
                            </div>
                          )}

                          {/* Global Rank */}
                          {team.global_rank && (
                            <Badge variant="outline" className="text-xs">
                              Global #{team.global_rank}
                            </Badge>
                          )}

                          {/* Tier */}
                          {team.leaderboard_tier && (
                            <Badge variant="secondary" className="text-xs">
                              {team.leaderboard_tier} Tier
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No team rankings available</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Pagination Info */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <div className="flex justify-center gap-8">
            {/* Pagination is simplified for now */}
            <span>Players: {sortedPlayers.length}</span>
            <span>Teams: {sortedTeams.length}</span>
          </div>
        </div>
      </div>
    </GraphQLWrapper>
  )
}
