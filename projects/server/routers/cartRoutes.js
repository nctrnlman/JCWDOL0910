const express = require("express");
const { cartController } = require("../controllers");

const router = express.Router();

router.post("/", cartController.addProductToCart);
router.get("/", cartController.fetchCartItems);
router.put("/update-quantity", cartController.updateQuantity);
router.delete("/", cartController.deleteProductFromCart);

module.exports = router;
