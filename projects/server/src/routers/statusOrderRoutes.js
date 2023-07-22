const express = require("express");
const { statusOrderController } = require("../controllers");
const { changeStatusOrder } = require("../middleware/changeStatusOrder");

const router = express.Router();

router.get("/", changeStatusOrder, statusOrderController.changeStatusOrders);
router.post("/", statusOrderController.updateOrderStatusToDikirim);

module.exports = router;
