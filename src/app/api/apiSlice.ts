import {createApi , fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const useAuthToken = () => {
    return () => {
      const token = localStorage.getItem("token");
      return token ? `Bearer ${token}` : null;
    };
  };
const baseQuery=fetchBaseQuery({
    baseUrl:'http://localhost:3500',
    credentials:"include",
    prepareHeaders:(headers,{getState}:any)=>{
        const token=getState().auth.token
        if(!token){
            headers.set("authorization",`Bearer ${token}`)
        }
        return headers
    }

})
export const apiSlice=createApi({
reducerPath:"api",
baseQuery,
endpoints:builder=>({})
})