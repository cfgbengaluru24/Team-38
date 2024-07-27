import express from "express";
import { authMiddleware } from "../controllers/middleware";
import { enterCustomerDetails, sendData } from "../controllers/customerController";

export const api = express();

// /api/c/
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "extras/"); // Directory to save the uploaded files
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`); // Use the current timestamp + original filename
	},
});

const upload = multer({ storage: storage });

api.use(authMiddleware);
api.post("/", enterCustomerDetails); // enter customer details
api.post("/upload", (req, res, next) => {
	console.log(req.headers);
	console.log(req.body);
	next();
  }, upload.single('file'), sendData);