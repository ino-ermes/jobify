import express from 'express';
import * as authController from '../controllers/authController.js';
import authenticateUser from '../middleware/auth.js';
import restrictTestUser from '../middleware/restrictTestUser.js';
import rateLimiter from 'express-rate-limit';

const apiLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: 'Too many request'
});

const router = express.Router();

router.route('/register').post(apiLimiter, authController.register);
router.route('/login').post(apiLimiter, authController.login);
router.route('/updateUser').patch(authenticateUser, restrictTestUser, authController.updateUser);
router.route('/getUserInfo').get(authenticateUser, authController.getUserInfo);
router.route('/logout').get(authController.logoutUser);

export default router;