const express = require("express");
const { productController } = require("../controllers");
const app = express();

const router = express.Router();

router.get("/latest_products", productController.getLatestProducts);
router.get("/all-product", productController.getAllProducts);
router.get("/products/:category", productController.getProductByCategory);

module.exports = router;
