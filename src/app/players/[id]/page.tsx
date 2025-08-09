'use client'

import { useQuery } from '@apollo/client'
import { GET_PLAYER } from '@/lib/graphql/queries'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Trophy, 
  Target, 
  TrendingUp, 
  Users, 
  Calendar,
  Loader2,
  AlertCircle
} from 'lucide-react'

interface PlayerStats {
  ppg: number
  rpg: number
  apg: number
  spg: number
  bpg: number
  fgPercentage: number
  threePointPercentage: number
  ftPercentage: number
}

interface Team {
  id: string
  name: string
}

interface Player {
  id: string
  gamertag: string
  team: Team
  stats: PlayerStats
  createdAt: string
  updatedAt: string
}

interface GetPlayerData {
  player: Player
}

export default function PlayerProfilePage() {
  const params = useParams()
  const playerId = params.id as string

  const { loading, error, data } = useQuery<GetPlayerData>(GET_PLAYER, {
    variables: { id: playerId },
    errorPolicy: 'all',
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading player profile...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <AlertCircle className="h-8 w-8 text-red-600" />
          <p className="text-gray-600">Error loading player profile</p>
          <p className="text-sm text-gray-500">{error.message}</p>
        </div>
      </div>
    )
  }

  if (!data?.player) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <AlertCircle className="h-8 w-8 text-yellow-600" />
          <p className="text-gray-600">Player not found</p>
        </div>
      </div>
    )
  }

  const { player } = data
  const { stats, team } = player

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={`/images/players/${player.id}.jpg`} alt={player.gamertag} />
            <AvatarFallback className="text-lg font-bold">
              {player.gamertag.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{player.gamertag}</h1>
            <div className="flex items-center space-x-2 mt-1">
              <Users className="h-4 w-4 text-gray-500" />
              <Badge variant="secondary">{team.name}</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Points Per Game</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.ppg.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">PPG</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rebounds Per Game</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.rpg.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">RPG</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assists Per Game</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.apg.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">APG</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Steals Per Game</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.spg.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">SPG</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Shooting Percentages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Field Goal %</span>
              <span className="text-sm font-bold">{(stats.fgPercentage * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">3-Point %</span>
              <span className="text-sm font-bold">{(stats.threePointPercentage * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Free Throw %</span>
              <span className="text-sm font-bold">{(stats.ftPercentage * 100).toFixed(1)}%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Additional Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Blocks Per Game</span>
              <span className="text-sm font-bold">{stats.bpg.toFixed(1)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Member Since</span>
              <span className="text-sm font-bold">
                {new Date(player.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Last Updated</span>
              <span className="text-sm font-bold">
                {new Date(player.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex justify-center">
        <div className="flex space-x-4">
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            Back
          </button>
          <button
            onClick={() => window.location.href = '/players'}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            View All Players
          </button>
        </div>
      </div>
    </div>
  )
}
