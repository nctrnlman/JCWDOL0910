const express = require("express");
const { adminOrderController } = require("../controllers");
const checkRole = require("../middleware/checkRole");

const router = express.Router();

router.get("/", checkRole.admins, adminOrderController.fetchOrderList);
router.post("/payment/confirm", adminOrderController.confirmPayment);
router.post("/payment/reject", adminOrderController.rejectPayment);
router.post("/send", adminOrderController.sendOrder);
router.post("/cancel", adminOrderController.cancelOrder);

module.exports = router;
