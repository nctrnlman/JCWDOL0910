const express = require("express");
const { orderController } = require("../controllers");
const app = express();

const router = express.Router();

router.get("/order-list", orderController.orderList);
router.get("/shipping-warehouse", orderController.getShippingWarehouse);
router.post("/create", orderController.createOrder);

module.exports = router;
