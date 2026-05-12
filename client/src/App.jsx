import { useState } from "react";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { api } from "./lib/axios";

const App = () => {

    const [isLogin, setIsLogin] = useState(false);

    const handleLoginOrSingup = (type) => {
        setIsLogin(type == "l" ? true : false);
    }

    const handleCheck = async () => {
        try {
            const response = await api.get("/auth/check");
            console.log(response.data.message);
        } catch (e) {
            console.log(e.response?.data.message);
        }
    }

    return <div>
        <div>
            <button onClick={() => handleLoginOrSingup("l")}>Login</button>
            <button onClick={() => handleLoginOrSingup("s")}>Singup</button>
        </div>
        <div>
            {
                isLogin ? <Login /> : <Signup />
            }
        </div>

        <div style={{marginTop: "100px"}}>
            <button onClick={handleCheck}>Check is valid user</button>
        </div>
    </div>
}

export default App;