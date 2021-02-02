const express = require('express');
const router = express.Router();

const {registerUser, loginUser, logout, forgotPassword} = require('../controllers/usersController');
const { route } = require('./products');

router.route('/health').get((req, res, next) => {
    res.status(200).json({
        success: true, 
        message: 'Auth route is healthy'})})

router.route('/logout').get(logout);

router.route('/password/forgot').post(forgotPassword);
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);


module.exports = router;
