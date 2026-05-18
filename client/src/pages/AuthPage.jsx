import { useState } from "react";
import { Login } from "../components/Login";
import { Signup } from "../components/Signup";
import { api } from "../lib/axios";
import "../styles/auth_page.css"; 

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    const handleCheck = async () => {
        try {
            const response = await api.get("/auth/check");
            alert(`Status: ${response.data.message}`);
        } catch (e) {
            console.error("Auth Check Failed:", e.response?.data.message);
            alert("Session invalid or expired");
        }
    }

    return (
        <div className="auth-wrapper">
            <div className="auth-container">
                {/* Tab Switcher */}
                <div className="auth-tabs">
                    <button
                        className={isLogin ? "active" : ""}
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </button>
                    <button
                        className={!isLogin ? "active" : ""}
                        onClick={() => setIsLogin(false)}
                    >
                        Sign Up
                    </button>
                </div>

                {/* Dynamic Component Rendering */}
                <div className="auth-content">
                    {isLogin ? <Login /> : <Signup />}
                </div>

                {/* Utility Section */}
                <div className="auth-footer">
                    <button className="check-btn" onClick={handleCheck}>
                        Verify Session Status
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AuthPage;