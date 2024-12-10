import { createSlice } from "@reduxjs/toolkit";
import { baseApi } from "../baseApi";

const initialState = {
  order: [],
};
const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    reset: (state) => {
      state.order = [];
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
  },
});

const OrderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: (credentials) => ({
        url: "/order",
        method: "GET",
        body: credentials,
      }),
      transformResponse: (response, meta, args) => response.data,
      transformErrorResponse: (state, response, meta, args) => response.data,
    }),
  }),
});

export const { useGetAllOrdersQuery } = OrderApi;
export const { reset, setOrder } = OrderSlice.actions;
export default OrderSlice.reducer;
