const express = require("express");
const { adminProductController } = require("../controllers");
const checkRole = require("../middleware/checkRole");
const upload = require("../middleware/multer");

const router = express.Router();

router.get("/", checkRole.admins, adminProductController.fetchProducts);

router.get("/all", checkRole.admins, adminProductController.getAllProducts);

router.post(
  "/",
  checkRole.superAdmin,
  upload.single("image_url"),
  adminProductController.addProduct
);
router.put(
  "/:productId",
  checkRole.superAdmin,
  upload.single("image_url"),
  adminProductController.editProduct
);
router.delete(
  "/:productId",
  checkRole.superAdmin,
  adminProductController.deleteProduct
);

module.exports = router;
