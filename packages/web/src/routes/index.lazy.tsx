import ScreenRegister from "@/Components/Screens/screen-register";
import { createLazyFileRoute, Navigate } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { useEffect } from "react";
import { api } from "shared/convex/_generated/api";
import useStagetalkStore from "shared/stagetalk-store";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const { setTeamId } = useStagetalkStore();
  const teams = useQuery(api.teams.getTeams);

  useEffect(() => {
    if (!teams) return;
    if (teams && teams.length > 0) {
      if (!teams[0]?._id) return;
      setTeamId(teams[0]._id);
    }
  }, [teams, setTeamId]);

  if (!teams) {
    return <div>Loading Teams...</div>;
  }

  if (teams.length === 0) {
    return <ScreenRegister />;
  }

  return <Navigate to={`/messages`} replace />;
}
