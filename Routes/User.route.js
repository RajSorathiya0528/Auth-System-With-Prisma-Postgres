import express from 'express';
import { registerUser, userLogin } from '../Controllers/User.controller.js'

const route = express.Router();

route.post('/register', registerUser);
route.post('/login', userLogin);

export default route