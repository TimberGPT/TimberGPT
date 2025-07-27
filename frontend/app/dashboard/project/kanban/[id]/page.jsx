"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Breadcrumb from "../../../../../components/common/Breadcrumb";
import LoadingSpinner from "../../../../../components/common/LoadingSpinner";
import toast from "react-hot-toast";

import KanbanBoard from "./_components/KanbanBoard";
import AddTaskModal from "./_components/AddTaskModal";
import { formatStatusLabel } from "./_components/kanbanConstants";
import {
  useGetKanbanTasksQuery,
  useCreateProjectTaskMutation,
} from "../../../../../redux/api/projectApi";

const KanbanPage = () => {
  const params = useParams();
  const projectId = params.id;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [tasks, setTasks] = useState({
    pending: [],
    inProgress: [],
    complete: [],
  });
  const [draggingTask, setDraggingTask] = useState(null);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    tag: "Design",
    dueDate: "",
  });

  // Add the mutation hook
  const [createProjectTask, { isLoading: isCreatingTask }] =
    useCreateProjectTaskMutation();

  // Get project and tasks data from API
  const {
    data: projectData,
    isLoading: apiLoading,
    error: apiError,
    refetch,
  } = useGetKanbanTasksQuery({ id: projectId });

  // Process API data when it arrives
  useEffect(() => {
    if (projectData) {
      setProjectName(projectData.title || "Untitled Project");
      setProjectDescription(projectData.description || "");

      // Process tasks
      if (projectData.tasks && Array.isArray(projectData.tasks)) {
        const processedTasks = {
          pending: [],
          inProgress: [],
          complete: [],
        };

        projectData.tasks.forEach((task) => {
          const uiTask = {
            id: task.id.toString(),
            title: task.title,
            description: task.description,
            assignees: task.assignee ? [task.assignee] : [],
            tags: [task.priority_level],
            dueDate: new Date(task.due_date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            }),
            rawData: task,
          };

          if (task.status === "Pending") {
            processedTasks.pending.push(uiTask);
          } else if (
            task.status === "InProgress" ||
            task.status === "In Progress" ||
            task.status === "In-progress"
          ) {
            processedTasks.inProgress.push(uiTask);
          } else if (
            task.status === "Complete" ||
            task.status === "Completed"
          ) {
            processedTasks.complete.push(uiTask);
          } else {
            processedTasks.pending.push(uiTask);
          }
        });

        setTasks(processedTasks);
      }

      setIsLoading(false);
    }
  }, [projectData]);

  useEffect(() => {
    if (!apiLoading && apiError) {
      setError("Failed to load project data. Please try again.");
      setIsLoading(false);
    }
  }, [apiLoading, apiError]);

  const handleAddTask = async (taskData) => {
    try {
      const res = await createProjectTask({
        id: projectId,
        data: taskData,
      }).unwrap();

      console.log(res);

      toast.success("Task created successfully!");

      refetch();

      setShowAddTaskModal(false);
    } catch (error) {
      console.error("Failed to create task:", error);
      toast.error("Failed to create task. Please try again.");
    }
  };

  // Keep the existing handlers
  const handleDragStart = (e, task, status) => {
    setDraggingTask({ task, sourceStatus: status });
    e.currentTarget.classList.add("opacity-50");
  };

  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove("opacity-50");
    setDraggingTask(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();

    if (!draggingTask) return;

    const { task, sourceStatus } = draggingTask;

    if (!isValidMove(sourceStatus, targetStatus)) {
      toast.error("Tasks can only move forward in the workflow.");
      return;
    }

    const updatedTasks = { ...tasks };

    updatedTasks[sourceStatus] = updatedTasks[sourceStatus].filter(
      (t) => t.id !== task.id
    );

    updatedTasks[targetStatus] = [...updatedTasks[targetStatus], task];

    setTasks(updatedTasks);
    toast.success(`Task moved to ${formatStatusLabel(targetStatus)}`);
  };

  const isValidMove = (source, target) => {
    const statuses = ["pending", "inProgress", "complete"];
    const sourceIndex = statuses.indexOf(source);
    const targetIndex = statuses.indexOf(target);

    const isOneStep = Math.abs(targetIndex - sourceIndex) === 1;
    const isForwardOnly = targetIndex > sourceIndex;

    return isOneStep && isForwardOnly;
  };

  if (isLoading) {
    return <LoadingSpinner size="large" fullScreen />;
  }

  if (error) {
    return (
      <>
        <div className="mt-20">
          <Breadcrumb
            items={[
              { label: "Projects Overview", href: "/dashboard/project" },
              {
                label: projectName || "Project",
                href: `/dashboard/project/${projectId}`,
              },
            ]}
            currentPage="Kanban Board"
          />
          <div className="max-w-4xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <svg
                className="w-12 h-12 text-red-500 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-lg font-medium text-red-800 mb-2">
                Error Loading Project
              </h3>
              <p className="text-red-700">{error}</p>
              <button
                onClick={() => window.history.back()}
                className="mt-4 py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="mt-20">
        <Breadcrumb
          items={[{ label: "Projects Overview", href: "/dashboard/project" }]}
          currentPage={projectName}
        />

        {/* Main content container */}
        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Project Information Section */}
          <div className="bg-gray-50 rounded-lg shadow-sm p-6 mb-6">
            {/* Title and description section */}
            <div className="mb-4">
              <h1 className="text-2xl font-semibold text-gray-900">
                {projectName} - Kanban Board
              </h1>
              {projectDescription && (
                <p className="mt-2 text-sm text-gray-600">
                  {projectDescription}
                </p>
              )}
            </div>
          </div>

          {/* Kanban board title */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-medium text-gray-800">
                Task Management
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Drag tasks between columns to update their status
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 bg-gray-100 py-1 px-2 rounded">
                {tasks.pending.length +
                  tasks.inProgress.length +
                  tasks.complete.length}{" "}
                tasks
              </span>

              <button
                onClick={() => setShowAddTaskModal(true)}
                className="bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center whitespace-nowrap hover:bg-purple-800 transition-colors"
              >
                <svg
                  className="w-4 h-4 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add new task
              </button>
            </div>
          </div>

          {/* Kanban Board Section */}
          <div className="bg-gray-50 rounded-lg shadow-sm p-6">
            <KanbanBoard
              tasks={tasks}
              handleDragStart={handleDragStart}
              handleDragEnd={handleDragEnd}
              handleDragOver={handleDragOver}
              handleDrop={handleDrop}
            />
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={showAddTaskModal}
        onClose={() => setShowAddTaskModal(false)}
        onTaskCreated={() => refetch()}
      />
    </>
  );
};

export default KanbanPage;
