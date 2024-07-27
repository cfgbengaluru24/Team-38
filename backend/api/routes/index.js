const express = require("express");
const apis = require("./api");

const api = express();

api.use("/api", apis);

module.exports = api;