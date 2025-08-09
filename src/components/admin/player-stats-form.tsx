"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { adminGraphqlService } from "@/services/admin-graphql-service";
import { PlayerMatchStatsInput } from "@/types/graphql";

interface PlayerStatsFormProps {
  matchId: string;
  teamId: string;
  playerId: string;
  playerName?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function PlayerStatsForm({ 
  matchId, 
  teamId, 
  playerId, 
  playerName,
  onSuccess, 
  onCancel 
}: PlayerStatsFormProps) {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<PlayerMatchStatsInput>({
    playerId: playerId,
    teamId: teamId,
    points: 0,
    assists: 0,
    rebounds: 0,
    steals: 0,
    blocks: 0,
    turnovers: 0,
    fouls: 0,
    fgm: 0,
    fga: 0,
    threePointsMade: 0,
    threePointsAttempted: 0,
    ftm: 0,
    fta: 0,
    plusMinus: 0,
    minutesPlayed: 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await adminGraphqlService.submitMatchStats(matchId, [stats]);
      onSuccess?.();
    } catch (error) {
      console.error('Error creating player stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof PlayerMatchStatsInput, value: number) => {
    setStats(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Player Statistics - {playerName || 'Unknown Player'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="points">Points</Label>
              <Input
                id="points"
                type="number"
                min="0"
                value={stats.points}
                onChange={(e) => handleInputChange('points', parseInt(e.target.value) || 0)}
              />
            </div>
            <div>
              <Label htmlFor="assists">Assists</Label>
              <Input
                id="assists"
                type="number"
                min="0"
                value={stats.assists}
                onChange={(e) => handleInputChange('assists', parseInt(e.target.value) || 0)}
              />
            </div>
            <div>
              <Label htmlFor="rebounds">Rebounds</Label>
              <Input
                id="rebounds"
                type="number"
                min="0"
                value={stats.rebounds}
                onChange={(e) => handleInputChange('rebounds', parseInt(e.target.value) || 0)}
              />
            </div>
            <div>
              <Label htmlFor="steals">Steals</Label>
              <Input
                id="steals"
                type="number"
                min="0"
                value={stats.steals}
                onChange={(e) => handleInputChange('steals', parseInt(e.target.value) || 0)}
              />
            </div>
            <div>
              <Label htmlFor="blocks">Blocks</Label>
              <Input
                id="blocks"
                type="number"
                min="0"
                value={stats.blocks}
                onChange={(e) => handleInputChange('blocks', parseInt(e.target.value) || 0)}
              />
            </div>
            <div>
              <Label htmlFor="turnovers">Turnovers</Label>
              <Input
                id="turnovers"
                type="number"
                min="0"
                value={stats.turnovers}
                onChange={(e) => handleInputChange('turnovers', parseInt(e.target.value) || 0)}
              />
            </div>
            <div>
              <Label htmlFor="fouls">Fouls</Label>
              <Input
                id="fouls"
                type="number"
                min="0"
                value={stats.fouls}
                onChange={(e) => handleInputChange('fouls', parseInt(e.target.value) || 0)}
              />
            </div>
            <div>
              <Label htmlFor="plus_minus">+/-</Label>
              <Input
                id="plus_minus"
                type="number"
                value={stats.plusMinus}
                onChange={(e) => handleInputChange('plusMinus', parseInt(e.target.value) || 0)}
              />
            </div>
          </div>

          {/* Shooting Stats */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Shooting Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="fgm">Field Goals Made</Label>
                <Input
                  id="fgm"
                  type="number"
                  min="0"
                  value={stats.fgm}
                  onChange={(e) => handleInputChange('fgm', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="fga">Field Goals Attempted</Label>
                <Input
                  id="fga"
                  type="number"
                  min="0"
                  value={stats.fga}
                  onChange={(e) => handleInputChange('fga', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="three_points_made">3PT Made</Label>
                <Input
                  id="three_points_made"
                  type="number"
                  min="0"
                  value={stats.threePointsMade}
                  onChange={(e) => handleInputChange('threePointsMade', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="three_points_attempted">3PT Attempted</Label>
                <Input
                  id="three_points_attempted"
                  type="number"
                  min="0"
                  value={stats.threePointsAttempted}
                  onChange={(e) => handleInputChange('threePointsAttempted', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="ftm">Free Throws Made</Label>
                <Input
                  id="ftm"
                  type="number"
                  min="0"
                  value={stats.ftm}
                  onChange={(e) => handleInputChange('ftm', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="fta">Free Throws Attempted</Label>
                <Input
                  id="fta"
                  type="number"
                  min="0"
                  value={stats.fta}
                  onChange={(e) => handleInputChange('fta', parseInt(e.target.value) || 0)}
                />
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium">FG%: </span>
                <span>{(stats.fga || 0) > 0 ? ((stats.fgm || 0) / (stats.fga || 1) * 100).toFixed(1) : '0.0'}%</span>
              </div>
              <div>
                <span className="font-medium">3PT%: </span>
                <span>{(stats.threePointsAttempted || 0) > 0 ? ((stats.threePointsMade || 0) / (stats.threePointsAttempted || 1) * 100).toFixed(1) : '0.0'}%</span>
              </div>
              <div>
                <span className="font-medium">FT%: </span>
                <span>{(stats.fta || 0) > 0 ? ((stats.ftm || 0) / (stats.fta || 1) * 100).toFixed(1) : '0.0'}%</span>
              </div>
              <div>
                <span className="font-medium">Total: </span>
                <span>{stats.points}P, {stats.rebounds}R, {stats.assists}A</span>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-2">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Stats"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 