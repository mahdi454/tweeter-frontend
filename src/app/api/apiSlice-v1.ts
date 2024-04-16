import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { logout, setCredentials } from "../features/auth/authSlice";
import { RootState } from "../store";
import { createApi } from "@reduxjs/toolkit/query/react";
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3500",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
interface ApiResponseExpired {
  message?: string;
}
interface ApiResponseSuccess {
  accessToken?: string | null;
}
const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  // If you want, handle other status codes, too
  if ((result.data as ApiResponseExpired)?.message === "jwt expired") {

    // send refresh token to get new access token
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);
    if ((refreshResult.data as ApiResponseSuccess)?.accessToken) {
      const accessToken =
        (refreshResult?.data as ApiResponseSuccess)?.accessToken ?? "";
      api.dispatch(
        setCredentials({
          accessToken,
        })
      );
      result = await baseQuery(args, api, extraOptions);
      return refreshResult;
    } else {
      console.error("login failed", refreshResult);
      api.dispatch(logout());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: customFetchBase,
  tagTypes: ["Note", "User"],
  endpoints: (builder) => ({}),
});