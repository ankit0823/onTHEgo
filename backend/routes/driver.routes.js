const driverController = require('../controllers/driver.controller');
const express = require('express');
const router = express.Router();
const { body } = require('express-validator'); 
const authDriverMiddleware = require('../middlewares/auth.middleware');

router.post('/register', [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Please enter a password with at least 5 characters'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('Please enter a first name with at least 3 characters'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Please enter a plate with at least 3 characters'),
    body('vehicle.capacity').isLength({min :1}).withMessage('Please enter a valid capacity'),
    body('vehicle.color').isLength({min :3}).withMessage('Please enter a valid color'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).isLength({min :3}).withMessage('Please enter a valid vehicle type'),
],
    driverController.registerDriver
)

router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Please enter a password with at least 5 characters'),
],
    driverController.loginDriver
)

router.get('/profile', authDriverMiddleware.authDriver ,driverController.getDriverProfile)

router.get('/logout', authDriverMiddleware.authDriver, driverController.logoutDriver)

module.exports = router;