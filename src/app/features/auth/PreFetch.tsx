import { useGetAllUserQuery, useGetMeQuery, userApi } from "@/app/api/userApi";
import { store } from "@/app/store";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function Prefetch() {
  const { userId } = useAuth();
  // const { data: getMe = {} } = useGetMeQuery(userId);
  // const { data: getAll = {} } = useGetAllUserQuery({});

  useEffect(() => {
    const users = store.dispatch(userApi.endpoints.getAllUser.initiate({}));

    const user = store.dispatch(userApi.endpoints.getMe.initiate(userId));

    return () => {
      console.log("unsubscribing");
      user.unsubscribe();
      users.unsubscribe();
    };
  }, []);
  return <Outlet />;
}
