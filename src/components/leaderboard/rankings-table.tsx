'use client';

import { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { leaderboardService, PlayerProfile, LeaderboardSortBy, PlayerTier } from '@/services';

interface RankingsTableProps {
  initialLimit?: number;
}

export function RankingsTable({ initialLimit = 10 }: RankingsTableProps) {
  const [players, setPlayers] = useState<PlayerProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<LeaderboardSortBy>(LeaderboardSortBy.CURRENT_RP);
  const [tier, setTier] = useState<PlayerTier | undefined>(undefined);
  const [limit, setLimit] = useState(initialLimit);

  useEffect(() => {
    fetchLeaderboard();
  }, [sortBy, tier, limit]);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let data: PlayerProfile[];
      
      if (tier) {
        data = await leaderboardService.getTierLeaderboard(tier, limit);
      } else {
        data = await leaderboardService.getGlobalLeaderboard(limit, 0, undefined, sortBy);
      }
      
      setPlayers(data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      setError(
        error instanceof Error 
          ? error.message 
          : 'Failed to load leaderboard data. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchLeaderboard();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Player Rankings</h2>
        
        <div className="flex flex-wrap gap-2">
          <Select
            value={sortBy}
            onValueChange={(value) => setSortBy(value as LeaderboardSortBy)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={LeaderboardSortBy.CURRENT_RP}>Current RP</SelectItem>
              <SelectItem value={LeaderboardSortBy.PEAK_RP}>Peak RP</SelectItem>
              <SelectItem value={LeaderboardSortBy.WINS}>Wins</SelectItem>
              <SelectItem value={LeaderboardSortBy.WIN_RATE}>Win Rate</SelectItem>
            </SelectContent>
          </Select>
          
          <Select
            value={tier || ''}
            onValueChange={(value) => setTier(value ? value as PlayerTier : undefined)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Tiers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Tiers</SelectItem>
              <SelectItem value={PlayerTier.BRONZE}>Bronze</SelectItem>
              <SelectItem value={PlayerTier.SILVER}>Silver</SelectItem>
              <SelectItem value={PlayerTier.GOLD}>Gold</SelectItem>
              <SelectItem value={PlayerTier.PLATINUM}>Platinum</SelectItem>
              <SelectItem value={PlayerTier.DIAMOND}>Diamond</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={handleRefresh} variant="outline" size="icon">
            <RefreshIcon className="h-4 w-4" />
            <span className="sr-only">Refresh</span>
          </Button>
        </div>
      </div>
      
      {error && (
        <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
          {error}
        </div>
      )}
      
      <div className="border rounded-md">
        <Table>
          <TableCaption>
            {tier 
              ? `Top ${limit} players in ${tier} tier` 
              : `Top ${limit} players globally`
            }
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Rank</TableHead>
              <TableHead>Player</TableHead>
              <TableHead>Position</TableHead>
              <TableHead className="text-right">RP</TableHead>
              <TableHead className="text-right">Peak RP</TableHead>
              <TableHead className="text-right">W/L</TableHead>
              <TableHead className="text-right">Win Rate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                    <span className="ml-2">Loading...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : players.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No players found
                </TableCell>
              </TableRow>
            ) : (
              players.map((player, index) => (
                <TableRow key={player.id}>
                  <TableCell className="font-medium">{player.rank || index + 1}</TableCell>
                  <TableCell>{player.gamertag}</TableCell>
                  <TableCell>
                    <span className={`inline-block px-2 py-1 rounded text-xs ${getPositionColor(player.position)}`}>
                      {player.position || 'N/A'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">{player.player_rp || 0}</TableCell>
                  <TableCell className="text-right">{player.player_rank_score || 0}</TableCell>
                  <TableCell className="text-right">{player.wins || 0}/{player.losses || 0}</TableCell>
                  <TableCell className="text-right">
                    {calculateWinRate(player.wins || 0, player.losses || 0)}%
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex justify-center mt-4">
        <Button 
          variant="outline" 
          onClick={() => setLimit(prev => prev + 10)}
          disabled={loading}
        >
          Load More
        </Button>
      </div>
    </div>
  );
}

function calculateWinRate(wins: number, losses: number): string {
  if (wins === 0 && losses === 0) return '0';
  const total = wins + losses;
  const rate = (wins / total) * 100;
  return rate.toFixed(1);
}

function getPositionColor(position?: string): string {
  if (!position) return 'bg-gray-200 text-gray-600';
  
  switch (position.toLowerCase()) {
    case 'point guard':
      return 'bg-blue-400/20 text-blue-600';
    case 'shooting guard':
      return 'bg-green-400/20 text-green-600';
    case 'lock':
      return 'bg-purple-400/20 text-purple-600';
    case 'power forward':
      return 'bg-orange-400/20 text-orange-600';
    case 'center':
      return 'bg-red-400/20 text-red-600';
    default:
      return 'bg-gray-200 text-gray-600';
  }
}

function RefreshIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  );
}
