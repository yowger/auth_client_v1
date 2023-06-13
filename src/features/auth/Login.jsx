import { useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setCredentials } from "./authSlice"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import loginSchema from "../../services/yup/loginSchema"
import CTextInput from "../../components/shared/TextInput"
import { useLoginMutation } from "./authApiSlice"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation()
    console.log("🚀 ~ file: Login.jsx:16 ~ Login ~ error:", error)
    console.log("🚀 ~ file: Login.jsx:16 ~ Login ~ isError:", isError)

    const {
        handleSubmit,
        register,
        setError,
        setFocus,
        formState: { errors },
    } = useForm({
        criteriaMode: "all",
        resolver: yupResolver(loginSchema),
    })

    async function onLoginSubmit(formData) {
        const { email, password } = formData
        try {
            const { accessToken } = await login({ email, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
            navigate("/")
        } catch (error) {
            console.log("ERROR: ", error)

            if (error.status === 404) {
                setError("email", {
                    type: "manual",
                    message: "Email is not registered",
                })
                setFocus("email")
            } else if (error.status === 401) {
                setError("password", {
                    type: "manual",
                    message: "Incorrect password",
                })
                setFocus("password")
            }
        }
    }

    function onClickGoogleLogin(event) {
        event.preventDefault()
        window.open("http://localhost:7001/auth/google", "_self")
    }

    return (
        <section className="">
            <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
                <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
                    <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                        <h1 className="text-gray-900md:text-2xl text-xl font-bold leading-tight tracking-tight">
                            Sign in to your account
                        </h1>
                        <form
                            className="space-y-4 md:space-y-6"
                            onSubmit={handleSubmit(onLoginSubmit)}
                        >
                            <CTextInput
                                label="Your email"
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
                            {/*
                            todo in future
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex h-5 items-center">
                                        <input
                                            id="remember"
                                            aria-describedby="remember"
                                            type="checkbox"
                                            className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300"
                                            required=""
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label
                                            htmlFor="remember"
                                            className="text-gray-500"
                                        >
                                            Remember me
                                        </label>
                                    </div>
                                </div> 
                                <Link
                                    to="#"
                                    className="text-sm font-medium text-blue-600 hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            */}

                            <button type="submit" className="primary-button">
                                Sign in
                            </button>
                            <p className="text-sm font-light text-gray-500">
                                Don’t have an account yet?{" "}
                                <Link
                                    to="/register"
                                    className="font-medium text-blue-600 hover:underline"
                                >
                                    Sign up
                                </Link>
                            </p>

                            <p className="flex justify-center py-4 text-gray-900">
                                or
                            </p>
                        </form>

                        <button
                            className="text-grey-900 flex w-full items-center justify-center gap-4 rounded-lg border-2 bg-white px-5 py-2.5 text-center text-sm font-medium hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-blue-300"
                            onClick={onClickGoogleLogin}
                            disabled={isLoading}
                        >
                            <img
                                className="w-5"
                                src="https://static.vecteezy.com/system/resources/thumbnails/012/871/371/small/google-search-icon-google-product-illustration-free-png.png"
                            />
                            Continue with google
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login
