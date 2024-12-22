import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { api } from "shared/convex/_generated/api";
import useStagetalkStore from "shared/stagetalk-store";

export const Route = createLazyFileRoute("/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  const { teamId } = useStagetalkStore();
  const team = useQuery(api.teams.getTeam, teamId ? { teamId } : "skip");

  return (
    <div className="flex flex-col h-dvh overscroll-none">
      <div className="w-full bg-primary text-primary-foreground font-semibold p-2 flex flex-row">
        <div className="flex-1">Stagetalk</div>
      </div>
      <div className="flex flex-col flex-1 overflow-x-scroll p-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
          </CardHeader>
          <CardContent>Your profile...</CardContent>
        </Card>
        {team && (
          <Card>
            <CardHeader>
              <CardTitle>Team: {team.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col">
              <div>
                <strong>Invite Code:</strong>{" "}
                <span className="font-mono">{team.inviteCode}</span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
