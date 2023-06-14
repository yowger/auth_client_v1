import * as Yup from "yup"

const passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\S]{5,}$/
// 5 or more characters, one uppercase, one lowercase, and one number

const specialCharsFormat = /^[-@.\w]*$/
// Password cannot contain special characters other than _ @ . -

const resetPasswordSchema = Yup.object().shape({
    password: Yup.string()
        .required("password is required")
        .max(20, "Password cannot be more than 20 characters")
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

export default resetPasswordSchema
