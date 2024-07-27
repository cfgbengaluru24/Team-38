const express = require("express");
const { signup , signin, google, signOut } = require("../a/controllers/auth.controller");
const { signup, signin, google, signOut } = require("../f/controllers/auth.controller");
const router = express.Router();

// /api/auth

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);

module.exports = router;
