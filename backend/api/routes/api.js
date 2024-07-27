const express = require("express");
const userRouter = require("./user.route");
const authRouter = require("./auth.route");

const apis = express();

apis.use("/auth", authRouter);

apis.use("/user", userRouter);

module.exports = apis;