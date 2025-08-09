import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getAllPosts } from "@/lib/mdx";

export const metadata = {
  title: "Media | 2K26 Tournament Series",
  description: "News, recaps, and analysis from the 2K26 Tournament Series",
};

export default async function MediaPage() {
  const posts = await getAllPosts();

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Media</h1>
          <p className="text-muted-foreground md:text-lg">
            News, recaps, and analysis from the 2K26 Tournament Series
          </p>
        </div>

        {/* Featured post */}
        {posts.length > 0 && (
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
            <div className="md:grid md:grid-cols-2">
              <div className="relative h-64 md:h-full">
                <Image
                  src={posts[0].coverImage || "/placeholder.svg"}
                  alt={posts[0].title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex flex-col">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="secondary">{posts[0].tags[0]}</Badge>
                  <span className="text-sm text-muted-foreground">{posts[0].date}</span>
                </div>
                <h2 className="text-2xl font-bold mb-2">{posts[0].title}</h2>
                <p className="text-muted-foreground mb-4">{posts[0].excerpt}</p>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-muted"></div>
                  <div>
                    <p className="text-sm font-medium">{posts[0].author}</p>
                    <p className="text-xs text-muted-foreground">{posts[0].authorRole}</p>
                  </div>
                </div>
                <div className="mt-auto">
                  <Button asChild>
                    <Link href={`/media/${posts[0].slug}`}>Read More</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="bg-primary/5">
            All Content
          </Button>
          <Button variant="outline" size="sm">
            Recaps
          </Button>
          <Button variant="outline" size="sm">
            Analysis
          </Button>
          <Button variant="outline" size="sm">
            Team Profiles
          </Button>
          <Button variant="outline" size="sm">
            Interviews
          </Button>
        </div>

        {/* Post grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(1).map((post) => (
            <Link
              key={post.slug}
              href={`/media/${post.slug}`}
              className="rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
            >
              <div className="relative h-48">
                <Image
                  src={post.coverImage || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="secondary">{post.tags[0]}</Badge>
                  <span className="text-sm text-muted-foreground">{post.date}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center space-x-2 mt-auto">
                  <div className="w-6 h-6 rounded-full bg-muted"></div>
                  <p className="text-sm">{post.author}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Placeholder for when there are no posts */}
        {posts.length === 0 && (
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">No posts yet</h2>
            <p className="text-muted-foreground">
              Check back soon for news, recaps, and analysis from the 2K26 Tournament Series.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
