import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { useForm } from "react-hook-form"
import TextInput from "../../components/shared/TextInput"
import forgotPasswordSchema from "../../services/forgotPasswordSchema"
import { useForgotPasswordMutation } from "./authApiSlice"

const ResetPasswordPage = () => {
    const [resetSent, setResetSent] = useState(false)

    const [forgotPassword, { isLoading: forgotPasswordIsLoading }] =
        useForgotPasswordMutation()

    const {
        handleSubmit,
        register,
        getValues,
        setError,
        setFocus,
        formState: { errors },
    } = useForm({
        criteriaMode: "all",
        resolver: yupResolver(forgotPasswordSchema),
    })

    console.log(
        "🚀 ~ file: ResetPassword.jsx:22 ~ ResetPasswordPage ~ errors:",
        errors
    )

    async function onLoginSubmit(formData) {
        try {
            const { email } = formData

            const result = await forgotPassword({ email }).unwrap()
            console.log(
                "🚀 ~ file: ResetPassword.jsx:41 ~ onLoginSubmit ~ result:",
                result
            )

            setResetSent(true)
        } catch (error) {
            console.log("error: ", error)
            const emailValue = getValues("email")

            const emailNotRegisteredError = {
                type: "manual",
                message: `${emailValue} is not registered`,
            }

            const resetPasswordCoolDownMessage =
                "You have recently sent a request to this email. Please check your spam folder or try again in 5 minutes."

            switch (error.status) {
                case 404:
                    setError("email", emailNotRegisteredError)
                    setFocus("email")
                    break
                case 429:
                    setError("email", {
                        type: "manual",
                        message: resetPasswordCoolDownMessage,
                    })
                    break
                default:
                    break
            }
        }
    }

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="w-full max-w-md rounded bg-white px-6 py-8 shadow-md">
                <h2 className="mb-6 text-2xl font-bold">Reset Password</h2>
                {resetSent ? (
                    <div className="mb-4 text-green-600">
                        An email with reset instructions has been sent to your
                        email address. The message may be in your spam folder
                    </div>
                ) : (
                    <form
                        onSubmit={handleSubmit(onLoginSubmit)}
                        className="space-y-4 md:space-y-6"
                    >
                        <TextInput
                            label="Your email"
                            name="email"
                            register={register}
                            errors={errors}
                        />

                        <button
                            disabled={forgotPasswordIsLoading}
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
