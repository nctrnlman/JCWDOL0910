const express = require('express')
const { categoryController } = require('../controllers')
const app = express()

const router = express.Router()

router.get('/', categoryController.getAllProductCategories)

module.exports = router