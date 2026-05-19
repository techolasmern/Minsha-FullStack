import { BrowserRouter, Route, Routes } from "react-router";
import AuthPage from "./pages/AuthPage";
import "./styles/app.css";
import { FileUpload } from "./pages/FileUpload";

export const App = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/">
                <Route path="/auth" Component={AuthPage} />
                <Route path="upload">
                    <Route path="file" Component={FileUpload} />
                </Route>
            </Route>
        </Routes>
    </BrowserRouter>
}