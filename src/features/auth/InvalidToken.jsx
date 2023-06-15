import { Link } from "react-router-dom"

const InvalidToken = () => {
    return (
        <div className="flex h-screen flex-col items-center justify-center">
            <h1 className="mb-4 text-2xl font-bold">Invalid Token</h1>
            <p className="mb-8 text-gray-600">
                The password reset token is invalid or has expired.
            </p>
            <Link
                to="/login"
                className="text-blue-500 underline hover:text-blue-700"
            >
                Back to Login
            </Link>
        </div>
    )
}

export default InvalidToken
