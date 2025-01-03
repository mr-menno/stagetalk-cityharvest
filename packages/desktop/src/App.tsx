import {
  Authenticated,
  AuthLoading,
  Unauthenticated,
  useQuery,
} from "convex/react";
import ScreenAuthenticating from "@/components/screens/screen-authenticating";
import { api } from "shared/convex/_generated/api";
import { useEffect } from "react";
import useStagetalkStore from "shared/stagetalk-store";
import ScreenRegister from "@/components/screens/screen-register";
import ScreenApp from "./components/screens/screen-app";
import Notifications from "./components/notifications";

export default function App() {
  const teams = useQuery(api.teams.getTeams);
  const myUser = useQuery(api.user.getMyUser);
  const { setTeamId, teamId, setUser } = useStagetalkStore();

  useEffect(() => {
    if (teams) {
      if (teams[0]?._id) {
        setTeamId(teams[0]._id);
      }
    }
  }, [teams]);
  useEffect(() => {
    if (myUser) {
      if (myUser._id) {
        setUser(myUser);
      }
    }
  }, [myUser]);
  return (
    <>
      <Authenticated>
        {teamId ? (
          <>
            <ScreenApp />
            <Notifications />
          </>
        ) : (
          <ScreenRegister />
        )}
      </Authenticated>
      <Unauthenticated>
        <ScreenAuthenticating />
      </Unauthenticated>
      <AuthLoading>Loading Auth...</AuthLoading>
    </>
  );
}
