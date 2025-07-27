import { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "../md-table.css";

const ChatMessage = ({ message }) => {
  const { role, content } = message;
  const isUser = role === "user";

  const renderSuggestions = () => {
    if (!content.suggestions || content.suggestions.length === 0) return null;

    return (
      <div className="mt-4 flex flex-wrap gap-2">
        {content.suggestions.map((suggestion, index) => (
          <a
            key={index}
            href="https://drive.google.com/uc?export=download&id=1ZVBWzsJPB5QT-wcwzPdm7ldrbqHppUnP"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
          >
            {suggestion}
          </a>
        ))}
      </div>
    );
  };

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`
          max-w-3xl rounded-lg px-4 py-3 shadow-sm
          ${
            isUser
              ? "bg-purple-50 text-gray-800"
              : "bg-white border border-gray-100"
          }
        `}
      >
        <div className="flex items-start">
          {!isUser && (
            <div className="flex-shrink-0 mr-3">
              <img
                src="https://i.ibb.co/4ZG3Zq4n/bs-icon.png"
                alt="bs-icon"
                className="w-8 h-8 rounded"
              />
            </div>
          )}

          <div className="flex-1">
            <div className="text-sm markdown-table">
              <Markdown remarkPlugins={[remarkGfm]}>{content.text}</Markdown>
            </div>

            {!isUser && renderSuggestions()}
          </div>

          {isUser && <div className="flex-shrink-0 ml-3"></div>}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
