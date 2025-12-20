"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, TrendingUp, MapPin } from "lucide-react";
import { usePublicTeams } from '@/hooks/useAdminSupabase'
import { Loader2, AlertCircle } from 'lucide-react'

// Force dynamic rendering to prevent SSR issues
export const dynamic = 'force-dynamic';

export default function StandingsPage() {
  const { teams, loading, error, refetch } = usePublicTeams();

  // Sort teams by ranking points (descending)
  const sortedTeams = [...teams].sort((a: any, b: any) => (b.current_rp || 0) - (a.current_rp || 0));

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
    )
  }

  if (error) {
    return (
        <div className="min-h-screen flex items-center justify-center text-red-600">
            <AlertCircle className="h-8 w-8 mr-2" />
            <p>Error loading standings</p>
        </div>
    )
  }

  return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Trophy className="h-8 w-8 text-yellow-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Standings</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">View current tournament standings and team rankings</p>
        </div>

        {/* Standings Table */}
        <Card>
          <CardHeader>
            <CardTitle>Team Rankings</CardTitle>
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
                        {team.logo_url && (
                          <img 
                            src={team.logo_url} 
                            alt={`${team.name} logo`}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                        )}
                        <div>
                          <h3 className="font-semibold">{team.name}</h3>
                          {team.lg_conf && (
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3 mr-1" />
                              Conference
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
                <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No standings data available</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pagination Info */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            Showing {sortedTeams.length} teams
          </div>
      </div>
  );
}
