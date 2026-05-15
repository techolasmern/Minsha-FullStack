import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    otp: {
        type: String,
        required: [true, "OTP is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    cooldown: {
        type: Number,
        required: [true, "Cooldown is required"]
    },
    expire: {
        type: Number,
        required: [true, "Expire is required"]
    }
}, {
    timestamps: true
});

export const otpModel = mongoose.model("otps", otpSchema);
