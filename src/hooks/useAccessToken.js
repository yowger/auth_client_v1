import { useRefreshTokenMutation } from "../features/auth/authApiSlice"

// const { data } = await queryFulfilled
// const { accessToken } = data
// dispatch(setCredentials({ accessToken }))

function useAccessToken() {
    const [
        refreshToken,
        { isUninitialized, isLoading, isSuccess, isError, error },
    ] = useRefreshTokenMutation()

    const token = refreshToken()
    console.log(
        "🚀 ~ file: useAccessToken.js:14 ~ useAccessToken ~ token:",
        token
    )

    return token
}

export default useAccessToken
