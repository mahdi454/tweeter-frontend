import { useRefreshMutation } from "@/app/api/authApi";
import { selectCurrentToken } from "@/app/features/auth/authSlice";
import usePersist from "@/hooks/usePersist";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../../../components/Loader";
export default function PeresistLogin() {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const [trueSuccess, setTrueSuccess] = useState<boolean>(false);
  const effectRan = useRef(false);
  const [refresh, { isError, isLoading, isSuccess, isUninitialized }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      const verifyRefreshToken = async () => {
        console.log("verifying refresh token");
        try {
          await refresh({});
          setTrueSuccess(true);
        } catch (error) {
          console.log(error);
        }
      };
      if (!token && persist) verifyRefreshToken();
    }
    effectRan.current = true;
  }, []);
  let content;
  if (!persist) {
    // persist: no
    console.log("no persist");
    content = <Outlet />;
  } else if (isLoading) {
    //persist: yes, token: no
    console.log("loading");
    content = <Loader loading={true} isFull={true} />;
  } else if (isError) {
    //persist: yes, token: no
    <Navigate to="/login" state={{ from: location }} replace />;
  } else if (isSuccess && trueSuccess) {
    //persist: yes, token: yes
    console.log("success");
    content = <Outlet />;
  } else if (token && isUninitialized) {
    //persist: yes, token: yes
    console.log("token and uninit");
    console.log(isUninitialized);
    content = <Outlet />;
  }

  return content;
}
