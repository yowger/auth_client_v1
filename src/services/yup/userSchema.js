import * as Yup from "yup"

const userSchema = Yup.object().shape({
    name: Yup.string().min(3, "name must be at least 3 characters"),
    username: Yup.string().min(3, "username must be at least 3 characters"),
})

export default userSchema
