import { Link } from "expo-router";
import { CircleArrowLeft } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function RegisterJoin() {
  const [invite, setInvite] = useState<string>("");

  return (
    <View className="p-16 flex flex-col w-full gap-4 items-center">
      <View className="flex flex-col items-center w-full">
        <View className="w-full border-b-2 border-gray-600 p-2">
          <TextInput
            autoFocus={true}
            className="text-4xl uppercase text-center w-full"
            value={invite}
            onChangeText={(text) =>
              setInvite(text.toUpperCase().substring(0, 6))
            }
          />
        </View>
        <Text className="text-gray-500">Invite Code</Text>
      </View>
      <Link href={`/register/join/${invite}`} asChild>
        <Pressable
          className="bg-white rounded-full border-2 p-4 w-full disabled:opacity-10"
          disabled={invite.length < 6}
        >
          <Text className="text-center text-2xl ">Find Team</Text>
        </Pressable>
      </Link>
      <Link href="/(register)/register" asChild>
        <Pressable>
          <CircleArrowLeft size={48} color={"#000"} strokeWidth={1} />
        </Pressable>
      </Link>
    </View>
  );
}
