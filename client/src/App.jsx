import { BrowserRouter, Route, Routes } from "react-router";
import AuthPage from "./pages/AuthPage";
import "./styles/app.css";
import { FileUpload } from "./pages/FileUpload";
import { ProtectedRoute } from "./ProtectedRoute";

export const App = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/">
                <Route path="/auth" element={<ProtectedRoute auth={true}><AuthPage /></ProtectedRoute>} />
                <Route path="upload">
                    <Route path="file" element={<ProtectedRoute><FileUpload /></ProtectedRoute>} />
                </Route>
            </Route>
        </Routes>
    </BrowserRouter>
}