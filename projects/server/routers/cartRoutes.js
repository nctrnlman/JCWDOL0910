const express = require("express");
const { cartController } = require("../controllers");

const router = express.Router();

router.post("/", cartController.addProductToCart);
router.get("/cart", cartController.fetchCartItems);

module.exports = router;
