"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, AlertCircle } from "lucide-react";

// Force dynamic rendering to prevent SSR issues
export const dynamic = 'force-dynamic';

export default function StandingsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <Trophy className="h-8 w-8 text-yellow-600" />
          <h1 className="text-3xl font-bold text-gray-900">Standings</h1>
        </div>
        <p className="text-gray-600">View current tournament standings and team rankings</p>
      </div>

      {/* Placeholder Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-500" />
            Standings Data Temporarily Unavailable
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            The standings data is currently being updated. Please check back later.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
