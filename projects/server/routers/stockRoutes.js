const express = require("express");
const { stockController } = require("../controllers");
const checkRole = require("../middleware/checkRole");
const router = express.Router();

router.get("/", checkRole.fetchDataforAdmins, stockController.fetchStocks);

module.exports = router;
