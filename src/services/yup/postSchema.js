import * as Yup from "yup"

const postSchema = Yup.object().shape({
    post: Yup.string()
        .required("cannot send empty post")
        .min(3, "Please write at least 3 characters")
        .max(50, "Only a max of 50 characters is allowed"),
})

export default postSchema
