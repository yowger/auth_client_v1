import * as Yup from "yup"

const loginSchema = Yup.object().shape({
    email: Yup.string()
        .required("email is required")
        .email("Input must be a valid email"),
    password: Yup.string()
        .required("password is required")
        .min(5, "password must be at least 5 characters"),
})

export default loginSchema
