const express = require('express');
const router = express.Router();

const {
    newOrder,
    getSigleOrder,
    myOrder,
    allOrders,
    updateOrder
} = require('../controllers/orderController');

const {isAuthentcatedUser, authorizeRoles} = require('../middlewares/auth');

router.route('/health').get((req, res, next) => {
    res.status(200).json({
        success: true,
        message: 'Order route is healthy'
    })
});

router.route('/order/new').post(isAuthentcatedUser, newOrder);

router.route('/order/:id').get(isAuthentcatedUser, getSigleOrder);
router.route('/orders/me').get(isAuthentcatedUser, myOrder);

router.route('/admin/orders').get(isAuthentcatedUser, authorizeRoles('admin'), allOrders);
router.route('/admin/order/:id').put(isAuthentcatedUser, authorizeRoles('admin'), updateOrder)

module.exports = router;
