const express = require("express");
const { warehouseController } = require("../controllers");
const checkRole = require("../middleware/checkRole");

const router = express.Router();

router.post("/", checkRole.superAdmin, warehouseController.createWarehouse);
router.put(
  "/:id_warehouse",
  checkRole.superAdmin,
  warehouseController.editWarehouse
);
router.delete(
  "/:id_warehouse",
  checkRole.superAdmin,
  warehouseController.deleteWarehouse
);
router.get("/", checkRole.superAdmin, warehouseController.fetchWarehouseList);

module.exports = router;
