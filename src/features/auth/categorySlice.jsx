import { createSlice } from "@reduxjs/toolkit";
import { baseApi } from "../baseApi";

const initialState = {
  order: [],
};

const CategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    reset: (state) => {
      state.category = [];
    },
    setCategory: (state, action) => {
      state.Category = action.payload;
    },
  },
});

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: (credentials) => ({
        url: "/product/category",
        method: "GET",
        body: credentials,
      }),
      transformResponse: (response, meta, args) => response.data,
      transformErrorResponse: (state, response, meta, args) => response.data,
    }),
    getsubCategory: builder.query({
      query: (credentials) => ({
        url: "/product/subcategory",
        method: "GET",
        body: credentials,
      }),
      transformResponse: (response, meta, args) => response.data,
      transformErrorResponse: (state, response, meta, args) => response.data,
    }),
  }),
});

export const { useGetCategoryQuery, useGetsubCategoryQuery } = categoryApi;
export const { reset, setCategory } = CategorySlice;
export default CategorySlice.reducer;
