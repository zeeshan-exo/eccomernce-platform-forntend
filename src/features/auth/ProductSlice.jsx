import { createSlice } from "@reduxjs/toolkit";
import { baseApi } from "../baseApi";

const initialState = {
  product: [],
};
const ProductSlice = createSlice({
  name: "product",
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

const ProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (filters) => ({
        url: "/product",
        method: "GET",
        params: filters || {},
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response, meta, args) => response.data,
      transformErrorResponse: (state, response, meta, args) => response.data,
    }),
    updateProduct: builder.mutation({
      query: (updateData) => ({
        url: `/product/${updateData.id}`,
        method: "PATCH",
        body: updateData,
      }),
      transformResponse: (response, meta, args) => response.data,
      transformErrorResponse: (state, response, meta, args) => response.data,
    }),
    createProduct: builder.mutation({
      query: (product) => ({
        url: `/product`,
        method: "POST",
        body: product,
      }),
      transformResponse: (response, meta, args) => response.data,
      transformErrorResponse: (state, response, meta, args) => response.data,
    }),
    getOneProduct: builder.query({
      query: (id) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      transformErrorResponse: (state, response) => response?.data,
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useCreateProductMutation,
  useGetOneProductQuery,
} = ProductApi;
export const { reset, setProduct } = ProductSlice.actions;
export default ProductSlice.reducer;
