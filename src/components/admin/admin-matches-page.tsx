"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMatches, useTeams, usePlayers } from "@/hooks/useGraphQL";
import { Loader2, Calendar, Clock, Users, Trophy, Plus, Edit, Trash2, Eye, Settings, Play, Pause, CheckCircle, Award } from "lucide-react";

interface Match {
  id: string;
  eventId: string;
  eventName: string;
  teamAId: string;
  teamAName: string;
  teamBId: string;
  teamBName: string;
  stage: 'group' | 'quarterfinal' | 'semifinal' | 'final';
  gameNumber: number;
  status: 'scheduled' | 'live' | 'completed' | 'cancelled';
  scoreA?: number;
  scoreB?: number;
  winnerId?: string;
  winnerName?: string;
  scheduledAt: string;
  startedAt?: string;
  endedAt?: string;
  venue?: string;
  streamUrl?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface MatchStats {
  id: string;
  matchId: string;
  teamId: string;
  teamName: string;
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  fieldGoalsMade: number;
  fieldGoalsAttempted: number;
  threePointsMade: number;
  threePointsAttempted: number;
  freeThrowsMade: number;
  freeThrowsAttempted: number;
  fouls: number;
  plusMinus: number;
}

export function AdminMatchesPage() {
  const { matches: graphqlMatches, loading: matchesLoading } = useMatches();
  const { teams, loading: teamsLoading } = useTeams();
  const { players, loading: playersLoading } = usePlayers();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedStage, setSelectedStage] = useState<string>("all");

  // Mock data - in real implementation, this would come from GraphQL
  const [matches] = useState<Match[]>([
    {
      id: "1",
      eventId: "1",
      eventName: "2K26 Season 1 Championship",
      teamAId: "1",
      teamAName: "Team Alpha",
      teamBId: "2",
      teamBName: "Team Beta",
      stage: "group",
      gameNumber: 1,
      status: "completed",
      scoreA: 85,
      scoreB: 72,
      winnerId: "1",
      winnerName: "Team Alpha",
      scheduledAt: "2024-01-15T18:00:00Z",
      startedAt: "2024-01-15T18:05:00Z",
      endedAt: "2024-01-15T19:30:00Z",
      venue: "Main Arena",
      createdAt: "2024-01-10T00:00:00Z",
      updatedAt: "2024-01-15T19:30:00Z"
    },
    {
      id: "2",
      eventId: "1",
      eventName: "2K26 Season 1 Championship",
      teamAId: "3",
      teamAName: "Team Gamma",
      teamBId: "4",
      teamBName: "Team Delta",
      stage: "group",
      gameNumber: 2,
      status: "live",
      scoreA: 45,
      scoreB: 52,
      scheduledAt: "2024-01-16T19:00:00Z",
      startedAt: "2024-01-16T19:02:00Z",
      venue: "Main Arena",
      streamUrl: "https://twitch.tv/bodegacatsgc",
      createdAt: "2024-01-10T00:00:00Z",
      updatedAt: "2024-01-16T19:02:00Z"
    },
    {
      id: "3",
      eventId: "1",
      eventName: "2K26 Season 1 Championship",
      teamAId: "5",
      teamAName: "Team Epsilon",
      teamBId: "6",
      teamBName: "Team Zeta",
      stage: "semifinal",
      gameNumber: 1,
      status: "scheduled",
      scheduledAt: "2024-01-20T20:00:00Z",
      venue: "Main Arena",
      createdAt: "2024-01-10T00:00:00Z",
      updatedAt: "2024-01-10T00:00:00Z"
    }
  ]);

  const [matchStats] = useState<MatchStats[]>([
    {
      id: "1",
      matchId: "1",
      teamId: "1",
      teamName: "Team Alpha",
      points: 85,
      rebounds: 32,
      assists: 18,
      steals: 8,
      blocks: 4,
      turnovers: 12,
      fieldGoalsMade: 32,
      fieldGoalsAttempted: 65,
      threePointsMade: 8,
      threePointsAttempted: 22,
      freeThrowsMade: 13,
      freeThrowsAttempted: 16,
      fouls: 18,
      plusMinus: 13
    },
    {
      id: "2",
      matchId: "1",
      teamId: "2",
      teamName: "Team Beta",
      points: 72,
      rebounds: 28,
      assists: 15,
      steals: 6,
      blocks: 2,
      turnovers: 15,
      fieldGoalsMade: 28,
      fieldGoalsAttempted: 62,
      threePointsMade: 6,
      threePointsAttempted: 20,
      freeThrowsMade: 10,
      freeThrowsAttempted: 14,
      fouls: 20,
      plusMinus: -13
    }
  ]);

