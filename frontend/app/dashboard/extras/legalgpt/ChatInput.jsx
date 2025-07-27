import { useState, useRef } from "react";
import { SendHorizontal } from "lucide-react";

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
      >
        <div className="flex items-center p-2">
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            className="flex-1 px-4 py-2 border-none focus:outline-none focus:ring-0 text-sm"
          />

          <button
            type="submit"
            disabled={!message.trim()}
            className={`p-2 rounded-lg ${
              message.trim()
                ? "text-white bg-primary-600 hover:bg-primary-700"
                : "text-gray-400 bg-gray-200 cursor-not-allowed"
            }`}
          >
            <SendHorizontal size={16} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
