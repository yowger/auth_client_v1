import { useEffect, useState, useRef } from "react"
import { Navigate, Outlet, Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentToken } from "./authSlice"
import { useRefreshTokenMutation } from "./authApiSlice"

function PersistLogin() {
    const token = useSelector(selectCurrentToken)
    const [isTokenVerified, setIsTokenVerified] = useState(false)

    const [
        refreshToken,
        { isUninitialized, isLoading, isSuccess, isError, error },
    ] = useRefreshTokenMutation()
    console.log(
        "🚀 ~ file: PersistLogin.jsx:14 ~ PersistLogin ~ isError:",
        isError
    )
    console.log("🚀 ~ file: PersistLogin.jsx:14 ~ PersistLogin ~ error:", error)

    const tokenIsVerified = isSuccess && isTokenVerified
    const tokenIsLoading = isLoading
    const TokenIsInvalid = isError

    useEffect(() => {
        async function verifyRefreshToken() {
            try {
                await refreshToken()
                setIsTokenVerified(true)
            } catch (error) {
                console.error("refreshToken error", error)
            }
        }

        if (!token) {
            verifyRefreshToken()
        }

        // eslint-disable-next-line
    }, [])

    let content

    if (token || tokenIsVerified) {
        content = <Outlet />
    } else if (tokenIsLoading) {
        content = <p>loading....</p>
    } else if (TokenIsInvalid) {
        content = <Navigate to="/login" replace />
        // content = "refresh token error"
    }

    return content
}

export default PersistLogin
