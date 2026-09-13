import e from "express";
import { validateTeacherProfile, validateTeacherSearch } from "../middlewares/validate.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";
import { respondToRequest, getMyRequests } from "../controllers/requestController.js";
import { updateTeacherProfile, searchTeachers, getTeacherProfile } from "../controllers/teacherController.js";

export const teacherRouter = e.Router()

teacherRouter.get("/search", searchTeachers)

teacherRouter.route("/profile").get(authenticate, authorize("teacher"), getTeacherProfile)
              .post(authenticate, authorize("teacher"), validateTeacherProfile, updateTeacherProfile);

teacherRouter.get("/requests", authenticate, authorize("teacher"), getMyRequests)
teacherRouter.patch("/requests/:id", authenticate, authorize("teacher"), respondToRequest)