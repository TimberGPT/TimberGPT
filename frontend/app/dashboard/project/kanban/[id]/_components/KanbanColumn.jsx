"use client";

import { useState } from "react";
import TaskCard from "./TaskCard";

const KanbanColumn = ({
  title,
  status,
  tasks,
  count,
  tagColors,
  onDragOver,
  onDrop,
  onDragStart,
  onDragEnd,
  countBgColor = "bg-gray-100",
  countTextColor = "text-gray-700",
}) => {
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const [dragSourceStatus, setDragSourceStatus] = useState(null);

  const handleDragStart = (e, task, sourceStatus) => {
    setDragSourceStatus(sourceStatus);
    if (onDragStart) onDragStart(e, task, sourceStatus);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (dragSourceStatus !== status) {
      setIsDraggedOver(true);
      if (onDragOver) onDragOver(e);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDraggedOver(false);
  };

  const handleDrop = (e) => {
    setIsDraggedOver(false);
    if (dragSourceStatus !== status) {
      onDrop(e, status);
    }
    setDragSourceStatus(null);
  };

  return (
    <div
      className={`bg-white rounded-lg p-6 shadow-sm transition-all duration-200 hover:shadow-md
        ${
          isDraggedOver && dragSourceStatus !== status
            ? "border-2 border-dashed border-purple-400 bg-purple-50/50"
            : "border border-gray-200"
        }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900">{title}</h2>
        <span
          className={`${countBgColor} ${countTextColor} text-xs font-medium px-2.5 py-0.5 rounded-full`}
        >
          {count}
        </span>
      </div>

      <div className="min-h-[100px]">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            status={status}
            tagColors={tagColors}
            onDragStart={(e) => handleDragStart(e, task, status)}
            onDragEnd={onDragEnd}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
