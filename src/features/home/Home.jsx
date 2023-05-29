import useAuth from "../../hooks/useAuth"

function Home() {
    const {username} = useAuth()
    
    return (
        <div>
            <div>
                <h1>Welcome {username}</h1>
                <p>email</p>
                <button className="bg-blue-200">login</button>
            </div>
            home
        </div>
    )
}

export default Home
