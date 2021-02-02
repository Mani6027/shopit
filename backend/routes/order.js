const express = require('express');
const router = express.Router();

const {newOrder} = require('../controllers/orderController');

const {isAuthentcatedUser, authorizeRoles} = require('../middlewares/auth');

router.route('/health').get((req, res, next) => {
    res.status(200).json({
        success: true,
        message: 'Order route is healthy'
    })
});

router.route('/order/new').post(isAuthentcatedUser, newOrder);

module.exports = router;
