import { FC } from "react";

export type SimpleMessage = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

interface ChatMessagesProps {
  messages: SimpleMessage[];
  isTyping?: boolean;
}

export const ChatMessages: FC<ChatMessagesProps> = ({ messages, isTyping }) => {
  return (
    <div className="flex flex-col gap-4 px-4 py-2">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
        >
          <div className="flex items-end gap-2 max-w-[75%]">
            {msg.role === "assistant" && <div className="text-2xl">🤖</div>}
            <div
              className={`px-4 py-2 rounded-2xl text-sm ${
                msg.role === "user"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-300 text-black rounded-bl-none"
              }`}
            >
              {msg.content}
            </div>
            {msg.role === "user" && <div className="text-2xl">👤</div>}
          </div>
        </div>
      ))}
      {isTyping && (
        <div className="text-gray-500 text-sm animate-pulse">🤖 Typing...</div>
      )}
    </div>
  );
};
