import { useState } from "react";
import { api } from "../lib/axios";
import "../styles/signup.css";

export const Signup = () => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        otp: "",
        confirm_password: "",
        is_verified: false,
    });
    const [showOtpButton, setShowOtpButton] = useState({ send_otp: false, verify_otp: false });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async e => {
        e.preventDefault();

        if (!formData.is_verified) {
            return alert("Please verify your email.")
        }

        if (formData.password !== formData.confirm_password) {
            return alert("Passwords do not match!");
        }

        try {
            const { otp, ...rest } = formData;
            const response = await api.post("/auth/signup", rest);
            alert("Account created successfully!");
        } catch (error) {
            console.error(error.response?.data.message);
            alert(error.response?.data.message || "Something went wrong");
        }
    }

    const sendOtpToMail = async () => {
        if(!formData.email) {
            return alert("Please enter your email.");
        }
        try {
            const response = await api.post("/otp/send", { email: formData.email });
            setShowOtpButton({ ...showOtpButton, verify_otp: true });
            alert("OTP sent to your email!");
        } catch (error) {
            console.error(error.response?.data.message);
            alert(error.response?.data.message || "Something went wrong");
        }
    }

    const verifyOtp = async () => {
        if (!formData.otp) {
            return alert("Please enter OTP.");
        }
        try {
            const response = await api.post("/otp/verify", { email: formData.email, otp: formData.otp });
            setFormData({ ...formData, is_verified: true });
            setShowOtpButton({ send_otp: false, verify_otp: false });
            alert("OTP verified successfully!");
        } catch (e) {
            console.error(e.response?.data.message);
            alert(e.response?.data.message || "Something went wrong");
        }
    }

    return (
        <div className="signup-form-container">
            <h1>Create Account</h1>
            <form className="auth-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <input type="text" name="first_name" onChange={handleChange} value={formData.first_name} placeholder="First Name" required />
                    <input type="text" name="last_name" onChange={handleChange} value={formData.last_name} placeholder="Last Name" required />
                </div>

                <input type="text" name="username" onChange={handleChange} value={formData.username} placeholder="Username" required />
                <div className="otp-container">
                    <input type="email" name="email" onBlur={() => setShowOtpButton({ ...showOtpButton, send_otp: true })} onChange={handleChange} value={formData.email} placeholder="Email" required />
                    {showOtpButton.send_otp && <button onClick={sendOtpToMail} type="button">Send OTP</button>}
                </div>
                {formData.is_verified && <p style={{ color: "green" }}>Your email has been verified!</p>}
                {
                    showOtpButton.verify_otp && <div className="otp-container">
                        <input type="text" name="otp" onChange={handleChange} value={formData.otp} placeholder="OTP" required />
                        {showOtpButton.verify_otp && <button onClick={verifyOtp} type="button">Verify OTP</button>}
                    </div>    
                }
                <input type="password" name="password" onChange={handleChange} value={formData.password} placeholder="Password" required />
                <input type="password" name="confirm_password" onChange={handleChange} value={formData.confirm_password} placeholder="Confirm Password" required />

                <button className="auth-button" type="submit">Sign Up</button>
            </form>
        </div>
    );
};