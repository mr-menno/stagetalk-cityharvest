import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { useMutation, useQuery } from "convex/react";
import { api } from "shared/convex/_generated/api";
import { ArrowLeftCircle } from "lucide-react-native";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

export default function RegisterJoinTeam() {
  const router = useRouter();
  const { invite } = useLocalSearchParams();
  const team = useQuery(
    api.teams.getTeamByInvite,
    invite ? { inviteCode: Array.isArray(invite) ? invite[0] : invite } : "skip"
  );
  const joinTeam = useMutation(api.teams.joinTeam);

  async function handleJoinTeam() {
    try {
      await joinTeam({
        inviteCode: Array.isArray(invite) ? invite[0] : invite,
      });
      router.replace("/(app)");
    } catch (e: any) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: e.message,
      });
    }
  }

  useEffect(() => {
    let inviteCode = Array.isArray(invite) ? invite[0] : invite;
    if (!inviteCode) return;

    let timeout = setTimeout(() => {
      if (!team) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Cannot find team with invite " + inviteCode,
        });
        router.replace("/(register)/register/join");
      }
    }, 2000);
    return () => clearTimeout(timeout);
  }, [invite, team]);
  return (
    <View className="p-16 flex flex-col gap-4 items-center w-full">
      {team ? (
        <Pressable
          className="bg-white rounded-full border-2 p-4 w-full"
          onPress={handleJoinTeam}
        >
          <Text className="text-center text-xl">Join {team?.name}</Text>
        </Pressable>
      ) : (
        <View>
          <ActivityIndicator />
          <Text>Loading Team...</Text>
        </View>
      )}
      <Link href="/(register)/register" asChild>
        <Pressable className="bg-white rounded-full border-2 p-4 w-full flex flex-row justify-center gap-2 items-center">
          <ArrowLeftCircle className="size-4" color={"#000000"} />
          <Text className="text-center text-xl">Go Back</Text>
        </Pressable>
      </Link>
    </View>
  );
}
