import express from 'express';
import { CheckTheaterOwner, deleteProfile, getProfile, signIn, signUp, updateProfile } from '../Controller/adminController.js';
import { authenticateAdmin, authenticateTheaterOwner } from '../Middleware/adminMiddleware.js';


const adminRouter = express.Router();

adminRouter.post('/adminsignup',signUp);

adminRouter.post('/adminLogin',signIn);

adminRouter.get('/getProfile',getProfile);

adminRouter.patch('/update-admin/:id', updateProfile);

adminRouter.delete('/delete-admin/:id',deleteProfile)

adminRouter.get('/checkLogin',authenticateTheaterOwner,CheckTheaterOwner)

export default adminRouter