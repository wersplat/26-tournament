"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Plus, Minus, Users, Search, Filter } from "lucide-react";
import { 
  useGetTeamsQuery,
  useGetPlayersQuery,
  useUpdatePlayerMutation,
  PlayerTier,
  PlayerPosition
} from "@/types/generated/graphql";

interface TeamRosterManagerProps {
  onSuccess?: () => void;
}

export function TeamRosterManager({ onSuccess }: TeamRosterManagerProps) {
  const [selectedTeam, setSelectedTeam] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTier, setFilterTier] = useState<string>('');
  const [filterPosition, setFilterPosition] = useState<string>('');

  const { data: teamsData, loading: teamsLoading } = useGetTeamsQuery({
    variables: { limit: 100, offset: 0 },
    errorPolicy: 'all',
  });

  const { data: playersData, loading: playersLoading } = useGetPlayersQuery({
    variables: { limit: 200, offset: 0 },
    errorPolicy: 'all',
  });

  const [updatePlayer, { loading: updateLoading }] = useUpdatePlayerMutation();

  const teams = teamsData?.getTeams || [];
  const players = playersData?.getPlayers || [];
  const loading = teamsLoading || playersLoading || updateLoading;

  // Filter players based on search and filters
  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.gamertag.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (player.region && player.region.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTier = !filterTier || player.tier === filterTier;
    const matchesPosition = !filterPosition || player.position === filterPosition;
    
    return matchesSearch && matchesTier && matchesPosition;
  });

  // Get players for selected team
  const teamPlayers = players.filter(player => player.teamName === selectedTeam);
  
  // Get available players (not on any team or on selected team)
  const availablePlayers = filteredPlayers.filter(player => 
    !player.teamName || player.teamName === selectedTeam
  );

  const handleAddPlayerToTeam = async (playerId: string, teamName: string) => {
    try {
      await updatePlayer({
        variables: {
          id: playerId,
          input: {
            teamName: teamName
          }
        }
      });
      onSuccess?.();
    } catch (error) {
      console.error('Error adding player to team:', error);
    }
  };

  const handleRemovePlayerFromTeam = async (playerId: string) => {
    try {
      await updatePlayer({
        variables: {
          id: playerId,
          input: {
            teamName: '' // Remove from team
          }
        }
      });
      onSuccess?.();
    } catch (error) {
      console.error('Error removing player from team:', error);
    }
  };

  const getTierColor = (tier: PlayerTier | null | undefined) => {
    switch (tier) {
      case 'bronze': return 'bg-orange-100 text-orange-800';
      case 'silver': return 'bg-gray-100 text-gray-800';
      case 'gold': return 'bg-yellow-100 text-yellow-800';
      case 'platinum': return 'bg-blue-100 text-blue-800';
      case 'diamond': return 'bg-purple-100 text-purple-800';
      case 'pink_diamond': return 'bg-pink-100 text-pink-800';
      case 'galaxy_opal': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getPositionColor = (position: PlayerPosition | null | undefined) => {
    switch (position) {
      case 'Point_Guard': return 'bg-blue-100 text-blue-800';
      case 'Shooting_Guard': return 'bg-green-100 text-green-800';
      case 'Power_Forward': return 'bg-red-100 text-red-800';
      case 'Center': return 'bg-purple-100 text-purple-800';
      case 'Lock': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Users className="h-5 w-5" />
            Team Roster Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Team Selection */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="team" className="text-sm">Select Team</Label>
              <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a team to manage" />
                </SelectTrigger>
                <SelectContent>
                  {teams.map((team) => (
                    <SelectItem key={team.id} value={team.name}>
                      {team.name} ({players.filter(p => p.teamName === team.name).length} players)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedTeam && (
              <div className="p-3 sm:p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2 text-sm sm:text-base">Team: {selectedTeam}</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs sm:text-sm">
                  <div>
                    <span className="text-muted-foreground">Total Players:</span>
                    <Badge variant="outline" className="ml-1 text-xs">{teamPlayers.length}</Badge>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Average RP:</span>
                    <Badge variant="outline" className="ml-1 text-xs">
                      {teamPlayers.length > 0 
                        ? Math.round(teamPlayers.reduce((sum, p) => sum + (p.currentRp || 0), 0) / teamPlayers.length)
                        : 0
                      }
                    </Badge>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Verified:</span>
                    <Badge variant="outline" className="ml-1 text-xs">
                      {teamPlayers.filter(p => p.isVerified).length}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Active:</span>
                    <Badge variant="outline" className="ml-1 text-xs">
                      {teamPlayers.filter(p => p.tier && ['gold', 'platinum', 'diamond', 'pink_diamond', 'galaxy_opal'].includes(p.tier)).length}
                    </Badge>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {selectedTeam && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
          {/* Current Team Players */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Users className="h-4 w-4" />
                Current Team Players ({teamPlayers.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {teamPlayers.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No players on this team yet
                </div>
              ) : (
                <div className="space-y-3">
                  {teamPlayers.map((player) => (
                    <div key={player.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 border rounded-lg space-y-2 sm:space-y-0">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <div className="font-medium text-sm sm:text-base">{player.gamertag}</div>
                          {player.isVerified && (
                            <Badge variant="default" className="text-xs">Verified</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          {player.position && (
                            <Badge className={`text-xs ${getPositionColor(player.position)}`}>
                              {player.position.replace('_', ' ')}
                            </Badge>
                          )}
                          {player.tier && (
                            <Badge className={`text-xs ${getTierColor(player.tier)}`}>
                              {player.tier}
                            </Badge>
                          )}
                          <span className="text-xs sm:text-sm text-muted-foreground">
                            {player.currentRp || 0} RP
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemovePlayerFromTeam(player.id)}
                        disabled={loading}
                        className="w-full sm:w-auto"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Available Players */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Users className="h-4 w-4" />
                Available Players
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Search and Filters */}
              <div className="space-y-3 mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search players..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Select value={filterTier} onValueChange={setFilterTier}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by tier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Tiers</SelectItem>
                      <SelectItem value="bronze">Bronze</SelectItem>
                      <SelectItem value="silver">Silver</SelectItem>
                      <SelectItem value="gold">Gold</SelectItem>
                      <SelectItem value="platinum">Platinum</SelectItem>
                      <SelectItem value="diamond">Diamond</SelectItem>
                      <SelectItem value="pink_diamond">Pink Diamond</SelectItem>
                      <SelectItem value="galaxy_opal">Galaxy Opal</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterPosition} onValueChange={setFilterPosition}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Positions</SelectItem>
                      <SelectItem value="Point_Guard">Point Guard</SelectItem>
                      <SelectItem value="Shooting_Guard">Shooting Guard</SelectItem>
                      <SelectItem value="Power_Forward">Power Forward</SelectItem>
                      <SelectItem value="Center">Center</SelectItem>
                      <SelectItem value="Lock">Lock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Available Players List */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {availablePlayers.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    No available players found
                  </div>
                ) : (
                  availablePlayers.map((player) => (
                    <div key={player.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 border rounded-lg space-y-2 sm:space-y-0">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <div className="font-medium text-sm sm:text-base">{player.gamertag}</div>
                          {player.isVerified && (
                            <Badge variant="default" className="text-xs">Verified</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          {player.position && (
                            <Badge className={`text-xs ${getPositionColor(player.position)}`}>
                              {player.position.replace('_', ' ')}
                            </Badge>
                          )}
                          {player.tier && (
                            <Badge className={`text-xs ${getTierColor(player.tier)}`}>
                              {player.tier}
                            </Badge>
                          )}
                          <span className="text-xs sm:text-sm text-muted-foreground">
                            {player.currentRp || 0} RP
                          </span>
                          {player.teamName && player.teamName !== selectedTeam && (
                            <Badge variant="secondary" className="text-xs">
                              {player.teamName}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddPlayerToTeam(player.id, selectedTeam)}
                        disabled={loading}
                        className="w-full sm:w-auto"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
