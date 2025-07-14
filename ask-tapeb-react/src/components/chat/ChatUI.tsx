import { useEffect, useRef, useState } from "react";
import { ChatMessages } from "./ChatMessages";
import ChatInput from "./ChatInput";

type MessageType = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

export const ChatUI = () => {
  const [messages, setMessages] = useState<MessageType[]>([
    { id: 1, role: "assistant", content: "Hello! How can I help you today?" },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSend = (text: string) => {
    const userMessage = {
      id: messages.length + 1,
      role: "user" as const,
      content: text,
    };

    const assistantMessage = {
      id: messages.length + 2,
      role: "assistant" as const,
      content: "This is a mock response to: " + text,
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="bg-gray-200 dark:bg-gray-800 p-3 text-center font-bold text-lg border-b">
        Ask-TapeB Chat
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4 bg-white dark:bg-gray-900">
        <ChatMessages messages={messages} />
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput onSend={handleSend} />
    </div>
  );
};
