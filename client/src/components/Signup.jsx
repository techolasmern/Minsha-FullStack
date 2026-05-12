import { useState } from "react";
import { api } from "../lib/axios";

export const Signup = () => {

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await api.post("/auth/signup", formData);   
            console.log(response.data);
        } catch (error) {
            console.log(error.response?.data.message);
        }
    }

    return <div>
        <h1>Signup Form</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" name="first_name" onChange={handleChange} value={formData.first_name} placeholder="First Name" />
            <input type="text" name="last_name" onChange={handleChange} value={formData.last_name} placeholder="Last Name" />
            <input type="text" name="username" onChange={handleChange} value={formData.username} placeholder="Username" />
            <input type="text" name="email" onChange={handleChange} value={formData.email} placeholder="Email" />
            <input type="password" name="password" onChange={handleChange} value={formData.password} placeholder="Password" />
            <input type="password" name="confirm_password" onChange={handleChange} value={formData.confirm_password} placeholder="Confirm Password" />
            <button>Signup</button>
        </form>
    </div>
};