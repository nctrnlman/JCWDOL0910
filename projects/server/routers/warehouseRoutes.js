const express = require("express");
const { warehouseController } = require("../controllers");
const checkAdminRole = require("../middleware/checkRole");

const router = express.Router();

router.post("/", checkAdminRole, warehouseController.createWarehouse);
router.put("/:id_warehouse", checkAdminRole, warehouseController.editWarehouse);
router.delete(
  "/:id_warehouse",
  checkAdminRole,
  warehouseController.deleteWarehouse
);

module.exports = router;
