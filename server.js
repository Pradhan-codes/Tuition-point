import { app } from "./src/app.js";
import connectDB from "./src/config/db.js";
import dotenv from "dotenv";

const result = dotenv.config()

const PORT = process.env.PORT || 4000
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on PORT  ${PORT}`);
    })
})
