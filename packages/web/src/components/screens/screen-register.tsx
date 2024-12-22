import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { Mic } from "lucide-react";
import { useState } from "react";
import { api } from "shared/convex/_generated/api";

function ChoiceButton({
  children,
  onClick = () => {},
  disabled = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      className="w-full rounded-full text-2xl shadow-2xl bg-white/25 border-white p-8 "
      disabled={disabled}
    >
      {children}
    </Button>
  );
}

function CreateTeam({
  teamName,
  setTeamName,
  handleCreateTeam,
}: {
  teamName: string;
  setTeamName: (name: string) => void;
  handleCreateTeam: () => void;
}) {
  return (
    <div className="flex flex-col w-full items-center gap-4">
      <input
        type="text"
        placeholder="Team Name"
        className="w-full bg-white/20 py-2 placeholder:text-gray-600 border-b-2 text-center text-4xl outline-none"
        value={teamName}
        onChange={({ target: { value } }) => setTeamName(value)}
      />
      <ChoiceButton disabled={!teamName} onClick={handleCreateTeam}>
        Create Team
      </ChoiceButton>
    </div>
  );
}

function JoinTeam({
  inviteCode,
  setInviteCode,
  handleJoinTeam,
}: {
  inviteCode: string;
  setInviteCode: (code: string) => void;
  handleJoinTeam: () => void;
}) {
  return (
    <div className="p-4 w-full flex flex-col items-center gap-4">
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
  );
}
export default function ScreenRegister() {
  const [view, setView] = useState<"choose" | "create" | "join" | "scan">(
    "choose"
  );
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
    <div
      style={{
        backgroundImage:
          "radial-gradient(100% 100% at 50% 100%, #a0aec0 0%, rgba(163, 187, 211, 0.75) 25%, rgba(169, 201, 227, 0.5) 50%, rgba(190, 227, 248, 0) 100%), linear-gradient(90deg, #718096 0%, #6b7a8f 14.29%, #667389 28.57%, #606d82 42.86%, #5a677c 57.14%, #556175 71.43%, #4a5568 100%)",
      }}
      className="flex flex-col items-center h-dvh p-4 gap-16 pt-16"
    >
      <div className="flex flex-col gap-2 items-center">
        <div className="flex items-center justify-center p-4 bg-white/50 shadow-2xl rounded-full">
          <Mic className="size-24" />
        </div>
        <div className="text-4xl font-semibold">Stagetalk</div>
      </div>
      {view === "choose" && (
        <div className="flex flex-col w-full items-center gap-4">
          <ChoiceButton onClick={() => setView("create")}>
            Create Team
          </ChoiceButton>
          <ChoiceButton onClick={() => setView("join")}>Join Team</ChoiceButton>
          <ChoiceButton onClick={() => setView("scan")}>Scan Code</ChoiceButton>
        </div>
      )}
      {view === "create" && (
        <CreateTeam
          teamName={teamName}
          setTeamName={setTeamName}
          handleCreateTeam={handleCreateTeam}
        />
      )}
      {view === "join" && (
        <JoinTeam
          inviteCode={inviteCode}
          setInviteCode={setInviteCode}
          handleJoinTeam={handleJoinTeam}
        />
      )}
    </div>
  );

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
