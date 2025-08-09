import { Button } from "@/components/ui/button";
import Link from "next/link";
import OpenTournament from "@/components/OpenTournament";
import { Suspense } from "react";

export const metadata = {
  title: "Tournament Schedule | 2K26 Tournament Series",
  description: "View the complete schedule for the 2K26 Tournament Series",
};

export default function TournamentSchedulePage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Tournament Schedule</h1>
          <p className="text-muted-foreground md:text-lg">
            View all upcoming and completed matches in the 2K26 Tournament Series
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/tournament/format">Tournament Format</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/tournament/bracket">Bracket View</Link>
          </Button>
        </div>
        
        {/* Render the OpenTournament component with Suspense for loading state */}
        <Suspense fallback={<div className="py-12 text-center">Loading tournament schedule...</div>}>
          <div className="mt-6">
            <OpenTournament />
          </div>
        </Suspense>
      </div>
    </div>
  );
}
