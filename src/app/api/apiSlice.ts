import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { logout, setCredentials } from "../features/auth/authSlice";
import { RootState } from "../store";
import { createApi } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";

const mutex = new Mutex();
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
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if ((result.data as ApiResponseExpired)?.message === "jwt expired") {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshResult = await baseQuery(
          "auth/refresh",
          api,
          extraOptions
        );

        if ((refreshResult.data as ApiResponseSuccess)?.accessToken) {
          const accessToken =
            (refreshResult?.data as ApiResponseSuccess)?.accessToken ?? "";
          api.dispatch(
            setCredentials({
              accessToken,
            })
          );
          // Retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          console.error("login expired please try again");
          api.dispatch(logout());
          window.location.href = "/login";
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Tweet", "User","AllUser"],
  endpoints: (builder) => ({}),
});
