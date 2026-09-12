import cookieParser from "cookie-parser";
import express from "express";
import { authRouter } from "./routes/authRoutes.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import { studenRouter } from "./routes/studentRoutes.js";
import { teacherRouter } from "./routes/teacherRoutes.js";

export const app = express();

app.use(express.json())
app.use(cookieParser())

app.use("/auth", authRouter)

app.use("/students", studenRouter)
app.use("/teachers", teacherRouter)

// handle all unmatched end-points or routes
app.use((req, res, next) => {
    res.status(404).json({success: false, message: "Route(Page) not found."})
})

//error handling middleware
app.use(errorHandler)
