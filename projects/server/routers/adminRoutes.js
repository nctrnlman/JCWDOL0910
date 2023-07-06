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
router.get("/all-user", checkAdminRole, adminController.getAllUserForAdmin);
router.get("/all-admins", checkAdminRole, adminController.getAllAdmins);
router.post("/edit-admin/:id", checkAdminRole, adminController.editWarehouseAdmin)
router.post("/assign-admin/:id", checkAdminRole, adminController.assignWarehouseAdmin)
router.delete("/delete-admin/:id", checkAdminRole, adminController.deleteWarehouseAdmin)

module.exports = router;
