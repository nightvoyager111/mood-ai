import React from "react";

type MessageType = {
    id: number;
    role: "user" | "assistant";
    content: string;
}

interface ChatMessagesProps {
    messages: MessageType[];
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  return (
    <div className="flex flex-col space-y-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`max-w-[80%] px-4 py-2 rounded-lg ${
            msg.role === "user"
              ? "self-end bg-blue-500 text-white"
              : "self-start bg-gray-200 text-black"
          }`}
        >
          {msg.content}
        </div>
      ))}
    </div>
  );
};
