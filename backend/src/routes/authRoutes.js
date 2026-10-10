import { login, logOut, register, getMe} from "../controllers/authController.js";
import e from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { validateLogin, validateRegister } from "../middlewares/validate.js";

export const authRouter = e.Router();

authRouter.post("/register", validateRegister, register)
authRouter.post("/login", validateLogin, login)
authRouter.get("/me", authenticate, getMe);
authRouter.post("/logout", logOut)
