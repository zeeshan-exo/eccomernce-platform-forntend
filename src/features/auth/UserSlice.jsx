import { createSlice } from "@reduxjs/toolkit";
import { baseApi } from "../baseApi";

const initialState = {
  users: [],
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.users = [];
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

const UserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/user",
      }),
      transformResponse: (response) => response.data,
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response) => response.data,
      transformErrorResponse: (state, response) => response.data,
    }),

    updateUser: builder.mutation({
      query: (updateData) => ({
        url: `/user/${updateData.id}`,
        method: "PATCH",
        body: updateData,
      }),
      transformResponse: (response) => response.data,
      transformErrorResponse: (state, response) => response.data,
    }),

    createUser: builder.mutation({
      query: (user) => ({
        url: `/user`,
        method: "POST",
        body: user,
      }),
      transformResponse: (response) => response.data,
      transformErrorResponse: (state, response) => response.data,
    }),

    getOneUser: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      transformErrorResponse: (state, response) => response.data,
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useCreateUserMutation,
  useGetOneUserQuery,
} = UserApi;

export const { reset, setUsers } = UserSlice.actions;
export default UserSlice.reducer;
