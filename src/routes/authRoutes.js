import { login, logOut, register } from "../controllers/authController.js";
import e from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { validateLogin, validateRegister } from "../middlewares/validate.js";

export const authRouter = e.Router();

authRouter.post("/register", validateRegister, register)
authRouter.post("/login", validateLogin, login)
authRouter.post("/logout", logOut)
