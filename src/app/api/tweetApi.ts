import { apiSlice } from "./apiSlice";

export const tweetApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    newTweet: builder.mutation({
      query: (initUser) => ({
        url: "/tweet",
        method: "POST",
        body: initUser,
      }),
      invalidatesTags: ["Tweet","User"],
    }),
    getAllTweet: builder.query({
      query: () => ({
        url: "/tweet/all",
        method: "GET",
      }),
      providesTags: ["Tweet"],
    }),
  }),
});
export const { useNewTweetMutation, useGetAllTweetQuery} = tweetApi;
