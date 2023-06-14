import * as Yup from "yup"

const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
        .required("email is required")
        .email("Input must be a valid email"),
})

export default forgotPasswordSchema
