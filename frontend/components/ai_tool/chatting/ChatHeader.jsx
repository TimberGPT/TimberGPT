import { Menu, Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";

const ChatHeader = ({ onMenuClick, onNewChat }) => {
  return (
    <div className="sticky top-0 z-10 bg-[#EDEDED] border-b border-gray-200 box-border">
      <div className="px-4 py-4 sm:px-6 flex justify-between items-center box-border">
        {/* Title with Back Button */}
        <div className="flex-1 flex items-center justify-center lg:justify-center">
          <h1 className="text-l font-medium text-[#404040] text-center w-full">
            Welcome to TimberGPT — Timber Queries & Visual Inspection Made Easy
          </h1>
        </div>
        <div className="hidden sm:block">
          <button
            onClick={onNewChat}
            className="inline-flex items-center gap-x-2 px-3 py-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none box-border"
          >
            <Plus className="size-4" />
            New Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
