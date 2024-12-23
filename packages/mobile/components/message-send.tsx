import { Pressable, Text, View } from "react-native";
import { useMutation } from "convex/react";
import { api } from "shared/convex/_generated/api";
import useStagetalkStore from "shared/stagetalk-store";

export default function MessageSend() {
  const { teamId } = useStagetalkStore();
  const sendMessage = useMutation(api.messages.sendMessage);
  const handlePress = () => {
    if (!teamId) return;
    sendMessage({ message: "Hello world", teamId });
  };
  return (
    <View>
      <Text>MessageSend</Text>
      <Pressable onPress={handlePress}>
        <Text>Send message</Text>
      </Pressable>
    </View>
  );
}
