import { apiSlice } from "../../app/api/apiSlice"
import { logOut, setCredentials } from "./authSlice"

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: { ...credentials },
            }),
        }),
        signUp: builder.mutation({
            query: (data) => ({
                url: "/auth/signup",
                method: "POST",
                body: { ...data },
            }),
        }),
        refreshToken: builder.mutation({
            query: () => ({
                url: "/auth/refresh_token",
                method: "GET",
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const { accessToken } = data

                    dispatch(setCredentials({ accessToken }))
                } catch (err) {}
            },
        }),
        sendLogout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const data = await queryFulfilled
                    // console.log(
                    //     "🚀 ~ file: authApiSlice.js:44 ~ onQueryStarted ~ data:",
                    //     data
                    // )

                    dispatch(logOut())

                    // setTimeout(() => {
                    dispatch(apiSlice.util.resetApiState())
                    // }, 1000)
                } catch (err) {
                    console.log(err)
                }
            },
        }),
    }),
})

export const {
    useLoginMutation,
    useSignUpMutation,
    useRefreshTokenMutation,
    useSendLogoutMutation,
} = authApiSlice
