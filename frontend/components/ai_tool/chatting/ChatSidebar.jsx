// chatting.zip/chatting/ChatSidebar.jsx
import {
  Plus,
  Save,
  HelpCircle,
  Zap,
  MessageSquare,
  Image as ImageIcon,
} from "lucide-react"; // Import ImageIcon
import Image from "next/image";

const ChatSidebar = ({
  isOpen,
  onClose,
  onNewChat,
  onShowImageAnalysis,
  activeView,
}) => {
  // Add activeView prop
  return (
    <div
      className={`fixed inset-y-0 left-0 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }
      lg:translate-x-0 w-48 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out z-50 flex flex-col h-full`}
    >
      {/* Close button for mobile */}
      <div className="lg:hidden absolute right-3 top-3">
        <button
          onClick={onClose}
          className="p-2 rounded-full text-gray-400 hover:bg-gray-100"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Logo area */}
      <div className="flex items-center justify-center px-4 py-6">
        <Image
          src="https://i.ibb.co/bRWQn1QW/timbergpt-logo.png"
          alt="TimberGPT Logo"
          className="h-[13px] w-[104px]"
          width={250}
          height={70}
        />
      </div>

      {/* Navigation items */}
      <nav className="flex-1 overflow-y-auto px-4">
        <ul className="space-y-1.5">
          <li>
            <button
              onClick={onNewChat}
              className={`flex items-center w-full gap-x-3 py-2 px-3 text-sm rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 ${
                activeView === "chat"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-700"
              }`}
            >
              <Plus className="shrink-0 size-3" />
              New chat
            </button>
          </li>
          <li>
            <button
              onClick={onShowImageAnalysis}
              className={`flex items-center w-full gap-x-3 py-2 px-3 text-sm rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 ${
                activeView === "imageAnalysis"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-700"
              }`}
            >
              <ImageIcon className="shrink-0 size-3" /> {/* Use ImageIcon */}
              Image Analysis
            </button>
          </li>
        </ul>
      </nav>

      {/* Upgrade CTA */}
    </div>
  );
};

export default ChatSidebar;
