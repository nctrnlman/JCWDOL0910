const express = require("express");
const { adminController } = require("../controllers");
const { verifyToken } = require("../middleware/authVerification");
const router = express.Router();

router.get("/all-user", verifyToken, adminController.getAllUser);
router.post("/assign-wh-admin/:id", verifyToken, adminController.assignWarehouseAdmin);
router.get("/all-wh-admin", verifyToken, adminController.getAllWarehouseAdmin);
router.post("/assign-wh-admin-to-wh/:id", verifyToken, adminController.assignWarehouseAdminToWH);

module.exports = router;