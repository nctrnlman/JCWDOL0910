const express = require("express");
const { userController } = require("../controllers");

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/resend-verification", userController.resendVerification);
router.post("/verification", userController.verify);
router.post("/forget-password", userController.forgetPassword);
router.post("/reset-password", userController.resetPassword);

module.exports = router;
