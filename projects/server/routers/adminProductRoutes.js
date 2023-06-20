const express = require("express");
const { adminProductController } = require("../controllers");
const checkAdminRole = require("../middleware/checkRole");

const router = express.Router();

router.get("/", adminProductController.fetchProducts);
router.post("/", checkAdminRole, adminProductController.addProduct);
router.put("/:productId", checkAdminRole, adminProductController.editProduct);
router.delete(
  "/:productId",
  checkAdminRole,
  adminProductController.deleteProduct
);

module.exports = router;
