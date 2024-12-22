import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery } from "convex/react";
import { SendHorizonal, UserCircle } from "lucide-react";
import { FormEvent, useLayoutEffect, useRef, useState } from "react";
import { api } from "shared/convex/_generated/api";
import useStagetalkStore from "shared/stagetalk-store";
import { format } from "date-fns";

export const Route = createLazyFileRoute("/messages")({
  component: RouteComponent,
});

function RouteComponent() {
  const { teamId, user } = useStagetalkStore();
  const messages = useQuery(
    api.messages.getMessages,
    teamId ? { teamId } : "skip"
  );
  const sendMessage = useMutation(api.messages.sendMessage);
  const [message, setMessage] = useState("");

  const messagesDiv = useRef<HTMLDivElement>(null);

  async function handleSendMessage(e: FormEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!teamId) return;
    await sendMessage({
      teamId,
      message: message,
    });
    setMessage("");
  }

  useLayoutEffect(() => {
    if (messagesDiv.current) {
      messagesDiv.current.scrollTop = messagesDiv.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-dvh overscroll-none">
      <div className="w-full bg-primary text-primary-foreground font-semibold p-2 flex flex-row">
        <div className="flex-1">Stagetalk</div>
        <Link to="/profile">
          <UserCircle className="size-6" />
        </Link>
      </div>
      <div
        className="flex flex-col gap-2 p-2 flex-1 overflow-x-scroll"
        ref={messagesDiv}
      >
        {messages?.map((message) => (
          <div
            key={message._id}
            className={cn(
              "flex flex-row w-full items-center gap-2",
            )}
            >
              <div
              className={cn(
                "flex-1 flex flex-row",
                message.userId === user?._id
                ? "justify-end pl-4"
                : "justify-start pr-4"
              )}
              >
              <div
            className={cn(
              "p-2 shadow-sm",
              message.userId === user?._id
                ? " bg-gray-100 ml-16 text-primary text-right"
                : "bg-green-800 text-primary-foreground mr-16",
              "rounded-lg"
            )}
          >
            {message.message}
            </div>
            </div>
            <div className="text-muted-foreground text-xs">
              {format(message._creationTime, "hh:mm")}
              </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <div className="flex flex-row p-2 gap-2 border-t">
          <Input
            className="border-0 outline-none shadow-none"
            value={message}
            onChange={({ target: { value } }) => setMessage(value)}
          />
          <Button size="icon" disabled={!message} type="submit">
            <SendHorizonal className="size-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
