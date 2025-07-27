import { tagTypes } from "../tag-types";
import baseApi from "./baseApi";

export const hrApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createJobPost: build.mutation({
      query: (data) => ({
        url: "/hr/job-posts",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.job],
    }),

    getJobPosts: build.query({
      query: () => ({
        url: "/hr/job-posts",
        method: "GET",
      }),
      providesTags: [tagTypes.job],
    }),

    getJobApplicants: build.query({
      query: ({ id }) => ({
        url: `/hr/application-received/${id}`,
        method: "POST",
      }),
      providesTags: [tagTypes.job],
    }),

    uploadCV: build.query({
      query: () => ({
        url: `/hr/cv/upload-url`,
        method: "GET",
      }),
    }),

    applyJob: build.mutation({
      query: (data) => ({
        url: `/hr/job-apply`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.job],
    }),

    sendMail: build.mutation({
      query: (data) => ({
        url: `/hr/send-email`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.job],
    }),
  }),

  overrideExisting: false,
});

export const {
  useCreateJobPostMutation,
  useGetJobPostsQuery,
  useGetJobApplicantsQuery,
  useUploadCVQuery,
  useApplyJobMutation,
  useSendMailMutation,
} = hrApi;
