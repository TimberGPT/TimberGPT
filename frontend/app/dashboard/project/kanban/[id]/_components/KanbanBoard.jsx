"use client";

import { COLUMN_CONFIG, TAG_COLORS } from "./kanbanConstants";
import KanbanColumn from "./KanbanColumn";
import { useUpdateProjectTaskStatusMutation } from "../../../../../../redux/api/projectApi";
import { toast } from "react-hot-toast";

const KanbanBoard = ({
  tasks,
  handleDragStart,
  handleDragEnd,
  handleDragOver,
}) => {
  const [updateTaskStatus, { isLoading }] =
    useUpdateProjectTaskStatusMutation();

  const getStatusForApi = (columnId) => {
    switch (columnId) {
      case "pending":
        return "Pending";
      case "inProgress":
        return "In-progress";
      case "complete":
        return "Completed";
      default:
        return "Pending";
    }
  };

  const handleDrop = async (e, targetStatus) => {
    const taskId = e.dataTransfer.getData("taskId");
    const sourceStatus = e.dataTransfer.getData("sourceStatus");

    if (sourceStatus === targetStatus) return;

    try {
      const apiStatus = getStatusForApi(targetStatus);

      await updateTaskStatus({
        id: taskId,
        status: apiStatus,
      }).unwrap();

      toast.success(`Task moved to ${apiStatus}`);
    } catch (error) {
      console.error("Failed to update task status:", error);
      toast.error("Failed to move task. Please try again.");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {COLUMN_CONFIG.map((column) => (
        <KanbanColumn
          key={column.id}
          title={column.title}
          status={column.id}
          tasks={tasks[column.id] || []}
          count={tasks[column.id]?.length || 0}
          tagColors={TAG_COLORS}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          countBgColor={column.countBgColor}
          countTextColor={column.countTextColor}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;
