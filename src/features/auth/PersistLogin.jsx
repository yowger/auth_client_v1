import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentToken } from "./authSlice"
import { useRefreshTokenMutation } from "./authApiSlice"
import usePersist from "../../hooks/usePersist"
import LoadingPage from "../../components/shared/LoadingPage"

function PersistLogin() {
    const [persist] = usePersist()
    const token = useSelector(selectCurrentToken)
    const [refreshSuccess, setRefreshTokenSuccess] = useState(false)

    const [
        refreshToken,
        { isLoading: tokenIsLoading, isSuccess: tokenIsSuccess },
    ] = useRefreshTokenMutation()

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refreshToken()
                setRefreshTokenSuccess(true)
            } catch (error) {
                console.error("refreshToken error", error)
            }
        }

        if (!token && persist) {
            verifyRefreshToken()
        }

        // eslint-disable-next-line
    }, [])

    if (tokenIsLoading) {
        return <LoadingPage />
    }

    if (!persist) {
        return <Outlet />
    }

    if (tokenIsSuccess) {
        return <Outlet />
    }

    if (refreshSuccess) {
        return <Outlet />
    }
}

export default PersistLogin
