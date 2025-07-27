"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import AIProjectAssistant from "./AIProjectAssistant";
import { useCreateProjectMutation } from "../../../../redux/api/projectApi";

// Project validation schema
const projectSchema = z.object({
  projectName: z.string().min(1, "Project name is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  status: z.string().min(1, "Status is required"),
  priorityLevel: z.string().min(1, "Priority level is required"),
  startDate: z
    .string()
    .min(1, "Start date is required")
    .refine((date) => new Date(date), {
      message: "Please enter a valid date",
    }),
  dueDate: z
    .string()
    .min(1, "Due date is required")
    .refine((date) => new Date(date), {
      message: "Please enter a valid date",
    }),
});

const ProjectForm = ({
  isUpdateMode = false,
  projectData = null,
  onSubmit: externalSubmit,
  isSubmitting: externalIsSubmitting,
}) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const [createProject] = useCreateProjectMutation();

  const submitting = externalIsSubmitting || isSubmitting;

  const form = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      projectName: projectData?.projectName || "",
      description: projectData?.description || "",
      category: projectData?.category || "",
      status: projectData?.status || "",
      priorityLevel: projectData?.priorityLevel || "",
      startDate: projectData?.startDate || "",
      dueDate: projectData?.dueDate || "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    trigger,
    watch,
  } = form;

  const categoryOptions = [
    { value: "", label: "Select a category" },
    { value: "Web Development", label: "Web Development" },
    { value: "Mobile App", label: "Mobile App" },
    { value: "UI/UX Design", label: "UI/UX Design" },
    { value: "Branding", label: "Branding" },
    { value: "Marketing", label: "Marketing" },
    { value: "Content Creation", label: "Content Creation" },
    { value: "SEO", label: "SEO" },
    { value: "Other", label: "Other" },
  ];

  const statusOptions = [
    { value: "", label: "Select status" },
    { value: "Pending", label: "Pending" },
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  const priorityOptions = [
    { value: "", label: "Select priority" },
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" },
    { value: "Critical", label: "Critical" },
  ];

  const handleGenerateContent = async (prompt) => {
    setIsGenerating(true);
    try {
      const response = await generateProjectContent(prompt);
      console.log("AI Response:", response);

      // Update form fields with AI response
      Object.entries(response).forEach(([key, value]) => {
        if (key === "dueDate") {
          // Format date properly for the date input
          const dueDate = new Date(value).toISOString().split("T")[0];
          setValue(key, dueDate, { shouldValidate: true });
        } else {
          setValue(key, value, { shouldValidate: true });
        }
      });

      await trigger();
      toast.success("Project details generated successfully!");
    } catch (error) {
      console.error("AI generation failed:", error);
      toast.error(error.message || "Failed to generate project details");
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmit = async (data) => {
    if (externalSubmit) {
      return externalSubmit(data);
    }

    const toastId = toast.loading("Creating project...");
    setIsSubmitting(true);

    try {
      const formattedData = {
        title: data.projectName,
        description: data.description,
        category: data.category,
        status: data.status,
        priority_level: data.priorityLevel,
        start_date: data.startDate,
        due_date: data.dueDate,
      };

      const response = await createProject(formattedData).unwrap();
      console.log(response);
      toast.success("Project created successfully!", { id: toastId });
      router.push("/dashboard/project");
    } catch (error) {
      console.error("Project submission failed:", error);
      toast.error("Something went wrong. Please try again.", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div>
        {/* Main Form Section */}
        <div className="max-w-4xl px-4 sm:px-6 lg:px-8 mx-auto mb-10">
          {/* Form Card */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-7">
            {/* Form Header */}
            <div className="mb-5 sm:mb-8">
              <h2 className="text-2xl font-bold text-gray-800">
                {isUpdateMode ? "Update Project" : "Create New Project"}
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                {isUpdateMode
                  ? "Update your project information below."
                  : "Fill in the details below to create a new project."}
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="space-y-5 sm:space-y-6">
                {/* Project Details Section */}
                <div>
                  {/* Project Name */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Project Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("projectName")}
                      placeholder="Enter project name"
                      className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-purple-500 focus:ring-purple-500 focus:ring-2 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                    />
                    {errors.projectName && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.projectName.message}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      {...register("description")}
                      rows={4}
                      placeholder="Describe the project in detail"
                      className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-purple-500 focus:ring-purple-500 focus:ring-2 focus:outline-none resize-vertical disabled:opacity-50 disabled:pointer-events-none"
                    />
                    {errors.description && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  {/* Category */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      {...register("category")}
                      className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-purple-500 focus:ring-purple-500 focus:ring-2 focus:outline-none appearance-none bg-white disabled:opacity-50 disabled:pointer-events-none"
                    >
                      {categoryOptions.map((option) => (
                        <option
                          key={option.value}
                          value={option.value}
                          className={option.value === "" ? "text-gray-500" : ""}
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.category.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Status & Priority Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Status & Priority
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        Status <span className="text-red-500">*</span>
                      </label>
                      <select
                        {...register("status")}
                        className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-purple-500 focus:ring-purple-500 focus:ring-2 focus:outline-none"
                      >
                        {statusOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {errors.status && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.status.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        Priority Level <span className="text-red-500">*</span>
                      </label>
                      <select
                        {...register("priorityLevel")}
                        className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-purple-500 focus:ring-purple-500 focus:ring-2 focus:outline-none"
                      >
                        {priorityOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {errors.priorityLevel && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.priorityLevel.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Timeline Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Project Timeline
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Start Date field */}
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        Start Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        {...register("startDate")}
                        className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-purple-500 focus:ring-purple-500 focus:ring-2 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                      />
                      {errors.startDate && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.startDate.message}
                        </p>
                      )}
                    </div>

                    {/* Due Date field */}
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        Due Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        {...register("dueDate")}
                        className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-purple-500 focus:ring-purple-500 focus:ring-2 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                      />
                      {errors.dueDate && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.dueDate.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Footer */}
              <div className="mt-6 flex flex-col sm:flex-row sm:justify-end gap-2">
                <button
                  type="button"
                  onClick={() => router.push("/dashboard/project")}
                  className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-gray-300 font-medium bg-white text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all text-sm"
                >
                  {submitting ? (
                    <>
                      <span className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full" />
                      {isUpdateMode ? "Updating..." : "Creating..."}
                    </>
                  ) : isUpdateMode ? (
                    "Update Project"
                  ) : (
                    "Create Project"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <AIProjectAssistant
        onGenerateContent={handleGenerateContent}
        isGenerating={isGenerating}
      />
    </>
  );
};

const generateProjectContent = async (prompt) => {
  try {
    const response = await fetch("/api/generate-project", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to generate content");
    }

    if (!data.projectName) {
      throw new Error("Invalid response from AI");
    }

    return data;
  } catch (error) {
    console.error("AI generation error:", error);
    throw new Error(error.message || "Failed to generate project content");
  }
};

export default ProjectForm;
