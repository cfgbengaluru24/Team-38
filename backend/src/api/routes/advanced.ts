import express from "express";
import {
	// getAllTeachers,
	// getSpecificTeacher,
	// makeClassTeacher,
	signup,
	// updateTeacherDetails,
	// uploadMarks,
	// upload,
	// getClassScores,
} from "../controllers/advancedController";
import { authMiddleware } from "../controllers/middleware";

// Endpoint here hits the /api/a/ endpoint

export const api = express();

api.use(authMiddleware);
api.post("/signup", signup);
// api.get("/", getAllTeachers);
// api.get("/scores", getClassScores);
// api.get("/:teacherId", getSpecificTeacher);
// api.put("/:teacherId", updateTeacherDetails);
// api.post("/:teacherId/makeClassTeacher", makeClassTeacher);
// api.post("/uploadMarks", upload.single("file"), uploadMarks);
