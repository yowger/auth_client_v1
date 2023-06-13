import PropTypes from "prop-types"
import { clsx } from "clsx"
import { NavLink as RouterNavLink } from "react-router-dom"

const classes = {
    base: "block py-2 pl-3 pr-4",
    active: "bg-primary-700 rounded text-blue-600 font-medium",
    inactive: " text-gray-700 hover:bg-gray-50",
}

function NavLink({ children, className, ...props }) {
    return (
        <RouterNavLink
            className={({ isActive, isPending }) => {
                return clsx(
                    classes.base,
                    isActive ? classes.active : classes.inactive,
                    className && className
                )
            }}
            {...props}
        >
            {children}
        </RouterNavLink>
    )
}

NavLink.displayName = "Custom header navigation link"

NavLink.propTypes = {
    children: PropTypes.any,
    active: PropTypes.bool,
    className: PropTypes.string,
}

export default NavLink
