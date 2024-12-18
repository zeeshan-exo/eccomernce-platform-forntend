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
      query: (filters) => ({
        url: "/order",
        method: "GET",
        params: filters || {},
      }),
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/order/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response, meta, args) => response.data,
      transformErrorResponse: (state, response, meta, args) => response.data,
    }),
    getOneOrder: builder.query({
      query: (id) => ({
        url: `/order/${id}`,
        method: "GET",
      }),
      transformResponse: (response, meta, args) => response.data,
      transformErrorResponse: (state, response, meta, args) => response.data,
    }),
    updateOrder: builder.mutation({
      query: (id) => ({
        url: `/order/${id}`,
        method: "PATCH",
      }),
      transformResponse: (response, meta, args) => response.data,
      transformErrorResponse: (state, response, meta, args) => response.data,
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useDeleteOrderMutation,
  useGetOneOrderQuery,
  useUpdateOrderMutation
} = OrderApi;
export const { reset, setOrder } = OrderSlice.actions;
export default OrderSlice.reducer;
