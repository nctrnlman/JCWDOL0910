const express = require("express");
const { adminController } = require("../controllers");
const checkRole = require("../middleware/checkRole");

const router = express.Router();

router.post("/", adminController.createAdmin);
router.post(
  "/warehouse-admin",
  checkRole.superAdmin,
  adminController.createWarehouseAdmin
);
router.post("/login", adminController.loginAdmin); // Add the login route

module.exports = router;
