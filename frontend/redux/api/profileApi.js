import { tagTypes } from "../tag-types";
import baseApi from "./baseApi";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    updateProfile: build.mutation({
      query: (data) => ({
        url: "/user/update",
        method: "PUT",
        data,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    getMyProfile: build.query({
      query: () => ({
        url: "/user/details",
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
  }),

  overrideExisting: false,
});

export const { useUpdateProfileMutation, useGetMyProfileQuery } = profileApi;
