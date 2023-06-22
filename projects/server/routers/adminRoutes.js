const express = require("express");
const { adminController } = require("../controllers");
const { verifyToken } = require("../middleware/authVerification");
const router = express.Router();

router.get("/all-user", verifyToken, adminController.getAllUser);
router.post("/assign-wh-admin/:id", verifyToken, adminController.assignWarehouseAdmin);
router.get("/all-wh-admin", verifyToken, adminController.getAllWarehouseAdmin);
router.post("/edit-admin/:id", verifyToken, adminController.editAdmin);

module.exports = router;