import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const apiSlice = createApi({
  reducerPath: 'api', 
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/', 
    credentials: 'include', 
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'api/login', 
        method: 'POST',
        body: credentials,  
      }),
    }),
    signup: builder.mutation({
        query: (credentials) => ({
          url: 'api/signup', 
          method: 'POST',
          body: credentials,  
        }),
      }),
      logout: builder.mutation({
        query: (credentials) => ({
          url: 'api/logout', 
          method: 'POST',
          body: credentials,  
        }),
      }),
  }),
});

export const { useLoginMutation, useSignupMutation, useLogoutMutation } = apiSlice; 
