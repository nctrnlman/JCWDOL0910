const express = require("express");
const { adminController, reportTransactionController, reportStockController } = require("../controllers");
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
router.post("/transaction-on-range", checkAdminRole, reportTransactionController.fetchTransactionOnDateRange);
router.post("/transaction-monthly", checkAdminRole, reportTransactionController.fetchMonthlyTransaction);
router.post("/transaction-monthly-cat", checkAdminRole, reportTransactionController.fetchMonthlyCategoryTransaction);
router.post("/transaction-monthly-product", checkAdminRole, reportTransactionController.fetchMonthlyProductTransaction);
router.post("/stock-movement", checkAdminRole, reportStockController.fetchStockMovementHistory);

module.exports = router;
