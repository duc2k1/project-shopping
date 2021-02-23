const express = require("express");
const router = express.Router();
const authController = require("../../controllers/authController");
const { baseAuth } = require("../../middlewares/baseAuth");
//----------------
router.post("/register", baseAuth, authController.register);
router.post("/login", baseAuth, authController.login);
router.post("/forgetPass", authController.forgetPass);
//----------------
module.exports = router;
