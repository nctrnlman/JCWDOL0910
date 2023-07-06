const express = require("express");
const { stockMutationController } = require("../controllers");
const checkRole = require("../middleware/checkRole");
const router = express.Router();

router.get("/", checkRole.admins, stockMutationController.fetchStockMutation);

module.exports = router;
