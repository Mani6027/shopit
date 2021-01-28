const express = require('express');
const router = express.Router();

const {getProducts, newProduct, getSingleProduct, updateProdcut} = require('../controllers/productControllers');

router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);

router.route('/admin/product/new').post(newProduct);

router.route('/admin/product/:id').put(updateProdcut);

module.exports = router;
