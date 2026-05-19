import express from "express";
import { env } from "./config/env.config.mjs";
import cors from "cors";
import authRouter from "./routes/auth.router.mjs";
import { db } from "./config/db.config.mjs";
import otpRouter from "./routes/otp.controller.mjs";
import uploadRouter from "./routes/upload.router.mjs";

const app = express();
app.use(cors({
    origin: env.client_url
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/file", express.static("uploads"));

app.use("/auth", authRouter);
app.use("/otp", otpRouter);
app.use("/upload", uploadRouter);

const port = env.port;
app.listen(port, async () => {
    await db.connect();
    console.log(`🔎 Server: http://localhost:${port}`);
})