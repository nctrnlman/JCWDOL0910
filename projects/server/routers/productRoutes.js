const express = require("express");
const { productController } = require("../controllers");
const app = express();

const router = express.Router();

router.get("/latest_products", productController.getLatestProducts);
router.get("/", productController.fetchProducts);
router.get("/product-detail/:id", productController.getProductById);

module.exports = router;
