import { Link } from "react-router-dom"

function Register() {
    return (
        <div>
            <section className="">
                <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
                    <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
                        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                            <h1 className="text-gray-900md:text-2xl text-xl font-bold leading-tight tracking-tight">
                                Create your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="input-label"
                                    >
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="primary-input"
                                        required=""
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="input-label"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        className="primary-input"
                                        required=""
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="input-label"
                                    >
                                        Confirm password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        className="primary-input"
                                        required=""
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="primary-button"
                                >
                                    Sign up
                                </button>
                                <p className="text-sm font-light text-gray-500">
                                    Already have an account?{" "}
                                    <Link
                                        to="/login"
                                        className="font-medium text-blue-600 hover:underline"
                                    >
                                        Sign in
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Register
