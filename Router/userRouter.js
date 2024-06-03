import express from 'express'
import {doSignUp,doLogin} from '../Controller/userController.js';
const userRouter = express.Router();

userRouter.post('/register',doSignUp);

userRouter.post('/login',doLogin);

export default userRouter