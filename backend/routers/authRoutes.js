const express = require("express");
const router = express.Router();
const { loginUser, logout, forgotPassword, resetPassword } = require("../controller/authController"); // Correct path

router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.post("/forgat-paasword", forgotPassword);
router.post("/reset-paasword", resetPassword);

module.exports = router;
