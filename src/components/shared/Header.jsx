import { useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useSendLogoutMutation } from "../../features/auth/authApiSlice"
import useAuth from "../../hooks/useAuth"
import NavLink from "./NavLink"

function Header() {
    const navigate = useNavigate()
    const { isLoggedIn, username, avatar } = useAuth()
    console.log("🚀 EMAIL: ", isLoggedIn)

    const [
        sendLogout,
        { isLoading, isSuccess: logoutIsSuccessful, isError, error },
    ] = useSendLogoutMutation()

    useEffect(() => {
        if (logoutIsSuccessful) {
            navigate("/")
        }
    }, [logoutIsSuccessful, navigate])

    async function onClickLogout() {
        await sendLogout()
    }

    return (
        <>
            <header>
                <nav className="border border-gray-200 bg-white px-4 py-1">
                    <div className="mx-auto flex max-w-screen-md flex-wrap items-center justify-between">
                        <Link
                            to="/"
                            className="self-center whitespace-nowrap text-xl font-semibold"
                        >
                            AuthBase
                        </Link>

                        <div className="flex items-center">
                            <ul className="flex flex-row gap-2">
                                <li>
                                    <NavLink to={"/"}>Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/profile"}>Profile</NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/about"}>About</NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/protected"}>
                                        Protected
                                    </NavLink>
                                </li>
                            </ul>
                        </div>

                        <div className="flex">
                            {isLoggedIn ? (
                                <>
                                    <Link to="/profile">
                                        <div className="group relative inline-block">
                                            <button className="inline-flex items-center rounded font-semibold text-gray-700">
                                                <div className="flex">
                                                    <img
                                                        className="mr-3 h-10 w-10 rounded-full"
                                                        src={
                                                            avatar ? avatar : "https://picsum.photos/200/300"
                                                        }
                                                    />

                                                    <h1 className="mr-1 flex items-center truncate text-sm font-semibold text-gray-700">
                                                        {username && username}
                                                    </h1>
                                                </div>
                                            </button>

                                            <div
                                                id="userDropdown"
                                                className="absolute z-10 hidden w-full divide-y divide-gray-100 rounded-lg bg-white shadow group-hover:block "
                                            >
                                                <ul
                                                    className="py-2 text-sm text-gray-700"
                                                    aria-labelledby="avatarButton"
                                                >
                                                    <li>
                                                        <a
                                                            href="#"
                                                            className="block px-4 py-2 hover:bg-gray-100"
                                                        >
                                                            Profile
                                                        </a>
                                                    </li>
                                                </ul>
                                                <div className="py-1">
                                                    <a
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                        onClick={onClickLogout}
                                                    >
                                                        Sign out
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </>
                            ) : (
                                <Link
                                    to="/login"
                                    className="mr-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-300 lg:px-5 lg:py-2.5"
                                >
                                    Log in
                                </Link>
                            )}
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Header
