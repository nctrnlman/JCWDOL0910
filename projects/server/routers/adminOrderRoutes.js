const express = require("express");
const { adminOrderController } = require("../controllers");

const router = express.Router();

router.get("/payment", adminOrderController.fetchPaymentConfirmation);
router.post("/payment/confirm", adminOrderController.confirmPayment);
router.post("/payment/reject", adminOrderController.rejectPayment);

module.exports = router;
