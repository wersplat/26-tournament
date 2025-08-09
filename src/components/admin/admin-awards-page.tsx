"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePlayers, useTeams } from "@/hooks/useGraphQL";
import { Loader2, Trophy, Medal, Star, Award, Plus, Edit, Trash2, Search } from "lucide-react";

interface Award {
  id: string;
  name: string;
  description: string;
  type: 'achievement' | 'milestone' | 'recognition' | 'championship';
  icon: string;
  points: number;
  isActive: boolean;
  createdAt: string;
}

interface PlayerAward {
  id: string;
  playerId: string;
  playerName: string;
  awardId: string;
  awardName: string;
  awardedAt: string;
  awardedBy: string;
  notes?: string;
}

export function AdminAwardsPage() {
  const { players, loading: playersLoading } = usePlayers();
  const { teams, loading: teamsLoading } = useTeams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAwardType, setSelectedAwardType] = useState<string>("all");

  // Mock data - in real implementation, this would come from GraphQL
  const [awards] = useState<Award[]>([
    {
      id: "1",
      name: "MVP",
      description: "Most Valuable Player of the tournament",
      type: "recognition",
      icon: "🏆",
      points: 100,
      isActive: true,
      createdAt: "2024-01-01"
    },
    {
      id: "2",
      name: "Rookie of the Year",
      description: "Best performing rookie player",
      type: "achievement",
      icon: "⭐",
      points: 75,
      isActive: true,
      createdAt: "2024-01-01"
    },
    {
      id: "3",
      name: "1000 Points",
      description: "Scored 1000 career points",
      type: "milestone",
      icon: "🎯",
      points: 50,
      isActive: true,
      createdAt: "2024-01-01"
    },
    {
      id: "4",
      name: "Championship Winner",
      description: "Won a tournament championship",
      type: "championship",
      icon: "👑",
      points: 200,
      isActive: true,
      createdAt: "2024-01-01"
    }
  ]);

  const [playerAwards] = useState<PlayerAward[]>([
    {
      id: "1",
      playerId: "1",
      playerName: "John Smith",
      awardId: "1",
      awardName: "MVP",
      awardedAt: "2024-01-15",
      awardedBy: "Admin",
      notes: "Outstanding performance in Season 1"
    },
    {
      id: "2",
      playerId: "2",
      playerName: "Mike Johnson",
      awardId: "2",
      awardName: "Rookie of the Year",
      awardedAt: "2024-01-20",
      awardedBy: "Admin",
      notes: "Exceptional rookie season"
    }
  ]);

  const filteredAwards = awards.filter(award => {
    const matchesSearch = award.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         award.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedAwardType === "all" || award.type === selectedAwardType;
    return matchesSearch && matchesType;
  });

  const getAwardIcon = (type: string) => {
    switch (type) {
      case 'achievement': return <Star className="h-4 w-4" />;
      case 'milestone': return <Medal className="h-4 w-4" />;
      case 'recognition': return <Trophy className="h-4 w-4" />;
      case 'championship': return <Award className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  const getAwardTypeColor = (type: string) => {
    switch (type) {
      case 'achievement': return 'bg-blue-100 text-blue-800';
      case 'milestone': return 'bg-green-100 text-green-800';
      case 'recognition': return 'bg-yellow-100 text-yellow-800';
      case 'championship': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (playersLoading || teamsLoading) {
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
          <h1 className="text-3xl font-bold">Awards Management</h1>
          <p className="text-muted-foreground">Manage awards, achievements, and player recognition</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create New Award
        </Button>
      </div>

      <Tabs defaultValue="awards" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="awards">Award Types</TabsTrigger>
          <TabsTrigger value="assigned">Assigned Awards</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="awards" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Award Types</CardTitle>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search awards..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                <Select value={selectedAwardType} onValueChange={setSelectedAwardType}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="achievement">Achievement</SelectItem>
                    <SelectItem value="milestone">Milestone</SelectItem>
                    <SelectItem value="recognition">Recognition</SelectItem>
                    <SelectItem value="championship">Championship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAwards.map((award) => (
                  <Card key={award.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">{award.icon}</span>
                          <CardTitle className="text-lg">{award.name}</CardTitle>
                        </div>
                        <Badge variant={award.isActive ? "default" : "secondary"}>
                          {award.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">{award.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge className={getAwardTypeColor(award.type)}>
                          {getAwardIcon(award.type)}
                          <span className="ml-1 capitalize">{award.type}</span>
                        </Badge>
                        <span className="text-sm font-medium">{award.points} pts</span>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Trophy className="h-3 w-3 mr-1" />
                          Award
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assigned" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Assigned Awards</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Player</TableHead>
                    <TableHead>Award</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Awarded Date</TableHead>
                    <TableHead>Awarded By</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {playerAwards.map((playerAward) => {
                    const award = awards.find(a => a.id === playerAward.awardId);
                    return (
                      <TableRow key={playerAward.id}>
                        <TableCell className="font-medium">{playerAward.playerName}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span>{award?.icon}</span>
                            <span>{playerAward.awardName}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getAwardTypeColor(award?.type || '')}>
                            {getAwardIcon(award?.type || '')}
                            <span className="ml-1 capitalize">{award?.type}</span>
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(playerAward.awardedAt).toLocaleDateString()}</TableCell>
                        <TableCell>{playerAward.awardedBy}</TableCell>
                        <TableCell className="max-w-xs truncate">{playerAward.notes}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-3 w-3" />
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Awards</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{awards.length}</div>
                <p className="text-xs text-muted-foreground">Award types available</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Awards Given</CardTitle>
                <Medal className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{playerAwards.length}</div>
                <p className="text-xs text-muted-foreground">Awards assigned to players</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Awards</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{awards.filter(a => a.isActive).length}</div>
                <p className="text-xs text-muted-foreground">Currently active award types</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Award Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['achievement', 'milestone', 'recognition', 'championship'].map((type) => {
                  const typeAwards = awards.filter(a => a.type === type);
                  const typePlayerAwards = playerAwards.filter(pa => 
                    awards.find(a => a.id === pa.awardId)?.type === type
                  );
                  
                  return (
                    <div key={type} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center space-x-3">
                        {getAwardIcon(type)}
                        <div>
                          <div className="font-medium capitalize">{type}</div>
                          <div className="text-sm text-muted-foreground">
                            {typeAwards.length} types, {typePlayerAwards.length} awarded
                          </div>
                        </div>
                      </div>
                      <Badge className={getAwardTypeColor(type)}>
                        {typeAwards.length} / {typePlayerAwards.length}
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