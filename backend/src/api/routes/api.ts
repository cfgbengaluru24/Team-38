import express from "express";
import { api as fresherApi } from "./freshers";
import { api as advancedApi } from "./advanced";
import {api as loginApi} from "./login";

// At endpoint /api

export const apis = express();

apis.use("/f", fresherApi);
apis.use("/a", advancedApi);
apis.use("/signin", loginApi)
