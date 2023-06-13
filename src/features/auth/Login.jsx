import { useNavigate, Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setCredentials } from "./authSlice"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import loginSchema from "../../services/yup/loginSchema"
import TextInput from "../../components/shared/TextInput"
import { useLoginMutation } from "./authApiSlice"
import usePersist from "../../hooks/usePersist"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [persist, setPersist] = usePersist()

    const [login, { isLoading: loginIsLoading }] = useLoginMutation()

    persist

    function handleTogglePersist() {
        setPersist((prev) => !prev)
    }

    const {
        handleSubmit,
        register,
        getValues,
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
            console.log("navigating 1")
            navigate("/", { replace: true })
            console.log("navigating 2")
        } catch (error) {
            const emailValue = getValues("email")

            const emailNotRegisteredError = {
                type: "manual",
                message: `${emailValue} is not registered`,
            }
            const incorrectPasswordError = {
                type: "manual",
                message: "Incorrect password",
            }

            switch (error.status) {
                case 404:
                    setError("email", emailNotRegisteredError)
                    setFocus("email")
                    break
                case 401:
                    setError("password", incorrectPasswordError)
                    setFocus("password")
                    break
                default:
                    break
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
                            <TextInput
                                label="Your email"
                                name="email"
                                register={register}
                                errors={errors}
                            />
                            <TextInput
                                label="Password"
                                name="password"
                                // type="password"
                                register={register}
                                errors={errors}
                            />

                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex h-5 items-center">
                                        <input
                                            id="remember"
                                            aria-describedby="remember"
                                            type="checkbox"
                                            className="focus:ring-3 h-4 w-4 cursor-pointer rounded border border-gray-300 bg-gray-50 focus:ring-blue-300"
                                            onChange={handleTogglePersist}
                                            checked={persist}
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label
                                            htmlFor="remember"
                                            className="cursor-pointer text-gray-500"
                                        >
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                                <Link
                                    to="/forgot_password"
                                    className="text-sm font-medium text-blue-600 hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <button
                                disabled={loginIsLoading}
                                type="submit"
                                className="primary-button"
                            >
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
                            disabled={loginIsLoading}
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
