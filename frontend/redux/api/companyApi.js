import { tagTypes } from "../tag-types";
import baseApi from "./baseApi";

export const companyApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    registerCompany: build.mutation({
      query: (data) => ({
        url: "/company/create",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.company],
    }),

    getMycompany: build.query({
      query: ({ id }) => ({
        url: `/company/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.company],
    }),

    updateCompanyInfo: build.mutation({
      query: ({ data, id }) => ({
        url: `/company/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: [tagTypes.company],
    }),
  }),

  overrideExisting: false,
});

export const {
  useRegisterCompanyMutation,
  useGetMycompanyQuery,
  useUpdateCompanyInfoMutation,
} = companyApi;
