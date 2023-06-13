import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDeletePostMutation, useUpdatePostMutation } from "./postApiSlice"
import postSchema from "../../services/yup/postSchema"

// probably better with modal component to store all its logic than duplicating it in every post component. in the end this is just a demonstration and the main focus of this app is the authentication and authorization

function Post({
    postId,
    username,
    avatar,
    content = "",
    createdAt,
    enablePostModify = false,
}) {
    const [
        updatePost,
        {
            isLoading: updatePostIsLoading,
            isSuccess: updatePostIsSuccess,
            isError: updatePostIsError,
            error: updatePostError,
        },
    ] = useUpdatePostMutation()

    const [
        deletePost,
        {
            isLoading: deletePostIsLoading,
            isSuccess: deletePostIsSuccess,
            isError: deletePostIsError,
            error: deletePostError,
        },
    ] = useDeletePostMutation()

    const {
        handleSubmit,
        register,
        setFocus,
        formState: { errors },
    } = useForm({
        defaultValues: {
            post: content,
        },
        criteriaMode: "all",
        resolver: yupResolver(postSchema),
    })

    const [postModify, setPostModify] = useState({
        edit: false,
        delete: false,
    })

    const [showIcons, setShowIcons] = useState(true)

    function handleClickSetEdit() {
        setPostModify({ edit: true })
        setShowIcons(false)
    }

    function handleClickSetDelete() {
        setPostModify({ delete: true })
        setShowIcons(false)
    }

    function handleClickCancelModify() {
        setPostModify({ edit: false, delete: false })
        setShowIcons(true)
    }

    async function onPostSubmit(formData) {
        const { post } = formData

        if (postModify.edit) {
            await updatePost({ postId, content: post })
        } else if (postModify.delete) {
            await deletePost({ postId, content: post })
        }

        setPostModify({ edit: false, delete: false })
        setShowIcons(true)
    }

    useEffect(() => {
        setFocus("post")
    }, [postModify.edit, setFocus])

    return (
        <article>
            <div className="rounded-lg border border-gray-100 bg-white px-4 py-2 shadow-sm ">
                <div className="mb-4 flex justify-between">
                    <div className="flex items-center space-x-4">
                        <img
                            className="h-10 w-10 rounded-full"
                            src={avatar ? avatar : "https://picsum.photos/200"}
                            alt="profile picture"
                        />

                        <div className="space-y-1">
                            <h1 className="font-medium leading-4 text-gray-700">
                                {username}
                            </h1>
                            <p className="block text-sm text-gray-500">
                                {createdAt}
                            </p>
                        </div>
                    </div>
                    {enablePostModify && showIcons && (
                        <div className="flex items-baseline gap-2">
                            <button
                                onClick={handleClickSetEdit}
                                className="cursor-pointer text-gray-500 hover:text-red-400"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-pencil-square"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path
                                        fillRule="evenodd"
                                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                    />
                                </svg>
                            </button>

                            <button
                                onClick={handleClickSetDelete}
                                className="cursor-pointer text-gray-500 hover:text-red-400"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="17"
                                    height="17"
                                    fill="currentColor"
                                    className="bi bi-x-circle-fill "
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
                <div className="w-full">
                    {postModify.edit ? (
                        <form className="w-full">
                            <textarea
                                id="comment"
                                rows="4"
                                className="block w-full resize-none rounded-md border-2 px-2 py-1 text-sm text-gray-900"
                                placeholder="Write a comment..."
                                {...register("post")}
                            />
                            {errors.post && (
                                <span className="text-sm text-red-700">
                                    {errors.post.message}
                                </span>
                            )}
                        </form>
                    ) : (
                        <p className="mb-2 text-gray-500">{content}</p>
                    )}
                    {(updatePostIsError || deletePostError) && (
                        <p className="text-sm text-red-500">
                            Post not found, please try refreshing page
                        </p>
                    )}
                </div>
            </div>

            {postModify.edit && (
                <div className="flex items-center justify-between rounded-b-sm bg-green-600 px-3 py-1 ">
                    <p className="text-sm text-white">
                        Click <span className="font-semibold">confirm</span> to
                        to update the post
                    </p>

                    <div className="flex gap-2">
                        <button
                            onClick={handleClickCancelModify}
                            className="px-2 py-2 text-sm text-white hover:underline hover:underline-offset-2"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit(onPostSubmit)}
                            className="px-2 py-2 text-sm text-white hover:underline hover:underline-offset-2"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            )}

            {postModify.delete && (
                <div className="flex items-center justify-between rounded-b-sm bg-red-600 px-3 py-1 ">
                    <p className="text-sm text-white">
                        Click <span className="font-semibold">confirm</span> to
                        delete the post
                    </p>

                    <div className="flex gap-2">
                        <button
                            onClick={handleClickCancelModify}
                            className="px-2 py-2 text-sm text-white hover:underline hover:underline-offset-2"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit(onPostSubmit)}
                            className="px-2 py-2 text-sm text-white hover:underline hover:underline-offset-2"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            )}
        </article>
    )
}

export default Post
