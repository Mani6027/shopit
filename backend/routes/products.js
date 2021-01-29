const express = require('express');
const router = express.Router();

const {
        getProducts,
        newProduct, 
        getSingleProduct, 
        updateProdcut,
        deleteProduct} = require('../controllers/productControllers');

router.route('/products').get(getProducts);
// const result = getSingleProduct().then(response => {return resolve(response)}).catch((err, next) => next)
router.route('/product/:id').get(getSingleProduct);

router.route('/admin/product/new').post(newProduct);

// We can merge this merge this methods both the methods have same route
router.route('/admin/product/:id')
                            .put(updateProdcut)
                            .delete(deleteProduct);

module.exports = router;
