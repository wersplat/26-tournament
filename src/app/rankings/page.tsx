"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { TeamLogo } from "@/components/teams/team-logo";
import Link from "next/link";
import { usePlayers, useTeams, handleGraphQLError } from "@/hooks/useGraphQL";
import { Loader2, AlertCircle, RefreshCw } from "lucide-react";

interface PlayerRanking {
  id: string;
  gamertag: string;
  team: {
    id: string;
    name: string;
  };
  stats: {
    ppg: number;
    rpg: number;
    apg: number;
    spg: number;
    bpg: number;
    fgPercentage: number;
    threePointPercentage: number;
    ftPercentage: number;
  };
  mvpPoints?: number;
}

interface TeamRanking {
  id: string;
  name: string;
  players: Array<{
    id: string;
    gamertag: string;
    stats: {
      ppg: number;
      rpg: number;
      apg: number;
    };
  }>;
  record?: string;
  ppg?: number;
  oppg?: number;
  netRating?: number;
}

export default function RankingsPage() {
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

  const loading = playersLoading || teamsLoading;
  const error = playersError || teamsError;
  const errorMessage = handleGraphQLError(error);

  // Calculate player rankings based on stats
  const playerRankings: PlayerRanking[] = players
    .map((player: PlayerRanking) => ({
      ...player,
      mvpPoints: Math.round((player.stats.ppg * 2 + player.stats.rpg + player.stats.apg * 1.5) * 10)
    }))
    .sort((a: PlayerRanking, b: PlayerRanking) => (b.mvpPoints || 0) - (a.mvpPoints || 0))
    .slice(0, 50); // Top 50 players

  // Calculate team rankings based on player stats
  const teamRankings: TeamRanking[] = teams
    .map((team: TeamRanking) => {
      const avgPpg = team.players.length > 0 
        ? team.players.reduce((sum, p) => sum + p.stats.ppg, 0) / team.players.length 
        : 0;
      
      return {
        ...team,
        ppg: avgPpg,
        record: "0-0", // Would be calculated from actual matches
        oppg: 0,
        netRating: 0
      };
    })
    .sort((a: TeamRanking, b: TeamRanking) => (b.ppg || 0) - (a.ppg || 0))
    .slice(0, 20); // Top 20 teams

  if (loading) {
    return (
      <div className="container py-8 md:py-12">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Rankings</h1>
            <p className="text-muted-foreground md:text-lg">
              Player and team rankings for the 2K26 Tournament Series
            </p>
          </div>
          <div className="text-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <div className="text-lg">Loading rankings...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-8 md:py-12">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Rankings</h1>
            <p className="text-muted-foreground md:text-lg">
              Player and team rankings for the 2K26 Tournament Series
            </p>
          </div>
          <div className="text-center py-12">
            <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-4" />
            <div className="text-lg text-red-600">{errorMessage}</div>
            <div className="flex justify-center space-x-4 mt-4">
              <Button onClick={() => refetchPlayers()} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry Players
              </Button>
              <Button onClick={() => refetchTeams()} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry Teams
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Rankings</h1>
          <p className="text-muted-foreground md:text-lg">
            Player and team rankings for the 2K26 Tournament Series
          </p>
        </div>

        <Tabs defaultValue="players" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="players">Player Rankings</TabsTrigger>
            <TabsTrigger value="teams">Team Rankings</TabsTrigger>
          </TabsList>

          <TabsContent value="players" className="space-y-4">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3 text-left text-sm font-medium">Rank</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Player</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Team</th>
                      <th className="px-4 py-3 text-center text-sm font-medium">PPG</th>
                      <th className="px-4 py-3 text-center text-sm font-medium">RPG</th>
                      <th className="px-4 py-3 text-center text-sm font-medium">APG</th>
                      <th className="px-4 py-3 text-center text-sm font-medium">MVP Points</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {playerRankings.map((player, index) => (
                      <tr key={player.id} className="hover:bg-muted/50">
                        <td className="px-4 py-3 text-sm font-medium">#{index + 1}</td>
                        <td className="px-4 py-3">
                          <Link href={`/players/${player.id}`} className="font-medium hover:text-primary">
                            {player.gamertag}
                          </Link>
                        </td>
                        <td className="px-4 py-3">
                          <Link href={`/teams/${player.team.id}`} className="hover:text-primary">
                            {player.team.name}
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
                        <td className="px-4 py-3 text-center text-sm font-medium">
                          {player.mvpPoints || 0}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {playerRankings.length === 0 && (
              <div className="text-center py-12">
                <div className="text-lg text-gray-600">No player rankings available</div>
                <p className="text-gray-500 mt-2">Check back when players are added to the system</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="teams" className="space-y-4">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3 text-left text-sm font-medium">Rank</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Team</th>
                      <th className="px-4 py-3 text-center text-sm font-medium">Players</th>
                      <th className="px-4 py-3 text-center text-sm font-medium">Avg PPG</th>
                      <th className="px-4 py-3 text-center text-sm font-medium">Record</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {teamRankings.map((team, index) => (
                      <tr key={team.id} className="hover:bg-muted/50">
                        <td className="px-4 py-3 text-sm font-medium">#{index + 1}</td>
                        <td className="px-4 py-3">
                          <Link href={`/teams/${team.id}`} className="flex items-center space-x-3">
                            <TeamLogo 
                              teamId={team.id} 
                              name={team.name} 
                              size="sm" 
                              borderColor="border-gray-300" 
                            />
                            <span className="font-medium">{team.name}</span>
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-center text-sm">
                          {team.players.length}
                        </td>
                        <td className="px-4 py-3 text-center text-sm">
                          {team.ppg?.toFixed(1) || '0.0'}
                        </td>
                        <td className="px-4 py-3 text-center text-sm">
                          {team.record || '0-0'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {teamRankings.length === 0 && (
              <div className="text-center py-12">
                <div className="text-lg text-gray-600">No team rankings available</div>
                <p className="text-gray-500 mt-2">Check back when teams are added to the system</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Ranking Methodology</h3>
          <div className="space-y-2">
            <p><strong>Player Rankings:</strong> Based on points per game (PPG), rebounds per game (RPG), assists per game (APG), and overall contribution to team success.</p>
            <p><strong>Team Rankings:</strong> Based on average team PPG, number of players, and overall team performance.</p>
            <p className="text-sm text-muted-foreground mt-4">
              Rankings are updated regularly based on tournament results and performance metrics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
