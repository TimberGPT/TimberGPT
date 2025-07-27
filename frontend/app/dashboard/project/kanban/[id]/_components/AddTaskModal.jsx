"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useCreateProjectTaskMutation } from "../../../../../../redux/api/projectApi";

const taskSchema = z.object({
  title: z.string().min(1, "Task title is required"),
  priority_level: z.string().min(1, "Priority is required"),
  description: z.string().optional(),
  due_date: z.string().optional(),
});

const priorityOptions = [
  { value: "High", label: "High" },
  { value: "Medium", label: "Medium" },
  { value: "Low", label: "Low" },
];

const AddTaskModal = ({ isOpen, onClose, onTaskCreated }) => {
  const params = useParams();
  const projectId = params.id;
  const modalRef = useRef(null);
  const formRef = useRef(null);

  const formMethods = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      priority_level: "",
      description: "",
      due_date: "",
    },
  });

  const [createProjectTask, { isLoading: isSubmitting }] =
    useCreateProjectTaskMutation();

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

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const handleSubmit = async (data) => {
    console.log("Form submitted with data:", data);
    try {
      const apiRequestData = {
        project_id: Number(projectId),
        title: data.title,
        description: data.description || "",
        status: "Pending",
        priority_level: data.priority_level,
        due_date: data.due_date || "",
      };

      console.log("Submitting task:", apiRequestData);

      const result = await createProjectTask({
        id: projectId,
        data: apiRequestData,
      }).unwrap();

      console.log("Task created successfully:", result);

      toast.success("Task created successfully!");

      if (onTaskCreated) onTaskCreated();

      onClose();
    } catch (error) {
      console.error("Failed to create task:", error);
      toast.error("Failed to create task. Please try again.");
    }
  };

  const handleManualSubmit = () => {
    console.log("Manual submit clicked");
    formMethods.handleSubmit(handleSubmit)();
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div className="min-h-screen w-full flex items-center justify-center p-4">
        <div
          ref={modalRef}
          className="relative w-full max-w-lg bg-white rounded-xl shadow-lg my-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal header */}
          <div className="absolute top-3 right-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              disabled={isSubmitting}
            >
              <span className="sr-only">Close</span>
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 rounded-t-xl">
            <h3 className="text-xl font-semibold text-gray-800">
              Add New Task
            </h3>
          </div>

          <div className="px-6 py-4 max-h-[calc(100vh-16rem)] overflow-y-auto">
            {/* Use formMethods directly */}
            <form
              ref={formRef}
              onSubmit={formMethods.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium mb-2 text-gray-700"
                >
                  Task Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  {...formMethods.register("title")}
                  placeholder="Enter task title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  autoFocus
                />
                {formMethods.formState.errors.title && (
                  <p className="mt-1 text-sm text-red-600">
                    {formMethods.formState.errors.title.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="priority_level"
                  className="block text-sm font-medium mb-2 text-gray-700"
                >
                  Priority <span className="text-red-500">*</span>
                </label>
                <select
                  id="priority_level"
                  {...formMethods.register("priority_level")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="">Select priority</option>
                  {priorityOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {formMethods.formState.errors.priority_level && (
                  <p className="mt-1 text-sm text-red-600">
                    {formMethods.formState.errors.priority_level.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium mb-2 text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  {...formMethods.register("description")}
                  rows={4}
                  placeholder="Enter task description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="due_date"
                  className="block text-sm font-medium mb-2 text-gray-700"
                >
                  Due Date
                </label>
                <input
                  id="due_date"
                  type="date"
                  {...formMethods.register("due_date")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </form>
          </div>

          {/* Separate the footer from the form content */}
          <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-gray-200 rounded-b-xl">
            <div className="flex justify-end gap-x-2">
              <button
                type="button"
                onClick={onClose}
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleManualSubmit}
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin inline-block w-4 h-4 border-[2px] border-current border-t-transparent text-white rounded-full" />
                    Creating...
                  </>
                ) : (
                  "Add Task"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AddTaskModal;
