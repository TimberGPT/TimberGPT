"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const AIProjectAssistant = ({ onGenerateContent, isGenerating }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;

    try {
      await onGenerateContent(prompt);
      setIsOpen(false);
      setPrompt("");
    } catch (error) {
      console.error("AI generation failed:", error);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-16 right-0 mb-2 w-[320px] bg-white rounded-lg shadow-lg border border-gray-200"
          >
            <div className="flex item-center justify-center bg-[#6A49BA]">
              <Image
                src={"https://i.ibb.co/YB7qRvFb/image.png"}
                width={200}
                height={150}
                alt="BetterStart AI"
              />
            </div>
            <form onSubmit={handleSubmit} className="p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Describe your project
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="E.g., Create a web development project for an e-commerce website with high priority..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-sm"
                rows={4}
              />
              <div className="mt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isGenerating || !prompt.trim()}
                  className="px-3 py-1.5 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <span className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent text-white rounded-full" />
                      Generating...
                    </>
                  ) : (
                    "Generate"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="rounded-full">
          <Image
            src={"https://i.ibb.co/4ZG3Zq4n/bs-icon.png"}
            alt="AI"
            width={50}
            height={50}
          />
        </div>
      </motion.button>
    </div>
  );
};

export default AIProjectAssistant;
