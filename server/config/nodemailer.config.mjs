import nodemailer from "nodemailer";
import { env } from "./env.config.mjs";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: env.email.user,
        pass: env.email.password
    }
})