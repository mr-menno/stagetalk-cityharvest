import { useAuthActions } from "@convex-dev/auth/react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import {
  Authenticated,
  AuthLoading,
  Unauthenticated,
  useConvexAuth,
  useQuery,
} from "convex/react";
import { useEffect } from "react";
import { api } from "shared/convex/_generated/api";
import useStagetalkStore from "shared/stagetalk-store";

export const Route = createRootRoute({
  component: RootComponent,
});

export default function RootComponent() {
  const { signIn } = useAuthActions();
  const { isLoading, isAuthenticated } = useConvexAuth();
  const teams = useQuery(api.teams.getTeams);
  const { setTeamId } = useStagetalkStore();

  useEffect(() => {
    if (!teams) return;
    if (teams && teams.length > 0) {
      if (!teams[0]?._id) return;
      setTeamId(teams[0]._id);
    }
  }, [teams, setTeamId]);
  /*
    const { setTeamId } = useStagetalkStore();
  const teams = useQuery(api.teams.getTeams);

  useEffect(() => {
    if (!teams) return;
    if (teams && teams.length > 0) {
      setTeamId(teams[0]?._id);
    }
  }, [teams, setTeamId]);

  */
  useEffect(() => {
    async function automaticSignIn() {
      if (!isLoading && !isAuthenticated) {
        await signIn("deviceAuth", {
          flow: "register",
          deviceId: localStorage.getItem("deviceId"),
        });
      }
    }
    automaticSignIn();
  }, [isLoading, isAuthenticated, signIn]);
  if (!localStorage.getItem("deviceId")) {
    return "Failed to register"; //TODO: better error screen
  }

  return (
    <>
      <Authenticated>
        <Outlet />
      </Authenticated>
      <Unauthenticated>Registring device...</Unauthenticated>
      <AuthLoading>Loading...</AuthLoading>
    </>
  );
}
