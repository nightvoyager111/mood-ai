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

  const handleSend = async (text: string) => {
    const userMessage = {
      id: messages.length + 1,
      role: "user" as const,
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const res = await fetch("/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();
      const assistantMessage = {
        id: messages.length + 2,
        role: "assistant" as const,
        content: data.reply,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: messages.length + 2,
          role: "assistant",
          content: "Sorry, something went wrong.",
        },
      ]);
    }

    setIsTyping(false);
  };

};
