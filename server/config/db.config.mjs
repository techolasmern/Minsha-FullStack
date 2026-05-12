import mongoose from "mongoose";
import { env } from "./env.config.mjs";

export const db = {
    connect: async () => {
        try {
            if (mongoose.connection.readyState === 1) return;
            await mongoose.connect(env.db.url, { dbName: env.db.name });
            return console.log(`✅ MongoDB: ${mongoose.connection.db.databaseName}`);
        } catch (e) {
            return process.exit(1);
        }
    } 
}
