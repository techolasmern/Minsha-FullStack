import crypto from "crypto";
import { transporter } from "../config/nodemailer.config.mjs";
import { env } from "../config/env.config.mjs";


export const sendOtpToEmail = async (email) => {
    if (!email) {
        return null;
    }
    const generated_otp = crypto.randomInt(1000, 9999).toString();
    try {
        const response = await transporter.sendMail({
            from: env.email.user,
            to: email,
            subject: "OTP Verification",
            text: `Your OTP is ${generated_otp}`
        })
        return { otp: generated_otp, id: response.messageId };
    } catch (e) {
        console.log(e);
        return null;
    }
}