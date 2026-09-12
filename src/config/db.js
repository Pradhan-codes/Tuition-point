import { connect } from "mongoose";
import dotenv from "dotenv";

const result = dotenv.config()

async function connectDB(){
    try {
        await connect(process.env.MONGO_URI)
        console.log("Connected to Database.")
    } catch (error) {
        console.log("Failed to connect to Database.")
    }
}

export default connectDB;