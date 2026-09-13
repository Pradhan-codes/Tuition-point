import { Schema, model } from "mongoose";
import ROLES from "../constants/roles.js";

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [3, 'Minimum 3 characters.'],
        trim: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "Email is required"],
        trim: true,
        // match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email.']
    },
    password: {
        type: String,
        minLength: [6, 'Password must be atleast 6 characters.'],
        required: [true, 'Password is required']
    },
    role: {
        type: String,
        enum: Object.values(ROLES),
        default: ROLES.STUDENT
    },
    phone: {
        type: String,
        trime: true
    }
}, 
{
    timestamps: true,
    versionKey: false,
    strict: "throw"
}
)

const User = model('User', userSchema);

export default User;
