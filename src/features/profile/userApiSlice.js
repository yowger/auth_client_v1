import { format } from "date-fns"
import { apiSlice } from "../../app/api/apiSlice"
import { logOut } from "../auth/authSlice"
// import { formatDistance } from "date-fns"

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => ({
                url: "/user/profile",
            }),
            transformResponse: (user) => {
                const { createdAt } = user

                const convertDateFormat = format(
                    new Date(createdAt),
                    "MMMM dd, yyyy"
                )

                user.createdAt = convertDateFormat

                return user
            },
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: "/user/profile",
                method: "PUT",
                body: { ...data },
            }),
        }),
        deleteUser: builder.mutation({
            query: () => ({
                url: "/user/profile",
                method: "DELETE",
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
    }),
})

export const { useGetUserQuery, useUpdateUserMutation, useDeleteUserMutation } =
    userApiSlice
