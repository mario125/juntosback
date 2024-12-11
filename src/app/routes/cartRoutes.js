const express = require('express');
const cartController = require('../../interfaces/controllers/cartController');
const {authMiddleware} = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, cartController.createCart);
router.post('/add-item', authMiddleware, cartController.addItemToCart);
router.post('/remove-item', authMiddleware, cartController.removeItemToCart);
router.get('/', authMiddleware, cartController.getActiveCart);
router.post('/update-status', authMiddleware, cartController.updateStatusCart);
router.get('/complete', authMiddleware, cartController.getCompleteCart);

module.exports = router;
