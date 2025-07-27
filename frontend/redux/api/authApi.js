import baseApi from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation({
      query: (data) => ({
        url: "/user/register",
        method: "POST",
        data,
      }),
    }),

    login: build.mutation({
      query: (data) => ({
        url: "/user/login",
        method: "POST",
        data,
        contentType: "application/x-www-form-urlencoded",
      }),
    }),
  }),

  overrideExisting: false,
});

export const { useRegisterMutation, useLoginMutation } = authApi;
