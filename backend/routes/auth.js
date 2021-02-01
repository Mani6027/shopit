const express = require('express');
const router = express.Router();

const {registerUser, loginUser} = require('../controllers/usersController');

router.route('/health').get((req, res, next) => {
    res.status(200).json({
        success: true, 
        message: 'Auth route is healthy'})})

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

module.exports = router;
