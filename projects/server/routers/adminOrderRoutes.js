const express = require("express");
const { adminOrderController } = require("../controllers");
const checkRole = require("../middleware/checkRole");

const router = express.Router();

router.get("/payment", adminOrderController.fetchPaymentConfirmation);
router.patch("/payment/confirm", adminOrderController.confirmPayment);
router.patch("/payment/reject", adminOrderController.rejectPayment);
router.get("/", checkRole.admins, adminOrderController.fetchOrderList);

module.exports = router;
