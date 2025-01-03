import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useMutation } from "convex/react";
import { api } from "shared/convex/_generated/api";
import Loader from "@/components/loader";

export default function ScreenRegister() {
  const [flow, setFlow] = useState<"choose" | "join" | "create" | "joining">(
    "choose"
  );
  const [inviteCode, setInviteCode] = useState("");
  const joinTeam = useMutation(api.teams.joinTeam);
  const [error, setError] = useState<string | null>(null);

  async function handleJoinTeam() {
    setFlow("joining");
    try {
      await joinTeam({ inviteCode });
    } catch (e: any) {
      setFlow("choose");
      setError(
        "Failed to join team. Please check the invite code and try again. (" +
          e.message +
          ")"
      );
    }
  }
  return (
    <div className="h-full w-full flex flex-col gap-4  justify-center items-center">
      {error && (
        <div className="m-4 border-red-600 rounded-lg bg-red-100 p-4">
          <strong>Error</strong>: {error}
        </div>
      )}

      {flow === "choose" && (
        <div className="flex flex-row gap-4">
          <Card className="max-w-56">
            <CardContent className="p-4 flex flex-col gap-4">
              <div className="text-center">
                Got an invite code? Join an existing team!
              </div>
              <Button variant={"default"} onClick={() => setFlow("join")}>
                Join Team
              </Button>
            </CardContent>
          </Card>
          <Card className="max-w-56">
            <CardContent className="p-4 flex flex-col gap-4">
              <div className="text-center">
                Want to start a new team? Get started here.
              </div>
              <Button variant={"outline"} disabled>
                Create Team
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {flow === "join" && (
        <Card className="max-w-96">
          <CardHeader>
            <CardTitle className="text-center">Join Team</CardTitle>
            <CardDescription className="text-center">
              Enter the invite code to join an existing team.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 pb-4 flex flex-col gap-4">
            <Input
              placeholder="Invite Code"
              className="text-center"
              value={inviteCode}
              onChange={({ target: { value } }) =>
                setInviteCode(value.substring(0, 6).toUpperCase())
              }
            />
            <Button
              variant={"default"}
              onClick={handleJoinTeam}
              disabled={inviteCode.length < 6}
            >
              Join Team
            </Button>
          </CardContent>
        </Card>
      )}

      {flow === "joining" && <Loader description="Joining Team..." />}
    </div>
  );
}
