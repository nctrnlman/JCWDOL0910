const express = require("express");
const { cartController } = require("../controllers");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

router.post("/", authenticateToken, cartController.addProductToCart);
router.get("/", authenticateToken, cartController.fetchCartItems);
router.put(
  "/update-quantity",
  authenticateToken,
  cartController.updateQuantity
);
router.delete("/", authenticateToken, cartController.deleteProductFromCart);

module.exports = router;
