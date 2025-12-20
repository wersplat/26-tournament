"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useAdminPlayers, useAdminTeams, useAdminMatches, useAdminEvents } from '@/hooks/useAdminSupabase';
import { Loader2, AlertCircle, RefreshCw } from "lucide-react";

export function AdminDashboard() {
  const { 
    players = [], 
    loading: playersLoading, 
    error: playersError, 
    refetch: refetchPlayers 
  } = useAdminPlayers();

  const { 
    teams = [], 
    loading: teamsLoading, 
    error: teamsError, 
    refetch: refetchTeams 
  } = useAdminTeams();

  const { 
    matches = [], 
    loading: matchesLoading, 
    error: matchesError, 
    refetch: refetchMatches 
  } = useAdminMatches();

  const { 
    events = [], 
    loading: eventsLoading, 
    error: eventsError, 
    refetch: refetchEvents 
  } = useAdminEvents();

  const loading = playersLoading || teamsLoading || matchesLoading || eventsLoading;
  const error = playersError || teamsError || matchesError || eventsError;

  // Calculate stats
  const stats = {
    totalPlayers: players?.length || 0,
    totalTeams: teams?.length || 0,
    totalEvents: events?.length || 0,
    totalMatches: matches?.length || 0,
    activeEvents: events?.filter((e: any) => e.status === 'in_progress').length || 0,
    upcomingEvents: events?.filter((e: any) => e.status === 'open').length || 0,
    completedMatches: matches?.filter((m: any) => m.status === 'completed').length || 0
  };

  // Get recent items (first 5)
  const recentPlayers = (players || []).slice(0, 5);
  const recentTeams = (teams || []).slice(0, 5);
  const recentMatches = (matches || []).slice(0, 5);
  const recentEvents = (events || []).slice(0, 5);

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
          <div className="text-lg text-red-600">Error loading dashboard</div>
          <div className="text-sm text-muted-foreground mb-4">
            {error?.message || 'Failed to load data'}
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            <Button onClick={() => refetchPlayers()} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry Players
            </Button>
            <Button onClick={() => refetchTeams()} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry Teams
            </Button>
            <Button onClick={() => refetchMatches()} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry Matches
            </Button>
            <Button onClick={() => refetchEvents()} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry Events
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="p-3 sm:p-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-0 pt-0">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Players</CardTitle>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <div className="text-xl sm:text-2xl font-bold">{stats.totalPlayers}</div>
          </CardContent>
        </Card>
        
        <Card className="p-3 sm:p-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-0 pt-0">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Teams</CardTitle>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <div className="text-xl sm:text-2xl font-bold">{stats.totalTeams}</div>
          </CardContent>
        </Card>
        
        <Card className="p-3 sm:p-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-0 pt-0">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Events</CardTitle>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <div className="text-xl sm:text-2xl font-bold">{stats.totalEvents}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {stats.activeEvents} active, {stats.upcomingEvents} upcoming
            </div>
          </CardContent>
        </Card>
        
        <Card className="p-3 sm:p-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-0 pt-0">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Matches</CardTitle>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <div className="text-xl sm:text-2xl font-bold">{stats.totalMatches}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {stats.completedMatches} completed
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Views */}
      <Tabs defaultValue="players" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 h-auto p-1">
          <TabsTrigger value="players" className="text-xs sm:text-sm py-2">Players</TabsTrigger>
          <TabsTrigger value="teams" className="text-xs sm:text-sm py-2">Teams</TabsTrigger>
          <TabsTrigger value="events" className="text-xs sm:text-sm py-2">Events</TabsTrigger>
          <TabsTrigger value="matches" className="text-xs sm:text-sm py-2">Matches</TabsTrigger>
        </TabsList>
        
        <TabsContent value="players" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Recent Players</CardTitle>
            </CardHeader>
            <CardContent>
              {recentPlayers.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No players found
                </div>
              ) : (
                <div className="space-y-3">
                  {recentPlayers.map((player: any) => (
                    <div key={player.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 border rounded-lg space-y-2 sm:space-y-0">
                      <div className="flex-1">
                        <div className="font-medium text-sm sm:text-base">{player.gamertag}</div>
                        <div className="text-xs sm:text-sm text-muted-foreground">
                          {player.current_team_id ? 'Has Team' : 'No Team'} • {player.salary_tier || 'Unranked'}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{player.player_rp || 0} RP</div>
                        <div className="text-xs text-muted-foreground">
                          Peak: {player.player_rp || 0}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="teams" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Recent Teams</CardTitle>
            </CardHeader>
            <CardContent>
              {recentTeams.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No teams found
                </div>
              ) : (
                <div className="space-y-3">
                  {recentTeams.map((team: any) => (
                    <div key={team.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 border rounded-lg space-y-2 sm:space-y-0">
                      <div className="flex-1">
                        <div className="font-medium text-sm sm:text-base">{team.name}</div>
                        <div className="text-xs sm:text-sm text-muted-foreground">
                          {team.region_id ? 'Has Region' : 'No Region'}
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="default" className="text-xs">
                          Active
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Recent Events</CardTitle>
            </CardHeader>
            <CardContent>
              {recentEvents.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No events found
                </div>
              ) : (
                <div className="space-y-3">
                  {recentEvents.map((event: any) => (
                    <div key={event.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 border rounded-lg space-y-2 sm:space-y-0">
                      <div className="flex-1">
                        <div className="font-medium text-sm sm:text-base">{event.name}</div>
                        <div className="text-xs sm:text-sm text-muted-foreground">
                          {event.type || 'Unknown Type'} • {event.tier || 'No Tier'}
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={
                          event.status === 'in_progress' ? "default" : 
                          event.status === 'open' ? "secondary" : 
                          event.status === 'completed' ? "outline" : "destructive"
                        } className="text-xs">
                          {event.status || 'Unknown'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="matches" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Recent Matches</CardTitle>
            </CardHeader>
            <CardContent>
              {recentMatches.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No matches found
                </div>
              ) : (
                <div className="space-y-3">
                  {recentMatches.map((match: any) => (
                    <div key={match.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 border rounded-lg space-y-2 sm:space-y-0">
                      <div className="flex-1">
                        <div className="font-medium text-sm sm:text-base">{match.team_a_name || 'Team A'} vs {match.team_b_name || 'Team B'}</div>
                        <div className="text-xs sm:text-sm text-muted-foreground">
                          {match.stage || 'Unknown'} • {match.status || 'Scheduled'}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {match.score_a || 0} - {match.score_b || 0}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {match.winner_name || 'No winner'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
