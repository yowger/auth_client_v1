import * as Yup from "yup"

const usernameFormat = /^[a-zA-Z0-9_-]+$/
// only lower and upper case letters, numbers and dash and underscore

const passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\S]{5,}$/
// 5 or more characters, one uppercase, one lowercase, and one number

const specialCharsFormat = /^[-@.\w]*$/
// Password cannot contain special characters other than _ @ . -

const registerSchema = Yup.object().shape({
    // username: Yup.string()
    //     .required()
    //     .min(2)
    //     .max(20)
    //     .matches(
    //         usernameFormat,
    //         "Only lowercase and uppercase letters, numbers, dashes and underscore are allowed"
    //     ),
    // name: Yup.string().trim().min(2).max(30).required("Your name is required"),
    email: Yup.string().required().email("Your email is required"),
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
    confirmPassword: Yup.string()
        .required("this field is required")
        .oneOf([Yup.ref("password")], "Your passwords do not match."),
})

export default registerSchema
