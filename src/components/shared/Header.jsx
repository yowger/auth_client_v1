import { useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useSendLogoutMutation } from "../../features/auth/authApiSlice"

function Header() {
    const navigate = useNavigate()

    const [sendLogout, { isLoading, isSuccess, isError, error }] =
        useSendLogoutMutation()

    const successfulLogout = isSuccess

    useEffect(() => {
        if (successfulLogout) {
            navigate("/login")
        }
    }, [successfulLogout, navigate])

    async function onClickLogout() {
        await sendLogout()
    }

    return (
        <div className="flex gap-5">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/protected">Protected</Link>
            <button onClick={onClickLogout}>Logout</button>
        </div>
    )
}

export default Header
