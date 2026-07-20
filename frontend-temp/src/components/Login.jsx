import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../service/AuthService';

const Login = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setForm({
            ...form,
             [e.target.name]: e.target.value
        });
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser(form);
            localStorage.setItem("token", data.token);
            setMessage("Login successfully");
            
            navigate("/")
            
        } catch (err) {
            setMessage(err.response?.data || "Login Failed");
        }
    }
    return(
        <div style={{ width: "400px", margin: "30px auto" }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" onChange={handleChange} placeholder="Enter your email" value={form.email} />
                <input type="password" name="password" onChange={handleChange} placeholder="Enter your password" value={form.password} />
                <button type="submit">Submti</button>
            </form>
            <p>{message}</p>
        </div>
    )
}

export default Login