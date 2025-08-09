"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTeams } from "@/hooks/useGraphQL";
import { Loader2, Calendar, Users, Trophy, Plus, Edit, Trash2, Eye, Settings, Play, Pause, CheckCircle } from "lucide-react";

interface Event {
  id: string;
  name: string;
  description: string;
  type: 'tournament' | 'league' | 'exhibition' | 'championship';
  status: 'draft' | 'upcoming' | 'active' | 'completed' | 'cancelled';
  startDate: string;
  endDate: string;
  maxTeams: number;
  currentTeams: number;
  prizePool?: number;
  entryFee?: number;
  region: string;
  tier: 'T1' | 'T2' | 'T3' | 'T4';
  isGlobal: boolean;
  createdAt: string;
  updatedAt: string;
}

interface EventGroup {
  id: string;
  eventId: string;
  name: string;
  description?: string;
  maxTeams: number;
  currentTeams: number;
  status: 'open' | 'full' | 'closed';
}

export function AdminEventsPage() {
  const { teams, loading: teamsLoading } = useTeams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");

  // Mock data - in real implementation, this would come from GraphQL
  const [events] = useState<Event[]>([
    {
      id: "1",
      name: "2K26 Season 1 Championship",
      description: "The inaugural championship tournament for 2K26",
      type: "championship",
      status: "upcoming",
      startDate: "2024-02-01",
      endDate: "2024-02-15",
      maxTeams: 16,
      currentTeams: 12,
      prizePool: 10000,
      entryFee: 100,
      region: "Global",
      tier: "T1",
      isGlobal: true,
      createdAt: "2024-01-01",
      updatedAt: "2024-01-15"
    },
    {
      id: "2",
      name: "Weekly League",
      description: "Weekly competitive league matches",
      type: "league",
      status: "active",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      maxTeams: 32,
      currentTeams: 28,
      region: "North America",
      tier: "T2",
      isGlobal: false,
      createdAt: "2024-01-01",
      updatedAt: "2024-01-20"
    },
    {
      id: "3",
      name: "Rookie Tournament",
      description: "Tournament for new players",
      type: "tournament",
      status: "completed",
      startDate: "2024-01-10",
      endDate: "2024-01-12",
      maxTeams: 8,
      currentTeams: 8,
      prizePool: 1000,
      region: "Europe",
      tier: "T3",
      isGlobal: false,
      createdAt: "2024-01-05",
      updatedAt: "2024-01-12"
    }
  ]);

  const [eventGroups] = useState<EventGroup[]>([
    {
      id: "1",
      eventId: "1",
      name: "Group A",
      description: "Top seeded teams",
      maxTeams: 4,
      currentTeams: 4,
      status: "full"
    },
    {
      id: "2",
      eventId: "1",
      name: "Group B",
      description: "Second tier teams",
      maxTeams: 4,
      currentTeams: 4,
      status: "full"
    },
    {
      id: "3",
      eventId: "1",
      name: "Group C",
      description: "Third tier teams",
      maxTeams: 4,
      currentTeams: 3,
      status: "open"
    }
  ]);

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || event.status === selectedStatus;
    const matchesType = selectedType === "all" || event.type === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-purple-100 text-purple-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'tournament': return <Trophy className="h-4 w-4" />;
      case 'league': return <Calendar className="h-4 w-4" />;
      case 'exhibition': return <Users className="h-4 w-4" />;
      case 'championship': return <Trophy className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'T1': return 'bg-red-100 text-red-800';
      case 'T2': return 'bg-orange-100 text-orange-800';
      case 'T3': return 'bg-yellow-100 text-yellow-800';
      case 'T4': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (teamsLoading) {
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
          <h1 className="text-3xl font-bold">Events Management</h1>
          <p className="text-muted-foreground">Manage tournaments, leagues, and competitions</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create New Event
        </Button>
      </div>

      <Tabs defaultValue="events" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Events</CardTitle>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search events..."
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
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="tournament">Tournament</SelectItem>
                    <SelectItem value="league">League</SelectItem>
                    <SelectItem value="exhibition">Exhibition</SelectItem>
                    <SelectItem value="championship">Championship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredEvents.map((event) => (
                  <Card key={event.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(event.type)}
                          <CardTitle className="text-lg">{event.name}</CardTitle>
                        </div>
                        <Badge className={getStatusColor(event.status)}>
                          {event.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                      
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Teams:</span>
                          <span className="font-medium">{event.currentTeams}/{event.maxTeams}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Date:</span>
                          <span className="font-medium">
                            {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
                          </span>
                        </div>
                        {event.prizePool && (
                          <div className="flex items-center justify-between text-sm">
                            <span>Prize Pool:</span>
                            <span className="font-medium">${event.prizePool.toLocaleString()}</span>
                          </div>
                        )}
                        <div className="flex items-center justify-between text-sm">
                          <span>Region:</span>
                          <Badge variant="outline" className={event.isGlobal ? "bg-blue-50" : ""}>
                            {event.region}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Tier:</span>
                          <Badge className={getTierColor(event.tier)}>
                            {event.tier}
                          </Badge>
                        </div>
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
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="groups" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Event Groups</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Group</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Teams</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {eventGroups.map((group) => {
                    const event = events.find(e => e.id === group.eventId);
                    return (
                      <TableRow key={group.id}>
                        <TableCell className="font-medium">{group.name}</TableCell>
                        <TableCell>{event?.name}</TableCell>
                        <TableCell>{group.currentTeams}/{group.maxTeams}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(group.status)}>
                            {group.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{group.description}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Users className="h-3 w-3" />
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
                <CardTitle className="text-sm font-medium">Total Events</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{events.length}</div>
                <p className="text-xs text-muted-foreground">Events created</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Events</CardTitle>
                <Play className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{events.filter(e => e.status === 'active').length}</div>
                <p className="text-xs text-muted-foreground">Currently running</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                <Pause className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{events.filter(e => e.status === 'upcoming').length}</div>
                <p className="text-xs text-muted-foreground">Scheduled to start</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed Events</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{events.filter(e => e.status === 'completed').length}</div>
                <p className="text-xs text-muted-foreground">Finished events</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Event Type Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['tournament', 'league', 'exhibition', 'championship'].map((type) => {
                  const typeEvents = events.filter(e => e.type === type);
                  
                  return (
                    <div key={type} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center space-x-3">
                        {getTypeIcon(type)}
                        <div>
                          <div className="font-medium capitalize">{type}</div>
                          <div className="text-sm text-muted-foreground">
                            {typeEvents.length} events
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline">
                        {typeEvents.length}
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