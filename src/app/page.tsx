// Image component is used in other components
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  2K26 Tournament Series
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  The ultimate NBA 2K competition featuring the best players and franchises competing for glory.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" asChild>
                  <Link href="/tournament/schedule">View Schedule</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/teams">Browse Teams</Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[300px] w-full md:h-[400px] lg:h-[500px] overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-700 opacity-80 rounded-xl"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h2 className="text-4xl md:text-6xl font-bold text-white">2K26</h2>
                </div>
                {/* Replace with actual tournament logo/image when available */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Tournament Status */}
      <section className="w-full py-8 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">Current Tournament Stage</h2>
              <p className="text-muted-foreground">
                Group Play - Week 2 of 4
              </p>
            </div>
            <div className="w-full max-w-3xl grid gap-4 md:grid-cols-3">
              <div className="flex flex-col items-center justify-center space-y-2 p-4 bg-background rounded-lg border shadow-sm">
                <h3 className="text-xl font-medium">Next Match</h3>
                <p className="text-sm text-muted-foreground">Today, 8:00 PM ET</p>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Team A</span>
                  <span>vs</span>
                  <span className="font-semibold">Team B</span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 p-4 bg-background rounded-lg border shadow-sm">
                <h3 className="text-xl font-medium">Live Now</h3>
                <p className="text-sm text-muted-foreground">Group Stage - Game 3</p>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Team C</span>
                  <span>vs</span>
                  <span className="font-semibold">Team D</span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 p-4 bg-background rounded-lg border shadow-sm">
                <h3 className="text-xl font-medium">Recent Result</h3>
                <p className="text-sm text-muted-foreground">Yesterday</p>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Team E</span>
                  <span>86 - 92</span>
                  <span className="font-semibold">Team F</span>
                </div>
              </div>
            </div>
            <Button variant="outline" asChild>
              <Link href="/tournament/schedule">View Full Schedule</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Content Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Featured Content</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Latest highlights, recaps, and analysis from the 2K26 Tournament Series.
              </p>
            </div>
            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Featured content cards would go here */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="group relative overflow-hidden rounded-lg border bg-background">
                  <div className="h-60 w-full bg-muted"></div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold">Featured Article {i}</h3>
                    <p className="text-sm text-muted-foreground">July 30, 2025</p>
                    <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam quis aliquam ultricies.
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" asChild>
              <Link href="/media">View All Media</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
