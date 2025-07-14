import { useState } from "react";

const ChatInput: React.FC<{ onSend: (message: string) => void }> = ({ onSend }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-end p-4 gap-2 border-t border-gray-300 bg-white dark:bg-gray-900">
      <textarea
        rows={1}
        placeholder="Type your message..."
        className="flex-1 p-2 border rounded resize-none"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={!input.trim()}
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;