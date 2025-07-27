import { tagTypes } from "../tag-types";
import baseApi from "./baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTotals: build.query({
      query: () => ({
        url: `/dashboard/totals`,
        method: "GET",
      }),
      providesTags: [
        tagTypes.user,
        tagTypes.job,
        tagTypes.company,
        tagTypes.task,
        tagTypes.project,
      ],
    }),

    getMonthlySales: build.query({
      query: () => ({
        url: `/dashboard/monthly-sales`,
        method: "GET",
      }),
      providesTags: [
        tagTypes.user,
        tagTypes.job,
        tagTypes.company,
        tagTypes.task,
        tagTypes.project,
      ],
    }),

    getMonthlyTargets: build.query({
      query: () => ({
        url: `/dashboard/monthly-target`,
        method: "GET",
      }),
      providesTags: [
        tagTypes.user,
        tagTypes.job,
        tagTypes.company,
        tagTypes.task,
        tagTypes.project,
      ],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetTotalsQuery,
  useGetMonthlySalesQuery,
  useGetMonthlyTargetsQuery,
} = dashboardApi;
