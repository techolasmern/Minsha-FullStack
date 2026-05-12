import express from "express";
import { env } from "./config/env.config.mjs";
import cors from "cors";
import authRouter from "./routes/auth.router.mjs";
import { db } from "./config/db.config.mjs";

const app = express();
app.use(cors({
    origin: env.client_url
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);

const port = env.port;
app.listen(port, async () => {
    await db.connect();
    console.log(`🔎 Server: http://localhost:${port}`);
})