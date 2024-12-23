import { Camera, CameraView } from "expo-camera";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

export default function RegisterScan() {
  const router = useRouter();

  function handleQrCode({ data }: { data: string }) {
    const url = new URL(data);
    const invite = url.searchParams.get("invite");
    if (invite) {
      router.replace(`/register/join/${invite}`);
    }
  }

  return (
    <View className="flex flex-col gap-4 pt-16">
      <CameraView
        facing="back"
        style={{
          borderRadius: "10%",
          overflow: "hidden",
          height: 300,
          width: 300,
        }}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={handleQrCode}
      ></CameraView>
      <View>
        <Text className="text-center text-2xl">scan code to join</Text>
      </View>
    </View>
  );
}
