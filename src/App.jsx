import { Routes, Route } from "react-router-dom"
import Home from "./features/home/Home"
import Login from "./features/auth/Login"
import Register from "./features/auth/Register"

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* todo routes */}
            {/* verify email */}
            {/* forgot password */}
            {/* 404 not found */}
        </Routes>
    )
}

export default App
