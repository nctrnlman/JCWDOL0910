const express = require("express");
const { transactionController } = require("../controllers");
const { verifyToken } = require("../middleware/auth");
const app = express();

const router = express.Router();

router.post("/add-item", transactionController.addToCart);

module.exports = router;
