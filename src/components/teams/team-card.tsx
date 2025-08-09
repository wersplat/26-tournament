import Link from "next/link";
import { TeamLogo } from "@/components/teams/team-logo";

interface TeamCardProps {
  id: string;
  name: string;
  group: string;
  record: string;
  captainName: string;
  primaryColor: string;
  compact?: boolean;
}

export function TeamCard({
  id,
  name,
  group,
  record,
  captainName,
  primaryColor,
  compact = false,
}: TeamCardProps) {
  const borderColor = primaryColor.replace("bg-", "border-");
  
  if (compact) {
    return (
      <Link
        href={`/teams/${id}`}
        className="flex items-center space-x-3 rounded-md border p-2 hover:bg-muted/50 transition-colors"
      >
        <TeamLogo teamId={id} name={name} size="sm" borderColor={borderColor} />
        <div>
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs text-muted-foreground">Group {group}</p>
        </div>
      </Link>
    );
  }
  
  return (
    <Link
      href={`/teams/${id}`}
      className="rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      <div className={`h-3 w-full ${primaryColor}`}></div>
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <TeamLogo teamId={id} name={name} size="lg" borderColor={borderColor} />
          <div>
            <h2 className="font-semibold text-lg">{name}</h2>
            <p className="text-sm text-muted-foreground">Group {group}</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Record</p>
            <p className="font-medium">{record}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Captain</p>
            <p className="font-medium">{captainName}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
