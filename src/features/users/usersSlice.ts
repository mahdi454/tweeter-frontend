import { apiSlice } from "../../app/api/apiSlice";

// import { createEntityAdapter } from "@reduxjs/toolkit";
// const usersAdapter=createEntityAdapter()
// const initState=usersAdapter.getInitialState()

export const usersSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createNewUser: builder.mutation({
      query: (initUser) => ({
        url: "/users",
        method: "POST",
        body: {
      ...initUser
        },
      }),
    }),
    verifyEmail: builder.mutation({
      query: (initUser) => ({
        url: "/users/verify",
        method: "POST",
        body: {
         ...initUser
        },
      }),
    }),
    finishUser: builder.mutation({
      query: (initUser) => ({
        url: "/users/finish",
        method: "POST",
        body: {
         ...initUser
        },
      }),
    }),
  }),
});

export const { useCreateNewUserMutation,useVerifyEmailMutation,useFinishUserMutation } = usersSlice;
