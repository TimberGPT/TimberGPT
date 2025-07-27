// chatting.zip/chatting/AIChatting.jsx
"use client";

import { useState, useRef, useEffect } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatHeader from "./ChatHeader";
import ChatMessageList from "./ChatMessageList";
import ChatInput from "./ChatInput";
import ImageUploadForm from "./ImageUploadForm";
import ImageAnalysisReport from "./ImageAnalysisReport";
import LoadingSpinner from "./LoadingSpinner";

const AIChatting = () => {
  // State to manage sidebar visibility
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // State to manage the active view: 'chat' for chat interface, 'imageAnalysis' for image report
  const [activeView, setActiveView] = useState("chat");
  // State to store chat messages
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content: {
        text: "Hello! I'm your TimberGPT AI assistant. How can I help you with your projects today?",
        suggestions: ["Create a new project"],
      },
    },
  ]);
  // State to store data from the defect analysis API
  const [imageAnalysisData, setImageAnalysisData] = useState(null);
  // State to store data from the ring count analysis API
  const [ringCountAnalysisData, setRingCountAnalysisData] = useState(null);
  // State to indicate if image analysis is in progress
  const [isImageAnalyzing, setIsImageAnalyzing] = useState(false);

  // Ref for scrolling to the end of messages in chat view
  const messagesEndRef = useRef(null);

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Effect to scroll to the bottom of the chat when new messages arrive
  useEffect(() => {
    if (activeView === "chat" && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, activeView]); // Depend on messages and activeView

  // Function to start a new chat, clearing messages and switching to chat view
  const handleNewChat = () => {
    setMessages([
      {
        id: Date.now(),
        role: "assistant",
        content: {
          text: "Hello! I'm your TimberGPT AI assistant. How can I help you with your projects today?",
          suggestions: [
            "Create a new project",
            "Help me organize tasks",
            "Show project analytics",
          ],
        },
      },
    ]);
    setActiveView("chat"); // Always switch to chat view on new chat
  };

  // Function to switch to the image analysis view, clearing previous results
  const handleShowImageAnalysis = () => {
    setActiveView("imageAnalysis"); // Switch to image analysis view
    setImageAnalysisData(null); // Clear previous results
    setRingCountAnalysisData(null); // Clear previous results
  };

  // Function to handle sending a chat message to the AI
  const handleSendMessage = async (text) => {
    if (text.trim()) {
      // Add user message to chat
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          role: "user",
          content: { text },
        },
      ]);

      // Show loading message from AI
      const loadingId = Date.now() + 1;
      setMessages((prev) => [
        ...prev,
        {
          id: loadingId,
          role: "assistant",
          content: {
            text: "", // No text, just loading spinner
            loading: true, // Flag for loading state
          },
        },
      ]);

      try {
        // Fetch response from the GPT API
        const res = await fetch("http://127.0.0.1:8000/api/v1/gpt/gpt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify({
            question: text,
            session_id: "default", // Assuming a default session ID
          }),
        });
        const data = await res.json();

        // Update messages with AI's response, removing the loading message
        setMessages((prev) =>
          prev
            .filter((msg) => msg.id !== loadingId) // Remove loading message
            .concat({
              id: Date.now() + 2,
              role: "assistant",
              content: {
                text:
                  typeof data.answer === "string"
                    ? data.answer.replace(/undefined/g, "").trim() // Clean up response
                    : "No answer received from AI.",
              },
            })
        );
      } catch (error) {
        console.error("Error sending message to AI:", error);
        // Display error message to user
        setMessages((prev) =>
          prev
            .filter((msg) => msg.id !== loadingId)
            .concat({
              id: Date.now() + 3,
              role: "assistant",
              content: {
                text: "Sorry, there was an error processing your request.",
              },
            })
        );
      }
    }
  };

  // Function to handle analyzing two images (defect and ring count)
  const handleAnalyzeImages = async (defectFile, ringCountFile) => {
    setIsImageAnalyzing(true); // Set loading state
    setImageAnalysisData(null); // Clear previous defect analysis data
    setRingCountAnalysisData(null); // Clear previous ring count data

    try {
      // 1. Send the defectFile to the /api/v1/analyze API
      const analyzeFormData = new FormData();
      analyzeFormData.append("file", defectFile);

      const analyzeRes = await fetch("http://127.0.0.1:8000/api/v1/analyze", {
        method: "POST",
        body: analyzeFormData,
      });
      const analyzeData = await analyzeRes.json();
      setImageAnalysisData(analyzeData); // Store defect analysis data

      // 2. Send the ringCountFile to the /api/v1/ring-count API
      const ringCountFormData = new FormData();
      ringCountFormData.append("file", ringCountFile);

      const ringCountRes = await fetch(
        "http://127.0.0.1:8000/api/v1/ring-count",
        {
          method: "POST",
          body: ringCountFormData,
        }
      );
      const ringCountData = await ringCountRes.json();
      setRingCountAnalysisData(ringCountData); // Store ring count analysis data
    } catch (error) {
      console.error("Error analyzing images:", error);
      // Use a custom message box instead of alert() for better UX
      // For simplicity, using alert here as per previous instructions, but a modal would be better.
      alert(
        "Error analyzing images. Please ensure valid images are provided and the server is running."
      );
    } finally {
      setIsImageAnalyzing(false); // Reset loading state
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar component */}
      <ChatSidebar
        isOpen={sidebarOpen}
        onClose={toggleSidebar}
        onNewChat={handleNewChat}
        onShowImageAnalysis={handleShowImageAnalysis}
        activeView={activeView} // Pass active view to highlight current section
      />

      {/* Main content area */}
      <div className="relative flex-1 flex flex-col h-full lg:pl-48">
        {/* Chat header */}
        <ChatHeader onMenuClick={toggleSidebar} onNewChat={handleNewChat} />

        {/* Conditional rendering based on activeView state */}
        {activeView === "chat" ? (
          // Chat interface
          <>
            <div className="flex-1 overflow-y-auto py-6">
              <ChatMessageList messages={messages} />
              <div ref={messagesEndRef} /> {/* Scroll target */}
            </div>
            <div className="sticky bottom-0 w-full p-3 sm:py-4 bg-gray-50">
              <ChatInput onSendMessage={handleSendMessage} />
            </div>
          </>
        ) : (
          // Image Analysis interface
          <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
            {/* Image upload form */}
            <ImageUploadForm
              onAnalyzeImages={handleAnalyzeImages}
              isLoading={isImageAnalyzing}
            />
            {/* Loading spinner for image analysis */}
            {isImageAnalyzing && <LoadingSpinner />}
            {/* Display analysis report if data is available and not loading */}
            {(imageAnalysisData || ringCountAnalysisData) &&
              !isImageAnalyzing && (
                <ImageAnalysisReport
                  analysisData={imageAnalysisData}
                  ringCountData={ringCountAnalysisData}
                />
              )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIChatting;
