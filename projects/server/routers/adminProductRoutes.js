const express = require("express");
const { adminProductController } = require("../controllers");
const checkAdminRole = require("../middleware/checkRole");
const upload = require("../middleware/multer");

const router = express.Router();

router.get("/", adminProductController.fetchProducts);
router.post(
  "/",
  checkAdminRole,
  upload.single("image_url"),
  adminProductController.addProduct
);
router.put(
  "/:productId",
  checkAdminRole,
  upload.single("image_url"),
  adminProductController.editProduct
);
router.delete(
  "/:productId",
  checkAdminRole,
  adminProductController.deleteProduct
);

module.exports = router;
