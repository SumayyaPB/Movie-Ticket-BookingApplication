import express from 'express';
import { deleteProfile, getProfile, signIn, signUp, updateProfile } from '../Controller/adminController.js';

;
const adminRouter = express.Router();

adminRouter.post('/adminSignup',signUp);

adminRouter.post('/adminLogin',signIn);

adminRouter.get('/getProfile',getProfile);

adminRouter.patch('/update-admin/:id', updateProfile);

adminRouter.delete('/delete-admin/:id',deleteProfile)

export default adminRouter