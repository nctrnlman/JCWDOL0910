const express = require("express");
const { adminController } = require("../controllers");
const checkAdminRole = require("../middleware/checkRole");

const router = express.Router();

router.post("/", adminController.createAdmin);
router.post(
  "/warehouse-admin",
  checkAdminRole,
  adminController.createWarehouseAdmin
);
router.post("/login", adminController.loginAdmin); // Add the login route

module.exports = router;
