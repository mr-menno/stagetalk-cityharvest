import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery } from "convex/react";
import { SendHorizonal, UserCircle } from "lucide-react";
import { FormEvent, useLayoutEffect, useRef, useState } from "react";
import { api } from "shared/convex/_generated/api";
import useStagetalkStore from "shared/stagetalk-store";

export const Route = createLazyFileRoute("/messages")({
  component: RouteComponent,
});

function RouteComponent() {
  const { teamId } = useStagetalkStore();
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
      message: "Hello, World! " + new Date().toISOString(),
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
      <div className="flex flex-col flex-1 overflow-x-scroll" ref={messagesDiv}>
        {messages?.map((message) => (
          <div key={message._id} className="p-2">
            {message.message}
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
