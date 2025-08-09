import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface MdxImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function MdxImage({ src, alt, className }: MdxImageProps) {
  return (
    <div className={cn("relative w-full h-64 my-6 rounded-lg overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}

interface MdxLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function MdxLink({ href, children, className }: MdxLinkProps) {
  return (
    <Link 
      href={href} 
      className={cn("text-primary underline underline-offset-4", className)}
    >
      {children}
    </Link>
  );
}

interface MdxHeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}

export function MdxHeading({ level, children, className }: MdxHeadingProps) {
  const styles = {
    1: "text-3xl font-bold tracking-tighter mt-8 mb-4 sm:text-4xl",
    2: "text-2xl font-semibold mt-8 mb-4",
    3: "text-xl font-semibold mt-6 mb-3",
    4: "text-lg font-medium mt-6 mb-3",
    5: "text-base font-medium mt-4 mb-2",
    6: "text-sm font-medium mt-4 mb-2",
  };
  
  switch (level) {
    case 1:
      return <h1 className={cn(styles[1], className)}>{children}</h1>;
    case 2:
      return <h2 className={cn(styles[2], className)}>{children}</h2>;
    case 3:
      return <h3 className={cn(styles[3], className)}>{children}</h3>;
    case 4:
      return <h4 className={cn(styles[4], className)}>{children}</h4>;
    case 5:
      return <h5 className={cn(styles[5], className)}>{children}</h5>;
    case 6:
      return <h6 className={cn(styles[6], className)}>{children}</h6>;
    default:
      return <h2 className={cn(styles[2], className)}>{children}</h2>;
  }
}

interface MdxBlockquoteProps {
  children: React.ReactNode;
  className?: string;
}

export function MdxBlockquote({ children, className }: MdxBlockquoteProps) {
  return (
    <blockquote className={cn("border-l-4 border-primary pl-4 italic my-6", className)}>
      {children}
    </blockquote>
  );
}

interface MdxTableProps {
  children: React.ReactNode;
  className?: string;
}

export function MdxTable({ children, className }: MdxTableProps) {
  return (
    <div className="overflow-x-auto my-6">
      <table className={cn("w-full border-collapse", className)}>
        {children}
      </table>
    </div>
  );
}

export const mdxComponents = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => <MdxHeading level={1} className={className}>{props.children}</MdxHeading>,
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => <MdxHeading level={2} className={className}>{props.children}</MdxHeading>,
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => <MdxHeading level={3} className={className}>{props.children}</MdxHeading>,
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => <MdxHeading level={4} className={className}>{props.children}</MdxHeading>,
  h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => <MdxHeading level={5} className={className}>{props.children}</MdxHeading>,
  h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => <MdxHeading level={6} className={className}>{props.children}</MdxHeading>,
  a: MdxLink,
  img: MdxImage,
  blockquote: MdxBlockquote,
  table: MdxTable,
  // Add more custom components as needed
};
