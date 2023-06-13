import { useLocation, Navigate, Outlet } from "react-router-dom"
import PropTypes from "prop-types"
import useAuth from "../../hooks/useAuth"

function RequireAuth({ allowedRoles }) {
    const location = useLocation()
    const { roles } = useAuth()

    const userRoles = roles.map((role) => role.toLowerCase())

    const isAuthorized = userRoles.some((role) =>
        allowedRoles
            .map((allowedRole) => allowedRole.toLowerCase())
            .includes(role)
    )
    console.log(
        "🚀 ~ file: RequireAuth.jsx:16 ~ RequireAuth ~ isAuthorized:",
        isAuthorized
    )

    return (
        <>
            {isAuthorized ? (
                <Outlet />
            ) : (
                <Navigate to="/login" state={{ from: location }} replace />
            )}
        </>
    )
}

RequireAuth.propTypes = {
    allowedRoles: PropTypes.array.isRequired,
}

export default RequireAuth
