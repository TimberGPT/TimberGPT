import { Menu, Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";

const ChatHeader = ({ onMenuClick, onNewChat }) => {
  return (
    <div className="sticky top-0 z-10 bg-gray-50 border-b border-gray-200">
      <div className="px-4 py-4 sm:px-6 flex justify-between items-center">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Title with Back Button */}
        <div className="flex-2 text-center lg:text-left flex items-center">
          <Link
            href={"/dashboard"}
            className="mr-2 p-1.5 rounded-lg text-gray-500 hover:bg-[#F6F9FF] focus:outline-none focus:ring-2 focus:ring-[#6A49BA] focus:ring-opacity-50"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-semibold text-[#404040]">Legal GPT</h1>
        </div>

        {/* New chat button (visible on larger screens) */}
        <div className="hidden sm:block">
          <button
            onClick={onNewChat}
            className="inline-flex items-center gap-x-2 px-3 py-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
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
