'use client';

import { useState, useEffect } from 'react';
import { leaderboardService } from '@/services';

/**
 * Component to test API connectivity with the backend
 */
export default function ApiTest() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [topPlayers, setTopPlayers] = useState<any[]>([]);

  useEffect(() => {
    const fetchTopPlayers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch top 5 players from the leaderboard
        const players = await leaderboardService.getTopPlayers(5);
        setTopPlayers(players);
      } catch (err: any) {
        console.error('Error fetching top players:', err);
        setError(err.message || 'Failed to fetch top players');
      } finally {
        setLoading(false);
      }
    };

    fetchTopPlayers();
  }, []);

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">API Connectivity Test</h2>
      
      {loading && (
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <span className="ml-2">Loading...</span>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p className="font-bold">Error</p>
          <p>{error}</p>
          <p className="text-sm mt-2">
            Make sure the GraphQL server is running at {process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4000/graphql'}
          </p>
        </div>
      )}
      
      {!loading && !error && topPlayers.length === 0 && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          <p>No players found. The API connection may be working, but there's no data.</p>
        </div>
      )}
      
      {!loading && !error && topPlayers.length > 0 && (
        <div>
          <p className="text-green-600 font-semibold mb-4">
            ✅ API connection successful! Displaying top {topPlayers.length} players:
          </p>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="text-left">Rank</th>
                  <th className="text-left">Gamertag</th>
                  <th className="text-left">RP</th>
                </tr>
              </thead>
              <tbody>
                {topPlayers.map((player, index) => (
                  <tr key={player.id} className="border-t">
                    <td className="py-2">{index + 1}</td>
                    <td className="py-2">{player.gamertag}</td>
                    <td className="py-2">{player.current_rp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
