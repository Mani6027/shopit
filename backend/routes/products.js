const express = require('express');
const router = express.Router();

const {
        getProducts,
        newProduct, 
        getSingleProduct, 
        updateProdcut,
        deleteProduct,
        createProductReview,
        getProductReviews,
        deleteProductReview} = require('../controllers/productControllers');

const {isAuthentcatedUser, authorizeRoles} = require('../middlewares/auth')

router.route('/health').get((req, res, next) => {
        res.status(200).json({
                success: true,
                message: 'Product route is healthy'
        })
})

router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);

router.route('/admin/product/new').post(isAuthentcatedUser, authorizeRoles('admin'), newProduct);

// We can merge this merge this methods both the methods have same route
router.route('/admin/product/:id')
                            .put(isAuthentcatedUser, authorizeRoles('admin'), updateProdcut)
                            .delete(isAuthentcatedUser, authorizeRoles('admin'), deleteProduct);

router.route('/review').put(isAuthentcatedUser, createProductReview)
router.route('/reviews').get(isAuthentcatedUser, getProductReviews)
router.route('/reviews').delete(isAuthentcatedUser, deleteProductReview)

module.exports = router;
