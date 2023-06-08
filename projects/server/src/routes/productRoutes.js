const express = require('express')
const { productController } = require('../controllers')
const app = express()

const router = express.Router()

router.get('/latest_products', productController.getLatestProducts)

module.exports = router