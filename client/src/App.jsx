import { BrowserRouter, Route, Routes } from "react-router";
import AuthPage from "./pages/AuthPage";
import "./styles/app.css";

export const App = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/">
                <Route path="/auth" Component={AuthPage}/>
            </Route>
        </Routes>
    </BrowserRouter>
}