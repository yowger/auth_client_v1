import { useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useLoginMutation, useSignUpMutation } from "./authApiSlice"
import registerSchema from "../../services/yup/registerSchema"
import CTextInput from "../../components/shared/TextInput"
import { setCredentials } from "./authSlice"
import { useDispatch } from "react-redux"

function Register() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [
        signUp,
        {
            isLoading: signUpIsLoading,
            signUpIsSuccess,
            signUpIsError,
            signUpError,
        },
    ] = useSignUpMutation()

    const [
        login,
        { loginIsLoading, loginIsSuccess, loginIsError, loginError },
    ] = useLoginMutation()

    const {
        handleSubmit,
        register,
        getValues,
        setFocus,
        setError,
        formState: { errors },
    } = useForm({
        criteriaMode: "all",
        resolver: yupResolver(registerSchema),
    })

    async function loginUser(email, password) {
        try {
            const { accessToken } = await login({
                email,
                password,
            }).unwrap()

            dispatch(setCredentials({ accessToken }))
            navigate("/")
        } catch (error) {
            console.log("login error: ", error)
        }
    }

    const onRegisterSubmit = async (formData) => {
        const { email, password } = formData

        try {
            const { success } = await signUp({ email, password }).unwrap()

            if (success) {
                loginUser(email, password)
            }
        } catch (error) {
            console.log("register error: ", error)

            const { status } = error

            const emailValue = getValues("email")
            const emailTaken = status === 409

            if (emailTaken) {
                setError("email", {
                    type: "manual",
                    message: `${emailValue} is already in used`,
                    shouldDirty: true,
                    shouldValidate: true,
                })
                setFocus("email")
            }
        }
    }

    return (
        <div>
            <section className="">
                <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
                    <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
                        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                            <h1 className="text-gray-900md:text-2xl text-xl font-bold leading-tight tracking-tight">
                                Create your account
                            </h1>
                            <form
                                className="space-y-4 md:space-y-6"
                                onSubmit={handleSubmit(onRegisterSubmit)}
                            >
                                {/* <CTextInput
                                    label="Username"
                                    name="username"
                                    register={register}
                                    errors={errors}
                                />
                                <CTextInput
                                    label="Full name"
                                    name="name"
                                    register={register}
                                    errors={errors}
                                /> */}
                                <CTextInput
                                    label="Email"
                                    name="email"
                                    register={register}
                                    errors={errors}
                                />
                                <CTextInput
                                    label="Password"
                                    name="password"
                                    // type="password"
                                    register={register}
                                    errors={errors}
                                />
                                <CTextInput
                                    label="Confirm password"
                                    name="confirmPassword"
                                    // type="password"
                                    register={register}
                                    errors={errors}
                                />
                                <button
                                    type="submit"
                                    className="primary-button"
                                >
                                    Sign up
                                </button>
                            </form>
                            <p className="text-sm font-light text-gray-500">
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="font-medium text-blue-600 hover:underline"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Register
