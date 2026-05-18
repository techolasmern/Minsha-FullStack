import { userModel } from "../models/user.model.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/env.config.mjs";

const signup = async (request, response) => {
    try {
        const body = request.body;
        const requiredFields = ["first_name", "is_verified", "last_name", "username", "email", "password", "confirm_password"];
        if (!body.is_verified) {
            return response.status(400).send({
                message: "Please verify your email."
            })
        }
        for (const field of requiredFields) {
            if (!body[field]) {
                return response.status(400).send({
                    message: `${field} is required`
                })
            }
        }
        // validate using regex
        const user = await userModel.findOne({ $or: [{ username: body.username }, { email: body.email }] });
        if (user) {
            if(user.username == body.username){
                return response.status(409).send({
                    message: "Username already exists"
                })
            }
            if(user.email == body.email){
                return response.status(409).send({
                    message: "Email already exists"
                })
            }
        }
        body.password = await bcrypt.hash(body.password, 10);
        const { confirm_password, ...restBody } = body;
        const newUser = await userModel.create(restBody);
        if(newUser){
            return response.status(201).send({
                message: "User created successfully"
            })
        }
        return response.status(500).send({
            message: "User creation failed"
        })
    } catch (e) {
        return response.status(500).send({
            message: e.message || "Internal Server Error"
        })
    }
}

const login = async (request, response) => { 
    try {
        const { username, password } = request.body;
        if(!username || !password){
            return response.status(400).send({
                message: "Username and password are required"
            })
        }
        // validate using regex
        const user = await userModel.findOne({ username });
        if (!user) {
            return response.status(404).send({
                message: "User not found"
            })
        }
        const isMatched = await bcrypt.compare(password, user.password);
        if(!isMatched){
            return response.status(401).send({
                message: "Password is incorrect"
            })
        }
        const token = jwt.sign({ sub: user._id }, env.jwt_secret, { expiresIn: "1h" });
        return response.status(200).send({
            message: "Login successful",
            token
        })
    } catch (e) {
        return response.status(500).send({
            message: e.message || "Internal Server Error"
        })
    }
}

const checkAuth = async (request, response) => {
    return response.status(200).send({
        message: "Auth checked successfully",
        user: request.user
    })
}

export default {
    signup, 
    checkAuth,
    login
}
