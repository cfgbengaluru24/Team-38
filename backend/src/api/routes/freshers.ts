import express from "express";
import {
  fetchModules,
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
<<<<<<< HEAD
api.get('/test',fetchQuestions)
=======
api.get("/module", fetchModules);
>>>>>>> b034d2d1d73b0108c777d2cd25c9f43a04de4da9
// api.get("/", getAllStudents);
// api.get("/:studentId", getSpecificStudent);
// api.get("/usn/:usn", getSpecificStudentByUsn);
// api.put("/:studentId", updateStudentDetails);
// api.get("/scores/:studentId", getSpecificStudentScores)
