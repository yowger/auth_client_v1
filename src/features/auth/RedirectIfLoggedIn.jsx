import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

function RedirectIfLoggedIn() {
    console.log("redirecting to home")
    const { isLoggedIn } = useAuth()

    return <>{isLoggedIn ? <Navigate to="/" /> : <Outlet />}</>
}

export default RedirectIfLoggedIn
