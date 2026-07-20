import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../service/AuthService'

const Register = () => {

    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [form, setForm] = useState({
        fullname: "",
        email: "",
        password: "",
        dob: "",
        gender: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(form);
        try {
            await registerUser(form)
            setMessage("Register Successfully");
            navigate("/login")
        } catch (err) {
            setMessage(err.response?.data || "Registeration Failed");
        }
    }


    return(
        <div style={{ width: "400px", margin: "30px auto" }}>
            <h2>Register
                <form onSubmit={handleSubmit}>
                    <input type="text" name="fullname" placeholder="Fullname" value={form.fullname} onChange={handleChange} />
                    <input type="email" name="email" placeholder="Enter your email" value={form.email} onChange={handleChange} />
                    <input type="password" name="password" placeholder="Enter your password" vlaue={form.password} onChange={handleChange} />
                    <input type="date" name="dob" placeholder="DOB" value={form.dob} onChange={handleChange} />
                    <select name="gender" value={form.gender} onChange={handleChange}>
                        <option value="">Select Gender</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="OTHER">Other</option>
                    </select>
                    <button type="submit">
                        Register
                    </button>
                </form>
                <p></p>
            </h2>
        </div>
    )
}
export default Register;