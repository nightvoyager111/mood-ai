import { useEffect, useRef, useState } from "react";
import { ChatMessages, SimpleMessage } from "./ChatMessages";
import { ChatInput } from "./ChatInput";

export const ChatUI = () => {
  const [messages, setMessages] = useState<SimpleMessage[]>([
    {
      id: 1,
      role: "assistant",
      content: "Hi! How can I help you today?",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleSend = (text: string) => {
    const userMessage = {
      id: messages.length + 1,
      role: "user" as const,
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const reply = {
        id: messages.length + 2,
        role: "assistant" as const,
        content: `Mock reply to: ${text}`,
      };
      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);
    }, 1000);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-gray-200 dark:bg-gray-800 p-3 text-center font-bold text-lg border-b">
        Ask-TapeB Chat
      </div>

      <div className="flex-1 overflow-y-auto px-2">
        <ChatMessages messages={messages} isTyping={isTyping} />
        <div ref={bottomRef} />
      </div>

      <ChatInput onSend={handleSend} />
    </div>
  );
};
