import { createSlice} from "@reduxjs/toolkit";
import { IUser } from "../../types";
import { RootState } from "../../store";

interface IUserState {
  user: IUser | null;
  userList:IUser[]|null;
}

const initialState: IUserState = {
  
  user: null,
  userList:null
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const user1=action.payload;
      state.user = user1
    },
    setUserList: (state, action) => {
      const userL=action.payload;
      state.userList = userL
    },
  },

});

export default userSlice.reducer;

export const { setUser,setUserList } = userSlice.actions;

export const currentUser=(state:RootState)=>state.userSlice.user
export const userList=(state:RootState)=>state.userSlice.userList