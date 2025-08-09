"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TeamLogo } from "@/components/teams/team-logo";
import Link from "next/link";
import { useTeams, useMatches, handleGraphQLError } from "@/hooks/useGraphQL";
import { Loader2, AlertCircle, RefreshCw } from "lucide-react";

interface TeamStanding {
  id: string;
  name: string;
  wins: number;
  losses: number;
  pointsFor: number;
  pointsAgainst: number;
  winPercentage: number;
  pointDifferential: number;
  streak: string;
}

function StandingsTable({ 
  standings 
}: { 
  standings: TeamStanding[];
}) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50">
              <th className="px-4 py-3 text-left text-sm font-medium">Team</th>
              <th className="px-4 py-3 text-center text-sm font-medium">W</th>
              <th className="px-4 py-3 text-center text-sm font-medium">L</th>
              <th className="px-4 py-3 text-center text-sm font-medium">PCT</th>
              <th className="px-4 py-3 text-center text-sm font-medium hidden sm:table-cell">PF</th>
              <th className="px-4 py-3 text-center text-sm font-medium hidden sm:table-cell">PA</th>
              <th className="px-4 py-3 text-center text-sm font-medium hidden sm:table-cell">DIFF</th>
              <th className="px-4 py-3 text-center text-sm font-medium">STRK</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {standings.map((standing) => (
              <tr key={standing.id} className="hover:bg-muted/50">
                <td className="px-4 py-3">
                  <Link href={`/teams/${standing.id}`} className="flex items-center space-x-3">
                    <TeamLogo 
                      teamId={standing.id} 
                      name={standing.name} 
                      size="sm" 
                      borderColor="border-gray-300" 
                    />
                    <span className="font-medium text-sm">{standing.name}</span>
                  </Link>
                </td>
                <td className="px-4 py-3 text-center text-sm">{standing.wins}</td>
                <td className="px-4 py-3 text-center text-sm">{standing.losses}</td>
                <td className="px-4 py-3 text-center text-sm">
                  {standing.winPercentage.toFixed(3).substring(1)}
                </td>
                <td className="px-4 py-3 text-center text-sm hidden sm:table-cell">{standing.pointsFor}</td>
                <td className="px-4 py-3 text-center text-sm hidden sm:table-cell">{standing.pointsAgainst}</td>
                <td className="px-4 py-3 text-center text-sm hidden sm:table-cell">
                  <span className={standing.pointDifferential > 0 ? "text-green-600" : "text-red-600"}>
                    {standing.pointDifferential > 0 ? "+" : ""}{standing.pointDifferential}
                  </span>
                </td>
                <td className="px-4 py-3 text-center text-sm">
                  <span className={standing.streak.startsWith("W") ? "text-green-600" : "text-red-600"}>
                    {standing.streak}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function StandingsPage() {
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

  // Calculate standings from matches data
  const calculateStandings = (): TeamStanding[] => {
    if (!teams.length || !matches.length) return [];

    const teamStats = new Map<string, {
      wins: number;
      losses: number;
      pointsFor: number;
      pointsAgainst: number;
    }>();

    // Initialize team stats
    teams.forEach(team => {
      teamStats.set(team.id, {
        wins: 0,
        losses: 0,
        pointsFor: 0,
        pointsAgainst: 0
      });
    });

    // Calculate stats from matches
    matches.forEach(match => {
      if (match.status === 'completed' && match.homeScore !== null && match.awayScore !== null) {
        const homeStats = teamStats.get(match.homeTeam.id);
        const awayStats = teamStats.get(match.awayTeam.id);

        if (homeStats && awayStats) {
          // Update home team stats
          homeStats.pointsFor += match.homeScore;
          homeStats.pointsAgainst += match.awayScore;
          if (match.homeScore > match.awayScore) {
            homeStats.wins += 1;
          } else {
            homeStats.losses += 1;
          }

          // Update away team stats
          awayStats.pointsFor += match.awayScore;
          awayStats.pointsAgainst += match.homeScore;
          if (match.awayScore > match.homeScore) {
            awayStats.wins += 1;
          } else {
            awayStats.losses += 1;
          }
        }
      }
    });

    // Convert to standings array
    const standings: TeamStanding[] = teams.map(team => {
      const stats = teamStats.get(team.id) || { wins: 0, losses: 0, pointsFor: 0, pointsAgainst: 0 };
      const totalGames = stats.wins + stats.losses;
      const winPercentage = totalGames > 0 ? stats.wins / totalGames : 0;
      const pointDifferential = stats.pointsFor - stats.pointsAgainst;
      const streak = stats.wins > stats.losses ? `W${stats.wins}` : `L${stats.losses}`;

      return {
        id: team.id,
        name: team.name,
        wins: stats.wins,
        losses: stats.losses,
        pointsFor: stats.pointsFor,
        pointsAgainst: stats.pointsAgainst,
        winPercentage,
        pointDifferential,
        streak
      };
    });

    // Sort by win percentage, then point differential
    return standings.sort((a, b) => {
      if (a.winPercentage !== b.winPercentage) {
        return b.winPercentage - a.winPercentage;
      }
      return b.pointDifferential - a.pointDifferential;
    });
  };

  const standings = calculateStandings();

  if (loading) {
    return (
      <div className="container py-8 md:py-12">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Standings</h1>
            <p className="text-muted-foreground md:text-lg">
              Current standings for the 2K26 Tournament Series
            </p>
          </div>
          <div className="text-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <div className="text-lg">Loading standings...</div>
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
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Standings</h1>
            <p className="text-muted-foreground md:text-lg">
              Current standings for the 2K26 Tournament Series
            </p>
          </div>
          <div className="text-center py-12">
            <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-4" />
            <div className="text-lg text-red-600">{errorMessage}</div>
            <div className="flex justify-center space-x-4 mt-4">
              <button 
                onClick={() => refetchTeams()}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                <RefreshCw className="h-4 w-4 mr-2 inline" />
                Retry Teams
              </button>
              <button 
                onClick={() => refetchMatches()}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                <RefreshCw className="h-4 w-4 mr-2 inline" />
                Retry Matches
              </button>
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
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Standings</h1>
          <p className="text-muted-foreground md:text-lg">
            Current standings for the 2K26 Tournament Series
          </p>
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-col space-y-2">
            <h2 className="text-xl font-semibold">Current Season Standings</h2>
            <p className="text-muted-foreground">
              Team standings based on match results
            </p>
            <div className="mt-2">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium">
                  Season in Progress
                </span>
              </div>
            </div>
          </div>
        </div>

        {standings.length > 0 ? (
          <div className="space-y-6">
            <StandingsTable standings={standings} />
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-lg text-gray-600">No standings data available</div>
            <p className="text-gray-500 mt-2">Check back when matches are played</p>
          </div>
        )}

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Standings Rules</h3>
          <div className="space-y-2">
            <p>Teams are ranked based on the following criteria:</p>
            <ol className="list-decimal list-inside space-y-1 pl-4">
              <li>Win-loss record</li>
              <li>Point differential</li>
              <li>Points scored</li>
            </ol>
            <p className="mt-4">Standings are updated after each match completion.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
