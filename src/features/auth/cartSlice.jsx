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
      state.cart = action.payload || [];
    },
    updateCartItem(state, action) {
      const { productId, change } = action.payload;
      const item = state.cart.find((item) => item._id === productId);
      if (item) {
        item.quantity += change;
      }
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
      transformResponse: (response) => response.data,
    }),
    deleteFromCart: builder.mutation({
      query: (data) => ({
        url: `/cart/${data.userId}`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Cart"],
      transformResponse: (response) => response.data,
      transformErrorResponse: (error) => error.data,
    }),
  }),
});

export const {
  useAddToCartMutation,
  useGetCartQuery,
  useDeleteFromCartMutation,
} = CartApi;
export const { reset, setCart, updateCartItem } = CartSlice.actions;
export default CartSlice.reducer;
