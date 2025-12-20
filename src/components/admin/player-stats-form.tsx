"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { adminService } from "@/services/admin-service";
import type { PlayerMatchStats } from "@/types/graphql";
import { useAuth } from "@clerk/nextjs";

// Use specific input type matching Supabase columns
interface PlayerMatchStatsInput {
  player_id: string;
  team_id: string;
  points: number;
  assists: number;
  rebounds: number;
  steals: number;
  blocks: number;
  turnovers: number;
  fouls: number;
  fg_made: number;
  fg_attempted: number;
  three_points_made: number;
  three_points_attempted: number;
  ft_made: number;
  ft_attempted: number;
}

interface PlayerStatsFormProps {
  matchId: string;
  playerId: string;
  teamId: string;
  onSuccess?: () => void;
  initialData?: Partial<PlayerMatchStats>;
}

export function PlayerStatsForm({ matchId, playerId, teamId, onSuccess, initialData }: PlayerStatsFormProps) {
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();
  
  const { register, handleSubmit } = useForm<PlayerMatchStatsInput>({
    defaultValues: {
      player_id: playerId,
      team_id: teamId,
      points: initialData?.points || 0,
      assists: initialData?.assists || 0,
      rebounds: initialData?.rebounds || 0,
      steals: initialData?.steals || 0,
      blocks: initialData?.blocks || 0,
      turnovers: initialData?.turnovers || 0,
      fouls: initialData?.fouls || 0,
      fg_made: (initialData as any)?.fg_made || 0,
      fg_attempted: (initialData as any)?.fg_attempted || 0,
      three_points_made: (initialData as any)?.three_points_made || 0,
      three_points_attempted: (initialData as any)?.three_points_attempted || 0,
      ft_made: (initialData as any)?.ft_made || 0,
      ft_attempted: (initialData as any)?.ft_attempted || 0,
    }
  });

  const onSubmit = async (data: PlayerMatchStatsInput) => {
    setLoading(true);
    
    const stats = {
      ...data,
      match_id: matchId,
    };
    
    try {
      const token = await getToken();
      await adminService.createPlayerStats(stats, token);
      onSuccess?.();
    } catch (error) {
      console.error('Error creating player stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Player Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="points">Points</Label>
              <Input id="points" type="number" {...register("points", { valueAsNumber: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="assists">Assists</Label>
              <Input id="assists" type="number" {...register("assists", { valueAsNumber: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rebounds">Rebounds</Label>
              <Input id="rebounds" type="number" {...register("rebounds", { valueAsNumber: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="steals">Steals</Label>
              <Input id="steals" type="number" {...register("steals", { valueAsNumber: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="blocks">Blocks</Label>
              <Input id="blocks" type="number" {...register("blocks", { valueAsNumber: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="turnovers">Turnovers</Label>
              <Input id="turnovers" type="number" {...register("turnovers", { valueAsNumber: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fg_made">FG Made</Label>
              <Input id="fg_made" type="number" {...register("fg_made", { valueAsNumber: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fg_attempted">FG Attempted</Label>
              <Input id="fg_attempted" type="number" {...register("fg_attempted", { valueAsNumber: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="three_points_made">3PT Made</Label>
              <Input id="three_points_made" type="number" {...register("three_points_made", { valueAsNumber: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="three_points_attempted">3PT Attempted</Label>
              <Input id="three_points_attempted" type="number" {...register("three_points_attempted", { valueAsNumber: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ft_made">FT Made</Label>
              <Input id="ft_made" type="number" {...register("ft_made", { valueAsNumber: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ft_attempted">FT Attempted</Label>
              <Input id="ft_attempted" type="number" {...register("ft_attempted", { valueAsNumber: true })} />
            </div>
          </div>
          
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Stats"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
