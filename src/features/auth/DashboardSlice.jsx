import { createSlice } from "@reduxjs/toolkit";
import { baseApi } from "../baseApi";

const initialState = {
  order: [],
};

const DashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    reset: (state) => {
      state.dashboard = [];
    },
    setDashboard: (state, action) => {
      state.dashboard = action.payload;
    },
  },
});

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query({
      query: (credentials) => ({
        url: "/dashboard",
        method: "GET",
        body: credentials,
      }),
      transformResponse: (response, meta, args) => response.data,
      transformErrorResponse: (state, response, meta, args) => response.data,
    }),
  }),
});

export const { useGetDashboardQuery } = dashboardApi;
export const { reset, setDashboard } = DashboardSlice;
export default DashboardSlice.reducer;
