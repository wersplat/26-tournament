"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AdminTeamsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Teams Management</h1>
        <p className="text-muted-foreground">Manage teams and rosters</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Teams</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Teams management interface coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
} 