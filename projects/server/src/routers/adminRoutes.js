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
  "/all-transactions-monthly",
  checkRole.admins,
  reportTransactionController.fetchAllMonthlyTransactions
);

router.get(
  "/all-transactions-category-monthly",
  checkRole.admins,
  reportTransactionController.fetchAllMonthlyCategoryTransactions
);
router.get(
  "/all-transactions-product-monthly",
  checkRole.admins,
  reportTransactionController.fetchAllMonthlyProductTransactions
);

router.get(
  "/all-transactions-monthly/:id",
  checkRole.admins,
  reportTransactionController.fetchAllMonthlyTransactionsByWarehouse
);

router.get(
  "/all-transactions-category-monthly/:id",
  checkRole.admins,
  reportTransactionController.fetchAllMonthlyCategoryTransactionsByWarehouse
);
router.get(
  "/all-transactions-product-monthly/:id",
  checkRole.admins,
  reportTransactionController.fetchAllMonthlyProductTransactionsByWarehouse
);

router.get(
  "/stock-movement-detail",
  checkRole.admins,
  reportStockController.fetchStockMovementHistory
);
router.get(
  "/stock-movement-recap",
  checkRole.admins,
  reportStockController.fetchRingkasanStockBulanan
);
router.get(
  "/stock-movement-detail/:id",
  checkRole.admins,
  reportStockController.fetchStockMovementHistoryByWarehouse
);
router.get(
  "/stock-movement-recap/:id",
  checkRole.admins,
  reportStockController.fetchRingkasanStockBulananByWarehouse
);


module.exports = router;
