import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import userSchema from "../../services/yup/userSchema"
import {
    useGetUserQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useUpdateUserImageMutation,
} from "./userApiSlice"

function Profile() {
    const [profileModify, setProfileModify] = useState({
        edit: false,
        delete: false,
    })
    const [showIcons, setShowIcons] = useState(true)

    const {
        data: user,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetUserQuery()

    const [
        updateUser,
        {
            isLoading: updateUserIsLoading,
            isSuccess: updateUserIsSuccess,
            isError: updateUserIsError,
            error: updateUserError,
        },
    ] = useUpdateUserMutation()

    const [
        deleteUser,
        {
            isLoading: deleteUserIsLoading,
            isSuccess: deleteUserIsSuccess,
            isError: deleteUserIsError,
            error: deleteUserError,
        },
    ] = useDeleteUserMutation()

    const {
        handleSubmit,
        register,
        getValues,
        setFocus,
        setError,
        formState: { errors },
    } = useForm({
        // defaultValues: {
        //     post: content,
        // },
        criteriaMode: "all",
        resolver: yupResolver(userSchema),
    })

    function handleClickModifyProfile() {
        setProfileModify({ edit: true })
    }

    function handleClickDeleteProfile() {
        setProfileModify({ delete: true })
    }

    function handleClickCancelModify() {
        setProfileModify({ edit: false, delete: false })
    }

    async function onPostSubmit(formData) {
        const { name, username } = formData

        if (profileModify.edit) {
            try {
                await updateUser({ name, username }).unwrap()

                setProfileModify({ edit: false, delete: false })
            } catch (error) {
                const { status } = error

                const usernameValue = getValues("username")
                const usernameTaken = status === 409

                if (usernameTaken) {
                    setError("username", {
                        type: "manual",
                        message: `${usernameValue} is already in used`,
                        shouldDirty: true,
                        shouldValidate: true,
                    })
                    setFocus("username")
                }
            }
        } else if (profileModify.delete) {
            await deleteProfile()
        }
    }

    async function deleteProfile() {
        try {
            await deleteUser()
        } catch (error) {
            console.log("error deleting profile: ", error)
        }
    }

    const [
        updateUserImage,
        {
            isLoading: updateUserImageIsLoading,
            isSuccess: updateUserImageIsSuccess,
            isError: updateUserImageIsError,
            error: updateUserImageError,
        },
    ] = useUpdateUserImageMutation()

    const [selectedFile, setSelectedFile] = useState(null)

    function handleFileChange(event) {
        const file = event.target.files[0]
        setSelectedFile(file)
    }

    async function handleFileUpload() {
        try {
            const formData = new FormData()
            formData.append("file", selectedFile)

            await updateUserImage({
                formData,
            })
        } catch (error) {
            console.log("ERror uploading file: ", error)
        }
    }

    useEffect(() => {
        const isModifyingProfile = profileModify.edit || profileModify.delete
        setShowIcons(!isModifyingProfile)
    }, [profileModify.edit, profileModify.delete])

    return (
        <div className="mx-auto max-w-screen-md">
            <div className="relative mx-auto max-w-sm rounded-md border border-gray-200 bg-white pb-8 shadow-sm">
                {showIcons && (
                    <div className="relative">
                        <button
                            onClick={handleClickDeleteProfile}
                            className="absolute right-4 top-4 cursor-pointer fill-gray-400 hover:fill-blue-500"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                            >
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                        </button>

                        <button
                            onClick={handleClickModifyProfile}
                            className="absolute right-12 top-4 cursor-pointer fill-gray-400 text-3xl hover:fill-blue-500"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                height="24"
                                width="24"
                            >
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                            </svg>
                        </button>
                    </div>
                )}
                <div className="flex flex-col items-center py-8 overflow-hidden">
                    <img
                        className="rounded-full w-24 h-24"
                        src={user?.profileImage.url}
                        alt="profile image"
                    />
                </div>

                <div className="flex flex-col gap-2 px-10">
                    <div>
                        <p className="w-1/4 text-sm font-medium text-gray-900">
                            Avatar
                        </p>
                        <div>
                            <input type="file" onChange={handleFileChange} />
                            <button
                                className="border-2 p-2"
                                onClick={handleFileUpload}
                            >
                                Upload File
                            </button>
                        </div>
                    </div>
                    <div className="flex">
                        <p className="w-1/4 text-sm font-medium text-gray-900">
                            Name
                        </p>
                        {profileModify.edit ? (
                            <div className="flex flex-col">
                                <input
                                    className="border border-gray-300"
                                    {...register("name")}
                                />
                                {errors.name && (
                                    <span className="text-sm text-red-700">
                                        {errors.name.message}
                                    </span>
                                )}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">
                                {user?.name}
                            </p>
                        )}
                    </div>

                    <div className="flex">
                        <p className="w-1/4 text-sm font-medium text-gray-900">
                            Username
                        </p>
                        {profileModify.edit ? (
                            <div className="flex flex-col">
                                <input
                                    className="border border-gray-300"
                                    {...register("username")}
                                />
                                {errors.username && (
                                    <span className="text-sm text-red-700">
                                        {errors.username.message}
                                    </span>
                                )}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">
                                {user?.username}
                            </p>
                        )}
                    </div>

                    <div className="flex">
                        <p className="w-1/4 text-sm font-medium text-gray-900">
                            Provider
                        </p>
                        <p className="w-3/4 text-sm text-gray-500">
                            {user?.provider?.name}
                        </p>
                    </div>

                    <div className="flex">
                        <p className="w-1/4 text-sm font-medium text-gray-900">
                            Email
                        </p>
                        <p className="w-3/4 text-sm text-gray-500">
                            {user?.email}
                        </p>
                    </div>

                    <div className="flex">
                        <p className="w-1/4 text-sm font-medium">Role</p>
                        <p className="w-3/4 text-sm text-gray-500">
                            {user?.roles.join(", ")}
                        </p>
                    </div>

                    <div className="flex">
                        <p className="w-1/4 text-sm font-medium">Verified</p>
                        <p className="w-3/4 text-sm text-gray-500">
                            {user?.verified ? "Yes" : "No"}
                            <span className="ml-2 cursor-pointer text-blue-600 hover:underline">
                                verify email
                            </span>
                        </p>
                    </div>

                    <div className="flex">
                        <p className="w-1/4 text-sm font-medium">Joined</p>
                        <p className="w-3/4 text-sm text-gray-500">
                            {user?.createdAt}
                        </p>
                    </div>
                </div>

                {(profileModify.edit || profileModify.delete) && (
                    <div className="mt-5 ">
                        <p>Click confirm to update profile</p>
                        <button
                            onClick={handleClickCancelModify}
                            className="border p-2"
                        >
                            cancel
                        </button>
                        <button
                            onClick={handleSubmit(onPostSubmit)}
                            className="border p-2"
                        >
                            confirm
                        </button>
                    </div>
                )}
            </div>

            <div className="mx-auto mt-5 flex max-w-sm justify-end">
                <p className="font-medium text-blue-500">Log out</p>
            </div>
        </div>
    )
}

export default Profile
