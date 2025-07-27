"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import ProjectForm from "../../_components/ProjectForm";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../../../components/common/LoadingSpinner";
import Breadcrumb from "../../../../../components/common/Breadcrumb";
import {
  useGetCompanyProjectDetailsQuery,
  useUpdateProjectMutation,
} from "../../../../../redux/api/projectApi";

const UpdateProjectPage = () => {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id;

  // Get project details
  const { data: projectData, isLoading } = useGetCompanyProjectDetailsQuery({
    id: projectId,
  });

  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();

  // Handle project update
  const handleUpdateProject = async (formData) => {
    try {
      const apiData = {
        title: formData.projectName,
        description: formData.description,
        status: formData.status,
        priority_level: formData.priorityLevel,
        due_date: formData.dueDate,
        start_date: formData.startDate,
        category: formData.category,
      };

      await updateProject({ id: projectId, data: apiData }).unwrap();

      toast.success("Project updated successfully");
      router.push("/dashboard/project");
    } catch (error) {
      console.error("Failed to update project:", error);
      toast.error("Failed to update project. Please try again.");
    }
  };

  const formattedProjectData = projectData
    ? {
        projectName: projectData.title,
        description: projectData.description,
        category: projectData.category,
        status: projectData.status,
        priorityLevel: projectData.priority_level,
        startDate: projectData.start_date,
        dueDate: projectData.due_date,
      }
    : null;

  if (isLoading) {
    return <LoadingSpinner size="large" fullScreen />;
  }

  return (
    <>
      <Breadcrumb
        items={[{ label: "Projects Overview", href: "/dashboard/project" }]}
        currentPage="Update Project"
      />
      <ProjectForm
        isUpdateMode={true}
        projectData={formattedProjectData}
        onSubmit={handleUpdateProject}
        isSubmitting={isUpdating}
      />
    </>
  );
};

export default UpdateProjectPage;
