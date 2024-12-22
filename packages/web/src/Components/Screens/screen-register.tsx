import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { useState } from "react";
import { api } from "shared/convex/_generated/api";

export default function ScreenRegister() {
  const [teamName, setTeamName] = useState("");
  const createTeam = useMutation(api.teams.createTeam);

  const [inviteCode, setInviteCode] = useState("");
  const joinTeam = useMutation(api.teams.joinTeam);

  async function handleCreateTeam() {
    //TODO: handle loading state
    await createTeam({ name: teamName });
  }

  async function handleJoinTeam() {
    //TODO: validate before submit
    //TODO: handle loading state
    await joinTeam({ inviteCode });
  }

  return (
    <div className="flex flex-col items-center justify-center h-dvh p-4">
      <div className="w-full p-4 flex flex-col items-center gap-4">
        <input
          type="text"
          placeholder="Team Name"
          className="w-full text-center text-4xl outline-none border-b"
          value={teamName}
          onChange={({ target: { value } }) => setTeamName(value)}
        />
        <Button
          variant={"outline"}
          className="w-full"
          disabled={!teamName}
          onClick={handleCreateTeam}
        >
          Create Team
        </Button>
      </div>
      <div className="w-full flex flex-col items-center gap-4 relative">
        <div className="bg-white z-10 px-2">or</div>
        <div className="absolute w-full border-b top-3" />
      </div>
      <div className="p-4 w-full flex flex-col gap-4">
        <input
          type="text"
          placeholder="invite code"
          className="text-4xl flex flex-row text-center uppercase outline-none focus:placeholder-white"
          style={{ letterSpacing: "0.5rem" }}
          value={inviteCode}
          onChange={({ target: { value } }) =>
            setInviteCode(
              value
                .toUpperCase()
                .replace(/[^ABCDEFGHJKLMNPQRSTUVWXYZ]/g, "")
                .substring(0, 6)
            )
          }
        />
        <Button
          variant="outline"
          disabled={inviteCode.length !== 6}
          onClick={handleJoinTeam}
        >
          Join Team
        </Button>
      </div>
      <div className="w-full flex flex-col items-center gap-4 relative">
        <div className="bg-white z-10 px-2">or</div>
        <div className="absolute w-full border-b top-3" />
      </div>
      <div className="p-4 w-full flex flex-col gap-4">
        <Button variant={"outline"} disabled>
          Scan Code
        </Button>
      </div>
    </div>
  );
}
