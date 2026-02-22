import express from 'express';
import isAuth from '../middlewares/isAuth.js';
import { getCurrentUser } from '../controllers/user.controllers.js';
import upload from './middlewares/multer.js';
import { createEditShop } from '../controllers/shop.controllers.js';

const shopRouter = express.Router();

shopRouter.post('/create-edit', isAuth, upload.single("image"), createEditShop);


export default shopRouter;