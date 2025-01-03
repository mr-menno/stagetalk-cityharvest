import { FormEvent, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SendHorizontal } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "shared/convex/_generated/api";
import useStagetalkStore from "shared/stagetalk-store";

export default function MessageSend() {
  const { teamId } = useStagetalkStore();
  const [message, setMessage] = useState("");
  const sendMessage = useMutation(api.messages.sendMessage);
  async function handleSendMessage(e: FormEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!teamId) return;
    sendMessage({ teamId, message });
    setMessage("");
  }
  return (
    <form onSubmit={handleSendMessage}>
      <div className="flex flex-row p-2 gap-2 border-t">
        <Input
          className="border outline-none shadow-none"
          value={message}
          placeholder="Type a message..."
          onChange={({ target: { value } }) => setMessage(value)}
        />
        <Button size="icon" disabled={!message} type="submit">
          <SendHorizontal className="size-4" />
        </Button>
      </div>
    </form>
  );
}
