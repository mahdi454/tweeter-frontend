import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};


export default function ProtectedRoute({ children }: Props) {
  const navigate = useNavigate();
  const auth=false;
   useEffect(()=>{
     if (!auth) navigate("/login");

   },[])

 if(auth) return children;
}
