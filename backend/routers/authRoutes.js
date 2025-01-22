const express = require("express");
const router = express.Router();
const { loginUser, logout, forgotPassword, resetPassword, editProfile, createOrder, paymentCallback } = require("../controller/authController"); // Correct path
const upload = require("../middleweres/multer");


router.post('/login', loginUser);
router.post('/logout', logout);
router.post("/forgat-paasword", forgotPassword);
router.post("/reset-paasword", resetPassword);
// Route for editing user profile
router.post('/edit-profile',upload.single('profilePicture'), editProfile);
router.post("/create-order", createOrder);
router.post("/payment-callback", paymentCallback);



module.exports = router;
