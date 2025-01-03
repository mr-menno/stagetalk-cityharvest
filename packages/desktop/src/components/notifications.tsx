import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from "@tauri-apps/plugin-notification";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { api } from "shared/convex/_generated/api";
import { Id } from "shared/convex/_generated/dataModel";
import useStagetalkStore from "shared/stagetalk-store";

export default function Notifications() {
  const { teamId, userId } = useStagetalkStore();
  const messages = useQuery(
    api.messages.getMessages,
    teamId ? { teamId } : "skip"
  );
  const [lastMessageId, setLastMessageId] = useState<Id<"messages"> | null>(
    null
  );
  const [silent, setSilent] = useState(true);
  useEffect(() => {
    async function sendLastMessage() {
      if (messages && messages.length > 0) {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage.userId === userId) {
          setLastMessageId(lastMessage._id);
          return;
        }
        if (lastMessage._id !== lastMessageId) {
          if (!silent) {
            await sendNotification({
              title: "Stagetalk",
              body: lastMessage.message,
              //   channelId: "messages",
            });
          }
          setLastMessageId(lastMessage._id);
        }
      }
    }
    sendLastMessage();
  }, [messages, silent, lastMessageId]);

  useEffect(() => {
    async function setupNotification() {
      //   await createChannel({
      //     id: "messages",
      //     name: "Messages",
      //     description: "Notifications for new messages",
      //     importance: Importance.High,
      //     visibility: Visibility.Private,
      //     lights: true,
      //     lightColor: "#ff0000",
      //     vibration: true,
      //     sound: "notification_sound",
      //   });
    }
    setupNotification();
    setTimeout(() => {
      setSilent(false);
    }, 3000);
  }, []);

  useEffect(() => {
    async function handleFocusChange({ event }: { event: string }) {
      if (event === "tauri://blur") {
        setSilent(false);
      } else {
        setSilent(true);
      }
    }

    let window = getCurrentWindow();
    window.onFocusChanged(handleFocusChange);
    // window.addEventListener("focus", handleForeground);
    return () => {
      //   window.removeEventListener("focus", handleForeground);
    };
  }, []);

  useEffect(() => {
    async function requestPermissions() {
      let permissionGranted = await isPermissionGranted();
      if (!permissionGranted) {
        const permission = await requestPermission();
        permissionGranted = permission === "granted";
      }
    }
    requestPermissions();
  }, []);
  return null;
}
