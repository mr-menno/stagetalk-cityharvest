import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { useLayoutEffect, useRef } from "react";
import { api } from "shared/convex/_generated/api";
import useStagetalkStore from "shared/stagetalk-store";

export default function MessageList() {
  const { teamId, userId } = useStagetalkStore();
  const messages = useQuery(
    api.messages.getMessages,
    teamId ? { teamId } : "skip"
  );

  const messageList = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    //scroll to bottom of messageList
    if (messageList.current) {
      messageList.current.scrollTop = messageList.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className="h-full overflow-y-scroll p-4 pr-1 gap-2 flex flex-col"
      ref={messageList}
    >
      {messages?.map((message) => (
        <div
          key={message._id}
          className={cn(
            "flex flex-row",
            message.userId === userId ? "justify-end" : "justify-start"
          )}
        >
          <div
            className={cn(
              "px-2 py-1 rounded-lg",
              message.userId === userId
                ? "bg-blue-400 text-white"
                : "bg-gray-200"
            )}
          >
            {message.message}
          </div>
        </div>
      ))}
    </div>
  );
}
