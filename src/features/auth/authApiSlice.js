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
                    console.log(
                        "🚀 ~ file: authApiSlice.js:28 ~ onQueryStarted ~ data:",
                        data
                    )

                    const { accessToken } = data

                    if (!accessToken) {
                        return
                    }

                    dispatch(setCredentials({ accessToken }))
                } catch (error) {
                    console.error("refresh token error: ", error)
                }
            },
        }),
        sendLogout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled

                    dispatch(logOut())

                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
                    }, 1000)
                } catch (err) {
                    console.log(err)
                }
            },
        }),
        forgotPassword: builder.mutation({
            query: (email) => ({
                url: "/auth/forgot_password",
                method: "POST",
                body: email,
            }),
        }),
    }),
})

export const {
    useLoginMutation,
    useSignUpMutation,
    useRefreshTokenMutation,
    useSendLogoutMutation,
    useForgotPasswordMutation,
} = authApiSlice
