import express from 'express';
import * as authController from '../controllers/authController.js';
import authenticateUser from '../middleware/auth.js';
import restrictTestUser from '../middleware/restrictTestUser.js';

const router = express.Router();

router.route('/register').post(authController.register);
router.route('/login').post(authController.login);
router.route('/updateUser').patch(authenticateUser, restrictTestUser, authController.updateUser);


export default router;