import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:'auth',
    initialState:{token:null},
    reducers:{
        setCredentials:(state,action)=>{
            const {accessToken}=action.payload
            state.token=accessToken
        }
    }
})
export const { setCredentials } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state:any) => state.auth.token