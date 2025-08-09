"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePlayers, useTeams, useMatches } from "@/hooks/useGraphQL";
import { Loader2, BarChart3, TrendingUp, Users, Trophy, Download, Calendar, DollarSign, Target, Award, Activity, PieChart } from "lucide-react";

interface Report {
  id: string;
  name: string;
  type: 'analytics' | 'financial' | 'performance' | 'engagement';
  description: string;
  lastGenerated: string;
  status: 'ready' | 'generating' | 'error';
  downloadUrl?: string;
}

interface AnalyticsData {
  totalRevenue: number;
  totalParticipants: number;
  averageMatchDuration: number;
  topPerformingTeam: string;
  mostActivePlayer: string;
  eventCompletionRate: number;
  playerRetentionRate: number;
  averagePrizePool: number;
}

export function AdminReportsPage() {
  const { players, loading: playersLoading } = usePlayers();
  const { teams, loading: teamsLoading } = useTeams();
  const { matches, loading: matchesLoading } = useMatches();
  const [selectedReportType, setSelectedReportType] = useState<string>("all");
  const [dateRange, setDateRange] = useState<string>("30d");

  // Mock data - in real implementation, this would come from GraphQL
  const [reports] = useState<Report[]>([
    {
      id: "1",
      name: "Monthly Performance Report",
      type: "performance",
      description: "Comprehensive analysis of player and team performance metrics",
      lastGenerated: "2024-01-15T10:00:00Z",
      status: "ready",
      downloadUrl: "/reports/monthly-performance.pdf"
    },
    {
      id: "2",
      name: "Financial Summary Q4 2023",
      type: "financial",
      description: "Quarterly financial overview including revenue and expenses",
      lastGenerated: "2024-01-01T09:00:00Z",
      status: "ready",
      downloadUrl: "/reports/financial-q4-2023.pdf"
    },
    {
      id: "3",
      name: "Player Engagement Analytics",
      type: "engagement",
      description: "Analysis of player participation and engagement patterns",
      lastGenerated: "2024-01-10T14:30:00Z",
      status: "ready",
      downloadUrl: "/reports/engagement-analytics.pdf"
    },
    {
      id: "4",
      name: "Tournament Success Metrics",
      type: "analytics",
      description: "Detailed tournament performance and success indicators",
      lastGenerated: "2024-01-12T16:45:00Z",
      status: "generating"
    }
  ]);

  const [analyticsData] = useState<AnalyticsData>({
    totalRevenue: 125000,
    totalParticipants: 156,
    averageMatchDuration: 45,
    topPerformingTeam: "Team Alpha",
    mostActivePlayer: "John Smith",
    eventCompletionRate: 94.5,
    playerRetentionRate: 87.2,
    averagePrizePool: 8500
  });

  const filteredReports = reports.filter((report: Report) => {
    return selectedReportType === "all" || report.type === selectedReportType;
  });

  const getReportTypeIcon = (type: string) => {
    switch (type) {
      case 'analytics': return <BarChart3 className="h-4 w-4" />;
      case 'financial': return <DollarSign className="h-4 w-4" />;
      case 'performance': return <TrendingUp className="h-4 w-4" />;
      case 'engagement': return <Users className="h-4 w-4" />;
      default: return <BarChart3 className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-green-100 text-green-800';
      case 'generating': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (playersLoading || teamsLoading || matchesLoading) {
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
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">Comprehensive reporting and data analytics</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${analyticsData.totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.totalParticipants}</div>
                <p className="text-xs text-muted-foreground">+8% from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Event Completion Rate</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.eventCompletionRate}%</div>
                <p className="text-xs text-muted-foreground">+2.3% from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Player Retention</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.playerRetentionRate}%</div>
                <p className="text-xs text-muted-foreground">+5.1% from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Performance Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Top Performing Team</span>
                    <Badge variant="outline">{analyticsData.topPerformingTeam}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Most Active Player</span>
                    <Badge variant="outline">{analyticsData.mostActivePlayer}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Average Match Duration</span>
                    <Badge variant="outline">{analyticsData.averageMatchDuration} min</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Average Prize Pool</span>
                    <Badge variant="outline">${analyticsData.averagePrizePool.toLocaleString()}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New tournament created</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Match completed</p>
                      <p className="text-xs text-muted-foreground">4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New player registered</p>
                      <p className="text-xs text-muted-foreground">6 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Award given</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Reports</CardTitle>
              <div className="flex gap-4">
                <Select value={selectedReportType} onValueChange={setSelectedReportType}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="analytics">Analytics</SelectItem>
                    <SelectItem value="financial">Financial</SelectItem>
                    <SelectItem value="performance">Performance</SelectItem>
                    <SelectItem value="engagement">Engagement</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 90 days</SelectItem>
                    <SelectItem value="1y">Last year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                 {filteredReports.map((report: Report) => (
                  <Card key={report.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {getReportTypeIcon(report.type)}
                          <div>
                            <CardTitle className="text-lg">{report.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">{report.description}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          Last generated: {new Date(report.lastGenerated).toLocaleDateString()}
                        </div>
                        <div className="flex gap-2">
                          {report.status === 'ready' && (
                            <Button variant="outline" size="sm">
                              <Download className="h-3 w-3 mr-1" />
                              Download
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <BarChart3 className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Calendar className="h-3 w-3 mr-1" />
                            Schedule
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Player Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Metric</TableHead>
                      <TableHead>Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Total Players</TableCell>
                      <TableCell>{players.length}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Active Players</TableCell>
                      <TableCell>{players.filter((p: any) => p.stats.ppg > 0).length}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Average PPG</TableCell>
                      <TableCell>
                        {players.length > 0 
                          ? (players.reduce((sum: number, p: any) => sum + p.stats.ppg, 0) / players.length).toFixed(1)
                          : '0.0'
                        }
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Average RPG</TableCell>
                      <TableCell>
                        {players.length > 0 
                          ? (players.reduce((sum: number, p: any) => sum + p.stats.rpg, 0) / players.length).toFixed(1)
                          : '0.0'
                        }
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Team Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Metric</TableHead>
                      <TableHead>Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Total Teams</TableCell>
                      <TableCell>{teams.length}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Active Teams</TableCell>
                      <TableCell>{teams.filter((t: any) => t.isActive).length}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Average Team Size</TableCell>
                      <TableCell>
                        {teams.length > 0 
                          ? (teams.reduce((sum: number, t: any) => sum + (t.players?.length || 0), 0) / teams.length).toFixed(1)
                          : '0.0'
                        }
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Total Matches</TableCell>
                      <TableCell>{matches.length}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Key Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <h3 className="font-semibold">Growth Trend</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Player registration has increased by 15% compared to last month, indicating strong community growth.
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Award className="h-4 w-4 text-blue-600" />
                    <h3 className="font-semibold">Performance Insight</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Teams with consistent practice schedules show 23% better performance in tournaments.
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <PieChart className="h-4 w-4 text-purple-600" />
                    <h3 className="font-semibold">Engagement Analysis</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Weekend tournaments have 40% higher participation rates than weekday events.
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Trophy className="h-4 w-4 text-yellow-600" />
                    <h3 className="font-semibold">Competition Level</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    The average skill gap between top and bottom teams has decreased by 12%, indicating more balanced competition.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 