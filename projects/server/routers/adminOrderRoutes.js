const express = require("express");
const { adminOrderController } = require("../controllers");

const router = express.Router();

router.get("/payment", adminOrderController.fetchPaymentConfirmation);
router.patch("/payment/confirm", adminOrderController.confirmPayment);
router.patch("/payment/reject", adminOrderController.rejectPayment);

module.exports = router;
