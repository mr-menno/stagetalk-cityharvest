import { useCameraPermissions } from "expo-camera";
import { Link } from "expo-router";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";

function ScanCodeButton() {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission?.granted) {
    return (
      <Pressable
        onPress={requestPermission}
        className="bg-white rounded-full border-2 p-4 w-full"
      >
        <Text className="text-center text-xl">Enable Camera</Text>
      </Pressable>
    );
  }

  return (
    <Link href="/(register)/register/scan" asChild>
      <Pressable className="bg-white rounded-full border-2 p-4 w-full">
        <Text className="text-center text-xl">Scan Code</Text>
      </Pressable>
    </Link>
  );
}

export default function RegisterScreen() {
  const [permission, requestPermission] = useCameraPermissions();

  return (
    <View className="flex flex-col gap-4 p-16 items-center w-full">
      <Pressable className="bg-white rounded-full border-2 p-4 w-full">
        <Text className="text-center text-xl">Create Team</Text>
      </Pressable>
      <Link href="/(register)/register/join" asChild>
        <Pressable className="bg-white rounded-full border-2 p-4 w-full">
          <Text className="text-center text-xl">Join Team</Text>
        </Pressable>
      </Link>
      <ScanCodeButton />
    </View>
  );
}
