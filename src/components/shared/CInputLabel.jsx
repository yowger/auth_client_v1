import PropTypes from "prop-types"
import { clsx } from "clsx"

const classes = {
    base: "block font-medium",
    disabled: "opacity-75 cursor-not-allowed",
    size: {
        small: "",
        normal: "mb-2 text-sm",
        large: "",
    },
    variant: {
        primary: "text-gray-900",
        danger: "text-red-700",
    },
}

function CInputLabel({
    children,
    name,
    className,
    variant = "primary",
    size = "normal",
    ...props
}) {
    return (
        <label
            htmlFor={name}
            className={clsx(
                classes.base,
                classes.size[size],
                classes.variant[variant],
                className && className
            )}
            {...props}
        >
            {children}
        </label>
    )
}

CInputLabel.displayName = "Custom input label"

CInputLabel.propTypes = {
    children: PropTypes.any,
    name: PropTypes.string,
    className: PropTypes.string,
    variant: PropTypes.string,
    size: PropTypes.string,
}

export default CInputLabel
