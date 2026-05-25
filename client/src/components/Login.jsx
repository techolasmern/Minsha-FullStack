import { useState } from "react";
import { api } from "../lib/axios";
import "../styles/login.css"; 
import { useNavigate } from "react-router";

export const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await api.post("/auth/login", formData);
            localStorage.setItem("token", response.data.token);
            console.log(localStorage.getItem("token"))
            navigate("/upload/file");
        } catch (error) {
            console.log(error.response?.data.message);
            alert("Login failed: " + (error.response?.data.message || "Server Error"));
        }
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <h1>Login</h1>
                <form className="login-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        onChange={handleChange}
                        value={formData.username}
                        placeholder="Username"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={formData.password}
                        placeholder="Password"
                        required
                    />
                    <button className="login-button" type="submit">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};