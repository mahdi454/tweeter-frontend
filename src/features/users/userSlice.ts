import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: { username: '',
        email: '',
        password: '',
        confirmPassword: '',
        token: [],
        tweet:[]
    },
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken } = action.payload
            state.token = accessToken
        },
    
    }
})

export const { setCredentials } = userSlice.actions

export default userSlice.reducer

export const selectCurrentToken = (state:any) => state.user.token[1]