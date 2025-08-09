import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';

// Types for MDX content
export interface PostMeta {
  title: string;
  date: string;
  excerpt: string;
  author: string;
  authorRole?: string;
  coverImage: string;
  tags: string[];
  slug: string;
}

export interface Post extends PostMeta {
  content: string;
}

// Directory where MDX files are stored
const postsDirectory = path.join(process.cwd(), 'src/content/posts');

// Get all post slugs
export async function getPostSlugs(): Promise<string[]> {
  try {
    // Check if directory exists first
    if (!fs.existsSync(postsDirectory)) {
      console.warn('Posts directory does not exist yet');
      return [];
    }
    
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
      .filter(fileName => fileName.endsWith('.mdx'))
      .map(fileName => fileName.replace(/\.mdx$/, ''));
  } catch (error) {
    console.error('Error getting post slugs:', error);
    return [];
  }
}

// Get post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    
    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      title: data.title || '',
      date: data.date || '',
      excerpt: data.excerpt || '',
      author: data.author || '',
      authorRole: data.authorRole || '',
      coverImage: data.coverImage || '',
      tags: data.tags || [],
      slug,
      content,
    };
  } catch (error) {
    console.error(`Error getting post by slug ${slug}:`, error);
    return null;
  }
}

// Get all posts with metadata
export async function getAllPosts(): Promise<PostMeta[]> {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const post = await getPostBySlug(slug);
      return post ? {
        title: post.title,
        date: post.date,
        excerpt: post.excerpt,
        author: post.author,
        authorRole: post.authorRole,
        coverImage: post.coverImage,
        tags: post.tags,
        slug: post.slug,
      } : null;
    })
  );
  
  // Filter out null values and sort by date (newest first)
  return posts
    .filter((post): post is PostMeta => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Compile MDX content with components
export async function compileMDXContent(source: string) {
  const { content } = await compileMDX({
    source,
    options: { parseFrontmatter: true },
  });
  
  return content;
}
