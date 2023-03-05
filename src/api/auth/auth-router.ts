import express from 'express';
import {
  loginUserController,
  registerUserController,
} from './auth-controller.js';

const router = express.Router();

router.route('/register').post(registerUserController);

router.route('/login').post(loginUserController);

export default router;
