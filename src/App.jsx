import { Routes, Route } from "react-router-dom"
import PersistLogin from "./features/auth/PersistLogin"
import Layout from "./components/shared/Layout"
import Home from "./features/home/Home"
import About from "./features/home/About"
import Contact from "./features/home/Contact"
import Protected from "./features/home/Protected"
import Login from "./features/auth/Login"
import Register from "./features/auth/Register"

function App() {
    return (
        <Routes>
            {/* check if user exist if exist then navigate / */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<PersistLogin />}>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/protected" element={<Protected />} />
                </Route>
            </Route>
            {/* todo routes */}
            {/* verify email */}
            {/* forgot password */}
            {/* 404 not found */}
        </Routes>
    )
}

export default App
