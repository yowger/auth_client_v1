import { useEffect, useState, useRef } from "react"
import { Navigate, Outlet, Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentToken } from "./authSlice"
import { useRefreshTokenMutation } from "./authApiSlice"

function PersistLogin() {
    const token = useSelector(selectCurrentToken)
    const [trueSuccess, setTrueSuccess] = useState(false)

    const [
        refreshToken,
        {
            isUninitialized: tokenIsUninitialized,
            isLoading: tokenIsLoading,
            isSuccess: tokenIsSuccess,
            isError,
            error,
        },
    ] = useRefreshTokenMutation()

    const effectRan = useRef(false)

    const tokenIsVerified = tokenIsSuccess && trueSuccess

    useEffect(() => {
        if (effectRan.current === true) {
            const verifyRefreshToken = async () => {
                try {
                    await refreshToken()
                    setTrueSuccess(true)
                } catch (error) {
                    console.error("refreshToken error", error)
                }
            }

            if (!token) {
                verifyRefreshToken()
            }
        }
        return () => (effectRan.current = true)
        // eslint-disable-next-line
    }, [])

    let content

    if (tokenIsLoading) {
        content = <p>loading....</p>
    } else if (tokenIsVerified) {
        console.log("nice 1")
        content = <Outlet />
    } else if (trueSuccess) {
        console.log("nice 2")
        content = <Outlet />
    }
    // else if (TokenIsInvalid) {
    //     // content = <Navigate to="/login" replace />
    //     // content = "refresh token error"
    // }

    return content
}

export default PersistLogin
