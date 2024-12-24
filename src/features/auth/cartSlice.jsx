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
        url: "/add-to-cart",
        method: "POST",
        body: {
          userId,
          productId,
          quantity,
        },
      }),
      transformResponse: (response) => response.data,
      transformErrorResponse: (state, response) => response.data,
    }),
  }),
});

export const { useAddToCartMutation } = CartApi;

export const { reset, setCart } = CartSlice.actions;

export default CartSlice.reducer;
