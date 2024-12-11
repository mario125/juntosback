const express = require('express');
const productController = require('../../interfaces/controllers/productController');
const {authMiddleware} = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/',  productController.getAllProducts);

module.exports = router;