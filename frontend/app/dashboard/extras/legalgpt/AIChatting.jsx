"use client";

import { useState, useRef, useEffect } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatHeader from "./ChatHeader";
import ChatMessageList from "./ChatMessageList";
import ChatInput from "./ChatInput";

const AIChatting = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeGPT, setActiveGPT] = useState("legal"); // Modes: legal, document, market
  const [messages, setMessages] = useState([]);
  const [typingMessage, setTypingMessage] = useState(null);
  const messagesEndRef = useRef(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const getInitialMessage = (mode) => {
    switch (mode) {
      case "document":
        return "Hello! I'm your **AI Document Advisor and Facilitator in Bangladesh**. How can I assist with document-related queries today?";
      case "market":
        return "Hello! I'm your **expert AI Market Advisor focused on startup and market trends in Bangladesh**. Ask me anything!";
      case "legal":
      default:
        return "Hello! I'm an **expert AI Legal Advisor specializing in business law and corporate** in Bangladesh. How can I help you with your projects today?";
    }
  };

  const handleNewChat = (mode = activeGPT) => {
    setActiveGPT(mode);
    setMessages([
      {
        id: Date.now(),
        role: "assistant",
        content: {
          text: getInitialMessage(mode),
          suggestions: ["Ask a question or upload a document"],
        },
      },
    ]);
  };

  useEffect(() => {
    handleNewChat(activeGPT); // Load default chat on first render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (typingMessage) {
      let current = "";
      let i = 0;
      const interval = setInterval(() => {
        current += typingMessage.text[i];
        setMessages((prev) => {
          const lastIdx = prev.length - 1;
          if (prev[lastIdx]?.role === "assistant") {
            const updated = [...prev];
            updated[lastIdx] = {
              ...updated[lastIdx],
              content: { ...updated[lastIdx].content, text: current },
            };
            return updated;
          }
          return prev;
        });
        i++;
        if (i >= typingMessage.text.length) {
          setTypingMessage(null);
          clearInterval(interval);
        }
      }, 25);
      return () => clearInterval(interval);
    }
  }, [typingMessage]);

  const getApiEndpoint = (mode) => {
    switch (mode) {
      case "document":
        return "http://127.0.0.1:8000/ai_tools/document/gemini/ask_document/";
      case "market":
        return "http://127.0.0.1:8000/ai_tools/document/gemini/ask_market/";
      case "legal":
      default:
        return "http://127.0.0.1:8000/ai_tools/document/gemini/ask_startup/";
    }
  };

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: { text },
    };

    setMessages((prev) => [...prev, userMessage]);

    const allUserQueries = [
      ...messages
        .filter((msg) => msg.role === "user")
        .map((msg) => msg.content.text),
      text,
    ];

    const endpoint = getApiEndpoint(activeGPT);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ message: allUserQueries }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: { text: "" },
        },
      ]);

      setTypingMessage({
        text: data.answer || "Sorry, I couldn't get a response.",
      });
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          role: "assistant",
          content: {
            text: `There was an error connecting to the AI backend: ${error.message}`,
          },
        },
      ]);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <ChatSidebar
        isOpen={sidebarOpen}
        onClose={toggleSidebar}
        onNewChat={handleNewChat}
      />

      <div className="relative flex-1 flex flex-col h-full lg:pl-64">
        <ChatHeader
          onMenuClick={toggleSidebar}
          onNewChat={() => handleNewChat(activeGPT)}
        />

        <div className="flex-1 overflow-y-auto py-6">
          <ChatMessageList messages={messages} />
          <div ref={messagesEndRef} />
        </div>

        <div className="sticky bottom-0 w-full p-3 sm:py-4 bg-gray-50">
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default AIChatting;
