import { setUser, setUserList } from "../features/users/userSlice";
import { apiSlice } from "./apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createNewUser: builder.mutation({
      query: (initUser) => ({
        url: "/users",
        method: "POST",
        body: {
          ...initUser,
        },
      }),
    }),
    verifyEmail: builder.mutation({
      query: (initUser) => ({
        url: "/users/verify",
        method: "PATCH",
        body: {
          ...initUser,
        },
      }),
    }),
    finishUser: builder.mutation({
      query: (initUser) => ({
        url: "/users/finish",
        method: "PATCH",
        body: {
          ...initUser,
        },
      }),
    }),
    uploadeImage: builder.mutation({
      query: (initUser) => ({
        url: "/users/image",
        method: "PATCH",
        body: initUser,
      }),
      invalidatesTags: ["User"],
    }),
    getMe: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data))
        } catch (error) {
          console.log(error);
        }
      },
    }),
    getAllUser: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["AllUser"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUserList(data))
        } catch (error) {
          console.log(error);
        }
      },

    }),
    addFriend: builder.mutation({
      query: (initUser) => ({
        url: "/users/follow",
        method: "PATCH",
        body: {
          ...initUser,
        },
      }),
      invalidatesTags: ["User"],
    }),
    removeFriend: builder.mutation({
      query: (initUser) => ({
        url: "/users/unfollow",
        method: "PATCH",
        body: {
          ...initUser,
        },
      }),
      invalidatesTags: ["User"],
    })
  }),
});

export const {
  useCreateNewUserMutation,
  useVerifyEmailMutation,
  useFinishUserMutation,
  useUploadeImageMutation,
  useGetMeQuery,
  useGetAllUserQuery,
  useAddFriendMutation,
  useRemoveFriendMutation
} = userApi;
