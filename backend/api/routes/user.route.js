const express = require("express");
const { updateUser, deleteUser } = require("../controllers/user.controller");
const { verifyToken } = require("../utils/verifyToken");

const router = express.Router();

// /api/user

router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);

module.exports = router;
