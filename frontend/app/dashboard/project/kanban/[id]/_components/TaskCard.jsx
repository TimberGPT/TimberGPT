"use client";

import Image from "next/image";
import { useState } from "react";
import ViewTaskModal from "./ViewTaskModal";
import EditTaskModal from "./EditTaskModal";

const TaskCard = ({ task, status, tagColors, onDragStart, onDragEnd }) => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const isComplete = status === "complete";

  const getStatusStyling = () => {
    switch (status) {
      case "todo":
        return "border-l-[3px] border-blue-400 hover:shadow-blue-100";
      case "inProgress":
        return "border-l-[3px] border-yellow-400 hover:shadow-yellow-100";
      case "complete":
        return "border-l-[3px] border-green-400 hover:shadow-green-100";
      default:
        return "";
    }
  };

  const handleDragStartEvent = (e) => {
    e.dataTransfer.setData("taskId", task.id);
    e.dataTransfer.setData("sourceStatus", status);
    if (onDragStart) onDragStart(e, task, status);
  };

  const handleEditTask = (updatedTask) => {
    console.log("Updated task:", updatedTask);
  };

  const handleDelete = () => {
    console.log("Delete task:", task.id);
  };

  const userRole = "admin";
  const canEdit = ["admin", "manager"].includes(userRole);
  const canDelete = ["admin"].includes(userRole);

  return (
    <>
      <div
        className={`bg-white rounded-lg p-4 mb-4 border-[0.75px] border-gray-200 
          ${getStatusStyling()} 
          ${isComplete ? "cursor-not-allowed" : "cursor-grab"}
          transition-all duration-200 hover:shadow-md`}
        draggable={!isComplete}
        onDragStart={isComplete ? null : handleDragStartEvent}
        onDragEnd={isComplete ? null : onDragEnd}
      >
        <div className="flex items-center mb-3">
          {task.assignees.map((id, index) => (
            <div
              key={id}
              className={`relative w-8 h-8 rounded-full border-2 border-white overflow-hidden ${
                index !== 0 ? "ml-[-8px]" : ""
              }`}
            >
              <Image
                src={`https://i.pravatar.cc/32?img=${id}`}
                alt="Assignee avatar"
                fill
                sizes="32px"
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
        <h3 className="font-medium text-gray-900 mb-3">{task.title}</h3>
        <div className="flex flex-wrap gap-2 mb-3">
          {task.tags.map((tag) => (
            <span
              key={tag}
              className={`text-xs px-2 py-1 rounded-full font-medium ${
                tagColors[tag] || "bg-gray-200 text-gray-700"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-medium">Due:</span> {task.dueDate}
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => setIsViewModalOpen(true)}
              className="flex items-center justify-center px-3 py-1.5 text-xs font-medium text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors group"
            >
              <svg
                className="w-3.5 h-3.5 mr-1.5 text-gray-500 group-hover:text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              View
            </button>

            {canEdit && !isComplete && (
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="flex items-center justify-center px-3 py-1.5 text-xs font-medium text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-full transition-colors group"
              >
                <svg
                  className="w-3.5 h-3.5 mr-1.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                Edit
              </button>
            )}
          </div>
        </div>
      </div>

      <ViewTaskModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        task={{
          ...task,
          status,
          priority: task.priority || "medium",
        }}
      />

      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        task={task}
        onSubmit={handleEditTask}
      />
    </>
  );
};

export default TaskCard;
