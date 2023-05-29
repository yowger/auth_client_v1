import { useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useSignUpMutation } from "./authApiSlice"
import registerSchema from "../../services/yup/registerSchema"
import CTextInput from "../../components/shared/CTextInput"

function Register() {
    const navigate = useNavigate()

    const [signUp, { isLoading, isSuccess, isError, error }] =
        useSignUpMutation()

    useEffect(
        function () {
            if (isSuccess) {
                navigate("/")
            }
        },
        [isSuccess, navigate]
    )

    const {
        handleSubmit,
        register,
        // setFocus,
        formState: { errors },
    } = useForm({
        criteriaMode: "all",
        resolver: yupResolver(registerSchema),
    })

    const onRegisterSubmit = async (formData) => {
        const { username, name, email, password } = formData

        const test = await signUp({ username, name, email, password })
        console.log(
            "🚀 ~ file: register.jsx:24 ~ onRegisterSubmit ~ test:",
            test
        )
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
                                <CTextInput
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
                                />
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
