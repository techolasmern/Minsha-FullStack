import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "First name is required"]
    },
    last_name: {
        type: String,
        required: [true, "Last name is required"]
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username already exists"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
}, {
    timestamps: true
});

export const userModel = mongoose.model("users", userSchema);