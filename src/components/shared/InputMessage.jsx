import PropTypes from "prop-types"
import { clsx } from "clsx"

const classes = {
    base: "",
    disabled: "opacity-75 cursor-not-allowed",
    size: {
        small: "",
        normal: "mt-2 text-sm",
        large: "",
    },
    variant: {
        primary: "text-gray-900",
        danger: "text-red-600",
    },
}

function InputMessage({
    children,
    className,
    variant = "primary",
    size = "normal",
    ...props
}) {
    return (
        <p
            className={clsx(
                classes.base,
                classes.size[size],
                classes.variant[variant],
                className && className
            )}
            {...props}
        >
            {children}
        </p>
    )
}

InputMessage.displayName = "Custom input label"

InputMessage.propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    variant: PropTypes.string,
    size: PropTypes.string,
}

export default InputMessage
