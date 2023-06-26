const express = require("express");
const { stockController } = require("../controllers");
const checkRole = require("../middleware/checkRole");
const router = express.Router();

router.get("/", checkRole.fetchDataforAdmins, stockController.fetchStocks);
router.post("/", checkRole.checkAdminRole, stockController.addStock);
router.put("/", checkRole.checkAdminRole, stockController.updateStock);
router.delete("/", checkRole.checkAdminRole, stockController.deleteStock);

module.exports = router;
