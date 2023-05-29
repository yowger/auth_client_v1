import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: "auth",
    initialState: { token: null },
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken } = action.payload
            state.token = accessToken
        },
        logOut: (state) => {
            state.token = null
        },
    },
})

export const { setCredentials, logOut } = authSlice.actions

export const selectCurrentToken = (state) => state.auth.token

export default authSlice.reducer
