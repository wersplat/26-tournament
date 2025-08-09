import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Tournament Format | 2K26 Tournament Series",
  description: "Learn about the format and structure of the 2K26 Tournament Series",
};

export default function TournamentFormatPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Tournament Format</h1>
          <p className="text-muted-foreground md:text-lg">
            Understanding the structure and progression of the 2K26 Tournament Series
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/tournament/schedule">Tournament Schedule</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/tournament/bracket">Bracket View</Link>
          </Button>
        </div>

        {/* Overview Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Overview</h2>
          <p className="text-muted-foreground">
            The 2K26 Tournament Series features a hybrid format that combines group play and elimination brackets to determine the champion. 
            The tournament is designed to provide ample competitive opportunities while ensuring the best teams advance to the later stages.
          </p>
        </div>

        {/* Format Stages */}
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <div className="rounded-full bg-primary/10 p-3">
                  <span className="text-xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-semibold">Group Play</h3>
              </div>
              <div className="space-y-2">
                <p>4 weeks of round-robin competition</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>16 franchises divided into 4 groups</li>
                  <li>Each team plays 3 games (one against each team in their group)</li>
                  <li>Top 2 teams from each group advance</li>
                  <li>Tiebreakers: Head-to-head, point differential, total points</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <div className="rounded-full bg-primary/10 p-3">
                  <span className="text-xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-semibold">Bracket Stage</h3>
              </div>
              <div className="space-y-2">
                <p>Double elimination bracket format</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>8 teams compete in a seeded bracket</li>
                  <li>Winners bracket and losers bracket</li>
                  <li>Teams must lose twice to be eliminated</li>
                  <li>All matches are best-of-three series</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <div className="rounded-full bg-primary/10 p-3">
                  <span className="text-xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-semibold">Finals</h3>
              </div>
              <div className="space-y-2">
                <p>Championship series</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Best-of-five series</li>
                  <li>Winners bracket finalist has 1-game advantage</li>
                  <li>Championship trophy and prize pool</li>
                  <li>MVP award based on tournament performance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Rules Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Tournament Rules</h2>
          <div className="space-y-4">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <h3 className="text-lg font-medium mb-2">Game Settings</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>NBA 2K26 with latest roster updates</li>
                <li>8-minute quarters</li>
                <li>Pro difficulty</li>
                <li>Fatigue: On</li>
                <li>Injuries: Off</li>
              </ul>
            </div>

            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <h3 className="text-lg font-medium mb-2">Team Structure</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Each franchise has a 10-player roster</li>
                <li>Salary cap: 100 million virtual currency</li>
                <li>Player contracts based on skill rating</li>
                <li>Mid-tournament trading window after group stage</li>
              </ul>
            </div>

            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <h3 className="text-lg font-medium mb-2">Scoring & Advancement</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Group stage: 3 points for win, 0 points for loss</li>
                <li>Top 2 teams from each group advance</li>
                <li>Bracket seeding based on group performance</li>
                <li>MVP points awarded for statistical achievements</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Prize Pool Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Prize Pool</h2>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center p-4 bg-primary/5 rounded-lg">
                <span className="text-2xl font-bold text-primary">1st</span>
                <span className="text-lg font-semibold">$50,000</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-primary/5 rounded-lg">
                <span className="text-2xl font-bold text-primary">2nd</span>
                <span className="text-lg font-semibold">$25,000</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-primary/5 rounded-lg">
                <span className="text-2xl font-bold text-primary">3rd</span>
                <span className="text-lg font-semibold">$15,000</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-primary/5 rounded-lg">
                <span className="text-2xl font-bold text-primary">4th</span>
                <span className="text-lg font-semibold">$10,000</span>
              </div>
            </div>
            <div className="mt-4 text-center text-sm text-muted-foreground">
              Additional prizes: MVP Award ($5,000), Best Defensive Player ($2,500), Rookie of the Tournament ($2,500)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
