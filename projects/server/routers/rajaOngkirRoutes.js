const express = require("express");
const { rajaOngkirController } = require("../controllers");

const router = express.Router();

// Routes
router.get("/provinces", rajaOngkirController.getProvinces);
router.get("/cities/:provinceId", rajaOngkirController.getCitiesByProvince);

module.exports = router;
