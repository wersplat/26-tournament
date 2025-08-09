"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useGetPlayersQuery, useGetTeamsQuery, useGetMatchesQuery, useGetEventsQuery } from "@/types/generated/graphql";
import { Loader2, AlertCircle, RefreshCw } from "lucide-react";

export function AdminDashboard() {
  const { 
    data: playersData, 
    loading: playersLoading, 
    error: playersError, 
    refetch: refetchPlayers 
  } = useGetPlayersQuery({
    variables: { limit: 100, offset: 0 },
    errorPolicy: 'all',
  });

  const { 
    data: teamsData, 
    loading: teamsLoading, 
    error: teamsError, 
    refetch: refetchTeams 
  } = useGetTeamsQuery({
    variables: { limit: 50, offset: 0 },
    errorPolicy: 'all',
  });

  const { 
    data: matchesData, 
    loading: matchesLoading, 
    error: matchesError, 
    refetch: refetchMatches 
  } = useGetMatchesQuery({
    variables: { limit: 50, offset: 0 },
    errorPolicy: 'all',
  });

  const { 
    data: eventsData, 
    loading: eventsLoading, 
    error: eventsError, 
    refetch: refetchEvents 
  } = useGetEventsQuery({
    variables: { limit: 50, offset: 0 },
    errorPolicy: 'all',
  });

  const loading = playersLoading || teamsLoading || matchesLoading || eventsLoading;
  const error = playersError || teamsError || matchesError || eventsError;

  // Extract data
  const players = playersData?.getPlayers || [];
  const teams = teamsData?.getTeams || [];
  const matches = matchesData?.getMatches || [];
  const events = eventsData?.getEvents || [];

  // Calculate stats
  const stats = {
    totalPlayers: players.length,
    totalTeams: teams.length,
    totalEvents: events.length,
    totalMatches: matches.length,
    activeEvents: events.filter(e => e.status === 'in_progress').length,
    upcomingEvents: events.filter(e => e.status === 'open').length,
    completedMatches: matches.filter(m => m.status === 'completed').length
  };

  // Get recent items (first 5)
  const recentPlayers = players.slice(0, 5);
  const recentTeams = teams.slice(0, 5);
  const recentMatches = matches.slice(0, 5);
  const recentEvents = events.slice(0, 5);

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
          <div className="text-lg text-red-600">{error.message}</div>
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
            <Button onClick={() => refetchEvents()} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry Events
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
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEvents}</div>
            <div className="text-xs text-muted-foreground">
              {stats.activeEvents} active, {stats.upcomingEvents} upcoming
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Matches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMatches}</div>
            <div className="text-xs text-muted-foreground">
              {stats.completedMatches} completed
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Views */}
      <Tabs defaultValue="players" className="space-y-4">
        <TabsList>
          <TabsTrigger value="players">Players</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="matches">Matches</TabsTrigger>
        </TabsList>
        
        <TabsContent value="players" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Players</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {recentPlayers.map((player) => (
                  <div key={player.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <div className="font-medium">{player.gamertag}</div>
                      <div className="text-sm text-muted-foreground">
                        {player.teamName || 'No Team'} • {player.tier || 'Unranked'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{player.currentRp || 0} RP</div>
                      <div className="text-xs text-muted-foreground">
                        Peak: {player.peakRp || 0}
                      </div>
                    </div>
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
                {recentTeams.map((team) => (
                  <div key={team.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <div className="font-medium">{team.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {team.region || 'No Region'} • {team.description || 'No description'}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={team.isActive ? "default" : "secondary"}>
                        {team.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {recentEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <div className="font-medium">{event.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {event.eventType || 'Unknown Type'} • {event.tier || 'No Tier'}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={
                        event.status === 'in_progress' ? "default" : 
                        event.status === 'open' ? "secondary" : 
                        event.status === 'completed' ? "outline" : "destructive"
                      }>
                        {event.status || 'Unknown'}
                      </Badge>
                    </div>
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
                {recentMatches.map((match) => (
                  <div key={match.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <div className="font-medium">{match.teamAName} vs {match.teamBName}</div>
                      <div className="text-sm text-muted-foreground">
                        {match.stage} • {match.status}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {match.scoreA || 0} - {match.scoreB || 0}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {match.winnerName || 'No winner'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
