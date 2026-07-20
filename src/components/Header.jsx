import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import { getCurrentUser } from "../service/AuthService";
const Header = () => {

    const [user, setUser] = useState(null);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if(token) {
            getCurrentUser()
            .then((data) => setUser(data))
            .catch((err) => console.log(err));            
        }
    },[])
    
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <nav style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            padding: "20px",
            background: "#222"
        }}>
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                Home
            </Link>
            <Link to="/images" style={{ color: "white", textDecoration: "none" }}>
                Image List
            </Link>
            {!token && (
                <>
            <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
                Login
            </Link>
            <Link to="/register" style={{ color: "white", textDecoration: "none" }}>
                Register
            </Link>
            </>
            )}
            <Link to="/weather" style={{ color: "white", textDecoration: "none" }}>
            Weather
            </Link>
            {token && (
                <>
                <Link to="/profile" style={{ color: "white", textDecoration: "none" }}>{user?.fullname}</Link>
            <button onClick={handleLogout}>
                Logout
            </button>
            </>
            )}
        </nav>
    )
}
export default Header;