  const filteredMatches = matches.filter(match => {
    const matchesSearch = match.teamAName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         match.teamBName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         match.eventName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || match.status === selectedStatus;
    const matchesStage = selectedStage === "all" || match.stage === selectedStage;
    return matchesSearch && matchesStatus && matchesStage;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'live': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-purple-100 text-purple-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'group': return 'bg-gray-100 text-gray-800';
      case 'quarterfinal': return 'bg-blue-100 text-blue-800';
      case 'semifinal': return 'bg-orange-100 text-orange-800';
      case 'final': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled': return <Clock className="h-4 w-4" />;
      case 'live': return <Play className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <Pause className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  if (matchesLoading || teamsLoading || playersLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Matches Management</h1>
          <p className="text-muted-foreground">Manage match scheduling, results, and statistics</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Schedule Match
        </Button>
      </div>

      <Tabs defaultValue="matches" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="matches">Matches</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="matches" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Matches</CardTitle>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search matches..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="live">Live</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedStage} onValueChange={setSelectedStage}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Stages</SelectItem>
                    <SelectItem value="group">Group</SelectItem>
                    <SelectItem value="quarterfinal">Quarterfinal</SelectItem>
                    <SelectItem value="semifinal">Semifinal</SelectItem>
                    <SelectItem value="final">Final</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredMatches.map((match) => (
                  <Card key={match.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <CardTitle className="text-lg">{match.eventName}</CardTitle>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(match.status)}>
                            {getStatusIcon(match.status)}
                            <span className="ml-1 capitalize">{match.status}</span>
                          </Badge>
                          <Badge className={getStageColor(match.stage)}>
                            {match.stage}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <div className="font-semibold text-lg">{match.teamAName}</div>
                          {match.scoreA !== undefined && (
                            <div className="text-2xl font-bold">{match.scoreA}</div>
                          )}
                        </div>
                        <div className="text-center flex items-center justify-center">
                          <div className="text-sm text-muted-foreground">VS</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-lg">{match.teamBName}</div>
                          {match.scoreB !== undefined && (
                            <div className="text-2xl font-bold">{match.scoreB}</div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span>Scheduled:</span>
                          <span className="font-medium">
                            {new Date(match.scheduledAt).toLocaleString()}
                          </span>
                        </div>
                        {match.venue && (
                          <div className="flex items-center justify-between text-sm">
                            <span>Venue:</span>
                            <span className="font-medium">{match.venue}</span>
                          </div>
                        )}
                        {match.winnerName && (
                          <div className="flex items-center justify-between text-sm">
                            <span>Winner:</span>
                            <Badge className="bg-green-100 text-green-800">
                              <Trophy className="h-3 w-3 mr-1" />
                              {match.winnerName}
                            </Badge>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Settings className="h-3 w-3 mr-1" />
                          Manage
                        </Button>
                        {match.status === 'scheduled' && (
                          <Button variant="outline" size="sm" className="flex-1">
                            <Play className="h-3 w-3 mr-1" />
                            Start
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Match Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Match</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead>Points</TableHead>
                    <TableHead>FG%</TableHead>
                    <TableHead>3P%</TableHead>
                    <TableHead>FT%</TableHead>
                    <TableHead>Rebounds</TableHead>
                    <TableHead>Assists</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {matchStats.map((stat) => {
                    const fgPercentage = stat.fieldGoalsAttempted > 0 
                      ? ((stat.fieldGoalsMade / stat.fieldGoalsAttempted) * 100).toFixed(1)
                      : '0.0';
                    const threePointPercentage = stat.threePointsAttempted > 0
                      ? ((stat.threePointsMade / stat.threePointsAttempted) * 100).toFixed(1)
                      : '0.0';
                    const ftPercentage = stat.freeThrowsAttempted > 0
                      ? ((stat.freeThrowsMade / stat.freeThrowsAttempted) * 100).toFixed(1)
                      : '0.0';

                    return (
                      <TableRow key={stat.id}>
                        <TableCell className="font-medium">
                          {matches.find(m => m.id === stat.matchId)?.teamAName} vs {matches.find(m => m.id === stat.matchId)?.teamBName}
                        </TableCell>
                        <TableCell>{stat.teamName}</TableCell>
                        <TableCell>{stat.points}</TableCell>
                        <TableCell>{fgPercentage}%</TableCell>
                        <TableCell>{threePointPercentage}%</TableCell>
                        <TableCell>{ftPercentage}%</TableCell>
                        <TableCell>{stat.rebounds}</TableCell>
                        <TableCell>{stat.assists}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Matches</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{matches.length}</div>
                <p className="text-xs text-muted-foreground">Matches scheduled</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Live Matches</CardTitle>
                <Play className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{matches.filter(m => m.status === 'live').length}</div>
                <p className="text-xs text-muted-foreground">Currently playing</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed Matches</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{matches.filter(m => m.status === 'completed').length}</div>
                <p className="text-xs text-muted-foreground">Finished matches</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Scheduled Matches</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{matches.filter(m => m.status === 'scheduled').length}</div>
                <p className="text-xs text-muted-foreground">Upcoming matches</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Match Stage Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['group', 'quarterfinal', 'semifinal', 'final'].map((stage) => {
                  const stageMatches = matches.filter(m => m.stage === stage);
                  
                  return (
                    <div key={stage} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center space-x-3">
                        <Badge className={getStageColor(stage)}>
                          {stage}
                        </Badge>
                        <div>
                          <div className="font-medium capitalize">{stage}</div>
                          <div className="text-sm text-muted-foreground">
                            {stageMatches.length} matches
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline">
                        {stageMatches.length}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 