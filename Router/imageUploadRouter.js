import express from "express"
import { upload, uploadImage } from "../Controller/ImageUploadController.js";
const imageUploadRouter = express.Router();

imageUploadRouter.post('/uploadimage',upload.single('myimage'),uploadImage);


export {imageUploadRouter}