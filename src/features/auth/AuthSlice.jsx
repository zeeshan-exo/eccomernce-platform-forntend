import { createSlice } from "@reduxjs/toolkit";
import { baseApi } from "../baseApi";

const initialState = {
  user: localStorage.getItem("user") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.user = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/user/login",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response, meta, args) => {
        localStorage.setItem("user", JSON.stringify(response));
        return response;
      },
      transformErrorResponse: (state, response, meta, args) => response.status,
    }),
    signup: builder.mutation({
      query: (userdata) => ({
        url: "user/signup",
        method: "POST",
        body: userdata,
      }),
      transformResponse: (response, meta, args) => {
        // localStorage.setItem("user", JSON.stringify(response));
        state.user;
        return response;
      },
      transformErrorResponse: (response, meta, args) => response.status,
    }),
    logout: builder.mutation({
      query: () => ({
        url: "user/logout",
        method: "POST",
      }),
      transformResponse: (response, meta, args) => {
        localStorage.removeItem("user");
        return response;
      },
      transformErrorResponse: (response, meta, args) => response.status,
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useLogoutMutation } =
  authApi;
export const { reset, setUser } = authSlice.actions;
export default authSlice.reducer;
