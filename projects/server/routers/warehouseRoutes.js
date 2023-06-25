const express = require("express");
const { warehouseController } = require("../controllers");
const checkRole = require("../middleware/checkRole");

const router = express.Router();

router.post("/", checkRole.checkAdminRole, warehouseController.createWarehouse);
router.put(
  "/:id_warehouse",
  checkRole.checkAdminRole,
  warehouseController.editWarehouse
);
router.delete(
  "/:id_warehouse",
  checkRole.checkAdminRole,
  warehouseController.deleteWarehouse
);
router.get(
  "/",
  checkRole.checkAdminRole,
  warehouseController.fetchWarehouseList
);

module.exports = router;
