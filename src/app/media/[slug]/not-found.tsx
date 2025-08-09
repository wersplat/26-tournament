import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function MediaNotFound() {
  return (
    <div className="container flex flex-col items-center justify-center py-20 text-center space-y-6">
      <h1 className="text-4xl font-bold">Article Not Found</h1>
      <p className="text-muted-foreground max-w-md">
        The article you are looking for does not exist or may have been removed.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild>
          <Link href="/media">Browse All Articles</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">Return to Homepage</Link>
        </Button>
      </div>
    </div>
  );
}
