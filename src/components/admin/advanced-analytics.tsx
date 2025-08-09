"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Trophy, 
  Target, 
  Activity,
  RefreshCw,
  Loader2
} from "lucide-react";
import { 
  useGetPlayersQuery,
  useGetTeamsQuery,
  useGetMatchesQuery,
  useGetEventsQuery,
  PlayerTier,
  PlayerPosition
} from "@/types/generated/graphql";

interface AdvancedAnalyticsProps {
  onRefresh?: () => void;
}

export function AdvancedAnalytics({ onRefresh }: AdvancedAnalyticsProps) {
  const [timeRange, setTimeRange] = useState<string>('all');
  const [selectedTier, setSelectedTier] = useState<string>('all');

  const { data: playersData, loading: playersLoading, refetch: refetchPlayers } = useGetPlayersQuery({
    variables: { limit: 500, offset: 0 },
    errorPolicy: 'all',
  });

  const { data: teamsData, loading: teamsLoading, refetch: refetchTeams } = useGetTeamsQuery({
    variables: { limit: 100, offset: 0 },
    errorPolicy: 'all',
  });

  const { data: matchesData, loading: matchesLoading, refetch: refetchMatches } = useGetMatchesQuery({
    variables: { limit: 200, offset: 0 },
    errorPolicy: 'all',
  });

  const { data: eventsData, loading: eventsLoading, refetch: refetchEvents } = useGetEventsQuery({
    variables: { limit: 100, offset: 0 },
    errorPolicy: 'all',
  });

  const players = playersData?.getPlayers || [];
  const teams = teamsData?.getTeams || [];
  const matches = matchesData?.getMatches || [];
  const events = eventsData?.getEvents || [];

  const loading = playersLoading || teamsLoading || matchesLoading || eventsLoading;

  // Calculate comprehensive statistics
  const stats = {
    // Player Statistics
    totalPlayers: players.length,
    verifiedPlayers: players.filter(p => p.isVerified).length,
    unverifiedPlayers: players.filter(p => !p.isVerified).length,
    averageRP: players.length > 0 ? Math.round(players.reduce((sum, p) => sum + (p.currentRp || 0), 0) / players.length) : 0,
    averagePeakRP: players.length > 0 ? Math.round(players.reduce((sum, p) => sum + (p.peakRp || 0), 0) / players.length) : 0,
    
    // Team Statistics
    totalTeams: teams.length,
    activeTeams: teams.filter(t => t.isActive).length,
    inactiveTeams: teams.filter(t => !t.isActive).length,
    averageTeamSize: teams.length > 0 ? Math.round(players.filter(p => p.teamName).length / teams.length) : 0,
    
    // Match Statistics
    totalMatches: matches.length,
    completedMatches: matches.filter(m => m.status === 'completed').length,
    liveMatches: matches.filter(m => m.status === 'live').length,
    scheduledMatches: matches.filter(m => m.status === 'scheduled').length,
    
    // Event Statistics
    totalEvents: events.length,
    activeEvents: events.filter(e => e.status === 'in_progress').length,
    upcomingEvents: events.filter(e => e.status === 'open').length,
    completedEvents: events.filter(e => e.status === 'completed').length,
  };

  // Tier Distribution
  const tierDistribution = {
    bronze: players.filter(p => p.tier === 'bronze').length,
    silver: players.filter(p => p.tier === 'silver').length,
    gold: players.filter(p => p.tier === 'gold').length,
    platinum: players.filter(p => p.tier === 'platinum').length,
    diamond: players.filter(p => p.tier === 'diamond').length,
    pink_diamond: players.filter(p => p.tier === 'pink_diamond').length,
    galaxy_opal: players.filter(p => p.tier === 'galaxy_opal').length,
    unranked: players.filter(p => !p.tier).length,
  };

  // Position Distribution
  const positionDistribution = {
    Point_Guard: players.filter(p => p.position === 'Point_Guard').length,
    Shooting_Guard: players.filter(p => p.position === 'Shooting_Guard').length,
    Power_Forward: players.filter(p => p.position === 'Power_Forward').length,
    Center: players.filter(p => p.position === 'Center').length,
    Lock: players.filter(p => p.position === 'Lock').length,
    unspecified: players.filter(p => !p.position).length,
  };

  // Top Players by RP
  const topPlayersByRP = [...players]
    .sort((a, b) => (b.currentRp || 0) - (a.currentRp || 0))
    .slice(0, 10);

  // Top Teams by Average RP
  const topTeamsByAverageRP = teams.map(team => {
    const teamPlayers = players.filter(p => p.teamName === team.name);
    const averageRP = teamPlayers.length > 0 
      ? teamPlayers.reduce((sum, p) => sum + (p.currentRp || 0), 0) / teamPlayers.length 
      : 0;
    return { ...team, averageRP, playerCount: teamPlayers.length };
  }).sort((a, b) => b.averageRP - a.averageRP).slice(0, 10);

  // Region Distribution
  const regionDistribution = players.reduce((acc, player) => {
    const region = player.region || 'Unknown';
    acc[region] = (acc[region] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const handleRefresh = () => {
    refetchPlayers();
    refetchTeams();
    refetchMatches();
    refetchEvents();
    onRefresh?.();
  };

  const getTierColor = (tier: string) => {
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

  const getPositionColor = (position: string) => {
    switch (position) {
      case 'Point_Guard': return 'bg-blue-100 text-blue-800';
      case 'Shooting_Guard': return 'bg-green-100 text-green-800';
      case 'Power_Forward': return 'bg-red-100 text-red-800';
      case 'Center': return 'bg-purple-100 text-purple-800';
      case 'Lock': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin" />
          <div className="text-lg">Loading analytics...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header with Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Advanced Analytics</h2>
          <p className="text-muted-foreground text-sm">Comprehensive insights into your tournament data</p>
        </div>
        <Button onClick={handleRefresh} variant="outline" className="w-full sm:w-auto">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Data
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="p-3 sm:p-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-0 pt-0">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Players</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <div className="text-xl sm:text-2xl font-bold">{stats.totalPlayers}</div>
            <p className="text-xs text-muted-foreground">
              {stats.verifiedPlayers} verified • {stats.unverifiedPlayers} unverified
            </p>
          </CardContent>
        </Card>

        <Card className="p-3 sm:p-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-0 pt-0">
            <CardTitle className="text-xs sm:text-sm font-medium">Average RP</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <div className="text-xl sm:text-2xl font-bold">{stats.averageRP}</div>
            <p className="text-xs text-muted-foreground">
              Peak: {stats.averagePeakRP}
            </p>
          </CardContent>
        </Card>

        <Card className="p-3 sm:p-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-0 pt-0">
            <CardTitle className="text-xs sm:text-sm font-medium">Active Teams</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <div className="text-xl sm:text-2xl font-bold">{stats.activeTeams}</div>
            <p className="text-xs text-muted-foreground">
              {stats.totalTeams} total • Avg {stats.averageTeamSize} players
            </p>
          </CardContent>
        </Card>

        <Card className="p-3 sm:p-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-0 pt-0">
            <CardTitle className="text-xs sm:text-sm font-medium">Live Events</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <div className="text-xl sm:text-2xl font-bold">{stats.activeEvents}</div>
            <p className="text-xs text-muted-foreground">
              {stats.upcomingEvents} upcoming • {stats.completedEvents} completed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics Tabs */}
      <Tabs defaultValue="players" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 h-auto p-1">
          <TabsTrigger value="players" className="text-xs sm:text-sm py-2">Players</TabsTrigger>
          <TabsTrigger value="teams" className="text-xs sm:text-sm py-2">Teams</TabsTrigger>
          <TabsTrigger value="matches" className="text-xs sm:text-sm py-2">Matches</TabsTrigger>
          <TabsTrigger value="events" className="text-xs sm:text-sm py-2">Events</TabsTrigger>
        </TabsList>

        {/* Player Analytics */}
        <TabsContent value="players" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Tier Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Player Tier Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(tierDistribution).map(([tier, count]) => (
                    <div key={tier} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge className={`text-xs ${getTierColor(tier)}`}>
                          {tier === 'unranked' ? 'Unranked' : tier.replace('_', ' ')}
                        </Badge>
                      </div>
                      <div className="text-sm font-medium">{count}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Position Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Player Position Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(positionDistribution).map(([position, count]) => (
                    <div key={position} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge className={`text-xs ${getPositionColor(position)}`}>
                          {position === 'unspecified' ? 'Unspecified' : position.replace('_', ' ')}
                        </Badge>
                      </div>
                      <div className="text-sm font-medium">{count}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Players */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Top Players by RP</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topPlayersByRP.map((player, index) => (
                    <div key={player.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium text-sm sm:text-base">{player.gamertag}</div>
                          <div className="text-xs sm:text-sm text-muted-foreground">
                            {player.teamName || 'No Team'} • {player.tier || 'Unranked'}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-sm sm:text-base">{player.currentRp || 0} RP</div>
                        <div className="text-xs sm:text-sm text-muted-foreground">
                          Peak: {player.peakRp || 0}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Region Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Player Region Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(regionDistribution)
                    .sort(([,a], [,b]) => b - a)
                    .map(([region, count]) => (
                    <div key={region} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">{region}</Badge>
                      </div>
                      <div className="text-sm font-medium">{count}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Team Analytics */}
        <TabsContent value="teams" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Top Teams */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Top Teams by Average RP</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topTeamsByAverageRP.map((team, index) => (
                    <div key={team.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium text-sm sm:text-base">{team.name}</div>
                          <div className="text-xs sm:text-sm text-muted-foreground">
                            {team.playerCount} players • {team.region || 'No Region'}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-sm sm:text-base">{Math.round(team.averageRP)} RP</div>
                        <Badge variant={team.isActive ? "default" : "secondary"} className="text-xs">
                          {team.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Team Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Team Status Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Active Teams</span>
                    <Badge variant="default" className="text-xs">{stats.activeTeams}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Inactive Teams</span>
                    <Badge variant="secondary" className="text-xs">{stats.inactiveTeams}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Average Team Size</span>
                    <Badge variant="outline" className="text-xs">{stats.averageTeamSize} players</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Match Analytics */}
        <TabsContent value="matches" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Match Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Match Status Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Completed Matches</span>
                    <Badge variant="default" className="text-xs">{stats.completedMatches}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Live Matches</span>
                    <Badge variant="destructive" className="text-xs">{stats.liveMatches}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Scheduled Matches</span>
                    <Badge variant="secondary" className="text-xs">{stats.scheduledMatches}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Matches</span>
                    <Badge variant="outline" className="text-xs">{stats.totalMatches}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Matches */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Recent Matches</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {matches.slice(0, 10).map((match) => (
                    <div key={match.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                      <div>
                        <div className="font-medium text-sm sm:text-base">{match.teamAName} vs {match.teamBName}</div>
                        <div className="text-xs sm:text-sm text-muted-foreground">
                          {match.stage} • {match.status}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-sm sm:text-base">
                          {match.scoreA || 0} - {match.scoreB || 0}
                        </div>
                        <Badge variant={
                          match.status === 'completed' ? "default" : 
                          match.status === 'live' ? "destructive" : "secondary"
                        } className="text-xs">
                          {match.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Event Analytics */}
        <TabsContent value="events" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Event Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Event Status Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Active Events</span>
                    <Badge variant="destructive" className="text-xs">{stats.activeEvents}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Upcoming Events</span>
                    <Badge variant="secondary" className="text-xs">{stats.upcomingEvents}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Completed Events</span>
                    <Badge variant="default" className="text-xs">{stats.completedEvents}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Events</span>
                    <Badge variant="outline" className="text-xs">{stats.totalEvents}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Events */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Recent Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {events.slice(0, 10).map((event) => (
                    <div key={event.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                      <div>
                        <div className="font-medium text-sm sm:text-base">{event.name}</div>
                        <div className="text-xs sm:text-sm text-muted-foreground">
                          {event.eventType} • {event.tier}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs sm:text-sm">
                          {event.currentParticipants}/{event.maxParticipants}
                        </div>
                        <Badge variant={
                          event.status === 'in_progress' ? "destructive" : 
                          event.status === 'open' ? "secondary" : 
                          event.status === 'completed' ? "default" : "outline"
                        } className="text-xs">
                          {event.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
