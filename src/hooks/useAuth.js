import { useSelector } from "react-redux"
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from "jwt-decode"

function useAuth() {
    const userToken = useSelector(selectCurrentToken)

    const user = {
        id: null,
        username: null,
        name: null,
        roles: [],
        avatar: null,
        isLoggedIn: false,
        isUser: false,
        isAdmin: false,
        status: "Guest",
    }

    if (userToken) {
        const decodedUserToken = jwtDecode(userToken)

        const {
            id,
            username,
            name,
            roles,
            avatar = null,
        } = decodedUserToken.user

        const updatedUser = Object.assign({}, user, {
            id,
            username,
            name,
            roles,
            avatar,
            isLoggedIn: true,
        })

        updatedUser.isUser = roles.some((role) => role.toLowerCase() === "user")

        updatedUser.isAdmin = roles.some(
            (role) => role.toLowerCase() === "admin"
        )

        if (updatedUser.isUser) {
            user.status = "User"
        }

        if (updatedUser.isAdmin) {
            user.status = "Admin"
        }

        return updatedUser
    }

    return user
}

export default useAuth
