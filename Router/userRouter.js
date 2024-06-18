import express from 'express'
import {doSignUp,doLogin, getUser, checkLogin} from '../Controller/userController.js';
import authenticateUser from '../Middleware/athMiddleware.js';
const userRouter = express.Router();

userRouter.post('/register',doSignUp);

userRouter.post('/login',doLogin);

userRouter.get('/getuser',getUser)

userRouter.get('/checklogin',authenticateUser,checkLogin)


export default userRouter