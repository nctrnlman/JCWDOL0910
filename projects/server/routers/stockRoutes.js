const express = require("express");
const { stockController } = require("../controllers");
const checkRole = require("../middleware/checkRole");
const router = express.Router();

router.get("/", checkRole.admins, stockController.fetchStocks);
router.post("/", checkRole.superAdmin, stockController.addStock);
router.put("/", checkRole.superAdmin, stockController.updateStock);
router.delete("/", checkRole.superAdmin, stockController.deleteStock);

module.exports = router;
