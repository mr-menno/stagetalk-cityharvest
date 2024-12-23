import { Text, View } from "react-native";
import { Doc } from "shared/convex/_generated/dataModel";
import useStagetalkStore from "shared/stagetalk-store";

export default function Message({ message }: { message: Doc<"messages"> }) {
  const { user } = useStagetalkStore();
  const isSelf = message.userId === user?._id;
  return (
    <View
      style={{
        paddingLeft: isSelf ? 16 : 0,
        paddingRight: isSelf ? 0 : 16,
        flexDirection: "row",
        justifyContent: isSelf ? "flex-end" : "flex-start",
      }}
    >
      <View
        style={{
          backgroundColor: isSelf ? "#3b82f6" : "#e5e7eb",
          borderRadius: 8,
          padding: 8,
        }}
      >
        <Text
          style={{
            color: isSelf ? "#ffffff" : "#000000",
          }}
        >
          {message.message}
        </Text>
      </View>
    </View>
  );
}
