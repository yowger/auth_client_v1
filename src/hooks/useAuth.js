import { useSelector } from "react-redux"
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from "jwt-decode"

function useAuth() {
    const userToken = useSelector(selectCurrentToken)

    const user = {
        username: null,
        name: null,
        roles: [],
        avatar: null,
        isAdmin: false,
        status: "User",
    }

    if(userToken ) {
        const decodedUserToken = jwtDecode(userToken)
        console.log("🚀 ~ file: useAuth.js:13 ~ useAuth ~ decodedUserToken:", decodedUserToken)

        const { username, name, roles, avatar = null} = decodedUserToken.user

        const updatedUser = Object.assign({}, user, {
            username, name, roles, avatar
        })
        
        updatedUser.isAdmin = roles.some(role=> role.toLowerCase() === "admin")

        if(updatedUser.isAdmin) {
            user.status = "Admin"
        }

        return updatedUser
    }

    return user
}

export default useAuth