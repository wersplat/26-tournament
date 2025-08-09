import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getPostBySlug, getAllPosts, compileMDXContent } from "@/lib/mdx";
import { Metadata } from "next";

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: "Post Not Found | 2K26 Tournament Series",
    };
  }
  
  return {
    title: `${post.title} | 2K26 Tournament Series`,
    description: post.excerpt,
  };
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = await getAllPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface PageProps {
  params: Params;
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function PostPage({ params }: PageProps) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }
  
  const content = await compileMDXContent(post.content);
  
  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col space-y-6 max-w-3xl mx-auto">
        <Button variant="outline" size="sm" className="w-fit" asChild>
          <Link href="/media">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-4 w-4"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Media
          </Link>
        </Button>
        
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
          <span className="text-sm text-muted-foreground">{post.date}</span>
        </div>
        
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{post.title}</h1>
        
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-muted"></div>
          <div>
            <p className="font-medium">{post.author}</p>
            <p className="text-sm text-muted-foreground">{post.authorRole}</p>
          </div>
        </div>
        
        <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden">
          <Image
            src={post.coverImage || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <article className="prose prose-gray dark:prose-invert max-w-none">
          {content}
        </article>
        
        <div className="border-t pt-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Related Content</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/media"
              className="rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow p-4 flex items-center space-x-4"
            >
              <div className="relative w-16 h-16 rounded overflow-hidden">
                <Image
                  src="/placeholder.svg"
                  alt="Related content"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium">More tournament coverage</p>
                <p className="text-sm text-muted-foreground">View all media content</p>
              </div>
            </Link>
            <Link
              href="/standings"
              className="rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow p-4 flex items-center space-x-4"
            >
              <div className="relative w-16 h-16 rounded overflow-hidden">
                <Image
                  src="/placeholder.svg"
                  alt="Standings"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium">Current Standings</p>
                <p className="text-sm text-muted-foreground">View tournament standings</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
