const express = require("express");
const { orderController } = require("../controllers");
const app = express();

const router = express.Router();

router.get("/order-list", orderController.orderList);

module.exports = router;
