import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

function RedirectIfLoggedIn() {
    const { isLoggedIn } = useAuth()

    return <>{isLoggedIn ? <Navigate to="/" replace /> : <Outlet />}</>
}

export default RedirectIfLoggedIn
