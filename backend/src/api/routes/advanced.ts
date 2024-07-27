import express from "express";
import {
	signup
} from "../controllers/advancedController";
import { authMiddleware } from "../controllers/middleware";
import {
	customersDetails,
	freshersDetails,
} from "../controllers/fresherToTrainerController";
import { writeQuestions } from "../controllers/writeQuestionsController";

// Endpoint here hits the /api/a/ endpoint

export const api = express();


api.use(authMiddleware);
<<<<<<< HEAD
api.post("/signup", signup);
api.post("/freshers", freshersDetails);
api.get("/customers", customersDetails);
=======
api.post("/signup", signup);							// Tranfer fresher to advanced
api.post("/freshers", freshersDetails);		// Fetch all fresher details
api.get("/customers", customersDetails); 	// Fetch all customers under this guy

>>>>>>> 8636cc6c86aac5c25a854f02add24604f342140c

// api.get("/", getAllTeachers);
// api.get("/scores", getClassScores);
// api.get("/:teacherId", getSpecificTeacher);
// api.put("/:teacherId", updateTeacherDetails);
// api.post("/:teacherId/makeClassTeacher", makeClassTeacher);
// api.post("/uploadMarks", upload.single("file"), uploadMarks);
