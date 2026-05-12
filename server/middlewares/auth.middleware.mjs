import jwt from "jsonwebtoken";
import { env } from "../config/env.config.mjs";

export const authMiddleware = async (request, response, next) => {
    const tokenData = request.headers.authorization;
    if (!tokenData) {
        return response.status(401).send({
            message: "Invalid access"
        })
    }
    const [type, token] = tokenData.split(" ");
    if(type !== "Bearer"){
        return response.status(401).send({
            message: "Invalid access"
        })
    }
    try {
        jwt.verify(token, env.jwt_secret);
        next();
    } catch (e) {
        return response.status(401).send({
            message: "Invalid access"
        })
    }
}