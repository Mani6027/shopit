const express = require('express');
const router = express.Router();

const {
        getProducts,
        newProduct, 
        getSingleProduct, 
        updateProdcut,
        deleteProduct} = require('../controllers/productControllers');

const {isAuthentcatedUser, authorizeRoles} = require('../middlewares/auth')

router.route('/products').get(isAuthentcatedUser, getProducts);
router.route('/product/:id').get(isAuthentcatedUser, getSingleProduct);

router.route('/admin/product/new').post(isAuthentcatedUser, authorizeRoles('admin'), newProduct);

// We can merge this merge this methods both the methods have same route
router.route('/admin/product/:id')
                            .put(isAuthentcatedUser, authorizeRoles('admin'), updateProdcut)
                            .delete(isAuthentcatedUser, authorizeRoles('admin'), deleteProduct);

module.exports = router;
