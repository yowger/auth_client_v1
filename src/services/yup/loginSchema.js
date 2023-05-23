import * as Yup from "yup"

const passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\S]{5,}$/
const specialCharsFormat = /^[-@\.\w]*$/

const loginSchema = Yup.object().shape({
    email: Yup.string()
        .required("email is required")
        .email("Input must be a valid email"),
    password: Yup.string()
        .required("password is required")
        .matches(
            passwordFormat,
            "Password must have 5 or more characters, at least one uppercase and lowercase letter, and one number."
        )
        .test(
            "special-chars",
            "Password cannot contain special characters other than _ @ . -",
            function (value) {
                return specialCharsFormat.test(value)
            }
        ),
})

// .required()
// .min(5)
// .max(20)
// .regex(hasOneLetterRegex)
// .regex(hasOneUpperLetterRegex)
// .regex(hasOneSpecialCharactersRegex)
// .messages({
//     "string.pattern.base":
//         "Password must have 1 small letter, 1 big letter, and 1 special character",
// }),

export default loginSchema
