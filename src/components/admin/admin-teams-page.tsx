"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Users,
  Loader2,
  RefreshCw
} from "lucide-react";
import { 
  useGetTeamsQuery,
  useGetPlayersQuery,
  useDeleteTeamMutation
} from "@/types/generated/graphql";
import { TeamForm } from "./forms/team-form";

export function AdminTeamsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRegion, setFilterRegion] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTeam, setEditingTeam] = useState<{
    id: string;
    name: string;
    description?: string | null;
    logoUrl?: string | null;
    region?: string | null;
    isActive: boolean;
  } | null>(null);

  const { data: teamsData, loading: teamsLoading, refetch: refetchTeams } = useGetTeamsQuery({
    variables: { limit: 100, offset: 0 },
    errorPolicy: 'all',
  });

  const { data: playersData, loading: playersLoading } = useGetPlayersQuery({
    variables: { limit: 200, offset: 0 },
    errorPolicy: 'all',
  });

  const [deleteTeam, { loading: deleteLoading }] = useDeleteTeamMutation();

  const teams = teamsData?.getTeams || [];
  const players = playersData?.getPlayers || [];
  const loading = teamsLoading || playersLoading || deleteLoading;

  // Filter teams based on search and filters
  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (team.description && team.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRegion = !filterRegion || team.region === filterRegion;
    const matchesStatus = !filterStatus || 
      (filterStatus === 'active' && team.isActive) || 
      (filterStatus === 'inactive' && !team.isActive);
    
    return matchesSearch && matchesRegion && matchesStatus;
  });

  // Get unique regions for filter
  const regions = [...new Set(teams.map(t => t.region).filter(Boolean))];

  // Calculate team statistics
  const teamsWithStats = filteredTeams.map(team => {
    const teamPlayers = players.filter(p => p.teamName === team.name);
    const averageRP = teamPlayers.length > 0 
      ? Math.round(teamPlayers.reduce((sum, p) => sum + (p.currentRp || 0), 0) / teamPlayers.length)
      : 0;
    return {
      ...team,
      playerCount: teamPlayers.length,
      averageRP,
      verifiedPlayers: teamPlayers.filter(p => p.isVerified).length
    };
  });

  const handleDeleteTeam = async (teamId: string) => {
    if (confirm('Are you sure you want to delete this team?')) {
      try {
        await deleteTeam({
          variables: { id: teamId }
        });
        refetchTeams();
      } catch (error) {
        console.error('Error deleting team:', error);
      }
    }
  };

  const handleFormSuccess = () => {
    setShowCreateForm(false);
    setEditingTeam(null);
    refetchTeams();
  };

  const handleFormCancel = () => {
    setShowCreateForm(false);
    setEditingTeam(null);
  };

  if (showCreateForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Create New Team</h2>
          <Button variant="outline" onClick={handleFormCancel}>
            Back to Teams
          </Button>
        </div>
        <TeamForm 
          mode="create" 
          onSuccess={handleFormSuccess} 
          onCancel={handleFormCancel} 
        />
      </div>
    );
  }

  if (editingTeam) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Edit Team</h2>
          <Button variant="outline" onClick={handleFormCancel}>
            Back to Teams
          </Button>
        </div>
        <TeamForm 
          team={editingTeam}
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
          <h2 className="text-2xl font-bold">Team Management</h2>
          <p className="text-muted-foreground">Manage all teams in the tournament</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => refetchTeams()} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={() => setShowCreateForm(true)}>
            <Users className="h-4 w-4 mr-2" />
            Add Team
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Teams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teams.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Teams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teams.filter(t => t.isActive).length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Players</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{players.filter(p => p.teamName).length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Team Size</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teams.length > 0 ? Math.round(players.filter(p => p.teamName).length / teams.length) : 0}
            </div>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search teams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterRegion} onValueChange={setFilterRegion}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Regions</SelectItem>
                {regions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Teams Table */}
      <Card>
        <CardHeader>
          <CardTitle>Teams ({filteredTeams.length})</CardTitle>
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
                    <TableHead>Team</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Players</TableHead>
                    <TableHead>Avg RP</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamsWithStats.map((team) => (
                    <TableRow key={team.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{team.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {team.description || 'No description'}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {team.region || (
                          <span className="text-muted-foreground">No region</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{team.playerCount}</div>
                          <div className="text-sm text-muted-foreground">
                            {team.verifiedPlayers} verified
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{team.averageRP}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={team.isActive ? "default" : "secondary"}>
                          {team.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingTeam(team)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteTeam(team.id)}
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