"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

const dummyEmployees = [
  {
    id: 1,
    name: "John Doe",
    position: "UI Designer",
    work: "Design the user interface",
    photo: "https://i.pravatar.cc/32?img=1",
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "Frontend Dev",
    work: "Implement the design",
    photo: "https://i.pravatar.cc/32?img=2",
  },
  {
    id: 3,
    name: "Mike Johnson",
    position: "Project Manager",
    work: "Oversee project timeline",
    photo: "https://i.pravatar.cc/32?img=3",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    position: "Backend Dev",
    work: "API integration",
    photo: "https://i.pravatar.cc/32?img=4",
  },
  {
    id: 5,
    name: "Alex Brown",
    position: "QA Engineer",
    work: "Test functionality",
    photo: "https://i.pravatar.cc/32?img=5",
  },
];

const ViewTaskModal = ({ isOpen, onClose, task }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !task) return null;

  // Priority badge styles
  const getPriorityStyle = (priority) => {
    const priorityLower = String(priority).toLowerCase();
    switch (priorityLower) {
      case "high":
        return "bg-red-50 text-red-700";
      case "medium":
        return "bg-yellow-50 text-yellow-700";
      case "low":
        return "bg-green-50 text-green-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  const getMembers = () => {
    let members = [];

    if (
      task.rawData &&
      task.rawData.members &&
      task.rawData.members.length > 0
    ) {
      members = task.rawData.members;
    }

    if (members.length === 0) {
      members = dummyEmployees.slice(0, 3);
    }

    return members;
  };

  const members = getMembers();

  const getMemberImageSrc = (member, index) => {
    if (member.photo && member.photo.startsWith("https://")) {
      return member.photo;
    }
    return `https://i.pravatar.cc/32?img=${index + 1}`;
  };

  return createPortal(
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75"
          onClick={onClose}
        />

        <div
          ref={modalRef}
          className="relative w-full max-w-lg bg-white rounded-xl shadow-xl"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Close</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Content */}
          <div className="p-6">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold text-gray-900">
                  {task.title}
                </h2>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityStyle(
                    task.rawData?.priority_level || task.priority
                  )}`}
                >
                  {(task.rawData?.priority_level || task.priority)
                    .charAt(0)
                    .toUpperCase() +
                    (task.rawData?.priority_level || task.priority).slice(1)}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Description
              </h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-600 text-sm whitespace-pre-wrap">
                  {task.description || "No description provided"}
                </p>
              </div>
            </div>

            {/* Due Date */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Due Date
              </h4>
              <p className="text-sm text-gray-600">
                {task.rawData?.due_date || task.dueDate || "No due date set"}
              </p>
            </div>

            {/* Team Members */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Team Members
              </h4>
              <div className="flex">
                {members.map((member, index) => (
                  <div
                    key={member.id}
                    className={`group relative ${
                      index !== 0 ? "ml-[-8px]" : ""
                    }`}
                  >
                    <div className="relative h-12 w-12 rounded-full border-2 border-white hover:border-purple-200 overflow-hidden">
                      <Image
                        src={getMemberImageSrc(member, index)}
                        alt={member.name}
                        className="rounded-full"
                        fill
                        sizes="32px"
                        onError={(e) => {
                          // Fallback if image fails to load
                          e.target.src = `https://i.pravatar.cc/32?img=${
                            index + 1
                          }`;
                        }}
                      />
                    </div>
                    {/* Enhanced Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="font-medium mb-1">{member.name}</div>
                      <div className="text-gray-300 text-[10px] mb-1">
                        {member.position || "Team Member"}
                      </div>
                      <div className="text-[10px]">
                        {member.work || "No responsibility assigned"}
                      </div>
                      {/* Arrow */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1 border-4 border-transparent border-t-gray-900" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-xl">
            <button
              onClick={onClose}
              className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ViewTaskModal;
