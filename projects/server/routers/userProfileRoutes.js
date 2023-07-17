const express = require("express");
const { userProfileController } = require("../controllers");
const { verifyToken } = require("../middleware/authVerification");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const upload = require("../middleware/multer");

router.get("/", verifyToken, userProfileController.getUserProfile);
router.post("/edit-data", verifyToken, userProfileController.editUserProfile);
router.post(
  "/upload",
  verifyToken,
  upload.single("image_url"),
  userProfileController.addProfilePic
);
router.post("/add-address", verifyToken, userProfileController.addAddress);
router.post(
  "/edit-address/:id",
  verifyToken,
  userProfileController.editAddress
);
router.delete(
  "/delete-address/:id",
  verifyToken,
  userProfileController.deleteAddress
);
router.get("/get-address", verifyToken, userProfileController.getUserAddress);

router.get(
  "/set-primary-address/:id",
  verifyToken,
  userProfileController.setPrimaryAddress
);

module.exports = router;
