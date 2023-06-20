const express = require("express");
const { categoryController } = require("../controllers");
const app = express();

const router = express.Router();

router.get("/", categoryController.getAllProductCategories);
router.post("/add", categoryController.addCategory);
router.patch("/update", categoryController.updateCategory);
router.delete("/delete/:id", categoryController.deleteCategory);

module.exports = router;
