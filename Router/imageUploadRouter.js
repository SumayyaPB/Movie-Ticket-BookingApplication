import express from "express"
import multer from "multer";
import { uploadImage, uploadSingle } from "../Controller/ImageUploadController.js";
const imageUploadRouter = express.Router();


imageUploadRouter.post('/uploadimage',uploadSingle,uploadImage);

export {imageUploadRouter}