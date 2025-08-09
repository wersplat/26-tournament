import Image from "next/image";
import { cn } from "@/lib/utils";

interface TeamLogoProps {
  teamId: string;
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  borderColor?: string;
}

export function TeamLogo({
  teamId,
  name,
  size = "md",
  className,
  borderColor,
}: TeamLogoProps) {
  // Size mappings
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
    xl: "h-24 w-24",
  };

  // In a real app, we would have actual team logos
  // For now, we'll use placeholder images with team ID
  const logoSrc = `/teams/${teamId || 'placeholder'}.svg`;

  return (
    <div
      className={cn(
        "relative rounded-full overflow-hidden border",
        sizeClasses[size],
        borderColor,
        className
      )}
    >
      <Image
        src={logoSrc}
        alt={`${name} logo`}
        fill
        className="object-cover"
      />
    </div>
  );
}
