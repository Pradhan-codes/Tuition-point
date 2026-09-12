import jwt from "jsonwebtoken";
import dotenv from "dotenv"

const result = dotenv.config()

export const authenticate = (req, res, next) => {
    try{
        const token = req.cookies.loginCookie
        if(!token){
            return res.json({success: false, message: "Authentication required."})
        }
        const verify = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = verify
        next();
    }catch(err){
        console.log("JWT ERROR:", err.message);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
}

export const authorize = (... role) => {
    return (req, res, next) => {
        const userRole = req.user.role
        if(role.includes(userRole)){
            next()
        }
        else{
            return res.status(403).json({success: false, message: "You are not authorized to access this."})
        }
    }
}