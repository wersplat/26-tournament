'use client'

import { useQuery } from '@apollo/client'
import { GET_PLAYERS } from '@/lib/graphql/queries'
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
  Search
} from 'lucide-react'
import { useState } from 'react'
import { players } from '@/types/graphql'

interface GetPlayersData {
  playersCollection: {
    edges: Array<{
      node: players
    }>
  }
}

export default function PlayersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  
  const { loading, error, data } = useQuery<GetPlayersData>(GET_PLAYERS, {
    errorPolicy: 'all',
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading players...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <AlertCircle className="h-8 w-8 text-red-600" />
          <p className="text-gray-600">Error loading players</p>
          <p className="text-sm text-gray-500">{error.message}</p>
        </div>
      </div>
    )
  }

  const playersList = data?.playersCollection?.edges?.map(edge => edge.node) || []

  if (!playersList.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <AlertCircle className="h-8 w-8 text-yellow-600" />
          <p className="text-gray-600">No players found</p>
        </div>
      </div>
    )
  }

  // Filter players based on search term
  const filteredPlayers = playersList.filter(player =>
    player.gamertag.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.teams?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <Users className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Players</h1>
        </div>
        <p className="text-gray-600">Browse all players and their statistics</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search players or teams..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Players Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPlayers.map((player) => (
          <Link key={player.id} href={`/players/${player.id}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={`/images/players/${player.id}.jpg`} alt={player.gamertag} />
                    <AvatarFallback className="text-sm font-bold">
                      {player.gamertag.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg truncate">{player.gamertag}</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {player.teams?.name || 'No Team'}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Target className="h-3 w-3 text-red-500" />
                      <span className="text-xs text-gray-500">RP</span>
                    </div>
                    <div className="text-sm font-bold">{player.player_rp?.toFixed(0) || '0'}</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Trophy className="h-3 w-3 text-yellow-500" />
                      <span className="text-xs text-gray-500">Peak</span>
                    </div>
                    <div className="text-sm font-bold">{player.player_rank_score?.toFixed(0) || '0'}</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      <span className="text-xs text-gray-500">Pos</span>
                    </div>
                    <div className="text-sm font-bold">{player.position || 'N/A'}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* No Results */}
      {filteredPlayers.length === 0 && searchTerm && (
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No players found matching "{searchTerm}"</p>
          <button
            onClick={() => setSearchTerm('')}
            className="mt-2 text-blue-600 hover:text-blue-700"
          >
            Clear search
          </button>
        </div>
      )}

      {/* Stats Summary */}
      <div className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle>League Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{playersList.length}</div>
                <div className="text-sm text-gray-600">Total Players</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {playersList.length > 0 
                    ? (playersList.reduce((sum, p) => sum + (p.player_rp || 0), 0) / playersList.length).toFixed(0)
                    : '0'
                  }
                </div>
                <div className="text-sm text-gray-600">Average RP</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {new Set(playersList.map(p => p.teams?.id).filter(Boolean)).size}
                </div>
                <div className="text-sm text-gray-600">Teams</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
