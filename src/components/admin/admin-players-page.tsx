"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AdminPlayersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Players Management</h1>
        <p className="text-muted-foreground">Manage player profiles and statistics</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Players</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Players management interface coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
} 