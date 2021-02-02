const express = require('express');
const router = express.Router();

const {
    registerUser, 
    loginUser, 
    logout, 
    forgotPassword,
    resetPassword,
    getUserProfile,
    updatePassword} = require('../controllers/usersController');

const {isAuthentcatedUser} = require('../middlewares/auth');

router.route('/health').get((req, res, next) => {
    res.status(200).json({
        success: true,
        message: 'Auth route is healthy'})})

router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

router.route('/logout').get(logout);

router.route('/me').get(isAuthentcatedUser, getUserProfile);
router.route('/password/update').put(isAuthentcatedUser, updatePassword);


module.exports = router;
