import { otpModel } from "../models/otp.model.mjs";
import { sendOtpToEmail } from "../services/nodemailer.service.mjs";

const send = async (request, response) => {
    try {
        const { email } = request.body;
        if(!email) {
            return response.status(400).send({
                message: "Email is required"
            });
        }
        const otp_response = await sendOtpToEmail(email);
        if(!otp_response) {
            return response.status(500).send({
                message: "Failed to send OTP"
            });
        }
        const otp_data = await otpModel.findOne({ email });
        if (!otp_data) {
            const new_otp_data = await otpModel.create({
                otp: otp_response.otp,
                email,
                expire: Math.floor(Date.now() / 1000) + 60 * 5,
                cooldown: Math.floor(Date.now() / 1000) + 30
            })
            if (!new_otp_data) {
                return response.status(500).send({
                    message: "Internal Server Error. Try again later."
                });
            
            }
        } else {
            otp_data.otp = otp_response.otp;
            otp_data.cooldown = Math.floor(Date.now() / 1000) + 30;
            otp_data.expire = Math.floor(Date.now() / 1000) + 60 * 5;
            await otp_data.save();
        }
        return response.status(200).send({
            message: "OTP sent successfully",
            otp: otp_response.otp
        });
    } catch (e) {
        return response.status(500).send({
            message: e.message || "Internal Server Error"
        })
    }
}

const verify = async (request, response) => {
    try {
        const { email, otp } = request.body;
        if (!email || !otp) {
            return response.status(400).send({
                message: "Email and OTP are required"
            });
        }
        const otp_data = await otpModel.findOne({ email });
        if (!otp_data) {
            return response.status(400).send({
                message: "Please send OTP first."
            });
        }
        if (otp_data.expire < Math.floor(Date.now() / 1000)) {
            return response.status(400).send({
                message: "OTP expired."
            });
        }
        if (otp_data.otp != otp) {
            return response.status(400).send({
                message: "OTP is incorrect."
            });
        }
        return response.status(200).send({
            message: "OTP is verified successfully."
        });
    } catch (e) {
        return response.status(500).send({
            message: e.message || "Internal Server Error"
        })
    }
}

const resend = async (request, response) => {
    try {
        const { email} = request.body;
        if (!email) {
            return response.status(400).send({
                message: "Email is required"
            });
        }
        const otp_data = await otpModel.findOne({ email });
        if (!otp_data) {
            return response.status(400).send({
                message: "Please send OTP first."
            });
        }
        const currentTime = Math.floor(Date.now() / 1000);
        if (otp_data.cooldown > currentTime) {
            const remainingTime = otp_data.cooldown - currentTime;
            return response.status(400).send({
                message: `Please wait for ${remainingTime} seconds before sending another OTP.`
            });
        }
        return send(request, response);
    } catch (e) {
        return response.status(500).send({
            message: e.message || "Internal Server Error"
        })
    }
}

export default {
    send,
    verify,
    resend
}