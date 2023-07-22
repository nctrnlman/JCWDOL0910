const express = require("express");
const { stockController } = require("../controllers");
const checkRole = require("../middleware/checkRole");
const router = express.Router();

router.get("/", checkRole.admins, stockController.fetchStocks);
router.post("/", checkRole.admins, stockController.addStock);
router.put("/", checkRole.admins, stockController.updateStock);
router.delete("/", checkRole.admins, stockController.deleteStock);

module.exports = router;
