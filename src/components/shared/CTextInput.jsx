import PropTypes from "prop-types"
import { clsx } from "clsx"
import CInputLabel from "./CInputLabel"
import CInputMessage from "./CInputMessage"

const classes = {
    base: "block w-full rounded-lg border transition duration-300 ease-in-out focus:outline-none focus:ring-1",
    disabled: "cursor-not-allowed opacity-75",
    size: {
        small: "p-2 sm:text-xs",
        normal: "p-2.5 text-sm",
        large: "sm:text-md p-4",
    },
    variant: {
        primary:
            "border-gray-300 bg-gray-50 text-gray-900 focus:border-blue-600 focus:ring-blue-600",
        danger: "border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500",
    },
}

function CTextInput({
    children,
    label,
    name,
    type = "text",
    className,
    variant = "primary",
    size = "normal",
    disabled = false,
    register,
    errors,
    ...props
}) {
    const errorMessages = errors && errors[name]?.message
    const hasError = !!(errors && errorMessages)
    variant = hasError ? "danger" : variant

    return (
        <div>
            {label && <CInputLabel variant={variant}>{label}</CInputLabel>}
            <input
                name={name}
                disabled={disabled}
                type={type}
                className={clsx(
                    classes.base,
                    classes.size[size],
                    classes.variant[variant],
                    disabled && classes.disabled,
                    className && className
                )}
                {...props}
                {...(register && register(name))}
            >
                {children}
            </input>
            {hasError && (
                <CInputMessage variant={variant}>{errorMessages}</CInputMessage>
            )}
        </div>
    )
}

CTextInput.displayName = "Custom text input"

CTextInput.propTypes = {
    children: PropTypes.any,
    label: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    variant: PropTypes.string,
    size: PropTypes.string,
    disabled: PropTypes.bool,
    register: PropTypes.func,
    ref: PropTypes.any,
    errors: PropTypes.any,
}

export default CTextInput
