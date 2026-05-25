import { Navigate } from "react-router";
import { jwtDecode } from "jwt-decode"

export const ProtectedRoute = ({ auth, children }) => {
    const token = localStorage.getItem("token");
    if (!token) {
        if (auth) {
            // /auth
            return children;
        } else {
            return <Navigate to={"/auth"}/>
        }
    }

    try {
        const decode = jwtDecode(token);
        const current_time = Math.floor(Date.now() / 1000);
        if (decode.exp < current_time) {
            if (auth) {
                return children;
            } else {
                return <Navigate to={"/auth"} />
            }
        } 
        if (auth) {
            return <Navigate to={"/upload/file"} />
        } else {
            return children;
        }
    } catch (err) {
        return <Navigate to={"/auth"} />
    }

}