"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useTeams, useMatches, handleGraphQLError } from "@/hooks/useGraphQL";
import { Loader2, AlertCircle, RefreshCw } from "lucide-react";

interface TeamPageProps {
  params: { teamId: string };
}

export default function TeamPage({ params }: TeamPageProps) {
  const { teamId } = params;
  
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

  const loading = teamsLoading || matchesLoading;
  const error = teamsError || matchesError;
  const errorMessage = handleGraphQLError(error);

  // Find the specific team
  const team = teams.find((t: any) => t.id === teamId);
  
  // Filter matches for this team
  const teamMatches = matches.filter((match: any) => 
    match.homeTeam.id === teamId || match.awayTeam.id === teamId
  );

  if (loading) {
    return (
      <div className="container py-8 md:py-12">
        <div className="text-center py-12">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <div className="text-lg">Loading team data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-8 md:py-12">
        <div className="text-center py-12">
          <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-4" />
          <div className="text-lg text-red-600">{errorMessage}</div>
          <div className="flex justify-center space-x-4 mt-4">
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

  if (!team) {
    return (
      <div className="container py-8 md:py-12">
        <div className="text-center py-12">
          <div className="text-lg text-red-600">Team not found</div>
          <Link href="/teams" className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Back to Teams
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col space-y-6">
        {/* Team Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-6">
            <div className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-primary">
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <span className="text-3xl font-bold text-muted-foreground">
                  {team.name.charAt(0)}
                </span>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {team.name}
              </h1>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-muted-foreground">
                  Players: {team.players.length}
                </span>
                <span className="text-muted-foreground">
                  Matches: {teamMatches.length}
                </span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">View Schedule</Button>
            <Button>Follow Team</Button>
          </div>
        </div>

        {/* Team Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">{team.players.length}</div>
            <div className="text-sm text-muted-foreground">Players</div>
          </div>
          <div className="bg-card border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">{teamMatches.length}</div>
            <div className="text-sm text-muted-foreground">Matches</div>
          </div>
          <div className="bg-card border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">
              {team.players.length > 0 
                ? (team.players.reduce((sum: number, p: any) => sum + p.stats.ppg, 0) / team.players.length).toFixed(1)
                : '0.0'
              }
            </div>
            <div className="text-sm text-muted-foreground">Avg PPG</div>
          </div>
          <div className="bg-card border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">
              {team.players.length > 0 
                ? (team.players.reduce((sum: number, p: any) => sum + p.stats.rpg, 0) / team.players.length).toFixed(1)
                : '0.0'
              }
            </div>
            <div className="text-sm text-muted-foreground">Avg RPG</div>
          </div>
        </div>

        {/* Team Content Tabs */}
        <Tabs defaultValue="roster" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="roster">Roster</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="roster" className="space-y-4">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3 text-left text-sm font-medium">Player</th>
                      <th className="px-4 py-3 text-center text-sm font-medium">PPG</th>
                      <th className="px-4 py-3 text-center text-sm font-medium">RPG</th>
                      <th className="px-4 py-3 text-center text-sm font-medium">APG</th>
                      <th className="px-4 py-3 text-center text-sm font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {team.players.map((player: any) => (
                      <tr key={player.id} className="hover:bg-muted/50">
                        <td className="px-4 py-3">
                          <Link href={`/players/${player.id}`} className="font-medium hover:text-primary">
                            {player.gamertag}
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-center text-sm">
                          {player.stats.ppg.toFixed(1)}
                        </td>
                        <td className="px-4 py-3 text-center text-sm">
                          {player.stats.rpg.toFixed(1)}
                        </td>
                        <td className="px-4 py-3 text-center text-sm">
                          {player.stats.apg.toFixed(1)}
                        </td>
                        <td className="px-4 py-3 text-center text-sm">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                            Active
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {team.players.length === 0 && (
              <div className="text-center py-12">
                <div className="text-lg text-gray-600">No players found</div>
                <p className="text-gray-500 mt-2">This team has no active players</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Opponent</th>
                      <th className="px-4 py-3 text-center text-sm font-medium">Result</th>
                      <th className="px-4 py-3 text-center text-sm font-medium">Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {teamMatches.map((match: any) => {
                      const isHome = match.homeTeam.id === teamId;
                      const opponent = isHome ? match.awayTeam : match.homeTeam;
                      const teamScore = isHome ? match.homeScore : match.awayScore;
                      const opponentScore = isHome ? match.awayScore : match.homeScore;
                      
                      return (
                        <tr key={match.id} className="hover:bg-muted/50">
                          <td className="px-4 py-3 text-sm">
                            {new Date(match.date).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3">
                            <Link href={`/teams/${opponent.id}`} className="hover:text-primary">
                              {opponent.name}
                            </Link>
                          </td>
                          <td className="px-4 py-3 text-center text-sm">
                            {match.status === 'completed' ? (
                              teamScore > opponentScore ? (
                                <span className="text-green-600 font-medium">W</span>
                              ) : (
                                <span className="text-red-600 font-medium">L</span>
                              )
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-center text-sm">
                            {match.status === 'completed' && teamScore !== null && opponentScore !== null 
                              ? `${teamScore}-${opponentScore}` 
                              : 'TBD'
                            }
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {teamMatches.length === 0 && (
              <div className="text-center py-12">
                <div className="text-lg text-gray-600">No matches found</div>
                <p className="text-gray-500 mt-2">This team has no scheduled or completed matches</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="stats" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Team Performance</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Total Players:</span>
                    <span className="font-medium">{team.players.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Matches:</span>
                    <span className="font-medium">{teamMatches.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average PPG:</span>
                    <span className="font-medium">
                      {team.players.length > 0 
                        ? (team.players.reduce((sum: number, p: any) => sum + p.stats.ppg, 0) / team.players.length).toFixed(1)
                        : '0.0'
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average RPG:</span>
                    <span className="font-medium">
                      {team.players.length > 0 
                        ? (team.players.reduce((sum: number, p: any) => sum + p.stats.rpg, 0) / team.players.length).toFixed(1)
                        : '0.0'
                      }
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Team Info</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Team ID:</span>
                    <span className="font-mono text-sm">{team.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Team Name:</span>
                    <span className="font-medium">{team.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Top Scorer:</span>
                    <span className="font-medium">
                      {team.players.length > 0 
                        ? team.players.reduce((top: any, p: any) => p.stats.ppg > top.stats.ppg ? p : top).gamertag
                        : 'N/A'
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Top Rebounder:</span>
                    <span className="font-medium">
                      {team.players.length > 0 
                        ? team.players.reduce((top: any, p: any) => p.stats.rpg > top.stats.rpg ? p : top).gamertag
                        : 'N/A'
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Team History</h3>
              <p className="text-muted-foreground">
                Team history and achievements will be displayed here once more data is available.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
