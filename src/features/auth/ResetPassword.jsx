import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate, useParams } from "react-router-dom"
import TextInput from "../../components/shared/TextInput"
import resetPasswordSchema from "../../services/yup/resetPasswordSchema"
import { useResetPasswordMutation } from "./authApiSlice"
import jwtDecode from "jwt-decode"

const ResetPasswordPage = () => {
    const { token } = useParams()
    const navigate = useNavigate()
    console.log(
        "🚀 ~ file: ResetPassword.jsx:12 ~ ResetPasswordPage ~ token:",
        token
    )

    const isResetTokenExpired = (resetToken) => {
        try {
            const decodedToken = jwtDecode(resetToken)
            const currentTimestamp = Math.floor(Date.now() / 1000)

            return decodedToken.exp < currentTimestamp
        } catch (error) {
            // Token decoding failed
            console.log("token decoding error: ", error)
            return true
        }
    }

    const isTokenExpired = isResetTokenExpired(token)

    useEffect(() => {
        if (isTokenExpired) {
            console.log("token is expired")
            // navigate("/invalid_token")
        }
    }, [isTokenExpired, navigate])

    const [isPasswordReset, setIsPasswordReset] = useState(false)

    const [resetPassword, { isLoading: resetPasswordIsLoading }] =
        useResetPasswordMutation()

    const {
        handleSubmit,
        register,
        // getValues,
        setError,
        setFocus,
        formState: { errors },
    } = useForm({
        criteriaMode: "all",
        resolver: yupResolver(resetPasswordSchema),
    })

    console.log(
        "🚀 ~ file: ResetPassword.jsx:22 ~ ResetPasswordPage ~ errors:",
        errors
    )

    async function onResetPasswordSubmit(formData) {
        try {
            const { password } = formData

            const { success } = await resetPassword({
                resetToken: token,
                newPassword: password,
            }).unwrap()

            console.log(
                "🚀 ~ file: ResetPassword.jsx:41 ~ onLoginSubmit ~ result:",
                success
            )

            if (success) {
                setIsPasswordReset(true)
            }
        } catch (error) {
            console.log("error: ", error)

            const resetTokenExpiredError = {
                type: "manual",
                message: "Reset token has expired.",
            }

            const invalidResetTokenError = {
                type: "manual",
                message: "Invalid or expired reset token.",
            }

            switch (error.status) {
                case 400:
                    setError("password", resetTokenExpiredError)
                    setFocus("password")
                    break
                case 404:
                    setError("password", invalidResetTokenError)
                    setFocus("password")
                    break
                default:
                    break
            }
        }
    }

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="w-full max-w-md rounded bg-white px-6 py-8 shadow-md">
                <h2 className="mb-6 text-2xl font-bold">Enter new password</h2>
                {isPasswordReset ? (
                    <div>
                        <div className="mb-4 text-green-600">
                            Password has been successfully reset!
                        </div>
                        <Link
                            to="/login"
                            className="mt-4 block text-blue-500 hover:underline"
                        >
                            Click here to login
                        </Link>
                    </div>
                ) : (
                    <form
                        onSubmit={handleSubmit(onResetPasswordSubmit)}
                        className="space-y-4 md:space-y-6"
                    >
                        <TextInput
                            label="New password"
                            name="password"
                            register={register}
                            errors={errors}
                        />

                        <button
                            disabled={resetPasswordIsLoading}
                            type="submit"
                            className="primary-button"
                        >
                            Reset Password
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}

export default ResetPasswordPage
