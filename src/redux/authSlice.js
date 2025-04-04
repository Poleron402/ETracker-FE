import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

const initialState = {
    user: null,
    token: Cookies.get('token') || null,
}

const authSlice =  createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const {user, accessToken} = action.payload
            state.user = user
            state.token = accessToken 
        },
        logout: (state)=>{
            state.user = null
            state.token = null
        },
    },
})

export const {setCredentials, logout} = authSlice.actions
export default authSlice.reducer
// export const selectCurrentUser = (state) => state.auth.user
// export const selectCurrentToken = (state) => state.auth.token