const express = require("express");
const { cartController } = require("../controllers");

const router = express.Router();

router.post("/", cartController.addProductToCart);
router.get("/", cartController.fetchCartItems);
router.put("/increase-qty", cartController.increaseQuantity);
router.put("/decrease-qty", cartController.decreaseQuantity);
router.delete("/", cartController.deleteProductFromCart);

module.exports = router;
