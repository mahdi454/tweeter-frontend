import useAuth from "@/hooks/useAuth";
import  { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";


export default function RequireAuth() {
  const {userId}  = useAuth()
  const navigate = useNavigate();
  useEffect(() => {
    
    
    if ( !userId) {
        navigate("/login");
    }
  }, [ userId]);

  if( userId) return <Outlet/>
}
