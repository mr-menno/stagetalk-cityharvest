import MessageList from "../message-list";
import MessageSend from "../message-send";

export default function ScreenMessages() {
  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <div className="bg-black text-white px-4 py-2 font-semibold">
        Stagetalk
      </div>
      <div className="flex-1  overflow-hidden">
        <MessageList />
      </div>
      <div>
        <MessageSend />
      </div>
    </div>
  );
}
