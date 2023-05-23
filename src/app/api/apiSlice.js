import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
// import { setCredentials, logOut } from "../../features/auth/authSlice"

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:7001",
    credentials: "include",
    // prepareHeaders: (headers, { getState }) => {
    //     const token = getState().auth.token

    //     if (token) {
    //         headers.set("authorization", `Bearer ${token}`)
    //     }

    //     return headers
    // },
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    // 403 - no access
    // if (result?.error?.originalStatus === 403) {
    //     console.log("sending refresh token")
    //     // send refresh token to get new access token
    //     const refreshResult = await baseQuery("/refresh", api, extraOptions)

    //     console.log(
    //         "🚀 ~ file: apiSlice.js:24 ~ baseQueryWithReauth ~ refreshResult",
    //         refreshResult
    //     )

    //     if (refreshResult?.data) {
    //         const user = api.getState().auth.user
    //         // store the new token
    //         api.dispatch(setCredentials({ ...refreshResult.data, user }))
    //         // retry the original query with the new access token
    //         result = await baseQuery(args, api, extraOptions)
    //     } else {
    //         api.dispatch(logOut())
    //     }
    // }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
})
