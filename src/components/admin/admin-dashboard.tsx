"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { usePlayers, useTeams, useMatches, handleGraphQLError } from "@/hooks/useGraphQL";
import { Loader2, AlertCircle, RefreshCw } from "lucide-react";

export function AdminDashboard() {
  const { 
    players, 
    loading: playersLoading, 
    error: playersError, 
    refetch: refetchPlayers 
  } = usePlayers();

  const { 
    teams, 
    loading: teamsLoading, 
    error: teamsError, 
    refetch: refetchTeams 
  } = useTeams();

  const { 
    matches, 
    loading: matchesLoading, 
    error: matchesError, 
    refetch: refetchMatches 
  } = useMatches();

  const loading = playersLoading || teamsLoading || matchesLoading;
  const error = playersError || teamsError || matchesError;
  const errorMessage = handleGraphQLError(error);

  // Calculate stats
  const stats = {
    totalPlayers: players.length,
    totalTeams: teams.length,
    totalEvents: 0, // Not available in current GraphQL schema
    totalMatches: matches.length,
    activeEvents: 0, // Not available in current GraphQL schema
    upcomingEvents: 0 // Not available in current GraphQL schema
  };

  // Get recent items (first 5)
  const recentPlayers = players.slice(0, 5);
  const recentTeams = teams.slice(0, 5);
  const recentMatches = matches.slice(0, 5);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin" />
          <div className="text-lg">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center space-y-4">
          <AlertCircle className="h-8 w-8 text-red-600" />
          <div className="text-lg text-red-600">{errorMessage}</div>
          <div className="flex space-x-4">
            <Button onClick={() => refetchPlayers()} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry Players
            </Button>
            <Button onClick={() => refetchTeams()} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry Teams
            </Button>
            <Button onClick={() => refetchMatches()} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry Matches
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Players</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPlayers}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Teams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTeams}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Matches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMatches}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Players</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{players.filter((p: any) => p.stats.ppg > 0).length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Tabs defaultValue="players" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="players">Recent Players</TabsTrigger>
          <TabsTrigger value="teams">Recent Teams</TabsTrigger>
          <TabsTrigger value="matches">Recent Matches</TabsTrigger>
        </TabsList>
        
        <TabsContent value="players" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Players</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {recentPlayers.map((player: any) => (
                  <div key={player.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <div className="font-medium">{player.gamertag}</div>
                      <div className="text-sm text-muted-foreground">
                        Team: {player.team.name} | PPG: {player.stats.ppg.toFixed(1)} | RPG: {player.stats.rpg.toFixed(1)}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="teams" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Teams</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {recentTeams.map((team: any) => (
                  <div key={team.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <div className="font-medium">{team.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Players: {team.players.length} | Avg PPG: {
                          team.players.length > 0 
                            ? (team.players.reduce((sum: number, p: any) => sum + p.stats.ppg, 0) / team.players.length).toFixed(1)
                            : '0.0'
                        }
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="matches" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Matches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {recentMatches.map((match: any) => (
                  <div key={match.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <div className="font-medium">
                        {match.homeTeam.name} vs {match.awayTeam.name}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <Badge variant={match.status === 'completed' ? 'default' : 'secondary'}>
                          {match.status}
                        </Badge>
                        {match.status === 'completed' && match.homeScore !== null && match.awayScore !== null && (
                          <span>{match.homeScore} - {match.awayScore}</span>
                        )}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="w-full">
              Add New Player
            </Button>
            <Button className="w-full">
              Create New Team
            </Button>
            <Button className="w-full">
              Schedule Match
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
