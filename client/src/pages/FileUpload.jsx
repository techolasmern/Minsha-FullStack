import { useState } from "react";
import { api } from "../lib/axios";
import { useNavigate } from "react-router";

export const FileUpload = () => {

    const [file, setFile] = useState(null);
    const navigate = useNavigate()

    const handleFileSelected = e => {
        setFile(e.target.files[0]);
    }

    const handleFileUpload = async () => {
        try {
            const response = await api.post("/upload", { file }, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log(response.data)
        } catch (e) {
            return console.log(e);
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/auth");
    }

    return <div>
        <button onClick={handleLogout}>Logout</button>
        {file && <div>
            <img src={URL.createObjectURL(file)} alt="selected image" height={300} width={300}/>
        </div> }
        <input type="file" name="file" onChange={handleFileSelected} />
        <button onClick={handleFileUpload}>Upload</button>
    </div>
};