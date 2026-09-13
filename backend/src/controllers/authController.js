import User from "../models/user.js";
import { compare, hash } from "bcryptjs";
import dotenv from "dotenv";
import { generateToken } from "../utils/generateToken.js";

const result = dotenv.config()

export const register = async (req, res) => {
    try {
        let user = req.body
        let phone = req.body.phone
        const existingUser = await User.findOne({phone: phone})
        if(existingUser){
            return res.status(409).json({success: false, message: "User already exists."})
        }
        else{
            const hashedPassword = await hash(user.password, 12)
            user.password = hashedPassword
            let newUser = await User.create(user)

            res.status(201).json({
                success: true,
                message: "New user created.",
                data: newUser
            });
        }
    } catch (error) {
        return res.status(500).json({success: false, message: "Server error."})
    }
}

export const login = async (req, res) => {
    try {
        let user = req.body
        const password = req.body.password
        const existingUser = await User.findOne({email: user.email})
        if(!existingUser){
            return res.status(401).json({success: false, message: "User not found."})
        }
        const isCorrect = await compare(password, existingUser.password)
        if(isCorrect){
            const signedToken = generateToken(existingUser._id, existingUser.role)
            res.cookie("loginCookie", signedToken, {
                httpOnly: true,
                samSite: "lax",
                secure: false
            }).status(201).json({success: true, message: "login successful"})
        }else{
            return res.status(500).json({success: false, message: "Login failed."})
        }
    } catch (error) {
        console.log(error)

        res.status(500).json({success: false, message: "Something went wrong! Login again."})
    }
}

export const logOut = async (req, res) => {
    
    res.clearCookie("loginCookie", {
        httpOnly: true,
        secure: false,
        samSite: "lax"
    })
    return res.status(200).json({success: true, message: "Logged out successfully."})
}