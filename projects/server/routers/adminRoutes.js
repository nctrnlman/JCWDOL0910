const express = require("express");
const { adminController, reportTransactionController, reportStockController } = require("../controllers");
const checkRole = require("../middleware/checkRole");

const router = express.Router();

router.post("/", checkRole.superAdmin, adminController.createAdmin);
router.post(
  "/warehouse-admin",
  checkRole.superAdmin,
  adminController.createWarehouseAdmin
);
router.post("/login", adminController.loginAdmin); // Add the login route
router.get(
  "/all-user",
  checkRole.superAdmin,
  adminController.getAllUserForAdmin
);
router.get("/all-admins", checkRole.superAdmin, adminController.getAllAdmins);
router.post(
  "/edit-admin/:id",
  checkRole.superAdmin,
  adminController.editWarehouseAdmin
);
router.post(
  "/assign-admin/:id",
  checkRole.superAdmin,
  adminController.assignWarehouseAdmin
);
router.delete(
  "/delete-admin/:id",
  checkRole.superAdmin,
  adminController.deleteWarehouseAdmin
);
router.post(
  "/transaction-on-range",
  checkRole.superAdmin,
  reportTransactionController.fetchTransactionOnDateRange
);
router.post(
  "/transaction-monthly",
  checkRole.superAdmin,
  reportTransactionController.fetchMonthlyTransaction
);
router.post(
  "/transaction-monthly-cat",
  checkRole.superAdmin,
  reportTransactionController.fetchMonthlyCategoryTransaction
);
router.post(
  "/transaction-monthly-product",
  checkRole.superAdmin,
  reportTransactionController.fetchMonthlyProductTransaction
);
router.get(
  "/stock-movement",
  checkRole.superAdmin,
  reportStockController.fetchStockMovementHistory
);

module.exports = router;
