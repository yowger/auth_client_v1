import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { logOut, setCredentials } from "../../features/auth/authSlice"
// import { setCredentials, logOut } from "../../features/auth/authSlice"

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:7001",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token

        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }

        return headers
    },
})

const baseQueryWithReauth = async (args, api, options) => {
    console.log("retrying")
    let result = await baseQuery(args, api, options)
    console.log(
        "🚀 ~ file: apiSlice.js:20 ~ baseQueryWithReauth ~ result:",
        result
    )

    const jwtExpired = result?.error?.originalStatus === 401

    // 403 - no access
    if (jwtExpired) {
        const refreshResult = await baseQuery(
            "/auth/refresh_token",
            api,
            options
        )

        console.log(
            "🚀 ~ file: apiSlice.js:24 ~ baseQueryWithReauth ~ refreshResult",
            refreshResult
        )

        if (refreshResult?.data) {
            const user = api.getState().auth.user
            // store the new token
            api.dispatch(setCredentials({ ...refreshResult.data, user }))
            // retry the original query with the new access token
            result = await baseQuery(args, api, options)
            console.log(
                "🚀 ~ file: apiSlice.js:45 ~ baseQueryWithReauth ~ result:",
                result
            )
        } else {
            api.dispatch(logOut())
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Post"],
    endpoints: () => ({}),
})
