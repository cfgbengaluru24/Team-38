import express from "express";
import { authMiddleware } from "../controllers/middleware";
import { enterCustomerDetails } from "../controllers/customerController";

export const api = express();

api.use(authMiddleware);
api.post("/", enterCustomerDetails); // enter customer details