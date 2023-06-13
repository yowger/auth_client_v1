import Post from "./Post"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import postSchema from "../../services/yup/postSchema"
import { useGetPostQuery, useSendPostMutation } from "./postApiSlice"
import useAuth from "../../hooks/useAuth"

function Home() {
    const { isLoggedIn, id: userId } = useAuth()

    const [
        sendPost,
        {
            isLoading: postIsLoading,
            isSuccess: postIsSuccess,
            isError: postIsError,
            error: postError,
        },
    ] = useSendPostMutation()

    const {
        data: post,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetPostQuery({
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    })

    console.log("🚀 ~ file: Home.jsx:27 ~ Home ~ post:", post)

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        criteriaMode: "all",
        resolver: yupResolver(postSchema),
    })

    async function onPostSubmit(formData) {
        const { post } = formData

        const data = await sendPost({ content: post }).unwrap()
        console.log("🚀 ~ file: Home.jsx:18 ~ onPostSubmit ~ formData:", data)
    }

    return (
        <div className="">
            <div className="mx-auto max-w-[60ch]">
                <div className="mb-6">
                    <form onSubmit={handleSubmit(onPostSubmit)}>
                        <div className="mb-4 w-full rounded-lg border border-gray-200 bg-gray-50">
                            <div className="rounded-t-lg bg-white px-4 py-2">
                                <label htmlFor="comment" className="sr-only">
                                    Your comment
                                </label>

                                <textarea
                                    id="comment"
                                    rows="4"
                                    className="w-full resize-none border-0 bg-white px-0 text-sm text-gray-900 focus:ring-0"
                                    placeholder="Write a comment..."
                                    {...register("post")}
                                />
                                {errors.post && (
                                    <span className="text-sm text-red-500">
                                        {errors.post.message}
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center justify-end border-t px-3 py-2">
                                <button
                                    type="submit"
                                    className="inline-flex items-center rounded-lg bg-blue-700 px-4 py-2.5 text-center text-xs font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-200"
                                >
                                    Post comment
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="flex flex-col gap-6">
                    {post &&
                        post.map((singlePost) => {
                            const { _id, content, createdAt } = singlePost

                            const userNotExist = !singlePost.user

                            if (userNotExist) {
                                return
                            }

                            const {
                                _id: postUserId,
                                username,
                                avatar,
                            } = singlePost.user

                            let enablePostModify = false

                            const isSameUser = userId === postUserId
                            console.log("same id? ", userId, " = ", postUserId)

                            if (isLoggedIn && isSameUser) {
                                enablePostModify = true
                            }

                            return (
                                <Post
                                    key={_id}
                                    postId={_id}
                                    username={username}
                                    avatar={avatar}
                                    content={content}
                                    createdAt={createdAt}
                                    enablePostModify={enablePostModify}
                                />
                            )
                        })}
                </div>
            </div>
        </div>
    )
}

export default Home
