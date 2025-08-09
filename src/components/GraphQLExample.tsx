'use client'

import { usePlayers, useTeams, handleGraphQLError } from '@/hooks/useGraphQL'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  Target, 
  Trophy, 
  TrendingUp,
  Loader2,
  AlertCircle,
  RefreshCw
} from 'lucide-react'

export function GraphQLExample() {
  const { 
    players, 
    loading: playersLoading, 
    error: playersError, 
    refetch: refetchPlayers,
    isAuthenticated: playersAuthenticated 
  } = usePlayers()

  const { 
    teams, 
    loading: teamsLoading, 
    error: teamsError, 
    refetch: refetchTeams,
    isAuthenticated: teamsAuthenticated 
  } = useTeams()

  const playersErrorMessage = handleGraphQLError(playersError)
  const teamsErrorMessage = handleGraphQLError(teamsError)

  if (!playersAuthenticated || !teamsAuthenticated) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            <span>Authentication Required</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Please log in to view GraphQL data from the API.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Players Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span>Players Data</span>
              {playersLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            </CardTitle>
            <button
              onClick={() => refetchPlayers()}
              className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700"
              disabled={playersLoading}
            >
              <RefreshCw className={`h-4 w-4 ${playersLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </CardHeader>
        <CardContent>
          {playersError ? (
            <div className="flex items-center space-x-2 text-red-600">
              <AlertCircle className="h-4 w-4" />
              <span>{playersErrorMessage}</span>
            </div>
          ) : playersLoading ? (
            <div className="flex items-center space-x-2 text-gray-600">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Loading players...</span>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                Found {players.length} player{players.length !== 1 ? 's' : ''}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {players.slice(0, 6).map((player) => (
                  <div key={player.id} className="p-3 border rounded-lg">
                    <div className="font-medium">{player.gamertag}</div>
                    <div className="text-sm text-gray-600">{player.team.name}</div>
                    <div className="flex space-x-3 mt-2 text-xs">
                      <span className="flex items-center space-x-1">
                        <Target className="h-3 w-3 text-red-500" />
                        <span>{player.stats.ppg.toFixed(1)} PPG</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Trophy className="h-3 w-3 text-yellow-500" />
                        <span>{player.stats.rpg.toFixed(1)} RPG</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <TrendingUp className="h-3 w-3 text-green-500" />
                        <span>{player.stats.apg.toFixed(1)} APG</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              {players.length > 6 && (
                <p className="text-sm text-gray-500">
                  Showing first 6 players. Navigate to /players to see all.
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Teams Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-green-600" />
              <span>Teams Data</span>
              {teamsLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            </CardTitle>
            <button
              onClick={() => refetchTeams()}
              className="flex items-center space-x-1 text-sm text-green-600 hover:text-green-700"
              disabled={teamsLoading}
            >
              <RefreshCw className={`h-4 w-4 ${teamsLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </CardHeader>
        <CardContent>
          {teamsError ? (
            <div className="flex items-center space-x-2 text-red-600">
              <AlertCircle className="h-4 w-4" />
              <span>{teamsErrorMessage}</span>
            </div>
          ) : teamsLoading ? (
            <div className="flex items-center space-x-2 text-gray-600">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Loading teams...</span>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                Found {teams.length} team{teams.length !== 1 ? 's' : ''}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {teams.map((team) => (
                  <div key={team.id} className="p-3 border rounded-lg">
                    <div className="font-medium">{team.name}</div>
                    <div className="text-sm text-gray-600">
                      {team.players.length} player{team.players.length !== 1 ? 's' : ''}
                    </div>
                    {team.players.length > 0 && (
                      <div className="mt-2">
                        <div className="text-xs text-gray-500 mb-1">Top Players:</div>
                        <div className="space-y-1">
                          {team.players.slice(0, 3).map((player) => (
                            <div key={player.id} className="text-xs">
                              {player.gamertag} - {player.stats.ppg.toFixed(1)} PPG
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* API Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="h-3 w-3 bg-green-500 rounded-full"></div>
            <span>GraphQL API Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Endpoint:</span>
              <code className="text-blue-600">https://graphql.bodegacatsgc.gg</code>
            </div>
            <div className="flex justify-between">
              <span>Authentication:</span>
              <Badge variant="secondary">JWT Token</Badge>
            </div>
            <div className="flex justify-between">
              <span>Status:</span>
              <Badge variant="outline" className="text-green-600 border-green-600">
                Connected
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
