import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Tournament Bracket | 2K26 Tournament Series",
  description: "View the current bracket for the 2K26 Tournament Series",
};

export default function TournamentBracketPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Tournament Bracket</h1>
          <p className="text-muted-foreground md:text-lg">
            Track the elimination rounds of the 2K26 Tournament Series
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/tournament/schedule">Tournament Schedule</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/tournament/format">Tournament Format</Link>
          </Button>
        </div>

        {/* Bracket Status */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-col space-y-2">
            <h2 className="text-xl font-semibold">Current Status</h2>
            <p className="text-muted-foreground">
              The tournament is currently in the Group Play stage. The bracket will be populated once the Group Play stage concludes.
            </p>
            <div className="mt-2">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-sm font-medium">Group Play in Progress (Week 2 of 4)</span>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                Bracket play begins August 14, 2025
              </div>
            </div>
          </div>
        </div>

        {/* Bracket Visualization */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Bracket Preview</h2>
          <p className="text-muted-foreground">
            Below is a preview of the double elimination bracket structure that will be used once Group Play concludes.
          </p>

          <div className="overflow-auto">
            <div className="min-w-[800px] p-4">
              {/* This would be replaced with an actual bracket visualization component */}
              <div className="grid grid-cols-4 gap-4">
                {/* Round 1 */}
                <div className="space-y-8">
                  <h3 className="text-center font-medium">Quarterfinals</h3>
                  <div className="space-y-16">
                    <div className="rounded-lg border bg-card p-3 h-24 flex flex-col justify-center">
                      <div className="text-sm font-medium">Group A #1 vs Group B #2</div>
                      <div className="text-xs text-muted-foreground">TBD vs TBD</div>
                    </div>
                    <div className="rounded-lg border bg-card p-3 h-24 flex flex-col justify-center">
                      <div className="text-sm font-medium">Group C #1 vs Group D #2</div>
                      <div className="text-xs text-muted-foreground">TBD vs TBD</div>
                    </div>
                    <div className="rounded-lg border bg-card p-3 h-24 flex flex-col justify-center">
                      <div className="text-sm font-medium">Group B #1 vs Group A #2</div>
                      <div className="text-xs text-muted-foreground">TBD vs TBD</div>
                    </div>
                    <div className="rounded-lg border bg-card p-3 h-24 flex flex-col justify-center">
                      <div className="text-sm font-medium">Group D #1 vs Group C #2</div>
                      <div className="text-xs text-muted-foreground">TBD vs TBD</div>
                    </div>
                  </div>
                </div>

                {/* Round 2 */}
                <div className="space-y-8">
                  <h3 className="text-center font-medium">Semifinals</h3>
                  <div className="space-y-32 pt-12">
                    <div className="rounded-lg border bg-card p-3 h-24 flex flex-col justify-center">
                      <div className="text-sm font-medium">Semifinal 1</div>
                      <div className="text-xs text-muted-foreground">TBD vs TBD</div>
                    </div>
                    <div className="rounded-lg border bg-card p-3 h-24 flex flex-col justify-center">
                      <div className="text-sm font-medium">Semifinal 2</div>
                      <div className="text-xs text-muted-foreground">TBD vs TBD</div>
                    </div>
                  </div>
                </div>

                {/* Round 3 */}
                <div className="space-y-8">
                  <h3 className="text-center font-medium">Finals</h3>
                  <div className="space-y-32 pt-44">
                    <div className="rounded-lg border bg-card p-3 h-24 flex flex-col justify-center">
                      <div className="text-sm font-medium">Championship</div>
                      <div className="text-xs text-muted-foreground">TBD vs TBD</div>
                    </div>
                  </div>
                </div>

                {/* Champion */}
                <div className="space-y-8">
                  <h3 className="text-center font-medium">Champion</h3>
                  <div className="space-y-32 pt-44">
                    <div className="rounded-lg border bg-primary/10 p-3 h-24 flex flex-col justify-center items-center">
                      <div className="text-sm font-medium">2K26 Champion</div>
                      <div className="text-xs text-muted-foreground">To Be Crowned</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Losers Bracket */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Losers Bracket</h2>
          <p className="text-muted-foreground">
            The 2K26 Tournament features a double elimination format. Teams that lose in the winners bracket drop to the losers bracket for a second chance.
          </p>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="text-center text-muted-foreground">
              Losers bracket will be displayed once the tournament advances to the bracket stage.
            </div>
          </div>
        </div>

        {/* Previous Champions */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Previous Champions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <div className="text-center">
                <div className="text-sm text-muted-foreground">2K25 Champion</div>
                <div className="text-xl font-bold mt-1">Franchise Alpha</div>
                <div className="text-sm mt-2">Defeated Franchise Omega 3-1</div>
              </div>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <div className="text-center">
                <div className="text-sm text-muted-foreground">2K24 Champion</div>
                <div className="text-xl font-bold mt-1">Franchise Delta</div>
                <div className="text-sm mt-2">Defeated Franchise Beta 3-2</div>
              </div>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <div className="text-center">
                <div className="text-sm text-muted-foreground">2K23 Champion</div>
                <div className="text-xl font-bold mt-1">Franchise Gamma</div>
                <div className="text-sm mt-2">Defeated Franchise Alpha 3-0</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
