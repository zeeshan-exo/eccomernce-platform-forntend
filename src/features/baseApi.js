import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api/",
    credentials: "include",
  }),
  endpoints: () => ({}),
});

export const { reducer: apiReducer, middleware: apiMiddleware } = baseApi;
