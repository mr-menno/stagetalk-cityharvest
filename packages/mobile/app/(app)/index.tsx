import { Link, Stack } from "expo-router";
import {
  Button,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import * as Application from "expo-application";
import { useQuery } from "convex/react";
import { api } from "shared/convex/_generated/api";
import { UserCircle } from "lucide-react-native";
import MessageList from "@/components/message-list";
import MessageSend from "@/components/message-send";

function LogoTitle() {
  return (
    <Image
      style={styles.image}
      source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
    />
  );
}

export default function Home() {
  const [count, setCount] = useState(0);
  const teams = useQuery(api.teams.getTeams);

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: (props) => (
            <Text className="font-semibold text-2xl">Stagetalk</Text>
          ),
          headerTitle: (props) => <Text></Text>,
          headerRight: () => (
            <Link href="/(app)/profile" asChild replace={true}>
              <UserCircle className="size-6" />
            </Link>
          ),
        }}
      />
      <View className="h-full">
        <MessageList />
        <View className="pb-16 border-t border-gray-300">
          <MessageSend />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
  },
});
