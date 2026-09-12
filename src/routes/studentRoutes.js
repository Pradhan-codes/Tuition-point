import e from "express";
import { updateStudentProfile, getStudentProfile } from "../controllers/studentController.js";
import { createRequest, getMyRequests } from "../controllers/requestController.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";
import { validateStudentProfile, validateCreateRequest } from "../middlewares/validate.js";

export const studenRouter = e.Router()

studenRouter.use(authenticate, authorize("student"));
studenRouter.route("/profile").get(getStudentProfile).post(validateStudentProfile, updateStudentProfile);

studenRouter.post("/requests", validateCreateRequest, createRequest)
studenRouter.get("/requests", getMyRequests)