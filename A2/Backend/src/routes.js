const express = require('express');
const { storeProduct, listProducts } = require('./controller');

const router = express.Router();

router.get('/list-products', listProducts);
router.post('/store-products', storeProduct);

module.exports = router