import express from 'express';

import { createUser, deleteUser, getUsers } from '../handlers/userHandler.js';
import { login, signUp } from '../handlers/authHandler.js';
const router = express.Router();

router.route('/signup').post(signUp);
router.route('/login').post(login);
router.route('/').get(getUsers).post(createUser);
router.route('/:id').delete(deleteUser);

export default router;
