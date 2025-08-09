"use client";

import React from 'react';
import { 
  Calendar, 
  Trophy, 
  ListOrdered,
  Info
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTheme } from "next-themes";

interface TournamentScheduleItem {
  month: string;
  name: string;
  dates: string;
  format: string;
  notes: string;
}

const OpenTournament: React.FC = () => {
  const { theme } = useTheme();

  const tournamentSchedule: TournamentScheduleItem[] = [
    {
      month: "October",
      name: "October Open",
      dates: "Oct 3–5, 2025",
      format: "32 Teams · Double Elim · BO7 Finals",
      notes: "Kickoff event · Open to all teams"
    },
    {
      month: "November",
      name: "November Open",
      dates: "Nov 14–16, 2025",
      format: "32 Teams · Double Elim · BO7 Finals",
      notes: "S1 Top 2 franchise teams get free entry"
    },
    {
      month: "December",
      name: "Holiday Festival",
      dates: "Dec 13–15, 2025",
      format: "Format TBD (Holiday Special)",
      notes: "S2 Top 2 franchises earn free entry"
    },
    {
      month: "January",
      name: "January Open",
      dates: "Jan 9–11, 2026",
      format: "32 Teams · Double Elim · BO7 Finals",
      notes: "Includes Top 2 from Franchise Season 3"
    },
    {
      month: "February",
      name: "February Open",
      dates: "Feb 13–15, 2026",
      format: "32 Teams · Double Elim · BO7 Finals",
      notes: "Includes Top 2 from Franchise Season 4"
    },
    {
      month: "March",
      name: "March Madness",
      dates: "Mar 28–30, 2026",
      format: "32 Teams · Double Elim · BO7 Finals",
      notes: "Includes Top 2 from Franchise Season 5"
    },
    {
      month: "April",
      name: "April Open",
      dates: "Apr 10–12, 2026",
      format: "32 Teams · Double Elim · BO7 Finals",
      notes: "Includes Top 2 from Franchise Season 6"
    },
    {
      month: "May",
      name: "May Open",
      dates: "May 15–17, 2026",
      format: "32 Teams · Double Elim · BO7 Finals",
      notes: "Final major before LAN qualifiers"
    },
    {
      month: "June",
      name: "East Coast Local",
      dates: "Jun 12–14, 2026",
      format: "32 Teams · LAN · Double Elim · BO7",
      notes: "In-person qualifier · Invite + Open Spots"
    },
    {
      month: "July",
      name: "West Coast Local",
      dates: "Jul 10–12, 2026",
      format: "32 Teams · LAN · Double Elim · BO7",
      notes: "In-person qualifier · Invite + Open Spots"
    },
    {
      month: "August",
      name: "Summer Championships",
      dates: "Aug 14–17, 2026",
      format: "16 Teams · Invite Only · BO7 Finals",
      notes: "Franchise Champ + Open Winners + LAN Qualifiers invited"
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="my-6">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <Trophy className="h-6 w-6" /> 2K26 Tournament Series
        </h2>
        
        <p className="text-muted-foreground mt-2">
          Official schedule for the 2026 competitive season
        </p>
        
        <Card className="mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" /> Month
                  </span>
                </TableHead>
                <TableHead>Tournament</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead className="whitespace-nowrap">
                  <span className="flex items-center gap-1">
                    <ListOrdered className="h-4 w-4" /> Format
                  </span>
                </TableHead>
                <TableHead className="whitespace-nowrap">
                  <span className="flex items-center gap-1">
                    <Info className="h-4 w-4" /> Notes
                  </span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tournamentSchedule.map((event, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{event.month}</TableCell>
                  <TableCell>
                    <span className="font-bold">{event.name}</span>
                  </TableCell>
                  <TableCell>{event.dates}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="whitespace-nowrap">
                      {event.format}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{event.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default OpenTournament;
