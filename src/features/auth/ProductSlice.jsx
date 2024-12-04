import { createSlice } from "@reduxjs/toolkit";
import { baseApi } from "../baseApi";

const initialState = {
  product: localStorage.getItem("product") || null,
};
const authProductSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.product = [];
    },
    setProduct: (state, action) => {
      state.product = action.payload;
    },
  },
});

const authProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (credentials) => ({
        url: "/product",
        method: "GET",
        body: credentials,
      }),
      transformResponse: (response, meta, args) => {
        localStorage.setItem("product", JSON.stringify(response));
        return response;
      },
      transformErrorResponse: (state, response, meta, args) => response.status,
    }),
  }),
});

export const { useGetAllProductsQuery } = authProductApi;
export const { reset, setProduct } = authProductSlice.actions;
export default authProductSlice.reducer;
