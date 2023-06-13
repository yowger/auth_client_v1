import { Outlet } from "react-router-dom"
import Header from "./Header"

const Layout = () => {
    return (
        <div>
            <Header />
            <div className="w-full pt-5">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout
