import  jwt  from "jsonwebtoken";
import dotenv from "dotenv"

const result = dotenv.config({ path: '../../.env' })

export const generateToken = (userId, role) => {
    return jwt.sign({ id: userId, role},
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1h' }
    )
}