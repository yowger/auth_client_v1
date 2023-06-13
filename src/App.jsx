import { Routes, Route } from "react-router-dom"
import PersistLogin from "./features/auth/PersistLogin"
import Layout from "./components/shared/Layout"
import Home from "./features/home/Home"
import About from "./features/home/About"
import Contact from "./features/home/Contact"
import Protected from "./features/home/Protected"
import Login from "./features/auth/Login"
import Register from "./features/auth/Register"
import RedirectIfLoggedIn from "./features/auth/RedirectIfLoggedIn"
import NotFound from "./components/shared/NotFound"
import RequireAuth from "./features/auth/RequireAuth"
import Profile from "./features/profile/Profile"
import ForgotPassword from "./features/auth/ForgotPassword"

function App() {
    return (
        <Routes>
            <Route element={<PersistLogin />}>
                <Route element={<RedirectIfLoggedIn />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/forgot_password"
                        element={<ForgotPassword />}
                    />
                </Route>

                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route
                        element={
                            <RequireAuth allowedRoles={["User", "Admin"]} />
                        }
                    >
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/profile" element={<Profile />} />
                    </Route>

                    <Route element={<RequireAuth allowedRoles={["Admin"]} />}>
                        <Route path="/protected" element={<Protected />} />
                    </Route>
                </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
            {/* todo routes */}
            {/* verify email */}
            {/* forgot password */}
            {/* 404 not found */}
        </Routes>
    )
}

export default App
