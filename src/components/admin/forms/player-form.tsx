"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Save, X, UserPlus, UserCheck } from "lucide-react";
import { 
  useCreatePlayerMutation, 
  useUpdatePlayerMutation,
  useGetTeamsQuery,
  PlayerTier,
  PlayerPosition,
  SalaryTier
} from "@/types/generated/graphql";

interface PlayerFormProps {
  player?: {
    id: string;
    gamertag: string;
    region?: string | null;
    position?: PlayerPosition | null;
    salaryTier?: SalaryTier | null;
    teamName?: string | null;
    isVerified?: boolean | null;
    currentRp?: number | null;
    peakRp?: number | null;
    tier?: PlayerTier | null;
  };
  onSuccess?: () => void;
  onCancel?: () => void;
  mode: 'create' | 'edit';
}

export function PlayerForm({ player, onSuccess, onCancel, mode }: PlayerFormProps) {
  const [formData, setFormData] = useState({
    gamertag: player?.gamertag || '',
    region: player?.region || '',
    position: player?.position || undefined,
    salaryTier: player?.salaryTier || undefined,
    teamName: player?.teamName || '',
    isVerified: player?.isVerified || false,
    currentRp: player?.currentRp || 0,
    peakRp: player?.peakRp || 0,
    tier: player?.tier || undefined,
  });

  const [createPlayer, { loading: createLoading }] = useCreatePlayerMutation();
  const [updatePlayer, { loading: updateLoading }] = useUpdatePlayerMutation();
  
  const { data: teamsData, loading: teamsLoading } = useGetTeamsQuery({
    variables: { limit: 100, offset: 0 },
    errorPolicy: 'all',
  });

  const teams = teamsData?.getTeams || [];
  const loading = createLoading || updateLoading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (mode === 'create') {
        // For create, we need a userId - this would typically come from the current user or be selected
        const userId = "current-user-id"; // This should be dynamic based on your auth system
        
        await createPlayer({
          variables: {
            input: {
              userId,
              gamertag: formData.gamertag,
              region: formData.region || undefined,
              position: formData.position || undefined,
              salaryTier: formData.salaryTier || undefined,
              teamName: formData.teamName || undefined,
              isVerified: formData.isVerified,
            }
          }
        });
      } else {
        await updatePlayer({
          variables: {
            id: player!.id,
            input: {
              gamertag: formData.gamertag,
              region: formData.region || undefined,
              position: formData.position || undefined,
              salaryTier: formData.salaryTier || undefined,
              teamName: formData.teamName || undefined,
              isVerified: formData.isVerified,
              currentRp: formData.currentRp,
              peakRp: formData.peakRp,
              tier: formData.tier || undefined,
            }
          }
        });
      }
      
      onSuccess?.();
    } catch (error) {
      console.error('Error saving player:', error);
    }
  };

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          {mode === 'create' ? (
            <>
              <UserPlus className="h-5 w-5" />
              Create New Player
            </>
          ) : (
            <>
              <UserCheck className="h-5 w-5" />
              Edit Player: {player?.gamertag}
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gamertag" className="text-sm">Gamertag *</Label>
              <Input
                id="gamertag"
                value={formData.gamertag}
                onChange={(e) => handleInputChange('gamertag', e.target.value)}
                placeholder="Enter gamertag"
                required
                className="text-sm"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="region" className="text-sm">Region</Label>
              <Input
                id="region"
                value={formData.region}
                onChange={(e) => handleInputChange('region', e.target.value)}
                placeholder="e.g., NA, EU, APAC"
                className="text-sm"
              />
            </div>
          </div>

          {/* Position and Tier */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="position" className="text-sm">Position</Label>
              <Select value={formData.position || ''} onValueChange={(value) => handleInputChange('position', value)}>
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Point_Guard">Point Guard</SelectItem>
                  <SelectItem value="Shooting_Guard">Shooting Guard</SelectItem>
                  <SelectItem value="Power_Forward">Power Forward</SelectItem>
                  <SelectItem value="Center">Center</SelectItem>
                  <SelectItem value="Lock">Lock</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tier" className="text-sm">Player Tier</Label>
              <Select value={formData.tier || ''} onValueChange={(value) => handleInputChange('tier', value)}>
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="Select tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bronze">Bronze</SelectItem>
                  <SelectItem value="silver">Silver</SelectItem>
                  <SelectItem value="gold">Gold</SelectItem>
                  <SelectItem value="platinum">Platinum</SelectItem>
                  <SelectItem value="diamond">Diamond</SelectItem>
                  <SelectItem value="pink_diamond">Pink Diamond</SelectItem>
                  <SelectItem value="galaxy_opal">Galaxy Opal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Team Assignment */}
          <div className="space-y-2">
            <Label htmlFor="team" className="text-sm">Team</Label>
            <Select value={formData.teamName || ''} onValueChange={(value) => handleInputChange('teamName', value)}>
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="Select team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">No Team</SelectItem>
                {teams.map((team) => (
                  <SelectItem key={team.id} value={team.name}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Salary Tier and Verification */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="salaryTier" className="text-sm">Salary Tier</Label>
              <Select value={formData.salaryTier || ''} onValueChange={(value) => handleInputChange('salaryTier', value)}>
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="Select salary tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="S">S - Superstar</SelectItem>
                  <SelectItem value="A">A - All-Star</SelectItem>
                  <SelectItem value="B">B - Starter</SelectItem>
                  <SelectItem value="C">C - Role Player</SelectItem>
                  <SelectItem value="D">D - Bench</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm">Verification Status</Label>
              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="isVerified"
                  checked={formData.isVerified}
                  onChange={(e) => handleInputChange('isVerified', e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="isVerified" className="text-sm">
                  Player is verified
                </Label>
              </div>
            </div>
          </div>

          {/* RP Values (Edit mode only) */}
          {mode === 'edit' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="currentRp" className="text-sm">Current RP</Label>
                <Input
                  id="currentRp"
                  type="number"
                  value={formData.currentRp}
                  onChange={(e) => handleInputChange('currentRp', parseFloat(e.target.value) || 0)}
                  placeholder="0"
                  className="text-sm"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="peakRp" className="text-sm">Peak RP</Label>
                <Input
                  id="peakRp"
                  type="number"
                  value={formData.peakRp}
                  onChange={(e) => handleInputChange('peakRp', parseFloat(e.target.value) || 0)}
                  placeholder="0"
                  className="text-sm"
                />
              </div>
            </div>
          )}

          {/* Current Values Display (Edit mode) */}
          {mode === 'edit' && (
            <div className="p-3 sm:p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2 text-sm sm:text-base">Current Values</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs sm:text-sm">
                <div>
                  <span className="text-muted-foreground">Current RP:</span>
                  <Badge variant="outline" className="ml-1 text-xs">{player?.currentRp || 0}</Badge>
                </div>
                <div>
                  <span className="text-muted-foreground">Peak RP:</span>
                  <Badge variant="outline" className="ml-1 text-xs">{player?.peakRp || 0}</Badge>
                </div>
                <div>
                  <span className="text-muted-foreground">Tier:</span>
                  <Badge variant="outline" className="ml-1 text-xs">{player?.tier || 'Unranked'}</Badge>
                </div>
                <div>
                  <span className="text-muted-foreground">Verified:</span>
                  <Badge variant={player?.isVerified ? "default" : "secondary"} className="ml-1 text-xs">
                    {player?.isVerified ? "Yes" : "No"}
                  </Badge>
                </div>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={loading}
              className="w-full sm:w-auto"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {mode === 'create' ? 'Create Player' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
