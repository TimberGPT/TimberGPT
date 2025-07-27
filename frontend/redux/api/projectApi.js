import { tagTypes } from "../tag-types";
import baseApi from "./baseApi";

export const projectApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createProject: build.mutation({
      query: (data) => ({
        url: "/project/projects/",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.project],
    }),

    updateProject: build.mutation({
      query: ({ id, data }) => ({
        url: `/project/projects/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: [tagTypes.project],
    }),

    getCompanyProjects: build.query({
      query: () => ({
        url: `/project/projects/by_company/`,
        method: "GET",
      }),
      providesTags: [tagTypes.project],
    }),

    getCompanyProjectDetails: build.query({
      query: ({ id }) => ({
        url: `/project/projects/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.project],
    }),

    getKanbanTasks: build.query({
      query: ({ id }) => ({
        url: `/kanban/tasks/project/${id}/tasks`,
        method: "GET",
      }),
      providesTags: [tagTypes.project],
    }),

    createProjectTask: build.mutation({
      query: ({ id, data }) => ({
        url: `/kanban/tasks/project/${id}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.task],
    }),

    getCompanyMembers: build.query({
      query: () => ({
        url: `/company/company/members`,
        method: "GET",
      }),
      providesTags: [tagTypes.company, tagTypes.user, tagTypes.project],
    }),

    updateProjectTask: build.mutation({
      query: ({ id, data }) => ({
        url: `/kanban/tasks/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.task, tagTypes.project],
    }),

    updateProjectTaskStatus: build.mutation({
      query: ({ id, status }) => ({
        url: `/kanban/tasks/${id}/status`,
        method: "PATCH",
        params: { status },
      }),
      invalidatesTags: [tagTypes.task, tagTypes.project],
    }),
  }),

  overrideExisting: false,
});

export const {
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useGetCompanyProjectsQuery,
  useGetCompanyProjectDetailsQuery,
  useGetKanbanTasksQuery,
  useCreateProjectTaskMutation,
  useGetCompanyMembersQuery,
  useUpdateProjectTaskMutation,
  useUpdateProjectTaskStatusMutation,
} = projectApi;
