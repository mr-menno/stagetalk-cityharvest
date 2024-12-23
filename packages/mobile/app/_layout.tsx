import { Redirect, Slot, Stack } from "expo-router";
import UUID from "react-native-uuid";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import "../global.css";
import { Text } from "react-native";
import Toast from "react-native-toast-message";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

export default function Layout() {
  const [deviceId, setDeviceId] = useState<string | null>("");

  useEffect(() => {
    async function generateDeviceId() {
      let deviceId = await SecureStore.getItemAsync("deviceId");
      if (deviceId === null) {
        deviceId = UUID.v4();
        await SecureStore.setItemAsync("deviceId", deviceId);
        setDeviceId(deviceId);
      } else {
        setDeviceId(deviceId);
      }
    }
    generateDeviceId();
  }, []);

  if (!deviceId) return <Text>Registring Device</Text>;

  return (
    <ConvexAuthProvider
      client={convex}
      storage={{
        setItem: SecureStore.setItem,
        getItem: SecureStore.getItem,
        removeItem: SecureStore.deleteItemAsync,
      }}
    >
      <Slot />
      <Toast position="bottom" />
    </ConvexAuthProvider>
  );
}
