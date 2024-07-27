import express from "express";
import {
  // getAllStudents,
  // getSpecificStudent,
  // getSpecificStudentByUsn,
  // getSpecificStudentScores,
  signup,
  // updateStudentDetails,
} from "../controllers/fresherController";
import { authMiddleware } from "../controllers/middleware";
import { fetchQuestions } from "../controllers/questionController";

// Any endpoint here hits the /f/ endpoint

export const api = express();

api.post("/signup", signup);
api.use(authMiddleware);
api.get('/test',fetchQuestions)
// api.get("/", getAllStudents);
// api.get("/:studentId", getSpecificStudent);
// api.get("/usn/:usn", getSpecificStudentByUsn);
// api.put("/:studentId", updateStudentDetails);
// api.get("/scores/:studentId", getSpecificStudentScores)
