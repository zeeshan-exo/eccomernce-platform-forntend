import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const apiUrl = import.meta.env.VITE_API_URL;

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    credentials: "include",
  }),

  endpoints: () => ({}),
});
// console.log(import.meta.env);
// console.log(apiUrl);

export const { reducer: apiReducer, middleware: apiMiddleware } = baseApi;
