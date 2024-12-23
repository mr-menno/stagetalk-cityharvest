import { Link, Slot } from "expo-router";
import { Mic } from "lucide-react-native";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Pressable,
  Text,
  View,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Application from "expo-application";
import * as Updates from "expo-updates";
import { useEffect } from "react";
import { useConvexAuth } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/dist/react";
import * as SecureStore from "expo-secure-store";

export default function RegisterLayout() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const { signIn } = useAuthActions();

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

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View className="h-full flex flex-col justify-evenly items-center gap-2">
          <View>
            <View className="bg-white rounded-full p-4 border-2">
              <Link href="/(register)/register" asChild>
                <Pressable>
                  <Mic size={64} color={"#000000"} />
                </Pressable>
              </Link>
            </View>
            <View>
              <Text className="text-2xl font-semibold">Stagetalk</Text>
            </View>
          </View>
          <View className="w-full">
            <Slot />
          </View>
        </View>
        <View className="absolute bottom-0 w-full">
          <Text className="text-gray-300 text-center">
            Version: {Updates.runtimeVersion}
          </Text>
          <Text className="text-gray-300 text-center">
            Update: {Updates.updateId}
          </Text>
          <Text className="text-gray-300 text-center">
            URL: {process.env.EXPO_PUBLIC_CONVEX_URL}
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
