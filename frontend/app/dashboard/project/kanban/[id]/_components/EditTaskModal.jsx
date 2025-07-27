"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { PlusCircle, Trash2 } from "lucide-react";
import CustomSelect from "../../../../../../components/form/CustomSelect";
import CustomInput from "../../../../../../components/form/CustomInput";
import {
  useUpdateProjectTaskMutation,
  useGetCompanyMembersQuery,
} from "../../../../../../redux/api/projectApi";

const taskSchema = z.object({
  title: z.string().min(1, "Task title is required"),
  priority_level: z.string().min(1, "Priority is required"),
  description: z.string().optional(),
  due_date: z.string().optional(),
  assignments: z
    .array(
      z.object({
        employeeId: z.string().min(1, "Employee is required"),
        responsibility: z.string().min(1, "Responsibility is required"),
      })
    )
    .optional(),
});

const priorityOptions = [
  { value: "High", label: "High" },
  { value: "Medium", label: "Medium" },
  { value: "Low", label: "Low" },
];

const EditTaskModal = ({ isOpen, onClose, task, onTaskUpdated }) => {
  const modalRef = useRef(null);
  const formRef = useRef(null);
  const [updateProjectTask, { isLoading: isSubmitting }] =
    useUpdateProjectTaskMutation();

  const formMethods = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: task
      ? {
          title: task.title || "",
          description: task.description || "",
          priority_level: task.priority_level || "Low",
          due_date: task.due_date || "",
          assignments: task.members
            ? task.members.map((member) => ({
                employeeId: String(member.id),
                responsibility: member.work || "",
              }))
            : [{ employeeId: "", responsibility: "" }],
        }
      : {},
  });

  const { control, watch } = formMethods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "assignments",
  });

  const selectedEmployeeIds = watch("assignments")
    ?.map((assignment) => Number(assignment.employeeId))
    .filter((id) => id);

  const { data: membersData, isLoading: membersLoading } =
    useGetCompanyMembersQuery({});
  const members = membersData || [];

  const getMemberOptions = (excludeIds = []) => {
    return members
      .filter((member) => {
        const memberId = Number(member.id);
        return !excludeIds.some((id) => Number(id) === memberId);
      })
      .map((member) => ({
        value: String(member.id),
        label: `${member.name} (${member.position})`,
      }));
  };

  const remainingMembers = members.filter((member) => {
    const memberId = Number(member.id);
    return !selectedEmployeeIds.some((id) => Number(id) === memberId);
  });

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

  const handleSubmit = async (data) => {
    try {
      const apiRequestData = {
        title: data.title,
        description: data.description || "",
        status: task.status || "Pending",
        priority_level: data.priority_level,
        due_date: data.due_date || "",
        members: data.assignments.map((assignment) => ({
          id: Number(assignment.employeeId),
          work: assignment.responsibility,
        })),
      };

      console.log("Updating task with data:", apiRequestData);

      await updateProjectTask({
        id: task.id,
        data: apiRequestData,
      }).unwrap();

      toast.success("Task updated successfully!");

      if (onTaskUpdated) onTaskUpdated();

      onClose();
    } catch (error) {
      console.error("Failed to update task:", error);
      toast.error("Failed to update task. Please try again.");
    }
  };

  const handleManualSubmit = () => {
    console.log("Manual submit clicked for edit form");
    formMethods.handleSubmit(handleSubmit)();
  };

  if (!isOpen || !task) return null;

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
          <div className="absolute top-3 right-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
              disabled={isSubmitting}
            >
              <span className="sr-only">Close</span>
              <svg
                className="h-5 w-5"
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
          </div>

          <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 rounded-t-xl">
            <h3 className="text-xl font-semibold text-gray-800">Edit Task</h3>
          </div>

          <FormProvider {...formMethods}>
            <div className="px-6 py-4 max-h-[calc(100vh-16rem)] overflow-y-auto">
              <form
                ref={formRef}
                onSubmit={formMethods.handleSubmit(handleSubmit)}
                className="space-y-4"
              >
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Task Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...formMethods.register("title")}
                    placeholder="Enter task title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                  {formMethods.formState.errors.title && (
                    <p className="mt-1 text-sm text-red-600">
                      {formMethods.formState.errors.title.message}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    {...formMethods.register("description")}
                    rows={4}
                    placeholder="Enter task description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...formMethods.register("priority_level")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    required
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

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    {...formMethods.register("due_date")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Team Members & Responsibilities{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <div className="space-y-4">
                    {fields.map((field, index) => {
                      const otherSelectedIds = selectedEmployeeIds.filter(
                        (_, i) => i !== index
                      );

                      const memberOptions = getMemberOptions(otherSelectedIds);

                      return (
                        <div
                          key={field.id}
                          className="p-4 bg-gray-50 rounded-lg"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="text-sm font-medium text-gray-700">
                              Team Member {index + 1}
                            </h4>
                            {index > 0 && (
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                              <label className="block text-xs font-medium text-gray-500 mb-1">
                                Member
                              </label>
                              <CustomSelect
                                name={`assignments.${index}.employeeId`}
                                placeholder={
                                  membersLoading
                                    ? "Loading members..."
                                    : "Select member"
                                }
                                options={memberOptions}
                                disabled={membersLoading}
                                required
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-medium text-gray-500 mb-1">
                                Responsibility
                              </label>
                              <CustomInput
                                name={`assignments.${index}.responsibility`}
                                placeholder="Enter responsibility"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {remainingMembers.length > 0 && (
                      <button
                        type="button"
                        onClick={() =>
                          append({ employeeId: "", responsibility: "" })
                        }
                        className="mt-2 inline-flex items-center text-sm text-purple-600 hover:text-purple-800"
                      >
                        <PlusCircle className="h-4 w-4 mr-1" />
                        Add Another Team Member
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </FormProvider>

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
                    Updating...
                  </>
                ) : (
                  "Save Changes"
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

export default EditTaskModal;
