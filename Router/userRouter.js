import express from 'express'
import {doSignUp,doLogin, getUser, checkLogin, logOut} from '../Controller/userController.js';
import authenticateUser from '../Middleware/athMiddleware.js';
const userRouter = express.Router();

userRouter.post('/register',doSignUp);

userRouter.post('/login',doLogin);

userRouter.get('/getuser',authenticateUser,getUser)

userRouter.get('/checklogin',authenticateUser,checkLogin)

userRouter.get('/logout',logOut)


export default userRouter