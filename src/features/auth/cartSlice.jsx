import { createSlice } from "@reduxjs/toolkit";
import { baseApi } from "../baseApi";

const initialState = {
  cart: [],
};

const CartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    reset: (state) => {
      state.cart = [];
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
  },
});

const CartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: ({ userId, productId, quantity }) => ({
        url: "/cart/add",
        method: "POST",
        body: { userId, productId, quantity },
      }),
      invalidatesTags: ["Cart"],
      transformResponse: (response) => response.data,
      transformErrorResponse: (error) => error.data,
    }),

    getCart: builder.query({
      query: (userId) => ({
        url: `/cart/${userId}`,
        method: "GET",
      }),
      providesTags: ["Cart"],
      transformResponse: (response) =>
        response.data.map((item) => ({
          _id: item.product._id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
        })),
    }),
  }),
});

export const { useAddToCartMutation, useGetCartQuery } = CartApi;
export const { reset, setCart } = CartSlice.actions;
export default CartSlice.reducer;
