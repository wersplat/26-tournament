'use client'

import { useGetTeamsQuery, useGetPlayersQuery } from '@/types/generated/graphql'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Users, 
  Target, 
  Trophy, 
  TrendingUp,
  Loader2,
  AlertCircle,
  UserCheck
} from 'lucide-react'

export default function TeamsPage() {
  const { loading: teamsLoading, error: teamsError, data: teamsData } = useGetTeamsQuery({
    errorPolicy: 'all',
  })
  
  const { loading: playersLoading, error: playersError, data: playersData } = useGetPlayersQuery({
    errorPolicy: 'all',
  })

  const loading = teamsLoading || playersLoading
  const error = teamsError || playersError

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading teams...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <AlertCircle className="h-8 w-8 text-red-600" />
          <p className="text-gray-600">Error loading teams</p>
          <p className="text-sm text-gray-500">{error.message}</p>
        </div>
      </div>
    )
  }

  const teams = teamsData?.getTeams || []
  const players = playersData?.getPlayers || []

  if (!teams.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <AlertCircle className="h-8 w-8 text-yellow-600" />
          <p className="text-gray-600">No teams found</p>
        </div>
      </div>
    )
  }

  // Group players by team
  const playersByTeam = players.reduce((acc, player) => {
    if (player.teamName) {
      if (!acc[player.teamName]) {
        acc[player.teamName] = []
      }
      acc[player.teamName].push(player)
    }
    return acc
  }, {} as Record<string, any[]>)

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <Users className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Teams</h1>
        </div>
        <p className="text-gray-600">View all teams and their roster</p>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {teams.map((team) => {
          const teamPlayers = playersByTeam[team.name] || []
          return (
            <Card key={team.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                                                <AvatarImage src={team.logoUrl || `/teams/${team.id}.svg`} alt={team.name} />
                      <AvatarFallback className="text-lg font-bold">
                        {team.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-xl">{team.name}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <UserCheck className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {teamPlayers.length} player{teamPlayers.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {teamPlayers.length > 0 ? (
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900 mb-3">Roster</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {teamPlayers.map((player) => (
                        <Link key={player.id} href={`/players/${player.id}`}>
                          <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={`/images/players/${player.id}.jpg`} alt={player.gamertag} />
                              <AvatarFallback className="text-xs font-bold">
                                {player.gamertag.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{player.gamertag}</p>
                              <div className="flex items-center space-x-3 text-xs text-gray-500">
                                <span className="flex items-center space-x-1">
                                  <Target className="h-3 w-3 text-red-500" />
                                  <span>{player.currentRp?.toFixed(0) || '0'}</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <Trophy className="h-3 w-3 text-yellow-500" />
                                  <span>{player.peakRp?.toFixed(0) || '0'}</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <TrendingUp className="h-3 w-3 text-green-500" />
                                  <span>{player.position || 'N/A'}</span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Users className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">No players on roster</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* League Summary */}
      <div className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle>League Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{teams.length}</div>
                <div className="text-sm text-gray-600">Total Teams</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {players.length}
                </div>
                <div className="text-sm text-gray-600">Total Players</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {teams.length > 0 
                    ? (players.length / teams.length).toFixed(1)
                    : '0.0'
                  }
                </div>
                <div className="text-sm text-gray-600">Avg Players/Team</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {teams.filter(team => (playersByTeam[team.name] || []).length > 0).length}
                </div>
                <div className="text-sm text-gray-600">Active Teams</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
