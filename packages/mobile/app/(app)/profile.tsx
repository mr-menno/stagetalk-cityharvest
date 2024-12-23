import { useAuthActions } from "@convex-dev/auth/dist/react";
import { Link, Stack } from "expo-router";
import { HomeIcon } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import UUID from "react-native-uuid";

export default function ProfileScreen() {
  const { signOut } = useAuthActions();

  async function handleSignout() {
    await SecureStore.setItemAsync("deviceId", UUID.v4());
    await signOut();
  }
  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: (props) => (
            <Text className="font-semibold text-2xl">Stagetalk</Text>
          ),
          headerTitle: (props) => <Text></Text>,
          headerRight: () => (
            <Link href="/(app)" asChild replace={true}>
              <HomeIcon className="size-6" />
            </Link>
          ),
        }}
      />
      <View
        style={{
          paddingTop: 100,
        }}
      >
        <Text>Profile</Text>
        <Pressable onPress={handleSignout}>
          <Text>Forget Device</Text>
        </Pressable>
      </View>
    </>
  );
}
