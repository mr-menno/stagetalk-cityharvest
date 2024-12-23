import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthActions } from "@convex-dev/auth/react";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { TriangleAlert } from "lucide-react";
import { api } from "shared/convex/_generated/api";
import useStagetalkStore from "shared/stagetalk-store";
import { QRCodeSVG } from "qrcode.react";

export const Route = createLazyFileRoute("/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  const { teamId, user } = useStagetalkStore();
  const team = useQuery(api.teams.getTeam, teamId ? { teamId } : "skip");

  const { signOut } = useAuthActions();

  async function handleForgetDevice() {
    localStorage.clear();
    await signOut();
    location.reload();
  }

  return (
    <div className="flex flex-col h-dvh overscroll-none">
      <div className="w-full bg-primary text-primary-foreground font-semibold p-2 flex flex-row">
        <Link className="flex-1" to="/messages">
          Stagetalk
        </Link>
      </div>
      <div className="flex flex-col flex-1 overflow-x-scroll p-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </CardContent>
        </Card>
        {team && (
          <Card>
            <CardHeader>
              <CardTitle>Team: {team.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col">
              <div>
                <strong>Invite Code:</strong>{" "}
                <span
                  className="font-mono"
                  onClick={() =>
                    navigator.clipboard.writeText(team.inviteCode || "")
                  }
                >
                  {team.inviteCode}
                </span>
              </div>
              {team.inviteCode && (
                <div>
                  <QRCodeSVG
                    value={`https://cityharvest.stagetalk.app/register/join?invite=${team.inviteCode}`}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        )}
        <Card>
          <CardHeader>
            <CardTitle className="text-destructive flex flex-row gap-2">
              <TriangleAlert className="size-4" />
              Danger Zone
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 w-full">
            <Button
              onClick={handleForgetDevice}
              className="bg-destructive w-full"
            >
              Forget Device
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
