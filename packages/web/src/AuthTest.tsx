import { useAuthActions } from "@convex-dev/auth/react";
import {
  Authenticated,
  AuthLoading,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";
import { api } from "shared/convex/_generated/api";

export default function AuthTest() {
  const { signIn, signOut } = useAuthActions();
  const getTeams = useQuery(api.teams.getTeams);
  const createTeam = useMutation(api.teams.createTeam);
  async function authTest() {
    signIn("deviceAuth", {
      flow: "register",
      deviceId: localStorage.getItem("deviceId"),
    });
  }
  return (
    <>
      <Authenticated>
        you are authenticated
        <button onClick={signOut}>sign out</button>
        <pre>{JSON.stringify(getTeams, null, 2)}</pre>
        <button
          onClick={async () =>
            await createTeam({
              name: "Test Team " + Math.floor(Math.random() * 100),
            })
          }
        >
          Create Team
        </button>
      </Authenticated>
      <Unauthenticated>
        you are not authenticated {localStorage.getItem("deviceId")}
        <button onClick={authTest}>test</button>
      </Unauthenticated>
      <AuthLoading>loading...</AuthLoading>
    </>
  );
}
