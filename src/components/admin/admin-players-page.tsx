"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  UserPlus,
  Loader2,
  RefreshCw
} from "lucide-react";
import { 
  useGetPlayersQuery,
  useDeletePlayerMutation,
  PlayerTier,
  PlayerPosition
} from "@/types/generated/graphql";
import { PlayerForm } from "./forms/player-form";

export function AdminPlayersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTier, setFilterTier] = useState<string>('');
  const [filterPosition, setFilterPosition] = useState<string>('');
  const [filterTeam, setFilterTeam] = useState<string>('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<{
    id: string;
    gamertag: string;
    region?: string | null;
    position?: string | null;
    salaryTier?: string | null;
    teamName?: string | null;
    isVerified?: boolean | null;
    currentRp?: number | null;
    peakRp?: number | null;
    tier?: string | null;
  } | null>(null);

  const { data: playersData, loading: playersLoading, refetch: refetchPlayers } = useGetPlayersQuery({
    variables: { limit: 200, offset: 0 },
    errorPolicy: 'all',
  });

  const [deletePlayer, { loading: deleteLoading }] = useDeletePlayerMutation();

  const players = playersData?.getPlayers || [];
  const loading = playersLoading || deleteLoading;

  // Filter players based on search and filters
  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.gamertag.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (player.region && player.region.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTier = !filterTier || player.tier === filterTier;
    const matchesPosition = !filterPosition || player.position === filterPosition;
    const matchesTeam = !filterTeam || player.teamName === filterTeam;
    
    return matchesSearch && matchesTier && matchesPosition && matchesTeam;
  });

  // Get unique teams for filter
  const teams = [...new Set(players.map(p => p.teamName).filter(Boolean))];

  const handleDeletePlayer = async (playerId: string) => {
    if (confirm('Are you sure you want to delete this player?')) {
      try {
        await deletePlayer({
          variables: { id: playerId }
        });
        refetchPlayers();
      } catch (error) {
        console.error('Error deleting player:', error);
      }
    }
  };

  const handleFormSuccess = () => {
    setShowCreateForm(false);
    setEditingPlayer(null);
    refetchPlayers();
  };

  const handleFormCancel = () => {
    setShowCreateForm(false);
    setEditingPlayer(null);
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

  if (showCreateForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Create New Player</h2>
          <Button variant="outline" onClick={handleFormCancel}>
            Back to Players
          </Button>
        </div>
        <PlayerForm 
          mode="create" 
          onSuccess={handleFormSuccess} 
          onCancel={handleFormCancel} 
        />
      </div>
    );
  }

  if (editingPlayer) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Edit Player</h2>
          <Button variant="outline" onClick={handleFormCancel}>
            Back to Players
          </Button>
        </div>
        <PlayerForm 
          player={editingPlayer}
          mode="edit" 
          onSuccess={handleFormSuccess} 
          onCancel={handleFormCancel} 
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Player Management</h2>
          <p className="text-muted-foreground">Manage all players in the tournament</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => refetchPlayers()} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={() => setShowCreateForm(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Player
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Players</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{players.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified Players</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{players.filter(p => p.isVerified).length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average RP</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {players.length > 0 ? Math.round(players.reduce((sum, p) => sum + (p.currentRp || 0), 0) / players.length) : 0}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Teams Represented</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teams.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search players..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
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
            
            <Select value={filterTeam} onValueChange={setFilterTeam}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Teams</SelectItem>
                <SelectItem value="">No Team</SelectItem>
                {teams.map((team) => (
                  <SelectItem key={team} value={team}>
                    {team}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Players Table */}
      <Card>
        <CardHeader>
          <CardTitle>Players ({filteredPlayers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Player</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead>RP</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPlayers.map((player) => (
                    <TableRow key={player.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{player.gamertag}</div>
                          <div className="text-sm text-muted-foreground">
                            {player.region || 'No region'}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {player.teamName || (
                          <span className="text-muted-foreground">No team</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {player.position ? (
                          <Badge className={getPositionColor(player.position)}>
                            {player.position.replace('_', ' ')}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {player.tier ? (
                          <Badge className={getTierColor(player.tier)}>
                            {player.tier.replace('_', ' ')}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">Unranked</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{player.currentRp || 0}</div>
                          <div className="text-sm text-muted-foreground">
                            Peak: {player.peakRp || 0}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={player.isVerified ? "default" : "secondary"}>
                          {player.isVerified ? "Verified" : "Unverified"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingPlayer(player)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeletePlayer(player.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 