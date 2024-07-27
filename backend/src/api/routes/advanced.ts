import express from "express";
import {
	signup
} from "../controllers/advancedController";
import { authMiddleware } from "../controllers/middleware";
import {
	customersDetails,
	freshersDetails,
} from "../controllers/fresherToTrainerController";

// Endpoint here hits the /api/a/ endpoint

export const api = express();


api.use(authMiddleware);
api.post("/signup", signup);							// Tranfer fresher to advanced
api.get("/freshers", freshersDetails);		// Fetch all fresher details
api.get("/customers", customersDetails); 	// Fetch all customers under this guy


// api.get("/", getAllTeachers);
// api.get("/scores", getClassScores);
// api.get("/:teacherId", getSpecificTeacher);
// api.put("/:teacherId", updateTeacherDetails);
// api.post("/:teacherId/makeClassTeacher", makeClassTeacher);
// api.post("/uploadMarks", upload.single("file"), uploadMarks);
