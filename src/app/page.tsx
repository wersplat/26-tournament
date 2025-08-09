// Image component is used in other components
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Users, Calendar, TrendingUp, Play, Award, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-background via-background to-muted/30 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="container relative px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-6 animate-fade-in">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="animate-pulse">
                    <Trophy className="w-3 h-3 mr-1" />
                    Tournament Series
                  </Badge>
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  2K26 Tournament
                </h1>
                <h2 className="text-2xl font-semibold text-muted-foreground sm:text-3xl">
                  Championship Series
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl leading-relaxed">
                  The ultimate NBA 2K competition featuring the best players and franchises competing for glory, recognition, and the championship title.
                </p>
              </div>
              <div className="flex flex-col gap-3 min-[400px]:flex-row">
                <Button size="lg" className="group hover-lift" asChild>
                  <Link href="/tournament/schedule" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    View Schedule
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="group hover-lift" asChild>
                  <Link href="/teams" className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Browse Teams
                  </Link>
                </Button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">16</div>
                  <div className="text-sm text-muted-foreground">Teams</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">64</div>
                  <div className="text-sm text-muted-foreground">Players</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">$50K</div>
                  <div className="text-sm text-muted-foreground">Prize Pool</div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center animate-scale-in">
              <div className="relative h-[400px] w-full md:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl shadow-strong">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 opacity-90 rounded-2xl"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <div className="text-center space-y-4">
                    <div className="text-6xl md:text-8xl font-bold tracking-wider">2K26</div>
                    <div className="text-xl md:text-2xl font-medium opacity-90">Championship</div>
                    <div className="flex items-center justify-center gap-2">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-lg">Elite Competition</span>
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    </div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute top-4 left-4 w-3 h-3 bg-white/20 rounded-full animate-pulse"></div>
                <div className="absolute top-8 right-8 w-2 h-2 bg-white/30 rounded-full animate-pulse delay-1000"></div>
                <div className="absolute bottom-6 left-8 w-4 h-4 bg-white/15 rounded-full animate-pulse delay-500"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Tournament Status */}
      <section className="w-full py-12 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-8 text-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Current Tournament Stage</h2>
              <p className="text-muted-foreground text-lg">
                Group Play - Week 2 of 4
              </p>
            </div>
            
            <div className="w-full max-w-4xl grid gap-6 md:grid-cols-3">
              <Card className="group hover-lift transition-all duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    Next Match
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">Today, 8:00 PM ET</p>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="font-semibold">Team Alpha</span>
                    <span className="text-muted-foreground">vs</span>
                    <span className="font-semibold">Team Beta</span>
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    <Play className="w-4 h-4 mr-2" />
                    Watch Live
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="group hover-lift transition-all duration-300 border-green-200 dark:border-green-800">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Live Now
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">Group Stage - Game 3</p>
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <span className="font-semibold">Team Gamma</span>
                    <span className="text-green-600 dark:text-green-400 font-bold">LIVE</span>
                    <span className="font-semibold">Team Delta</span>
                  </div>
                  <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                    <Play className="w-4 h-4 mr-2" />
                    Join Stream
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="group hover-lift transition-all duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-500" />
                    Recent Result
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">Yesterday</p>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="font-semibold">Team Epsilon</span>
                    <span className="font-bold text-lg">86 - 92</span>
                    <span className="font-semibold">Team Zeta</span>
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    View Highlights
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <Button variant="outline" size="lg" className="hover-lift" asChild>
              <Link href="/tournament/schedule" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                View Full Schedule
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Content Section */}
      <section className="w-full py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-8 text-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Featured Content</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                Latest highlights, recaps, and analysis from the 2K26 Tournament Series.
              </p>
            </div>
            
            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Week 1 Tournament Recap",
                  date: "July 30, 2025",
                  description: "Highlights from the opening week of the 2K26 Tournament Series, featuring incredible plays and unexpected upsets.",
                  image: "bg-gradient-to-br from-blue-500 to-purple-600",
                  badge: "Featured"
                },
                {
                  title: "MVP Race Heating Up",
                  date: "July 28, 2025",
                  description: "Analysis of the top performers and who's leading the race for the tournament MVP award.",
                  image: "bg-gradient-to-br from-green-500 to-teal-600",
                  badge: "Analysis"
                },
                {
                  title: "Team Alpha Profile",
                  date: "July 25, 2025",
                  description: "Deep dive into Team Alpha's strategy, roster, and their path to tournament success.",
                  image: "bg-gradient-to-br from-orange-500 to-red-600",
                  badge: "Profile"
                }
              ].map((item, i) => (
                <Card key={i} className="group interactive-card overflow-hidden">
                  <div className={`h-48 w-full ${item.image} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                        {item.badge}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                      <Button variant="ghost" className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        Read More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Button variant="outline" size="lg" className="hover-lift" asChild>
              <Link href="/media" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                View All Media
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full py-16 bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to Compete?</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Join the 2K26 Tournament Series and prove you have what it takes to be a champion.
              </p>
            </div>
            <div className="flex flex-col gap-3 min-[400px]:flex-row">
              <Button size="lg" className="hover-lift" asChild>
                <Link href="/rankings" className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  View Rankings
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="hover-lift" asChild>
                <Link href="/standings" className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  Check Standings
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
