import { apiSlice } from "../../app/api/apiSlice"
import { formatDistance } from "date-fns"

export const postApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPost: builder.query({
            query: () => ({
                url: "/post",
            }),
            transformResponse: (responseData) => {
                const { createdAt } = responseData

                const loadedPost = responseData.map((post) => {
                    const { createdAt } = post

                    const convertDateToDistance = formatDistance(
                        new Date(createdAt),
                        new Date(),
                        {
                            addSuffix: true,
                        }
                    )

                    post.createdAt = convertDateToDistance

                    return post
                })

                return responseData
            },
            providesTags: (result, error, arg) => {
                if (result?._ids) {
                    return [
                        { type: "Post", id: "LIST" },
                        ...result.ids.map((id) => ({ type: "Post", id })),
                    ]
                } else return [{ type: "Post", id: "LIST" }]
            },
        }),
        sendPost: builder.mutation({
            query: (data) => ({
                url: "/post",
                method: "POST",
                body: { ...data },
            }),
            invalidatesTags: [{ type: "Post", id: "LIST" }],
        }),
        updatePost: builder.mutation({
            query: (data) => ({
                url: "/post",
                method: "PUT",
                body: { ...data },
            }),
            invalidatesTags: (result, error, arg) => {
                const { postId } = arg
                return [{ type: "Post", _id: postId }]
            },
        }),
        deletePost: builder.mutation({
            query: (id) => ({
                url: "/post",
                method: "DELETE",
                body: id,
            }),
            invalidatesTags: (result, error, arg) => {
                const { postId } = arg
                return [{ type: "Post", _id: postId }]
            },
        }),
    }),
})

export const {
    useGetPostQuery,
    useSendPostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
} = postApiSlice
