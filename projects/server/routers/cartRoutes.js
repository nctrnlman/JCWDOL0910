const express = require("express");
const { cartController } = require("../controllers");
const authenticateToken = require("../middleware/auth");
const { checkQuantityCartItems } = require("../middleware/checkCart");

const router = express.Router();

router.post("/", authenticateToken, cartController.addProductToCart);
router.get(
  "/",
  authenticateToken,
  checkQuantityCartItems,
  cartController.fetchCartItems
);
router.put(
  "/update-quantity",
  authenticateToken,
  checkQuantityCartItems,
  cartController.updateQuantity
);
router.delete("/", authenticateToken, cartController.deleteProductFromCart);

module.exports = router;
