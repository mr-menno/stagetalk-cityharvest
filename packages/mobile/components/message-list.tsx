import { ScrollView, Text, View } from "react-native";
import { useQuery } from "convex/react";
import { api } from "shared/convex/_generated/api";
import useStagetalkStore from "shared/stagetalk-store";
import { useEffect, useLayoutEffect, useRef } from "react";
import Message from "./message";

export default function MessageList() {
  const { teamId } = useStagetalkStore();
  const messages = useQuery(
    api.messages.getMessages,
    teamId ? { teamId } : "skip"
  );

  const scrollviewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollviewRef.current?.scrollToEnd();
  }, [messages]);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "flex-end",
        paddingTop: 100,
        paddingHorizontal: 16,
        gap: 8,
        paddingBottom: 8,
      }}
      ref={scrollviewRef}
    >
      {messages?.map((message) => (
        <Message key={message._id} message={message} />
      ))}
    </ScrollView>
  );
}
