import { Redirect, Stack, useRouter } from "expo-router";
import {
  Authenticated,
  ConvexReactClient,
  useConvexAuth,
  useQuery,
} from "convex/react";
import { Text, View } from "react-native";
import { useAuthActions } from "@convex-dev/auth/dist/react";
import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { api } from "shared/convex/_generated/api";
import useStagetalkStore from "shared/stagetalk-store";

export default function AppLayout() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const router = useRouter();
  const { signIn } = useAuthActions();
  const teams = useQuery(api.teams.getTeams);
  const user = useQuery(api.user.getMyUser);
  const { setTeamId, setUser } = useStagetalkStore();

  useEffect(() => {
    async function signInDevice() {
      if (!isLoading && isAuthenticated) return;
      await signIn("deviceAuth", {
        flow: "register",
        deviceId: await SecureStore.getItemAsync("deviceId"),
      });
    }
    signInDevice();
  }, [isLoading, isAuthenticated]);

  useEffect(() => {
    if (!teams) return;
    if (teams.length === 0) {
      return router.replace("/(register)/register");
    }
    //const { setTeamId, setUser } = useStagetalkStore();
    if (teams[0]) {
      setTeamId(teams[0]._id);
    }
  }, [teams]);

  useEffect(() => {
    if (!user) return;
    setUser(user);
  }, [user, setUser]);

  if (!isAuthenticated) {
    return (
      <View className="flex flex-col items-center justify-center h-full">
        <Text>Registering... </Text>
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#00000011",
        },
        headerTintColor: "#000",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerBlurEffect: "light",
        headerTransparent: true,
      }}
    />
  );
}
