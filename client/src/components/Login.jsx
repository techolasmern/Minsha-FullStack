import { useState } from "react";
import { api } from "../lib/axios";

export const Login = () => {

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async e => {
            e.preventDefault();
            try {
                const response = await api.post("/auth/login", formData);   
                console.log(response.data.token);
                localStorage.setItem("token", response.data.token);
            } catch (error) {
                console.log(error.response?.data.message);
            }
        }

    return <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" onChange={handleChange} value={formData.username} placeholder="Username" />
            <input type="password" name="password" onChange={handleChange} value={formData.password} placeholder="Password" />
            <button>Login</button>
        </form>
    </div>
};