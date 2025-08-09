"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Save, X, Users, UserCheck } from "lucide-react";
import { 
  useCreateTeamMutation, 
  useUpdateTeamMutation,
  useGetPlayersQuery
} from "@/types/generated/graphql";

interface TeamFormProps {
  team?: {
    id: string;
    name: string;
    description?: string | null;
    logoUrl?: string | null;
    region?: string | null;
    isActive: boolean;
  };
  onSuccess?: () => void;
  onCancel?: () => void;
  mode: 'create' | 'edit';
}

export function TeamForm({ team, onSuccess, onCancel, mode }: TeamFormProps) {
  const [formData, setFormData] = useState({
    name: team?.name || '',
    description: team?.description || '',
    logoUrl: team?.logoUrl || '',
    region: team?.region || '',
    isActive: team?.isActive ?? true,
  });

  const [createTeam, { loading: createLoading }] = useCreateTeamMutation();
  const [updateTeam, { loading: updateLoading }] = useUpdateTeamMutation();
  
  const { data: playersData, loading: playersLoading } = useGetPlayersQuery({
    variables: { limit: 100, offset: 0 },
    errorPolicy: 'all',
  });

  const players = playersData?.getPlayers || [];
  const loading = createLoading || updateLoading;

  // Get players currently on this team
  const teamPlayers = players.filter(player => player.teamName === team?.name);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (mode === 'create') {
        await createTeam({
          variables: {
            input: {
              name: formData.name,
              description: formData.description || undefined,
              logoUrl: formData.logoUrl || undefined,
              region: formData.region || undefined,
              isActive: formData.isActive,
            }
          }
        });
      } else {
        await updateTeam({
          variables: {
            id: team!.id,
            input: {
              name: formData.name,
              description: formData.description || undefined,
              logoUrl: formData.logoUrl || undefined,
              region: formData.region || undefined,
              isActive: formData.isActive,
            }
          }
        });
      }
      
      onSuccess?.();
    } catch (error) {
      console.error('Error saving team:', error);
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
              <Users className="h-5 w-5" />
              Create New Team
            </>
          ) : (
            <>
              <UserCheck className="h-5 w-5" />
              Edit Team: {team?.name}
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm">Team Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter team name"
                required
                className="text-sm"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter team description"
                rows={3}
                className="text-sm"
              />
            </div>
          </div>

          {/* Logo and Region */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="logoUrl" className="text-sm">Logo URL</Label>
              <Input
                id="logoUrl"
                value={formData.logoUrl}
                onChange={(e) => handleInputChange('logoUrl', e.target.value)}
                placeholder="https://example.com/logo.png"
                type="url"
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

          {/* Active Status */}
          <div className="space-y-2">
            <Label className="text-sm">Team Status</Label>
            <div className="flex items-center space-x-2 pt-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => handleInputChange('isActive', e.target.checked)}
                className="rounded"
              />
              <Label htmlFor="isActive" className="text-sm">
                Team is active
              </Label>
            </div>
          </div>

          {/* Current Team Players (Edit mode) */}
          {mode === 'edit' && teamPlayers.length > 0 && (
            <div className="p-3 sm:p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2 text-sm sm:text-base">Current Team Players ({teamPlayers.length})</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {teamPlayers.map((player) => (
                  <div key={player.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-2 bg-background rounded border space-y-1 sm:space-y-0">
                    <div className="flex-1">
                      <div className="font-medium text-xs sm:text-sm">{player.gamertag}</div>
                      <div className="text-xs text-muted-foreground">
                        {player.position || 'No position'} • {player.tier || 'Unranked'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs sm:text-sm font-medium">{player.currentRp || 0} RP</div>
                      <Badge variant={player.isVerified ? "default" : "secondary"} className="text-xs">
                        {player.isVerified ? "Verified" : "Unverified"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Current Values Display (Edit mode) */}
          {mode === 'edit' && (
            <div className="p-3 sm:p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2 text-sm sm:text-base">Current Team Info</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs sm:text-sm">
                <div>
                  <span className="text-muted-foreground">Players:</span>
                  <Badge variant="outline" className="ml-1 text-xs">{teamPlayers.length}</Badge>
                </div>
                <div>
                  <span className="text-muted-foreground">Region:</span>
                  <Badge variant="outline" className="ml-1 text-xs">{team?.region || 'None'}</Badge>
                </div>
                <div>
                  <span className="text-muted-foreground">Status:</span>
                  <Badge variant={team?.isActive ? "default" : "secondary"} className="ml-1 text-xs">
                    {team?.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <div>
                  <span className="text-muted-foreground">Created:</span>
                  <Badge variant="outline" className="ml-1 text-xs">
                    {team?.id ? 'Yes' : 'No'}
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
              {mode === 'create' ? 'Create Team' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
